"""Compare the production wall-mask/flood-fill pipeline at native image
resolution against (a) the same pipeline with the model's *input* resized to
a smaller "fit-long" edge before inference, and (b) a multiscale-averaged
variant that runs inference at several scales and averages the logits
before argmax, then upsamples back to full resolution -- exactly like the
production code already does for the native-resolution case -- before
OCR-seeded flood fill runs.

Why this experiment: production (`analysis/strategies/ocr_flood_fill_smoothed.py`
via `InferenceService.prepare_and_run`) calls `inference/preprocess.py`'s
`prepare(image)` with no `fit_long`/`fit_short`, so the model runs at
essentially the *native* resolution of the input image (only rounded up to
the next multiple of 32). For a 200 DPI A2/A3 architectural page that is
commonly 3300-4700px per side. The segmentation model
(`floortrans/models/hg_furukawa_original.py`, a CubiCasa5k-style hourglass
CNN) was trained on much smaller crops -- see the abandoned
`inference/strategies/fit_scale.py`'s docstring: "trained on relatively
small crops (~256 to ~512px)". So production today feeds it inputs roughly
6-10x larger per side than training resolution. This script tests whether
resizing down closer to training resolution before inference changes the
resulting wall mask / room segmentation for the better, the same, or the
worse, and separately whether multiscale averaging (the idea behind the
abandoned `inference/strategies/multiscale.py`) helps -- by reusing the
*actual* production strategy code (`OcrFloodFillSmoothedStrategy`'s private
helpers) with only the inference resolution varied, so results are as
representative of production as possible.

OCR only runs once per image (it is resolution-independent -- it always
reads the full-resolution image) and its seeds are reused across every
variant, so any difference in room count/shape/wall mask is attributable to
the segmentation input resolution, not to OCR variance.

Usage (from `functions/floorplan-analyzer/research/pcpd-42-detection-improvements`,
using the floorplan-analyzer venv):

    ../../venv/bin/python3 catalog_segmentation_failures.py \\
        --image /path/to/a/floorplan.png \\
        --fit-longs 768,1024,1536 \\
        --multiscale \\
        --out-dir /tmp/seg-failure-catalog

Requires the PyTorch checkpoint at `floortrans/weights/model_best_val_loss_var.pkl`
(or `MODEL_PATH` env var) to be present locally -- see `inference/model.py`.

Findings from running this against real drawings are written up in this
directory's README.md, not here -- this file is the re-runnable harness.
"""

from __future__ import annotations

import argparse
import sys
import time
from dataclasses import dataclass
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


@dataclass
class VariantResult:
    label: str
    infer_shape: tuple[int, int]
    inference_seconds: float
    room_count: int
    unknown_room_count: int
    labeled_room_count: int
    wall_pixel_fraction: float
    wall_component_count: int
    room_labels: list[str]


def _result_from_segmentation_output(
    label: str,
    output: torch.Tensor,
    prepared: PreparedImage,
    image,
    seeds,
    ocr_service: OcrService,
    wall_kernel_size: int,
    inference_seconds: float,
) -> tuple[VariantResult, bytes]:
    """Shared tail: model output -> wall mask -> OCR-seeded flood fill ->
    metrics + overlay. Mirrors `OcrFloodFillSmoothedStrategy.run()` exactly,
    so the only thing varied between callers is how `output`/`prepared` were
    produced (single-scale vs. multiscale-averaged)."""
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

    n_components, _ = cv2.connectedComponents(
        (wall_mask_closed == 0).astype(np.uint8), connectivity=8
    )

    overlay_png = _render_floorplan(image, rooms_result, seeds, wall_mask_closed)

    unknown = sum(
        1 for r in rooms_result if r.get("source") == "closed_region_fallback"
    )
    result = VariantResult(
        label=label,
        infer_shape=prepared.infer_shape,
        inference_seconds=inference_seconds,
        room_count=len(rooms_result),
        unknown_room_count=unknown,
        labeled_room_count=len(rooms_result) - unknown,
        wall_pixel_fraction=float(wall_mask_closed.mean()),
        wall_component_count=n_components - 1,
        room_labels=sorted(
            r["label"]
            for r in rooms_result
            if r.get("source") != "closed_region_fallback"
        ),
    )
    return result, overlay_png


def run_single_scale_variant(
    label: str,
    image,
    fit_long: int | None,
    model,
    seeds,
    ocr_service: OcrService,
    wall_kernel_size: int,
) -> tuple[VariantResult, bytes]:
    """Run one resize variant through the real production room-extraction
    logic and return its summary metrics plus a rendered overlay PNG."""
    started = time.perf_counter()
    prepared = prepare(image, fit_long=fit_long)
    with torch.no_grad():
        output = model(prepared.tensor)
    inference_seconds = time.perf_counter() - started
    return _result_from_segmentation_output(
        label,
        output,
        prepared,
        image,
        seeds,
        ocr_service,
        wall_kernel_size,
        inference_seconds,
    )


