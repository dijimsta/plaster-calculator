"""Prototype: estimate a floorplan image's real-world scale (mm per pixel)
automatically, without the user entering it -- today `scale_m_per_px` is a
user-entered field everywhere in the app (see `FloorplanPage.scaleMmPerPx`
and `analysis/strategies/ocr_flood_fill_smoothed.py`'s result always setting
`"scale_m_per_px": None`).

Two independent methods, both built on infrastructure the repo already has
(`easyocr` via `ocr/service.py`, and the segmentation model's own icon
channels), so neither needs a new model or a new dependency:

1. Dimension-chain OCR: architectural drawings are covered in chained
   dimension strings (e.g. a run of "1 550 | 230 | 6 000 | 90 | ..." along
   the top edge of a floor plan, in mm). This reads every OCR'd text that
   looks like a bare number, clusters the ones that sit in a straight
   horizontal or vertical line together (a "chain"), and for each chain
   compares the *sum of the labelled mm values* to the *pixel span* the
   chain's text covers. mm_sum / px_span is a scale estimate; every
   qualifying chain gives one, so the script reports the median plus the
   spread across chains as a rough confidence signal.

2. Door-width cross-check: internal door leaf widths are close to
   standardised (this repo's own sample drawings label them 720/820/920mm
   etc. directly next to the door swing) and the segmentation model already
   detects a "Door" icon class (`_ICON_LABELS[2]`, see
   `segmentation/result.py`). This extracts door icon bounding boxes, finds
   nearby standalone OCR numbers in a plausible door-width range that were
   *not* absorbed into a dimension chain, pairs the closest ones, and
   computes label_mm / door_pixel_width per matched door.

Both are heuristics with known failure modes -- see this directory's
README.md for what was actually found running this against real drawings,
including where each method agrees, disagrees, or fails outright.

Usage (from `functions/floorplan-analyzer/research/pcpd-42-detection-improvements`,
using the floorplan-analyzer venv):

    ../../venv/bin/python3 estimate_scale_from_drawing.py \\
        --image /path/to/a/floorplan.png \\
        [--known-scale-mm-per-px 12.7]   # optional, for validation reporting only

`--known-scale-mm-per-px` is only for scoring the prototype against a scale
you've independently derived (e.g. from the source PDF's page size and its
own printed plot scale) -- it plays no part in the estimate itself.
"""

from __future__ import annotations

import argparse
import re
import statistics
import sys
from dataclasses import dataclass
from pathlib import Path

_REPO_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_REPO_ROOT))

import numpy as np  # noqa: E402
from inference.model import load_model  # noqa: E402
from inference.preprocess import load_pil  # noqa: E402
from inference.service import InferenceService  # noqa: E402
from ocr.schemas import DetectedText  # noqa: E402
from ocr.service import OcrService  # noqa: E402
from segmentation.postprocess import (  # noqa: E402
    polygons_from_predictions,
    split_outputs,
)

DOOR_ICON_CLASS = 2  # `_ICON_LABELS[2]` in segmentation/result.py
MIN_TOKEN_CONFIDENCE = 0.6
MIN_PLAUSIBLE_MM = 60
MAX_PLAUSIBLE_MM = 30_000
DOOR_WIDTH_MM_RANGE = (500, 1300)
CHAIN_ALIGNMENT_TOLERANCE_PX = 18
MIN_CHAIN_TOKENS = 3
DOOR_MATCH_MAX_DISTANCE_PX = 220

_NUMERIC_RE = re.compile(r"^[\d\s]{2,7}$")


@dataclass
class NumericToken:
    value_mm: int
    confidence: float
    cx: float
    cy: float
    left: float
    right: float
    top: float
    bottom: float
    raw_text: str

    @property
    def is_landscape(self) -> bool:
        return (self.right - self.left) >= (self.bottom - self.top)


def _parse_numeric_tokens(detected: list[DetectedText]) -> list[NumericToken]:
    """Keep only OCR detections that parse as a bare mm value in a plausible
    range -- this is deliberately permissive (it lets through some noise,
    e.g. OCR fragments of unrelated text that happen to be digits) because
    the chain-clustering step downstream is what actually separates real
    dimension strings from noise: real dimensions line up, noise doesn't."""
    tokens: list[NumericToken] = []
    for item in detected:
        text = item["text"].strip()
        if not _NUMERIC_RE.match(text):
            continue
        if item["confidence"] < MIN_TOKEN_CONFIDENCE:
            continue
        digits = text.replace(" ", "")
        if not digits.isdigit():
            continue
        value = int(digits)
        if not (MIN_PLAUSIBLE_MM <= value <= MAX_PLAUSIBLE_MM):
            continue
        xs = [p[0] for p in item["bbox"]]
        ys = [p[1] for p in item["bbox"]]
        tokens.append(
            NumericToken(
                value_mm=value,
                confidence=item["confidence"],
                cx=sum(xs) / len(xs),
                cy=sum(ys) / len(ys),
                left=min(xs),
                right=max(xs),
                top=min(ys),
                bottom=max(ys),
                raw_text=text,
            )
        )
    return tokens


