"""Point-prompt a Segment Anything model (SAM or SAM2) at a real production
OCR seed coordinate and render every candidate mask it returns.

First pass (see README, "Alternative segmentation model: Segment Anything
(SAM)") ran `facebook/sam-vit-base` this way as a standalone, uncommitted
scratch experiment. This pass commits a reusable version and adds SAM2
(`facebook/sam2.1-hiera-tiny`, via `transformers`' `Sam2Model`/
`Sam2Processor`, released after the original SAM/`sam-vit-base` checkpoint)
so the two model families can be compared on the same real seed points --
most importantly the Garage seeds documented as a universal, 5-for-5
production dropout in this directory's README's "Garage-specific failure"
section.

Usage (from `functions/floorplan-analyzer/research/pcpd-42-detection-improvements`,
using the floorplan-analyzer venv, which needs `transformers` installed --
weights auto-download from HuggingFace on first use):

    ../../venv/bin/python3 try_sam_point_prompt.py --image <path> \\
        --x 1543 --y 912 --model sam --out-dir /path/to/scratch/out

    ../../venv/bin/python3 try_sam_point_prompt.py --image <path> \\
        --x 1543 --y 912 --model sam2 --out-dir /path/to/scratch/out
"""

from __future__ import annotations

import argparse
import time
from dataclasses import dataclass
from pathlib import Path

import numpy as np
import torch
from PIL import Image

_SAM_CHECKPOINT = "facebook/sam-vit-base"
_SAM2_CHECKPOINT = "facebook/sam2.1-hiera-tiny"

_MASK_COLOURS = [(255, 60, 60), (60, 200, 90), (60, 140, 255)]


@dataclass
class MaskCandidate:
    index: int
    score: float
    area_px: int
    bbox: tuple[int, int, int, int] | None


def _load_sam(model_name: str):
    if model_name == "sam":
        from transformers import SamModel, SamProcessor

        model = SamModel.from_pretrained(_SAM_CHECKPOINT)
        processor = SamProcessor.from_pretrained(_SAM_CHECKPOINT)
        return model, processor
    if model_name == "sam2":
        from transformers import Sam2Model, Sam2Processor

        model = Sam2Model.from_pretrained(_SAM2_CHECKPOINT)
        processor = Sam2Processor.from_pretrained(_SAM2_CHECKPOINT)
        return model, processor
    raise ValueError(f"Unknown model {model_name!r}")


def point_prompt(
    model_name: str, image: Image.Image, x: int, y: int
) -> tuple[np.ndarray, list[MaskCandidate], float, float]:
    """Run one point prompt and return (masks[3,H,W] bool, candidate
    metadata, load_seconds, inference_seconds)."""
    t0 = time.perf_counter()
    model, processor = _load_sam(model_name)
    load_seconds = time.perf_counter() - t0

    # SAM1's processor nests points as [image, point, coords]; SAM2's adds an
    # extra "object" level: [image, object, point, coords]. Same single
    # foreground point either way, just wrapped one level deeper for SAM2.
    points = [[[x, y]]] if model_name == "sam" else [[[[x, y]]]]
    inputs = processor(image, input_points=points, return_tensors="pt")
    t1 = time.perf_counter()
    with torch.no_grad():
        outputs = model(**inputs)
    inference_seconds = time.perf_counter() - t1

    # SAM1's mask post-processing needs the padded/reshaped input size (it
    # resizes from that, not straight from the 256x256 low-res mask logits);
    # SAM2's processor-level `post_process_masks` only needs the original
    # size. Different processor object entirely (`image_processor` vs. the
    # processor itself), not just a different call signature.
    if model_name == "sam":
        masks = processor.image_processor.post_process_masks(
            outputs.pred_masks.cpu(),
            inputs["original_sizes"].cpu(),
            inputs["reshaped_input_sizes"].cpu(),
        )
    else:
        masks = processor.post_process_masks(
            outputs.pred_masks.cpu(), inputs["original_sizes"].cpu()
        )
    mask_arr = masks[0][0].numpy()
    scores = outputs.iou_scores[0, 0]

    candidates = []
    for i in range(mask_arr.shape[0]):
        area_px = int(mask_arr[i].sum())
        bbox = None
        if area_px:
            ys, xs = np.where(mask_arr[i])
            bbox = (int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max()))
        candidates.append(MaskCandidate(i, float(scores[i]), area_px, bbox))

    return mask_arr, candidates, load_seconds, inference_seconds


def render_all_candidates(
    image: Image.Image, mask_arr: np.ndarray, x: int, y: int
) -> bytes:
    """Render every candidate mask as a distinctly-coloured translucent
    overlay, plus the seed point, in one image -- so all candidates can be
    visually compared at once rather than picking one blind."""
    import io

    from PIL import ImageDraw

    overlay = np.array(image.convert("RGB")).copy()
    for i in range(mask_arr.shape[0]):
        colour = np.array(_MASK_COLOURS[i % len(_MASK_COLOURS)])
        region = mask_arr[i]
        overlay[region] = (overlay[region] * 0.55 + colour * 0.45).astype(np.uint8)

    out = Image.fromarray(overlay)
    draw = ImageDraw.Draw(out)
    draw.ellipse([x - 10, y - 10, x + 10, y + 10], outline=(255, 255, 0), width=4)
    buf = io.BytesIO()
    out.save(buf, format="PNG")
    return buf.getvalue()


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--image", required=True, type=Path)
    parser.add_argument("--x", required=True, type=int)
    parser.add_argument("--y", required=True, type=int)
    parser.add_argument("--model", choices=["sam", "sam2"], default="sam2")
    parser.add_argument("--out-dir", type=Path, default=Path("research-output"))
    return parser.parse_args()


def main() -> None:
    args = _parse_args()
    args.out_dir.mkdir(parents=True, exist_ok=True)

    image = Image.open(args.image).convert("RGB")
    print(
        f"Loaded {args.image} -> {image.size[0]}x{image.size[1]}px, "
        f"prompting {args.model} @ ({args.x},{args.y})"
    )

    mask_arr, candidates, load_s, infer_s = point_prompt(
        args.model, image, args.x, args.y
    )
    print(f"  model load: {load_s:.1f}s, inference: {infer_s:.2f}s")
    total_px = image.size[0] * image.size[1]
    for c in candidates:
        print(
            f"  mask {c.index}: score={c.score:.3f} area_px={c.area_px} "
            f"fraction={c.area_px / total_px:.4f} bbox={c.bbox}"
        )

    out_path = args.out_dir / f"{args.image.stem}_{args.model}_x{args.x}_y{args.y}.png"
    out_path.write_bytes(render_all_candidates(image, mask_arr, args.x, args.y))
    print(f"  all-candidates overlay -> {out_path}")


if __name__ == "__main__":
    main()
