"""Tiling/patch-based inference: run the segmentation model on overlapping
crops of the native-resolution image instead of either (a) the whole page at
once (production today) or (b) downscaling the whole page first (tested in
`catalog_segmentation_failures.py` and found to make results worse, see
README). This directory's README flagged tiling as a plausible way to keep
the model closer to its ~256-512px training crop size *without* losing the
fine wall/small-room detail that downscaling destroys -- this script is the
first actual test of that idea.

Approach: split the full-resolution image into overlapping tiles close to
the model's training crop size, run inference on each tile independently
(each tile only needs a `round32` pad, not a resize -- so it sees genuinely
native-resolution pixels, unlike the whole-page case which is already huge
relative to training crops), accumulate every tile's raw logits into a
full-page canvas (averaging in the overlap regions to avoid hard seams at
tile boundaries), then run the exact same wall-mask/flood-fill pipeline
production uses on the stitched result.

Usage (from `functions/floorplan-analyzer/research/pcpd-42-detection-improvements`,
using the floorplan-analyzer venv):

    ../../venv/bin/python3 tile_based_inference.py --image <path> \\
        --tile-size 512 --overlap 128 --out-dir /path/to/scratch/out

Findings from running this against real drawings are written up in this
directory's README.md, not here -- this file is the re-runnable harness.
"""

from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path

_REPO_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_REPO_ROOT))

import cv2  # noqa: E402
import numpy as np  # noqa: E402
import torch  # noqa: E402
import torch.nn.functional as f_torch  # noqa: E402
from analysis.strategies.ocr_flood_fill_smoothed import (  # noqa: E402
    BOUNDARY_CLASSES,
    DEFAULT_MIN_POINT_DISTANCE_PX,
    DEFAULT_ORTHO_TOLERANCE_DEGREES,
    DEFAULT_SIMPLIFY_EPSILON_RATIO,
    DEFAULT_UNKNOWN_ROOM_MIN_AREA,
    DEFAULT_WALL_KERNEL_SIZE,
    _close_wall_mask,
    _render_floorplan,
    _rooms_from_seeds,
)
from inference.model import load_model  # noqa: E402
from inference.preprocess import PreparedImage, load_pil, prepare  # noqa: E402
from ocr.service import OcrService  # noqa: E402
from segmentation.service import SegmentationService  # noqa: E402

_N_CLASSES = 44  # matches inference/model.py's hg_furukawa_original(n_classes=...)


def _tile_origins(length: int, tile: int, stride: int) -> list[int]:
    """Tile start coordinates covering `[0, length)`, always including a
    final tile flush with the far edge so the last partial strip isn't
    skipped."""
    if length <= tile:
        return [0]
    origins = list(range(0, length - tile + 1, stride))
    if origins[-1] != length - tile:
        origins.append(length - tile)
    return origins


def run_tiled_inference(
    image, model, tile_size: int, overlap: int
) -> tuple[torch.Tensor, PreparedImage, float]:
    """Accumulate every tile's raw model output into a full-resolution
    logit canvas (summed, then averaged by an overlap-count buffer), and
    return it wrapped in a synthetic `PreparedImage` so the rest of the
    pipeline (`SegmentationService.split`, wall mask, flood fill) can treat
    it exactly like a single whole-page inference result."""
    original_w, original_h = image.size
    stride = max(1, tile_size - overlap)
    xs = _tile_origins(original_w, tile_size, stride)
    ys = _tile_origins(original_h, tile_size, stride)

    canvas_sum = torch.zeros(
        (1, _N_CLASSES, original_h, original_w), dtype=torch.float32
    )
    canvas_count = torch.zeros((1, 1, original_h, original_w), dtype=torch.float32)

    started = time.perf_counter()
    tile_count = 0
    for y0 in ys:
        for x0 in xs:
            x1 = min(original_w, x0 + tile_size)
            y1 = min(original_h, y0 + tile_size)
            prepared_tile = prepare(image, crop_xyxy=(x0, y0, x1, y1))
            with torch.no_grad():
                tile_out = model(prepared_tile.tensor)
            # `prepare()` pads the crop up to a multiple of 32; resize back
            # down to the crop's true pixel size before pasting so tile
            # boundaries land exactly on the canvas grid.
            resized = f_torch.interpolate(
                tile_out, size=(y1 - y0, x1 - x0), mode="bilinear", align_corners=False
            )
            canvas_sum[:, :, y0:y1, x0:x1] += resized
            canvas_count[:, :, y0:y1, x0:x1] += 1.0
            tile_count += 1
    elapsed = time.perf_counter() - started
    print(f"  {tile_count} tiles ({len(xs)}x{len(ys)} grid), {elapsed:.2f}s total")

    averaged = canvas_sum / canvas_count.clamp(min=1.0)
    synthetic_prepared = PreparedImage(
        tensor=torch.empty(0),
        infer_shape=(original_h, original_w),
        crop_xyxy=(0, 0, original_w, original_h),
        original_size=(original_w, original_h),
    )
    return averaged, synthetic_prepared, elapsed