def _cluster_chains(
    tokens: list[NumericToken], *, horizontal: bool
) -> list[list[NumericToken]]:
    """Group tokens that plausibly belong to the same dimension line: for a
    horizontal chain, tokens whose y-centers are within
    `CHAIN_ALIGNMENT_TOLERANCE_PX` of each other, sorted left-to-right (and
    vice versa for a vertical chain). This is a simple greedy pass, not a
    proper clustering algorithm -- good enough for a prototype, see the
    README for where it over- or under-groups on real drawings."""
    candidates = [t for t in tokens if t.is_landscape == horizontal]
    axis_key = (lambda t: t.cy) if horizontal else (lambda t: t.cx)
    order_key = (lambda t: t.cx) if horizontal else (lambda t: t.cy)
    remaining = sorted(candidates, key=axis_key)

    chains: list[list[NumericToken]] = []
    used: set[int] = set()
    for i, seed in enumerate(remaining):
        if i in used:
            continue
        group = [
            t
            for j, t in enumerate(remaining)
            if j not in used
            and abs(axis_key(t) - axis_key(seed)) <= CHAIN_ALIGNMENT_TOLERANCE_PX
        ]
        if len(group) < MIN_CHAIN_TOKENS:
            continue
        group.sort(key=order_key)
        for t in group:
            used.add(remaining.index(t))
        chains.append(group)
    return chains


@dataclass
class ChainEstimate:
    orientation: str
    token_count: int
    mm_sum: int
    px_span: float
    scale_mm_per_px: float
    tokens_preview: str


def _estimate_from_chain(
    chain: list[NumericToken], *, horizontal: bool
) -> ChainEstimate:
    mm_sum = sum(t.value_mm for t in chain)
    if horizontal:
        px_span = max(t.right for t in chain) - min(t.left for t in chain)
    else:
        px_span = max(t.bottom for t in chain) - min(t.top for t in chain)
    return ChainEstimate(
        orientation="horizontal" if horizontal else "vertical",
        token_count=len(chain),
        mm_sum=mm_sum,
        px_span=px_span,
        scale_mm_per_px=mm_sum / px_span if px_span > 0 else float("nan"),
        tokens_preview=" | ".join(t.raw_text.strip() for t in chain),
    )


def dimension_chain_estimates(detected: list[DetectedText]) -> list[ChainEstimate]:
    tokens = _parse_numeric_tokens(detected)
    estimates: list[ChainEstimate] = []
    for horizontal in (True, False):
        for chain in _cluster_chains(tokens, horizontal=horizontal):
            estimate = _estimate_from_chain(chain, horizontal=horizontal)
            if estimate.scale_mm_per_px == estimate.scale_mm_per_px:  # not NaN
                estimates.append(estimate)
    return estimates


def _door_icon_boxes(image) -> list[tuple[float, float, float, float]]:
    """Run the real segmentation model and return each detected door icon's
    bounding box in original-image pixel coordinates (x0, y0, x1, y1).

    Uses the heatmap-based icon polygon extractor
    (`floortrans.post_prosessing.get_polygons`, via
    `segmentation.postprocess.polygons_from_predictions`) -- the same path
    the abandoned `analyse`/`debug_get_polygons` endpoints and the
    `mask_rooms.py`/`segmap_rooms.py` strategies use for icons. An earlier
    version of this function read doors off the simple per-pixel icon-class
    argmax (the way `ocr_flood_fill_smoothed.py`'s `_sink_icons` reads
    sinks) and got near-single-pixel noise blobs, not door-sized boxes --
    door detection in this model is fundamentally a junction/endpoint
    heatmap signal, not a filled icon-class region, so it needs the proper
    polygon extractor rather than an argmax + connected-components pass."""
    model = load_model()
    inference = InferenceService(model)
    output, prepared = inference.prepare_and_run(image)
    predictions = split_outputs(output, prepared.infer_shape)
    polygons, types, _room_polygons, _room_types = polygons_from_predictions(
        predictions, threshold=0.5
    )

    boxes = []
    for polygon, t in zip(polygons, types, strict=False):
        if t["type"] != "icon" or int(t["class"]) != DOOR_ICON_CLASS:
            continue
        mapped = prepared.to_original_xy(np.asarray(polygon, dtype=np.float32))
        xs, ys = mapped[:, 0], mapped[:, 1]
        boxes.append(
            (float(xs.min()), float(ys.min()), float(xs.max()), float(ys.max()))
        )
    return boxes


@dataclass
class DoorMatch:
    door_box: tuple[float, float, float, float]
    door_width_px: float
    label_mm: int
    label_text: str
    distance_px: float
    scale_mm_per_px: float