def run_multiscale_variant(
    label: str,
    image,
    scales: list[int | None],
    model,
    seeds,
    ocr_service: OcrService,
    wall_kernel_size: int,
) -> tuple[VariantResult, bytes]:
    """Run inference at each of `scales` (`None` = native resolution),
    interpolate every output to the native resolution's shape, and average
    the logits before argmax -- the core idea of the abandoned
    `inference/strategies/multiscale.py`, adapted to the current production
    wall-mask/flood-fill pipeline instead of the heatmap-polygon path it was
    originally built against."""
    started = time.perf_counter()
    prepared_native = prepare(image, fit_long=None)
    ref_shape = prepared_native.infer_shape

    accum: torch.Tensor | None = None
    for scale in scales:
        prepared = prepared_native if scale is None else prepare(image, fit_long=scale)
        with torch.no_grad():
            out = model(prepared.tensor)
        if out.shape[-2:] != ref_shape:
            out = f_torch.interpolate(
                out, size=ref_shape, mode="bilinear", align_corners=False
            )
        accum = out if accum is None else accum + out
    assert accum is not None  # noqa: S101 -- research script, not production
    averaged = accum / len(scales)
    inference_seconds = time.perf_counter() - started

    return _result_from_segmentation_output(
        label,
        averaged,
        prepared_native,
        image,
        seeds,
        ocr_service,
        wall_kernel_size,
        inference_seconds,
    )


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Catalog how the production room-extraction pipeline's output "
            "changes when the model's input resolution is varied."
        )
    )
    parser.add_argument(
        "--image",
        required=True,
        type=Path,
        help="Path to a floorplan image (PNG/JPEG).",
    )
    parser.add_argument(
        "--fit-longs",
        default="768,1024,1536",
        help="Comma-separated long-edge sizes to test, beyond the native baseline",
    )
    parser.add_argument(
        "--multiscale",
        action="store_true",
        help="Also run a multiscale-averaged variant (native + every fit-long)",
    )
    parser.add_argument(
        "--wall-kernel-size", type=int, default=DEFAULT_WALL_KERNEL_SIZE
    )
    parser.add_argument("--out-dir", type=Path, default=Path("research-output"))
    return parser.parse_args()


def _print_result(result: VariantResult, out_path: Path) -> None:
    print(f"  infer_shape={result.infer_shape} time={result.inference_seconds:.2f}s")
    print(
        f"  rooms={result.room_count} (labeled={result.labeled_room_count}, "
        f"unknown/fallback={result.unknown_room_count}) "
        f"wall_px_fraction={result.wall_pixel_fraction:.4f} "
        f"wall_components={result.wall_component_count}"
    )
    print(f"  labels={result.room_labels}")
    print(f"  overlay saved -> {out_path}")


def _print_summary(results: list[VariantResult]) -> None:
    print("\n=== Summary ===")
    header = (
        f"{'variant':<20} {'infer_shape':<16} {'time_s':>7} {'rooms':>6} "
        f"{'labeled':>8} {'unknown':>8} {'wall_px%':>9} {'wall_comp':>10}"
    )
    print(header)
    for r in results:
        shape_str = f"{r.infer_shape[1]}x{r.infer_shape[0]}"
        print(
            f"{r.label:<20} {shape_str:<16} {r.inference_seconds:>7.2f} "
            f"{r.room_count:>6} {r.labeled_room_count:>8} {r.unknown_room_count:>8} "
            f"{r.wall_pixel_fraction * 100:>8.2f}% {r.wall_component_count:>10}"
        )


def main() -> None:
    args = _parse_args()

    image_bytes = args.image.read_bytes()
    image = load_pil(image_bytes)
    print(f"Loaded {args.image} -> {image.size[0]}x{image.size[1]}px")

    model = load_model()
    ocr_service = OcrService()
    ocr_started = time.perf_counter()
    _detected_texts, seeds = ocr_service.read_text_and_seeds(image)
    print(
        f"OCR: {len(_detected_texts)} text detections, {len(seeds)} room-label "
        f"seeds matched, {time.perf_counter() - ocr_started:.1f}s"
    )

    args.out_dir.mkdir(parents=True, exist_ok=True)

    fit_longs = [int(v.strip()) for v in args.fit_longs.split(",") if v.strip()]
    variants: list[tuple[str, int | None]] = [("baseline_native", None)]
    variants += [(f"fit_long_{v}", v) for v in fit_longs]

    results: list[VariantResult] = []
    for label, fit_long in variants:
        print(f"\nRunning variant: {label} (fit_long={fit_long})")
        result, overlay_png = run_single_scale_variant(
            label, image, fit_long, model, seeds, ocr_service, args.wall_kernel_size
        )
        results.append(result)
        out_path = args.out_dir / f"{args.image.stem}_{label}.png"
        out_path.write_bytes(overlay_png)
        _print_result(result, out_path)

    if args.multiscale:
        label = "multiscale_avg"
        scales: list[int | None] = [None, *fit_longs]
        print(f"\nRunning variant: {label} (scales={scales})")
        result, overlay_png = run_multiscale_variant(
            label, image, scales, model, seeds, ocr_service, args.wall_kernel_size
        )
        results.append(result)
        out_path = args.out_dir / f"{args.image.stem}_{label}.png"
        out_path.write_bytes(overlay_png)
        _print_result(result, out_path)

    _print_summary(results)


if __name__ == "__main__":
    main()