def rooms_from_output(
    label: str,
    output: torch.Tensor,
    prepared: PreparedImage,
    image,
    seeds,
    ocr_service: OcrService,
    wall_kernel_size: int,
) -> tuple[dict, bytes]:
    original_w, original_h = image.size
    seg = SegmentationService().split(output, prepared)
    room_map_full = np.argmax(seg.rooms, axis=0).astype(np.uint8)
    room_map_orig = cv2.resize(
        room_map_full, (original_w, original_h), interpolation=cv2.INTER_NEAREST
    )
    wall_mask = np.isin(room_map_full, BOUNDARY_CLASSES).astype(np.uint8)
    wall_mask = cv2.resize(
        wall_mask, (original_w, original_h), interpolation=cv2.INTER_NEAREST
    )
    wall_mask_closed = _close_wall_mask(wall_mask, wall_kernel_size)

    rooms_result = _rooms_from_seeds(
        wall_mask_closed,
        seeds,
        room_map_orig=room_map_orig,
        min_area=0,
        simplify_epsilon_ratio=DEFAULT_SIMPLIFY_EPSILON_RATIO,
        ortho_tolerance_degrees=DEFAULT_ORTHO_TOLERANCE_DEGREES,
        min_point_distance_px=DEFAULT_MIN_POINT_DISTANCE_PX,
        unknown_room_min_area=DEFAULT_UNKNOWN_ROOM_MIN_AREA,
        ocr_service=ocr_service,
    )
    unknown = sum(
        1 for r in rooms_result if r.get("source") == "closed_region_fallback"
    )
    garage = next(
        (r for r in rooms_result if "garage" in r.get("label", "").lower()), None
    )
    print(
        f"  [{label}] rooms={len(rooms_result)} labeled={len(rooms_result) - unknown} "
        f"unknown={unknown} garage_found={garage is not None}"
    )
    overlay_png = _render_floorplan(image, rooms_result, seeds, wall_mask_closed)
    return rooms_result, overlay_png


def run_native_baseline(
    image, model, seeds, ocr_service: OcrService, wall_kernel_size: int
) -> tuple[dict, bytes]:
    prepared = prepare(image)
    started = time.perf_counter()
    with torch.no_grad():
        output = model(prepared.tensor)
    print(f"  native forward pass: {time.perf_counter() - started:.2f}s")
    return rooms_from_output(
        "native_baseline",
        output,
        prepared,
        image,
        seeds,
        ocr_service,
        wall_kernel_size,
    )


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--image", required=True, type=Path)
    parser.add_argument("--tile-size", type=int, default=512)
    parser.add_argument("--overlap", type=int, default=128)
    parser.add_argument(
        "--wall-kernel-size", type=int, default=DEFAULT_WALL_KERNEL_SIZE
    )
    parser.add_argument("--out-dir", type=Path, default=Path("research-output"))
    return parser.parse_args()


def main() -> None:
    args = _parse_args()
    args.out_dir.mkdir(parents=True, exist_ok=True)

    image = load_pil(args.image.read_bytes())
    print(f"Loaded {args.image} -> {image.size[0]}x{image.size[1]}px")

    model = load_model()
    ocr_service = OcrService()
    _detected, seeds = ocr_service.read_text_and_seeds(image)
    print(f"OCR: {len(seeds)} room-label seeds (reused across both variants)")

    print("Native baseline:")
    _rooms, native_png = run_native_baseline(
        image, model, seeds, ocr_service, args.wall_kernel_size
    )
    (args.out_dir / f"{args.image.stem}_native.png").write_bytes(native_png)

    print(f"Tiled ({args.tile_size}px tiles, {args.overlap}px overlap):")
    output, prepared, _elapsed = run_tiled_inference(
        image, model, args.tile_size, args.overlap
    )
    _rooms, tiled_png = rooms_from_output(
        "tiled", output, prepared, image, seeds, ocr_service, args.wall_kernel_size
    )
    tiled_out_path = (
        args.out_dir / f"{args.image.stem}_tiled_{args.tile_size}_{args.overlap}.png"
    )
    tiled_out_path.write_bytes(tiled_png)


if __name__ == "__main__":
    main()
