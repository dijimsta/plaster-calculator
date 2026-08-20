"""Compare `easyocr` (production's current OCR engine, via `ocr/service.py`)
against `paddleocr` on the same real drawing images, specifically on the
three failure classes found while running the production pipeline for
PCPD-42's angle 1 and angle 2 research:

1. Numbered-room drawings (e.g. "Room 1".."Room 8") -- does a different
   engine read these more legibly, or is the downstream problem (numbered
   labels not matching `ocr/keywords.py`'s keyword list) independent of OCR
   engine choice?
2. Space-separated-thousands dimension truncation (e.g. a drawing's "1 550"
   read back as "550", silently dropping the leading digit) -- does the
   other engine avoid this specific failure mode?
3. Punctuation-variant label noise (the same word read as several different
   strings across instances, e.g. "Ens," / "Ens." / "Ens_" / "Ensuite") --
   does the other engine produce cleaner, more consistent text for the same
   underlying label?

This is a real side-by-side comparison, not an impression: both engines run
against the same image and their raw detections are printed together so the
actual output can be judged, not just the engine's own eventual room-count
downstream.

Usage (from `functions/floorplan-analyzer/research/pcpd-42-detection-improvements`,
using the floorplan-analyzer venv, which needs `easyocr` and `paddleocr`
both installed):

    ../../venv/bin/python3 compare_ocr_engines.py --image /path/to/a/drawing.png
"""

from __future__ import annotations

import argparse
import re
import sys
import time
from pathlib import Path

_REPO_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_REPO_ROOT))

import numpy as np  # noqa: E402
from ocr.service import OcrService  # noqa: E402
from PIL import Image  # noqa: E402

_NUMERIC_RE = re.compile(r"^[\d\s]{2,7}$")


def run_easyocr(
    image: Image.Image, *, rotation_info: list[int] | None = None
) -> list[dict]:
    """`rotation_info=[90, 180, 270]` makes easyocr also check those
    rotations of each detected text region -- production's `ocr/service.py`
    never passes this (plain `reader.readtext(image_rgb)`), so it misses
    text rotated 90 degrees on the page, e.g. the vertical dimension chains
    and rotated room labels common on the left/right margins of a real
    architectural floor plan. This flag finds them, but costs roughly
    7x the OCR wall-clock time (measured on a real 3307x2339px drawing:
    10.6s -> 77.0s) -- see this directory's README for the full comparison
    against extracting the same rotated text losslessly from a PDF's own
    text layer instead, which pays no such cost."""
    reader = OcrService()
    started = time.perf_counter()
    if rotation_info is None:
        detected = reader.read_text(image)
    else:
        import numpy as np

        raw = reader_instance().readtext(
            np.asarray(image.convert("RGB")), rotation_info=rotation_info
        )
        detected = [
            {
                "text": text,
                "confidence": float(conf),
                "bbox": [[int(p[0]), int(p[1])] for p in bbox],
            }
            for bbox, text, conf in raw
        ]
    elapsed = time.perf_counter() - started
    results = [
        {
            "text": item["text"],
            "confidence": item["confidence"],
            "cx": sum(p[0] for p in item["bbox"]) / len(item["bbox"]),
            "cy": sum(p[1] for p in item["bbox"]) / len(item["bbox"]),
        }
        for item in detected
    ]
    print(
        f"easyocr (rotation_info={rotation_info}): {len(results)} detections "
        f"in {elapsed:.1f}s"
    )
    return results


def reader_instance():
    """The same cached `easyocr.Reader` production uses, exposed so this
    script can call `readtext()` directly with `rotation_info` -- a
    parameter `ocr/service.py`'s `OcrService.read_text()` wrapper does not
    expose."""
    from ocr.service import _ocr_reader

    return _ocr_reader()


