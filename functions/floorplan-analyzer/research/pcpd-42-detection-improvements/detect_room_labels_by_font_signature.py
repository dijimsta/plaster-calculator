"""Room-label detection: instead of matching OCR/PDF text *content* against
a fixed keyword list (`ocr/keywords.py`'s `OCR_KEYWORDS`, the only mechanism
production has today -- see the README's "Room label detection" section),
this prototype uses the *font* a drawing's own room-name callouts are set
in. The hypothesis: a drafting office's CAD template uses one consistent
font/size/style specifically for room-name callouts, visually distinct from
dimension strings, general notes, and title-block text -- so once that
signature is identified from a few known labels, every span sharing it is a
very likely room label, regardless of what the text actually says. That
would catch labels a fixed keyword list structurally cannot (numbered rooms
like "Room 1", unusual/non-English names) and would be immune to rotation
(a font is still the same font rotated 90 degrees; a content
keyword-substring match doesn't care about rotation either, but OCR's
*ability to read the text at all* does -- see the README's rotated-text
findings).

Method:
1. Extract every text span from the PDF's own text layer (`pymupdf`'s
   `page.get_text("dict")`), keeping each span's font family, size, flags
   (bold/italic/serif bits) and colour, plus its position.
2. Use `OCR_KEYWORDS` to find known room-label spans by content -- a
   *training set*, not the final detector.
3. Group the training set's spans by font signature (font, rounded size,
   flags, colour) and take the most common signature as "the room-label
   font" for this drawing.
4. Re-scan every span on the page and keep every one matching that
   signature, regardless of content.
5. Report, honestly, both directions: how many *new* labels this finds
   beyond the keyword baseline, and how many of its matches are plausibly
   *not* room labels (manually spot-checked against the rendered page).
6. Report whether each match's own bbox center is usable as a flood-fill
   seed point (the same role an OCR seed plays today), and whether rotated
   spans are found and positioned just as reliably as upright ones.

This deliberately trains and tests on spans from the *same* PDF/page: a
font signature is a per-drafting-office CAD template convention, not a
universal standard, so it is not expected to transfer across different
architects' drawings -- see the README for whether that assumption held up
across the different real offices' drawings tested.

Usage (from `functions/floorplan-analyzer/research/pcpd-42-detection-improvements`,
using the floorplan-analyzer venv):

    ../../venv/bin/python3 detect_room_labels_by_font_signature.py \\
        --pdf <path> --page <n> [--dpi 200] [--render-overlay /path/to/out.png]
"""

from __future__ import annotations

import argparse
import sys
from collections import Counter
from dataclasses import dataclass
from pathlib import Path

_REPO_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_REPO_ROOT))

import fitz  # noqa: E402  (pymupdf)
from ocr.keywords import OCR_KEYWORDS  # noqa: E402

PRODUCTION_DPI = 200
SIZE_ROUND_PT = 0.5  # group font sizes to the nearest half-point


@dataclass(frozen=True)
class TextSpan:
    text: str
    font: str
    size: float
    flags: int
    color: int
    bbox: tuple[float, float, float, float]
    direction: tuple[float, float]

    @property
    def is_rotated(self) -> bool:
        return abs(self.direction[0]) < 0.99

    def px_center(self, dpi: int) -> tuple[float, float]:
        """`bbox` is already in the page's *display* coordinate space (see
        `extract_text_spans` -- it applies `page.rotation_matrix` at
        extraction time), i.e. the same space `page.get_pixmap()` renders
        into, so this is a plain DPI scale with no further rotation math."""
        scale = dpi / 72
        x0, y0, x1, y1 = self.bbox
        return (x0 + x1) / 2 * scale, (y0 + y1) / 2 * scale


FontSignature = tuple[str, float, int, int]


