"""Prototype: can OCR (the same `easyocr` infrastructure already used in
production, via `ocr/service.py`) pull plaster-quoting-relevant attributes
out of a rasterized architectural drawing page, beyond the current
room-type-only defaulting in
`functions/plaster-calculator-functions/src/analyzer.ts`'s
`defaultWallBoardTypeForRoom`/`defaultCeilingPlasterTypeForRoom`?

This targets three signal types found by manually inspecting real take-off
drawings for PCPD-42 (see this directory's README.md for what was actually
found -- this file intentionally contains no drawing content or file paths,
only the re-runnable pattern-matching logic):

1. Ceiling height call-outs -- both inline on a floor plan (e.g. a red
   "2740mm High Ceiling" note dropped directly in a raked/feature-ceiling
   room) and in section-view level annotations (e.g. "FCL. 2.7 Ground" next
   to a dimensioned reduced level). `AreaPolygon.ceilingHeightMm` and
   `FloorplanPage.ceilingHeightMm` already exist in the schema
   (`libraries/plaster-calculator-common/src/geometry/schemas/area-polygon.schema.ts`,
   `.../projects/schemas/floorplan-page.schema.ts`) and there is already a
   readiness check + fix-control UI nudging the user to fill this in by
   hand (`ceiling-height-set.resolver.ts`,
   `ceiling-height-fix-control.component.tsx`) -- so a value found here has
   a real field to land in today, no schema change needed.

2. Cornice / ceiling-finish notes -- e.g. "SELECTED CORNICE TO
   SPECIFICATION" in a wall/ceiling construction detail, or a
   "square set" / "shadowline" callout, which (per AU industry convention)
   means *no* cornice for that room -- the current
   `corniceLengthQuantity()` in
   `libraries/plaster-calculator-common/src/takeoff/quantity-takeoff-calculator.utils.ts`
   sums every room's full perimeter with no way to exclude a square-set
   room, so detecting this distinction is the concrete gap, not detecting
   cornice length itself (that part is already computed).

3. Wet-area standard references -- "AS 3740" (the Australian Standard for
   waterproofing of domestic wet areas) is commonly printed directly next
   to a wet-area note. Finding it near a room label is a corroborating
   signal alongside the existing OCR-room-type-keyword wet-area heuristic
   (`ocr/keywords.py`'s `OCR_ROOM_TYPE_BY_KEYWORD`), which today only maps
   "Bath" to a water-resistant board default
   (`defaultWallBoardTypeForRoom`) -- "Toilet" and "Laundry" resolve to
   their own OCR room types but are *not* special-cased there, so those
   rooms get standard (non-water-resistant) board by default even though
   they are wet areas in practice.

This is pattern-matching over OCR text, not a trained model -- it is meant
to demonstrate *whether the signal is extractable at all* from a 200 DPI
rasterized page (the same resolution the production pipeline already
rasterizes at), not to be a production-ready parser.

Usage (from `functions/floorplan-analyzer/research/pcpd-42-detection-improvements`,
using the floorplan-analyzer venv):

    ../../venv/bin/python3 scan_drawing_notes_for_quoting_attributes.py \\
        --image /path/to/a/drawing-page.png
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path

_REPO_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_REPO_ROOT))

from inference.preprocess import load_pil  # noqa: E402
from ocr.schemas import DetectedText  # noqa: E402
from ocr.service import OcrService  # noqa: E402

# Matches e.g. "2740mm High Ceiling", "2.7M CEILING", "CEILING HT 2700"
_CEILING_HEIGHT_RE = re.compile(
    r"(\d{3,4}\s*mm|\d\.\d{1,2}\s*m)\s*(high\s*ceiling|ceiling)"
    r"|ceiling\s*(ht|height)?\.?\s*[:\-]?\s*(\d{3,4}|\d\.\d{1,2})",
    re.IGNORECASE,
)
# Matches e.g. "FCL. 2.7 Ground", "FCL 2700"
_FCL_RE = re.compile(r"\bFCL\.?\s*(\d{3,4}|\d\.\d{1,3})\b", re.IGNORECASE)
_CORNICE_KEYWORDS = ("cornice",)
_NO_CORNICE_FINISH_KEYWORDS = ("square set", "squareset", "shadowline")
_WET_AREA_STANDARD_RE = re.compile(r"\bAS\s?3740\b", re.IGNORECASE)
_RAKED_CEILING_KEYWORDS = ("raked ceiling",)


@dataclass
class Match:
    category: str
    matched_text: str
    detail: str
    confidence: float
    cx: float
    cy: float


def _center(item: DetectedText) -> tuple[float, float]:
    xs = [p[0] for p in item["bbox"]]
    ys = [p[1] for p in item["bbox"]]
    return sum(xs) / len(xs), sum(ys) / len(ys)


def _scan_single(item: DetectedText) -> list[Match]:
    """Pattern-match against one OCR detection's own text. Cheap, but misses
    notes that OCR split across multiple nearby detections (e.g. "CEILING"
    and "2740mm" read as two separate boxes) -- `_scan_windows` below covers
    that case by joining nearby detections before matching."""
    text = item["text"]
    cx, cy = _center(item)
    matches: list[Match] = []

    if m := _CEILING_HEIGHT_RE.search(text):
        matches.append(
            Match("ceiling_height", m.group(0), text, item["confidence"], cx, cy)
        )
    if m := _FCL_RE.search(text):
        matches.append(
            Match("ceiling_height_fcl", m.group(0), text, item["confidence"], cx, cy)
        )
    lowered = text.lower()
    if any(k in lowered for k in _NO_CORNICE_FINISH_KEYWORDS):
        matches.append(
            Match("square_set_finish", text, text, item["confidence"], cx, cy)
        )
    elif any(k in lowered for k in _CORNICE_KEYWORDS):
        matches.append(Match("cornice_note", text, text, item["confidence"], cx, cy))
    if any(k in lowered for k in _RAKED_CEILING_KEYWORDS):
        matches.append(
            Match("raked_ceiling_note", text, text, item["confidence"], cx, cy)
        )
    if m := _WET_AREA_STANDARD_RE.search(text):
        matches.append(
            Match("wet_area_standard", m.group(0), text, item["confidence"], cx, cy)
        )
    return matches


def _scan_windows(detected: list[DetectedText], window_px: float = 90.0) -> list[Match]:
    """Join each detection with other detections whose centers fall within
    `window_px`, in reading order (top-to-bottom, left-to-right), and
    pattern-match the joined text -- catches notes OCR split across
    multiple boxes (a number and its unit, or a two-word phrase) that
    `_scan_single` would miss."""
    centers = [(_center(item), item) for item in detected]
    matches: list[Match] = []
    for (cx, cy), _item in centers:
        nearby = sorted(
            (
                other
                for (ox, oy), other in centers
                if abs(ox - cx) <= window_px and abs(oy - cy) <= window_px * 0.6
            ),
            key=lambda o: _center(o)[0],
        )
        if len(nearby) < 2:
            continue
        joined = " ".join(o["text"] for o in nearby)
        avg_conf = sum(o["confidence"] for o in nearby) / len(nearby)
        if m := _CEILING_HEIGHT_RE.search(joined):
            matches.append(
                Match("ceiling_height_joined", m.group(0), joined, avg_conf, cx, cy)
            )
        if m := _FCL_RE.search(joined):
            matches.append(
                Match("ceiling_height_fcl_joined", m.group(0), joined, avg_conf, cx, cy)
            )
    return matches


def _dedupe(matches: list[Match]) -> list[Match]:
    seen: set[tuple[str, int, int]] = set()
    result = []
    for m in matches:
        key = (m.category, round(m.cx / 40), round(m.cy / 40))
        if key in seen:
            continue
        seen.add(key)
        result.append(m)
    return result


def scan(image) -> list[Match]:
    detected = OcrService().read_text(image)
    matches = []
    for item in detected:
        matches.extend(_scan_single(item))
    matches.extend(_scan_windows(detected))
    return _dedupe(matches)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--image", required=True, type=Path)
    args = parser.parse_args()

    image = load_pil(args.image.read_bytes())
    print(f"Loaded {args.image} -> {image.size[0]}x{image.size[1]}px")

    matches = scan(image)
    if not matches:
        print("No quoting-attribute patterns matched.")
        return

    by_category: dict[str, list[Match]] = {}
    for m in matches:
        by_category.setdefault(m.category, []).append(m)

    for category, items in sorted(by_category.items()):
        print(f"\n--- {category} ({len(items)}) ---")
        for m in items:
            print(
                f"  matched={m.matched_text!r:<30} conf={m.confidence:.2f} "
                f"at=({m.cx:.0f},{m.cy:.0f})  source_text={m.detail!r}"
            )

    print(
        f"\n=== {len(matches)} total matches across {len(by_category)} categories ==="
    )


if __name__ == "__main__":
    main()