def run_paddleocr(image: Image.Image) -> list[dict]:
    from paddleocr import PaddleOCR

    started = time.perf_counter()
    # lang="en" matches the production easyocr.Reader(["en"]) config; other
    # PaddleOCR pipeline stages (orientation/unwarping classifiers) are left
    # at their defaults, disabled below since these are flat, upright scans.
    ocr = PaddleOCR(
        use_doc_orientation_classify=False,
        use_doc_unwarping=False,
        use_textline_orientation=False,
        lang="en",
    )
    print(f"paddleocr model load: {time.perf_counter() - started:.1f}s")

    started = time.perf_counter()
    arr = np.asarray(image.convert("RGB"))
    (page_result,) = ocr.predict(arr)
    elapsed = time.perf_counter() - started

    texts = page_result.get("rec_texts", [])
    scores = page_result.get("rec_scores", [])
    polys = page_result.get("rec_polys", page_result.get("dt_polys", []))
    results = []
    for text, score, poly in zip(texts, scores, polys, strict=False):
        pts = np.asarray(poly)
        results.append(
            {
                "text": text,
                "confidence": float(score),
                "cx": float(pts[:, 0].mean()),
                "cy": float(pts[:, 1].mean()),
            }
        )
    print(f"paddleocr: {len(results)} detections in {elapsed:.1f}s")
    return results


def _near(a: dict, b: dict, radius: float = 40.0) -> bool:
    return ((a["cx"] - b["cx"]) ** 2 + (a["cy"] - b["cy"]) ** 2) ** 0.5 <= radius


def print_side_by_side(
    easy: list[dict], paddle: list[dict], *, keyword: str | None
) -> None:
    """Print every detection from both engines whose text contains
    `keyword` (case-insensitive), or every numeric-looking token when
    `keyword` is None, grouped by rough position so matching detections
    from each engine land on the same line."""

    def matches(item: dict) -> bool:
        if keyword is None:
            return bool(_NUMERIC_RE.match(item["text"].strip()))
        return keyword.lower() in item["text"].lower()

    easy_hits = [e for e in easy if matches(e)]
    paddle_hits = [p for p in paddle if matches(p)]

    print(f"\n{'easyocr':<45} {'paddleocr (nearby)':<45}")
    print("-" * 90)
    used_paddle: set[int] = set()
    for e in sorted(easy_hits, key=lambda i: (round(i["cy"] / 20), i["cx"])):
        match_idx = next(
            (
                i
                for i, p in enumerate(paddle_hits)
                if i not in used_paddle and _near(e, p)
            ),
            None,
        )
        paddle_str = "(no nearby paddleocr detection)"
        if match_idx is not None:
            used_paddle.add(match_idx)
            p = paddle_hits[match_idx]
            paddle_str = f"{p['text']!r} (conf={p['confidence']:.2f})"
        print(f"{e['text']!r:<35} conf={e['confidence']:.2f}  |  {paddle_str}")

    for i, p in enumerate(paddle_hits):
        if i in used_paddle:
            continue
        conf_str = f"(conf={p['confidence']:.2f})"
        print(f"{'(no nearby easyocr detection)':<45} |  {p['text']!r} {conf_str}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--image", required=True, type=Path)
    parser.add_argument(
        "--keyword",
        default=None,
        help="Only show detections containing this substring (case-insensitive). "
        "Omit to compare numeric/dimension-like tokens instead.",
    )
    parser.add_argument(
        "--easyocr-rotation-info",
        action="store_true",
        help="Also run easyocr with rotation_info=[90,180,270] and report what it "
        "finds that the default config misses, and the wall-clock cost",
    )
    args = parser.parse_args()

    image = Image.open(args.image).convert("RGB")
    print(f"Loaded {args.image} -> {image.size[0]}x{image.size[1]}px")

    easy = run_easyocr(image)
    paddle = run_paddleocr(image)
    print_side_by_side(easy, paddle, keyword=args.keyword)

    if args.easyocr_rotation_info:
        print("\n--- easyocr with rotation_info=[90,180,270] ---")
        easy_rotated = run_easyocr(image, rotation_info=[90, 180, 270])
        only_in_rotated = [
            r for r in easy_rotated if not any(_near(r, e, radius=15) for e in easy)
        ]
        print(
            f"{len(only_in_rotated)} detections found only with rotation_info enabled:"
        )
        for r in only_in_rotated:
            pos = f"({r['cx']:.0f},{r['cy']:.0f})"
            print(f"  {r['text']!r} conf={r['confidence']:.2f} at {pos}")


if __name__ == "__main__":
    main()