def extract_text_spans(page: fitz.Page) -> list[TextSpan]:
    """Every non-empty text span on the page, with its font metadata and
    the line's direction vector (needed to detect rotated spans -- see
    this directory's README's "the `dir` vector is the correct rotation
    signal; aspect ratio is not" note from the earlier rotation research).

    `page.get_text("dict")` reports span bboxes in the page's *unrotated*
    MediaBox space, not the rotated space `page.get_pixmap()` renders into
    -- verified directly and the hard way on a real drawing whose page has
    `/Rotate 270` set: a naive scale-only conversion placed a room label's
    seed point nowhere near the label itself. `page.rotation_matrix` is
    pymupdf's own MediaBox-to-display transform; applying it here means
    every downstream consumer of `bbox` (px_center, the rendered overlay,
    any flood-fill seed built from it) can treat it as already being in
    the same pixel space as the rasterized page, rotated or not."""
    spans: list[TextSpan] = []
    rotation_matrix = page.rotation_matrix
    page_dict = page.get_text("dict")
    for block in page_dict["blocks"]:
        for line in block.get("lines", []):
            direction = line.get("dir", (1.0, 0.0))
            for span in line.get("spans", []):
                if not span["text"].strip():
                    continue
                display_bbox = fitz.Rect(span["bbox"]) * rotation_matrix
                spans.append(
                    TextSpan(
                        text=span["text"],
                        font=span["font"],
                        size=span["size"],
                        flags=span["flags"],
                        color=span["color"],
                        bbox=tuple(display_bbox),
                        direction=direction,
                    )
                )
    return spans


def match_keyword(text: str) -> str | None:
    """Mirrors `OcrService._match_keyword` exactly, so the training set is
    defined by the same rule production uses today."""
    lower = text.lower()
    return next((keyword for keyword in OCR_KEYWORDS if keyword in lower), None)


def font_signature(span: TextSpan) -> FontSignature:
    rounded_size = round(span.size / SIZE_ROUND_PT) * SIZE_ROUND_PT
    return (span.font, rounded_size, span.flags, span.color)


def dominant_signature(training_spans: list[TextSpan]) -> tuple[FontSignature, Counter]:
    counts = Counter(font_signature(s) for s in training_spans)
    if not counts:
        raise ValueError("No keyword-matched training spans found on this page")
    return counts.most_common(1)[0][0], counts


@dataclass
class FontSignatureResult:
    keyword_spans: list[TextSpan]
    signature: FontSignature
    signature_counts: Counter
    signature_spans: list[TextSpan]
    new_spans: list[TextSpan]  # signature matches not already found by keyword


def _spans_for_signature(
    all_spans: list[TextSpan], keyword_spans: list[TextSpan], signature: FontSignature
) -> tuple[list[TextSpan], list[TextSpan]]:
    signature_spans = [s for s in all_spans if font_signature(s) == signature]
    keyword_positions = {(round(s.bbox[0]), round(s.bbox[1])) for s in keyword_spans}
    new_spans = [
        s
        for s in signature_spans
        if (round(s.bbox[0]), round(s.bbox[1])) not in keyword_positions
    ]
    return signature_spans, new_spans


def detect(all_spans: list[TextSpan]) -> FontSignatureResult:
    """Single-signature version: just the one most common font signature
    among the training set. Simple, but -- see README -- a page can
    legitimately have more than one room-label-ish font cluster (e.g. a
    main room-name callout font plus a smaller secondary in-room label
    font), and picking only the single most frequent one can silently lose
    the cluster that actually contains the labels a keyword list misses.
    `detect_top_signatures` below is the more robust version; this one is
    kept because it's the simplest-possible version of the idea and is
    worth reporting as its own (weaker) data point."""
    keyword_spans = [s for s in all_spans if match_keyword(s.text) is not None]
    signature, counts = dominant_signature(keyword_spans)
    signature_spans, new_spans = _spans_for_signature(
        all_spans, keyword_spans, signature
    )
    return FontSignatureResult(
        keyword_spans, signature, counts, signature_spans, new_spans
    )


