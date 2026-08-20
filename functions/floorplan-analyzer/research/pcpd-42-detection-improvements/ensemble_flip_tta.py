"""Ensembling via flip-based test-time augmentation (TTA): run the
segmentation model on the native image plus one or more flipped copies,
un-flip each output back to the original orientation, and average the
logits before argmax -- a different kind of ensembling than the
already-tested multiscale-logit-averaging (`catalog_segmentation_failures.py
--multiscale`, same resolution/orientation, several scales) or tiling
(`tile_based_inference.py`, same resolution/orientation, several crops).
This one keeps resolution and framing fixed and varies orientation instead,
on the theory that a floor plan has no strong "up is up" prior the way a
photo does, so the model's wall-mask confidence at any given real wall
should be orientation-independent -- averaging should reinforce genuine
walls and dilute orientation-dependent noise.

Usage (from `functions/floorplan-analyzer/research/pcpd-42-detection-improvements`,
using the floorplan-analyzer venv):

    ../../venv/bin/python3 ensemble_flip_tta.py --image <path> \\
        --flips h,v,hv --out-dir /path/to/scratch/out

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

import torch  # noqa: E402
from inference.model import load_model  # noqa: E402
from inference.preprocess import load_pil, prepare  # noqa: E402
from ocr.service import OcrService  # noqa: E402
from tile_based_inference import rooms_from_output  # noqa: E402

_FLIP_DIMS = {
    "h": (3,),  # flip width
    "v": (2,),  # flip height
    "hv": (2, 3),  # both -- equivalent to a 180 degree rotation
}


def run_flip_variant(image, model, flip: str | None) -> torch.Tensor:
    """Run inference on `image`, optionally pre-flipping it along `flip`'s
    dims and un-flipping the resulting logits back to the original
    orientation before returning, so every variant's output lines up
    pixel-for-pixel with the native (unflipped) one and can be averaged
    directly."""
    prepared = prepare(image)
    tensor = prepared.tensor
    dims = _FLIP_DIMS.get(flip, ())
    if dims:
        tensor = torch.flip(tensor, dims=dims)
    with torch.no_grad():
        output = model(tensor)
    if dims:
        output = torch.flip(output, dims=dims)
    return output


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--image", required=True, type=Path)
    parser.add_argument(
        "--flips",
        default="h,v,hv",
        help="Comma-separated flip variants to ensemble with the native pass: h, v, hv",
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
    print(f"OCR: {len(seeds)} room-label seeds (reused across every variant)")

    prepared = prepare(image)
    flips = [None, *[f.strip() for f in args.flips.split(",") if f.strip()]]

    started = time.perf_counter()
    accum = None
    for flip in flips:
        out = run_flip_variant(image, model, flip)
        accum = out if accum is None else accum + out
    averaged = accum / len(flips)
    elapsed = time.perf_counter() - started
    print(f"  {len(flips)}-way flip ensemble ({flips}): {elapsed:.2f}s total")

    _rooms, overlay_png = rooms_from_output(
        "flip_ensemble", averaged, prepared, image, seeds, ocr_service, 15
    )
    flip_tag = "_".join(f or "id" for f in flips)
    out_path = args.out_dir / f"{args.image.stem}_flip_ensemble_{flip_tag}.png"
    out_path.write_bytes(overlay_png)
    print(f"  overlay -> {out_path}")

    print("Native baseline for comparison:")
    with torch.no_grad():
        native_out = model(prepared.tensor)
    _rooms, native_png = rooms_from_output(
        "native", native_out, prepared, image, seeds, ocr_service, 15
    )
    native_out_path = args.out_dir / f"{args.image.stem}_native_for_tta_compare.png"
    native_out_path.write_bytes(native_png)


if __name__ == "__main__":
    main()
