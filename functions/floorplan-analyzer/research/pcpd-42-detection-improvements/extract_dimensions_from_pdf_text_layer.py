"""Prototype: for a vector/CAD-exported PDF (one with an embedded text
layer, as opposed to a scanned/flattened image), extract dimension strings
directly from the PDF's own text objects via `pymupdf`, with exact
positions -- no OCR, no misread risk -- and compare the result against
`easyocr` and `paddleocr` both, run on the same page rasterized at
production's 200 DPI. A genuine three-way comparison on the same content,
not a standalone claim: the expected result (a lossless text layer beats
either OCR engine whenever one is available) is close to definitional, but
this quantifies it on real drawings instead of asserting it, and the more
useful finding is *how much of the real corpus actually has a usable text
layer* -- see `check_text_layer_coverage` output referenced in this
directory's README for the measured fraction across all 5 real take-off
jobs used in this research.

This was flagged as a promising, untested idea in the first research pass
("high-confidence" was too strong a claim without ever running it) -- this
script actually runs it and reports what happened, not just the idea.

The current production pipeline never has the opportunity to do this: the
web app rasterizes every PDF page client-side via `pdfjs-dist`
(`apps/plaster-calculator-web/src/lib/pdf.ts`) and only ever sends the
rasterized PNG to the server, so any embedded PDF text layer is discarded
before the floorplan-analyzer function ever sees the file. This script
operates directly on the source PDF to establish whether the underlying
data is worth wiring up client-side (e.g. via `pdfjs-dist`'s own text
content API, which mirrors what `pymupdf` does here) before recommending
that as follow-up work.

Usage (from `functions/floorplan-analyzer/research/pcpd-42-detection-improvements`,
using the floorplan-analyzer venv, which needs `pymupdf`, `easyocr`, and
`paddleocr` installed):

    ../../venv/bin/python3 extract_dimensions_from_pdf_text_layer.py \\
        --pdf /path/to/a/drawing.pdf --page 0 [--compare-ocr]
"""

from __future__ import annotations

import argparse
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path

_REPO_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_REPO_ROOT))

import fitz  # noqa: E402  (pymupdf)

_NUMERIC_RE = re.compile(r"^[\d\s]{2,7}$")
PRODUCTION_DPI = 200


@dataclass
class TextLayerToken:
    text: str
    px_x0: float
    px_y0: float
    px_x1: float
    px_y1: float


def has_text_layer(page: fitz.Page, *, min_chars: int = 20) -> bool:
    """Cheap check: does this page have a real embedded text layer, or is
    it a scanned/flattened image with no extractable text at all?"""
    return len(page.get_text().strip()) >= min_chars


def extract_dimension_tokens(
    page: fitz.Page, *, dpi: int = PRODUCTION_DPI
) -> list[TextLayerToken]:
    """Pull every word-level text span from the PDF's own text layer and
    keep the ones that look like a bare dimension value, converting PDF
    point coordinates to the same pixel space production rasterizes at
    (`page.get_pixmap(matrix=fitz.Matrix(dpi/72, dpi/72))`), so positions
    are directly comparable to OCR run on that rasterized PNG."""
    scale = dpi / 72
    words = page.get_text("words")  # (x0, y0, x1, y1, "word", block, line, word_no)
    tokens = []
    for x0, y0, x1, y1, word, *_ in words:
        if not _NUMERIC_RE.match(word.strip()):
            continue
        tokens.append(
            TextLayerToken(
                text=word,
                px_x0=x0 * scale,
                px_y0=y0 * scale,
                px_x1=x1 * scale,
                px_y1=y1 * scale,
            )
        )
    return tokens