def detect_top_signatures(
    all_spans: list[TextSpan], *, top_n: int = 3, min_training_count: int = 2
) -> list[FontSignatureResult]:
    """Every font signature with at least `min_training_count` training-set
    (keyword-matched) spans, up to `top_n` clusters -- not just the single
    most common one. Reported as separate per-cluster results so each
    cluster's own new-find/false-positive rate can be judged on its own,
    rather than silently unioning them into one number."""
    keyword_spans = [s for s in all_spans if match_keyword(s.text) is not None]
    counts = Counter(font_signature(s) for s in keyword_spans)
    results = []
    for signature, count in counts.most_common(top_n):
        if count < min_training_count:
            continue
        signature_spans, new_spans = _spans_for_signature(
            all_spans, keyword_spans, signature
        )
        results.append(
            FontSignatureResult(
                keyword_spans, signature, counts, signature_spans, new_spans
            )
        )
    return results


_CLUSTER_COLOURS = [(60, 210, 90), (255, 140, 0), (170, 90, 230)]


def render_overlay(
    page: fitz.Page, results: list[FontSignatureResult], dpi: int
) -> bytes:
    """Blue = keyword-matched training spans (shared across all clusters).
    Every other reported signature cluster's new finds get their own
    colour (green/orange/purple), outlined in yellow if rotated. Lets a
    human spot-check both recall (are the coloured rings real room labels?)
    and precision (are there rings that clearly aren't?) against the actual
    page, not just counts."""
    import io

    from PIL import Image, ImageDraw

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

    buf = io.BytesIO()
    image.save(buf, format="PNG")
    return buf.getvalue()


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--pdf", required=True, type=Path)
    parser.add_argument("--page", type=int, default=0)
    parser.add_argument("--dpi", type=int, default=PRODUCTION_DPI)
    parser.add_argument(
        "--top-n-signatures",
        type=int,
        default=3,
        help="Report this many common training-set font signatures, not just #1",
    )
    parser.add_argument("--render-overlay", type=Path, default=None)
    return parser.parse_args()


def _print_cluster(index: int, result: FontSignatureResult, dpi: int) -> None:
    font_name, size, flags, color = result.signature
    count = result.signature_counts[result.signature]
    total_training = sum(result.signature_counts.values())
    print(
        f"\n--- Cluster #{index}: font={font_name!r} size={size} flags={flags} "
        f"color={color} ({count}/{total_training} of the training set) ---"
    )
    print(f"{len(result.signature_spans)} spans on the page match this signature")
    print(f"{len(result.new_spans)} are NEW -- not already found by keyword matching:")
    for span in sorted(
        result.new_spans, key=lambda s: (round(s.bbox[1] / 20), s.bbox[0])
    ):
        rotated = " [ROTATED]" if span.is_rotated else ""
        cx, cy = span.px_center(dpi)
        print(f"    {span.text!r:<30} px_seed=({cx:.0f},{cy:.0f}){rotated}")
    rotated_new = sum(1 for s in result.new_spans if s.is_rotated)
    if result.new_spans:
        print(f"  {rotated_new}/{len(result.new_spans)} new finds are rotated spans.")


def main() -> None:
    args = _parse_args()
    doc = fitz.open(args.pdf)
    page = doc[args.page]
    print(
        f"{args.pdf.name} page {args.page}: "
        f"{page.rect.width:.0f}x{page.rect.height:.0f}pt"
    )

    spans = extract_text_spans(page)
    print(f"{len(spans)} total non-empty text spans on this page")

    results = detect_top_signatures(spans, top_n=args.top_n_signatures)
    if not results:
        print("No keyword-matched training spans found on this page -- nothing to do.")
        return
    print(
        f"\nTraining set: {len(results[0].keyword_spans)} keyword-matched spans across "
        f"{len(results[0].signature_counts)} distinct font signatures -- reporting the "
        f"top {len(results)} with >= 2 training spans each"
    )
    for i, result in enumerate(results):
        _print_cluster(i, result, args.dpi)

    if args.render_overlay:
        args.render_overlay.parent.mkdir(parents=True, exist_ok=True)
        args.render_overlay.write_bytes(render_overlay(page, results, args.dpi))
        print(f"\nOverlay saved -> {args.render_overlay}")


if __name__ == "__main__":
    main()