def door_width_estimates(
    image, detected: list[DetectedText], chain_tokens_used: set[str]
) -> list[DoorMatch]:
    """Match detected door icons to nearby standalone door-width labels that
    were *not* consumed by a dimension chain (chain members are almost
    certainly wall-run lengths, not door widths, even if the value happens
    to fall in door-width range)."""
    all_tokens = _parse_numeric_tokens(detected)
    standalone = [
        t
        for t in all_tokens
        if DOOR_WIDTH_MM_RANGE[0] <= t.value_mm <= DOOR_WIDTH_MM_RANGE[1]
        and id(t) not in chain_tokens_used
    ]
    doors = _door_icon_boxes(image)

    matches: list[DoorMatch] = []
    used_token_ids: set[int] = set()
    for x0, y0, x1, y1 in doors:
        door_cx, door_cy = (x0 + x1) / 2, (y0 + y1) / 2
        door_width_px = min(x1 - x0, y1 - y0)  # leaf width is the short side
        best: tuple[float, NumericToken] | None = None
        for t in standalone:
            if id(t) in used_token_ids:
                continue
            dist = ((t.cx - door_cx) ** 2 + (t.cy - door_cy) ** 2) ** 0.5
            if dist > DOOR_MATCH_MAX_DISTANCE_PX:
                continue
            if best is None or dist < best[0]:
                best = (dist, t)
        if best is None or door_width_px <= 0:
            continue
        dist, token = best
        used_token_ids.add(id(token))
        matches.append(
            DoorMatch(
                door_box=(x0, y0, x1, y1),
                door_width_px=door_width_px,
                label_mm=token.value_mm,
                label_text=token.raw_text,
                distance_px=dist,
                scale_mm_per_px=token.value_mm / door_width_px,
            )
        )
    return matches


def _print_chain_estimates(estimates: list[ChainEstimate]) -> None:
    print(f"\n--- Dimension-chain estimates ({len(estimates)} chains) ---")
    for e in sorted(estimates, key=lambda e: -e.token_count):
        print(
            f"  [{e.orientation:<10}] n={e.token_count} mm_sum={e.mm_sum:>6} "
            f"px_span={e.px_span:>7.1f} -> {e.scale_mm_per_px:.4f} mm/px   "
            f"tokens: {e.tokens_preview}"
        )
    if estimates:
        values = [e.scale_mm_per_px for e in estimates]
        print(
            f"  median={statistics.median(values):.4f} mm/px  "
            f"mean={statistics.mean(values):.4f}  "
            f"stdev={statistics.stdev(values) if len(values) > 1 else 0:.4f}  "
            f"n={len(values)}"
        )


def _print_door_matches(matches: list[DoorMatch]) -> None:
    print(f"\n--- Door-width cross-check ({len(matches)} matched doors) ---")
    for m in matches:
        print(
            f"  label={m.label_text!r:>6} door_px_width={m.door_width_px:>6.1f} "
            f"distance={m.distance_px:>6.1f}px -> {m.scale_mm_per_px:.4f} mm/px"
        )
    if matches:
        values = [m.scale_mm_per_px for m in matches]
        print(
            f"  median={statistics.median(values):.4f} mm/px  "
            f"mean={statistics.mean(values):.4f}  n={len(values)}"
        )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--image", required=True, type=Path)
    parser.add_argument(
        "--known-scale-mm-per-px",
        type=float,
        default=None,
        help="Known scale, for validation reporting only -- not used in the estimate",
    )
    args = parser.parse_args()

    image = load_pil(args.image.read_bytes())
    print(f"Loaded {args.image} -> {image.size[0]}x{image.size[1]}px")

    detected = OcrService().read_text(image)
    print(f"OCR: {len(detected)} total text detections")

    all_numeric = _parse_numeric_tokens(detected)
    print(f"{len(all_numeric)} pass the numeric/confidence/range filter")

    chain_estimates = dimension_chain_estimates(detected)
    _print_chain_estimates(chain_estimates)

    # Tokens consumed by a chain, by identity of the *value+position* (a
    # cheap enough proxy given we don't keep the clustering's internal
    # token objects around) -- reparse chains' token text+position pairs.
    chain_token_keys = {
        (round(t.cx), round(t.cy))
        for e in chain_estimates
        for t in all_numeric
        if e.tokens_preview.split(" | ").count(t.raw_text.strip()) > 0
    }
    # Rebuild an id()-keyed set matching door_width_estimates' expectations
    # by re-deriving which NumericToken objects were part of any chain.
    chained_ids = {
        id(t) for t in all_numeric if (round(t.cx), round(t.cy)) in chain_token_keys
    }

    door_matches = door_width_estimates(image, detected, chained_ids)
    _print_door_matches(door_matches)

    print("\n=== Summary ===")
    chain_values = [e.scale_mm_per_px for e in chain_estimates]
    door_values = [m.scale_mm_per_px for m in door_matches]
    if chain_values:
        print(f"Dimension-chain median: {statistics.median(chain_values):.4f} mm/px")
    if door_values:
        print(f"Door-width median:      {statistics.median(door_values):.4f} mm/px")
    if args.known_scale_mm_per_px:
        known = args.known_scale_mm_per_px
        print(f"Known/ground-truth:     {known:.4f} mm/px")
        if chain_values:
            err = (statistics.median(chain_values) - known) / known * 100
            print(f"  dimension-chain error: {err:+.2f}%")
        if door_values:
            err = (statistics.median(door_values) - known) / known * 100
            print(f"  door-width error:      {err:+.2f}%")


if __name__ == "__main__":
    main()