def merge_adjacent_tokens(
    tokens: list[TextLayerToken], gap_px: float = 25.0
) -> list[str]:
    """PDF `words` splits on whitespace, so a space-separated thousands
    value like "1 550" comes back as two adjacent word tokens ("1", "550").
    Merge horizontally-adjacent numeric words on the same line back into
    one dimension string, the way a human reads them."""
    tokens_sorted = sorted(tokens, key=lambda t: (round(t.px_y0 / 10), t.px_x0))
    merged: list[str] = []
    current: list[TextLayerToken] = []
    for token in tokens_sorted:
        if current and (
            abs(token.px_y0 - current[-1].px_y0) > 8
            or token.px_x0 - current[-1].px_x1 > gap_px
        ):
            merged.append(" ".join(t.text for t in current))
            current = []
        current.append(token)
    if current:
        merged.append(" ".join(t.text for t in current))
    return merged


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf", required=True, type=Path)
    parser.add_argument("--page", type=int, default=0)
    parser.add_argument("--compare-ocr", action="store_true")
    args = parser.parse_args()

    doc = fitz.open(args.pdf)
    page = doc[args.page]
    print(f"Page {args.page}: {page.rect.width:.0f}x{page.rect.height:.0f}pt")

    if not has_text_layer(page):
        print(
            "NO embedded text layer detected on this page (get_text() returned "
            "almost nothing) -- this page is a scanned/flattened image, not a "
            "vector export. Text-layer extraction is not applicable here; OCR "
            "is the only option for this specific page."
        )
        return

    started = time.perf_counter()
    tokens = extract_dimension_tokens(page)
    elapsed = time.perf_counter() - started
    merged = merge_adjacent_tokens(tokens)
    print(
        f"Text layer: {len(tokens)} numeric word-tokens -> {len(merged)} merged "
        f"dimension strings, extracted in {elapsed * 1000:.1f}ms (no model, no OCR)"
    )
    print("\nSample of merged dimension strings found:")
    for value in merged[:40]:
        print(f"  {value!r}")
    if len(merged) > 40:
        print(f"  ... and {len(merged) - 40} more")

    if not args.compare_ocr:
        return

    print(
        "\n--- Comparing against OCR on the same page rasterized at "
        f"{PRODUCTION_DPI} DPI (production's exact setting) ---"
    )
    from ocr.service import OcrService

    mat = fitz.Matrix(PRODUCTION_DPI / 72, PRODUCTION_DPI / 72)
    pix = page.get_pixmap(matrix=mat)
    from io import BytesIO

    from PIL import Image

    image = Image.open(BytesIO(pix.tobytes("png"))).convert("RGB")

    ocr_started = time.perf_counter()
    detected = OcrService().read_text(image)
    ocr_elapsed = time.perf_counter() - ocr_started
    ocr_numeric = [d for d in detected if _NUMERIC_RE.match(d["text"].strip())]
    print(
        f"OCR (easyocr, production's engine): {len(detected)} total detections, "
        f"{len(ocr_numeric)} numeric, in {ocr_elapsed:.1f}s"
    )

    merged_values = {v.replace(" ", "") for v in merged}
    ocr_values = {d["text"].strip().replace(" ", "") for d in ocr_numeric}
    only_in_text_layer = merged_values - ocr_values
    only_in_ocr = ocr_values - merged_values
    in_both = merged_values & ocr_values
    print(
        f"\nAgreement: {len(in_both)} values found by both, "
        f"{len(only_in_text_layer)} found only in the text layer (OCR missed "
        f"or misread these), {len(only_in_ocr)} found only by OCR (noise, or "
        "text-layer extraction missed these)."
    )
    print(
        f"\nSpeed: text-layer extraction took {elapsed * 1000:.1f}ms; OCR took "
        f"{ocr_elapsed * 1000:.0f}ms ({ocr_elapsed / max(elapsed, 1e-6):.0f}x slower)."
    )
    if only_in_text_layer:
        print("\nValues the text layer found that OCR did not (sample):")
        for value in sorted(only_in_text_layer)[:20]:
            print(f"  {value!r}")


if __name__ == "__main__":
    main()
