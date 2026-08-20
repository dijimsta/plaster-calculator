"""Investigate and attempt to fix the Garage-specific room-dropout failure
documented in this directory's README ("Garage-specific failure"):
Garage comes back completely absent -- not merged into another room, not an
unlabeled "Unknown" fallback shape, no trace anywhere in the output -- and
(per this pass) this reproduces on *every* real house tested so far, despite
OCR reliably reading the word "Garage" at high confidence on all of them.

Documented hypothesis (this directory's README, first pass): a garage's wide
door opening leaves a gap in the model's wall mask; the OCR-seeded flood
fill escapes through that gap past the building envelope onto the blank
page margin, touches the image border, and is silently discarded by
`_touches_border()` in `analysis/strategies/ocr_flood_fill_smoothed.py`.
This script:

1. Verifies that mechanism directly (not by assumption) via `--approach
   diagnose`: floods from the real "garage" OCR seed *without* the
   border-touch rejection, and renders where the fill actually goes.
2. Tries `--approach icon_reinforced`: draws the model's own detected
   door/window icon polygons onto the wall mask (as solid/blocking) before
   closing + flood fill -- the fix this directory's README proposed as a
   next step but never actually tried.
3. Tries `--approach kernel_sweep`: the classical-CV lever already exposed
   by production (`_close_wall_mask`'s `wall_kernel_size`) -- does a bigger
   closing kernel bridge the gap, and at what cost to other rooms?

Usage (from `functions/floorplan-analyzer/research/pcpd-42-detection-improvements`,
using the floorplan-analyzer venv):

    ../../venv/bin/python3 fix_garage_dropout.py --image <path> \\
        --approach diagnose --out-dir /path/to/scratch/out

    ../../venv/bin/python3 fix_garage_dropout.py --image <path> \\
        --approach icon_reinforced --out-dir /path/to/scratch/out

    ../../venv/bin/python3 fix_garage_dropout.py --image <path> \\
        --approach kernel_sweep --kernel-sizes 15,21,31,41,51 \\
        --out-dir /path/to/scratch/out

Findings from running this against real drawings are written up in this
directory's README.md, not here -- this file is the re-runnable harness.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

_REPO_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_REPO_ROOT))

import cv2  # noqa: E402
import numpy as np  # noqa: E402
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
    _touches_border,
)
from inference.model import load_model  # noqa: E402
from inference.preprocess import load_pil  # noqa: E402
from inference.service import InferenceService  # noqa: E402
from ocr.service import OcrService  # noqa: E402
from segmentation.postprocess import (  # noqa: E402
    polygons_from_predictions,
    split_outputs,
)
from segmentation.service import SegmentationService  # noqa: E402

WINDOW_ICON_CLASS = 1
DOOR_ICON_CLASS = 2
OPENING_ICON_CLASSES = (WINDOW_ICON_CLASS, DOOR_ICON_CLASS)


def find_garage_seeds(seeds: list[dict]) -> list[dict]:
    """Every OCR seed whose matched keyword or label is garage-related --
    normally one, but a drawing can label a garage more than once (e.g. a
    duplex with two garages, or a repeated "GARAGE" callout)."""
    return [
        s
        for s in seeds
        if "garage" in s["label"].lower() or s["matched_keyword"] == "garage"
    ]


def raw_flood_fill(
    wall_mask_closed: np.ndarray, cx: int, cy: int
) -> tuple[np.ndarray, bool, int]:
    """Reproduce `_rooms_from_seeds`'s per-seed flood fill exactly, but
    *without* the accept/reject filtering -- so a leaking fill's true extent
    can be inspected instead of silently vanishing."""
    height, width = wall_mask_closed.shape[:2]
    flood_mask = np.zeros((height + 2, width + 2), dtype=np.uint8)
    filled = wall_mask_closed.copy()
    cv2.floodFill(filled, flood_mask, (cx, cy), 2)
    region = filled == 2
    return region, _touches_border(region), int(region.sum())


def render_leak_diagnostic(
    image,
    wall_mask_closed: np.ndarray,
    seed: dict,
    region: np.ndarray,
    touches_border: bool,
) -> bytes:
    """Overlay the wall mask (grey) and the seed's raw flood-fill extent
    (red if it leaked to the border, green if it stayed enclosed) on the
    source drawing, so the leak path is visible instead of asserted."""
    import io

    from PIL import Image, ImageDraw

    overlay = np.array(image.convert("RGB")).copy()
    wall_bool = wall_mask_closed.astype(bool)
    grey = np.array([90, 90, 90])
    overlay[wall_bool] = (overlay[wall_bool] * 0.4 + grey * 0.6).astype(np.uint8)
    colour = np.array([255, 60, 60]) if touches_border else np.array([60, 200, 90])
    overlay[region] = (overlay[region] * 0.35 + colour * 0.65).astype(np.uint8)

    out = Image.fromarray(overlay)
    draw = ImageDraw.Draw(out)
    cx, cy = int(seed["x"]), int(seed["y"])
    draw.ellipse([cx - 10, cy - 10, cx + 10, cy + 10], outline=(255, 255, 0), width=4)
    buf = io.BytesIO()
    out.save(buf, format="PNG")
    return buf.getvalue()


def icon_reinforced_wall_mask(
    wall_mask: np.ndarray, output, prepared, original_w: int, original_h: int
) -> np.ndarray:
    """Draw every detected door/window icon polygon onto the wall mask as
    solid (blocking) pixels *before* closing -- the idea being that a wide
    garage-door opening (a real gap in the wall class between the two door
    jambs) is exactly a "Door" icon detection, so reinforcing wall pixels at
    every detected opening should bridge the flood-fill leak without a
    blanket bigger closing kernel everywhere else on the page."""
    predictions = split_outputs(output, prepared.infer_shape)
    polygons, types, _room_polygons, _room_types = polygons_from_predictions(
        predictions, threshold=0.5
    )

    reinforced = wall_mask.copy()
    for polygon, t in zip(polygons, types, strict=False):
        if t["type"] != "icon" or int(t["class"]) not in OPENING_ICON_CLASSES:
            continue
        mapped = prepared.to_original_xy(np.asarray(polygon, dtype=np.float32))
        pts = np.round(mapped).astype(np.int32)
        cv2.fillPoly(reinforced, [pts], 1)
    return reinforced


def run_variant(
    label: str,
    image,
    wall_mask_closed: np.ndarray,
    seeds: list[dict],
    room_map_orig: np.ndarray,
    ocr_service: OcrService,
) -> tuple[dict, bytes]:
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
    garage_room = next(
        (r for r in rooms_result if "garage" in r.get("label", "").lower()), None
    )
    unknown = sum(
        1 for r in rooms_result if r.get("source") == "closed_region_fallback"
    )
    print(
        f"  [{label}] rooms={len(rooms_result)} unknown_fallback={unknown} "
        f"garage_found={garage_room is not None}"
        + (f" (area_px={garage_room['area_px']:.0f})" if garage_room else "")
    )
    overlay_png = _render_floorplan(image, rooms_result, seeds, wall_mask_closed)
    return rooms_result, overlay_png


def _segment(image, model) -> tuple[np.ndarray, np.ndarray, object, object]:
    inference = InferenceService(model)
    output, prepared = inference.prepare_and_run(image)
    seg = SegmentationService().split(output, prepared)
    original_w, original_h = image.size
    room_map_full = np.argmax(seg.rooms, axis=0).astype(np.uint8)
    room_map_orig = cv2.resize(
        room_map_full, (original_w, original_h), interpolation=cv2.INTER_NEAREST
    )
    wall_mask = np.isin(room_map_full, BOUNDARY_CLASSES).astype(np.uint8)
    wall_mask = cv2.resize(
        wall_mask, (original_w, original_h), interpolation=cv2.INTER_NEAREST
    )
    return wall_mask, room_map_orig, output, prepared


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--image", required=True, type=Path)
    parser.add_argument(
        "--approach",
        choices=["diagnose", "icon_reinforced", "kernel_sweep"],
        default="diagnose",
    )
    parser.add_argument(
        "--kernel-sizes",
        default="15,21,31,41,51",
        help="Comma-separated wall_kernel_size values to try (kernel_sweep only)",
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
    garage_seeds = find_garage_seeds(seeds)
    print(f"OCR: {len(seeds)} total seeds, {len(garage_seeds)} garage-related seed(s)")
    if not garage_seeds:
        print("No garage-related OCR seed found on this image -- nothing to diagnose.")
        return

    wall_mask, room_map_orig, output, prepared = _segment(image, model)
    baseline_closed = _close_wall_mask(wall_mask, DEFAULT_WALL_KERNEL_SIZE)

    for i, seed in enumerate(garage_seeds):
        region, touches_border, area = raw_flood_fill(
            baseline_closed, int(seed["x"]), int(seed["y"])
        )
        print(
            f"  garage seed {i} ({seed['text']!r} @ {seed['x']},{seed['y']}): "
            f"raw_flood_area_px={area} touches_border={touches_border}"
        )
        diag_png = render_leak_diagnostic(
            image, baseline_closed, seed, region, touches_border
        )
        diag_path = args.out_dir / f"{args.image.stem}_leak_seed{i}.png"
        diag_path.write_bytes(diag_png)
        print(f"    leak diagnostic -> {diag_path}")

    if args.approach == "diagnose":
        _rooms, overlay_png = run_variant(
            "baseline", image, baseline_closed, seeds, room_map_orig, ocr_service
        )
        out_path = args.out_dir / f"{args.image.stem}_baseline.png"
        out_path.write_bytes(overlay_png)
        print(f"  baseline overlay -> {out_path}")
        return

    if args.approach == "icon_reinforced":
        original_w, original_h = image.size
        reinforced = icon_reinforced_wall_mask(
            wall_mask, output, prepared, original_w, original_h
        )
        reinforced_closed = _close_wall_mask(reinforced, DEFAULT_WALL_KERNEL_SIZE)
        run_variant(
            "baseline", image, baseline_closed, seeds, room_map_orig, ocr_service
        )
        _rooms, overlay_png = run_variant(
            "icon_reinforced",
            image,
            reinforced_closed,
            seeds,
            room_map_orig,
            ocr_service,
        )
        out_path = args.out_dir / f"{args.image.stem}_icon_reinforced.png"
        out_path.write_bytes(overlay_png)
        print(f"  icon_reinforced overlay -> {out_path}")
        return

    if args.approach == "kernel_sweep":
        kernel_sizes = [
            int(v.strip()) for v in args.kernel_sizes.split(",") if v.strip()
        ]
        for k in kernel_sizes:
            closed = _close_wall_mask(wall_mask, k)
            _rooms, overlay_png = run_variant(
                f"kernel={k}", image, closed, seeds, room_map_orig, ocr_service
            )
            out_path = args.out_dir / f"{args.image.stem}_kernel{k}.png"
            out_path.write_bytes(overlay_png)
        return


if __name__ == "__main__":
    main()
