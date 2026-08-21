"""Runs `detect_room_labels_by_font_signature.py`'s actual detector (imported,
not reimplemented) against all five real houses used throughout this PCPD-42
research, on each house's real floor-plan page, and emits one consolidated,
structured table of every detected room label -- both the keyword-matched
training set and the font-signature technique's new finds -- with the
per-label attributes a downstream room-detection/flood-fill step would need:
pixel seed position, rotation, and font metadata (which earlier research
found is itself informative -- e.g. colour separated regulatory red-text
notes from room names for free; bold/size differences can separate a
main room-name callout from a smaller secondary label in the same room).

This is a separate report from the main PCPD-42 discovery report: it isn't
trying to argue a verdict, just to lay out exactly what the font-signature
method finds, with what confidence-relevant metadata, across more than the
one or two houses spot-checked in the main report's "Room label detection"
section -- useful groundwork for whoever picks up the "wire this into
flood-fill seeding" next step.

Each house's PDF page and file were found the same way, not guessed from
folder names: scan every page of every PDF in the house's real take-off
folder, count spans matching `OCR_KEYWORDS`, and take the page with the most
distinct keyword hits as "the floor plan page". That's how e.g. 729
Plimsoll's actual room-name page was found to be page 10 of a third,
differently-named "Architectural Drawings.pdf" in its folder -- the two
files a filename search alone would have found (named after the street
address) both turn out to be scanned/rasterized with *no* PDF text layer at
all, so the font-signature method (which fundamentally needs one) cannot run
against them.

Usage (from `functions/floorplan-analyzer/research/pcpd-42-detection-improvements`,
using the floorplan-analyzer venv):

    ../../venv/bin/python3 survey_labels_across_real_plans.py \\
        --out-dir /path/to/out --top-n-signatures 3
"""

from __future__ import annotations

import argparse
import csv
import io
import sys
from dataclasses import dataclass
from pathlib import Path

_REPO_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_REPO_ROOT))

import fitz  # noqa: E402  (pymupdf)
from detect_room_labels_by_font_signature import (  # noqa: E402
    FontSignatureResult,
    TextSpan,
    detect_top_signatures,
    extract_text_spans,
    font_signature,
)
from PIL import Image, ImageDraw  # noqa: E402

TAKE_OFFS = Path("/Users/jimmy/Documents/Take-offs")
SURVEY_DPI = 200  # matches production's PRODUCTION_DPI


@dataclass(frozen=True)
class PlanSource:
    house: str
    pdf: Path
    page: int


# Found via find_best_pages-style keyword-density scan (see module docstring),
# not guessed from filenames -- several houses have more than one PDF in
# their folder and the street-address-named file is not always the one with
# an actual text layer.
PLAN_SOURCES = [
    PlanSource(
        "76 Scott Avenue, Dandenong",
        TAKE_OFFS / "76 Scott Avenue, Dandenong" / "No 76 Scott St Dandenong.pdf",
        1,
    ),
    PlanSource(
        "729 Plimsoll St, Mickleham",
        TAKE_OFFS / "729 Plimsoll St, Mickleham" / "Architectural Drawings.pdf",
        10,
    ),
    PlanSource(
        "25 Taihu Road",
        TAKE_OFFS / "25 Taihu Road" / "Architectural Drawings _stamped.pdf",
        4,
    ),
    PlanSource(
        "37 Clarendon street, Avondale heights",
        TAKE_OFFS
        / "37 Clarendon street, Avondale heights"
        / (
            "CASTORATE - A0587 - STAMPED - No. 37 CLARENDON STREET AVONDALE "
            "HEIGHTS WD05-13.04.pdf"
        ),
        2,
    ),
    PlanSource(
        "8 Darter Street, Mickleham",
        TAKE_OFFS / "8 Darter Street, Mickleham" / "Architectural Drawings.pdf",
        3,
    ),
]

_FLAG_BOLD = 1 << 4
_FLAG_ITALIC = 1 << 1
_FLAG_SERIF = 1 << 2
_FLAG_MONOSPACE = 1 << 3

CSV_FIELDS = [
    "house",
    "pdf_page",
    "text",
    "source",
    "cluster_rank",
    "matched_keyword",
    "font",
    "size_pt",
    "raw_size_pt",
    "bold",
    "italic",
    "color_hex",
    "rotated",
    "direction_x",
    "direction_y",
    "px_x",
    "px_y",
    "bbox_width_pt",
    "bbox_height_pt",
]


def _color_hex(color_int: int) -> str:
    return f"#{color_int:06X}"


def _match_keyword(text: str) -> str | None:
    from ocr.keywords import OCR_KEYWORDS

    lower = text.lower()
    return next((k for k in OCR_KEYWORDS if k in lower), None)


def _span_row(
    span: TextSpan,
    *,
    house: str,
    page: int,
    source: str,
    cluster_rank: int,
    dpi: int,
) -> dict:
    px_x, px_y = span.px_center(dpi)
    x0, y0, x1, y1 = span.bbox
    return {
        "house": house,
        "pdf_page": page,
        "text": span.text.strip(),
        "source": source,
        "cluster_rank": cluster_rank,
        "matched_keyword": _match_keyword(span.text) or "",
        "font": span.font,
        "size_pt": round(span.size, 1),
        "raw_size_pt": round(span.size, 3),
        "bold": bool(span.flags & _FLAG_BOLD),
        "italic": bool(span.flags & _FLAG_ITALIC),
        "color_hex": _color_hex(span.color),
        "rotated": span.is_rotated,
        "direction_x": round(span.direction[0], 3),
        "direction_y": round(span.direction[1], 3),
        "px_x": round(px_x, 1),
        "px_y": round(px_y, 1),
        "bbox_width_pt": round(x1 - x0, 1),
        "bbox_height_pt": round(y1 - y0, 1),
    }


_CLUSTER_COLOURS = [(60, 210, 90), (255, 140, 0), (170, 90, 230)]


def render_labeled_overlay(
    page: fitz.Page, results: list[FontSignatureResult], dpi: int
) -> Image.Image:
    """Same visual language as the single-file detector's overlay (blue =
    keyword training, coloured rings = new signature finds, yellow outline =
    rotated) so screenshots from this survey read consistently with the main
    report's."""
    mat = fitz.Matrix(dpi / 72, dpi / 72)
    pix = page.get_pixmap(matrix=mat)
    image = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
    draw = ImageDraw.Draw(image)

    if results:
        for span in results[0].keyword_spans:
            cx, cy = span.px_center(dpi)
            draw.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=(60, 140, 255))
    for i, result in enumerate(results):
        colour = _CLUSTER_COLOURS[i % len(_CLUSTER_COLOURS)]
        for span in result.new_spans:
            cx, cy = span.px_center(dpi)
            outline = (255, 210, 40) if span.is_rotated else colour
            draw.ellipse(
                [cx - 9 - i, cy - 9 - i, cx + 9 + i, cy + 9 + i],
                outline=outline,
                width=3,
            )
    return image


def survey_plan(
    source: PlanSource, *, top_n: int, dpi: int
) -> tuple[list[dict], Image.Image | None]:
    doc = fitz.open(source.pdf)
    page = doc[source.page]
    spans = extract_text_spans(page)
    results = detect_top_signatures(spans, top_n=top_n)

    rows: list[dict] = []
    for rank, result in enumerate(results):
        # `result.keyword_spans` is the *whole page's* training set, identical
        # across every result -- filter to just the spans that actually share
        # this specific cluster's own signature, otherwise every training span
        # on the page (regardless of font/size) ends up misattributed to
        # cluster 0.
        training_for_this_cluster = [
            s for s in result.keyword_spans if font_signature(s) == result.signature
        ]
        for span in training_for_this_cluster:
            rows.append(
                _span_row(
                    span,
                    house=source.house,
                    page=source.page,
                    source="keyword_training",
                    cluster_rank=rank,
                    dpi=dpi,
                )
            )
        for span in result.new_spans:
            rows.append(
                _span_row(
                    span,
                    house=source.house,
                    page=source.page,
                    source="signature_new",
                    cluster_rank=rank,
                    dpi=dpi,
                )
            )

    overlay = render_labeled_overlay(page, results, dpi) if results else None
    return rows, overlay


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out-dir", required=True, type=Path)
    parser.add_argument("--top-n-signatures", type=int, default=3)
    parser.add_argument("--dpi", type=int, default=SURVEY_DPI)
    return parser.parse_args()


def main() -> None:
    args = _parse_args()
    args.out_dir.mkdir(parents=True, exist_ok=True)

    all_rows: list[dict] = []
    for source in PLAN_SOURCES:
        print(f"=== {source.house} ({source.pdf.name} page {source.page}) ===")
        if not source.pdf.exists():
            print(f"  MISSING: {source.pdf}")
            continue
        rows, overlay = survey_plan(source, top_n=args.top_n_signatures, dpi=args.dpi)
        if not rows:
            print("  no keyword-matched training spans found on this page")
            continue
        n_training = sum(1 for r in rows if r["source"] == "keyword_training")
        n_new = sum(1 for r in rows if r["source"] == "signature_new")
        n_rotated = sum(1 for r in rows if r["rotated"])
        print(
            f"  {len(rows)} labels total ({n_training} keyword-matched, "
            f"{n_new} font-signature-only), {n_rotated} rotated"
        )
        all_rows.extend(rows)
        if overlay is not None:
            safe_name = source.house.split(",")[0].replace(" ", "_")
            overlay_path = args.out_dir / f"{safe_name}_overlay_unredacted.png"
            overlay.save(overlay_path, optimize=True)
            print(f"  overlay -> {overlay_path}")

    csv_path = args.out_dir / "label_survey.csv"
    with csv_path.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_FIELDS)
        writer.writeheader()
        writer.writerows(all_rows)
    n_houses = len(PLAN_SOURCES)
    print(f"\n{len(all_rows)} total labels across {n_houses} houses -> {csv_path}")


if __name__ == "__main__":
    main()
