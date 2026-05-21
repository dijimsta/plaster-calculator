from __future__ import annotations

import re
from functools import lru_cache

import numpy as np
from PIL import Image

from ocr.keywords import OCR_KEYWORDS, OCR_ROOM_TYPE_BY_KEYWORD
from ocr.schemas import OcrSeed


@lru_cache(maxsize=1)
def _ocr_reader():
    try:
        import easyocr
    except ImportError as exc:
        raise RuntimeError("easyocr is required for OCR strategies") from exc
    return easyocr.Reader(["en"], gpu=False, verbose=False)


class OcrService:
    def find_seeds(self, image: Image.Image) -> list[OcrSeed]:
        image_rgb = np.asarray(image.convert("RGB"))
        results = _ocr_reader().readtext(image_rgb)
        seeds: list[OcrSeed] = []
        for bbox, text, confidence in results:
            matched = self._match_keyword(text)
            if matched is None:
                continue
            cx = int(np.mean([point[0] for point in bbox]))
            cy = int(np.mean([point[1] for point in bbox]))
            seeds.append(
                OcrSeed(
                    x=cx,
                    y=cy,
                    text=text,
                    label=self._label_from_text(text),
                    matched_keyword=matched,
                    confidence=float(confidence),
                )
            )
        return seeds

    def room_type_from_keyword(self, keyword: str | None) -> str | None:
        if keyword is None:
            return None
        return OCR_ROOM_TYPE_BY_KEYWORD.get(keyword)

    def _match_keyword(self, text: str) -> str | None:
        lower = text.lower()
        return next((keyword for keyword in OCR_KEYWORDS if keyword in lower), None)

    def _label_from_text(self, text: str) -> str:
        cleaned = re.sub(r"\s+", " ", text.strip())
        if not cleaned:
            return "Room"
        replacements = {
            "ens": "Ensuite",
            "wir": "WIR",
            "wip": "WIP",
            "l'dry": "Laundry",
            "ldry": "Laundry",
        }
        key = cleaned.lower().replace(" ", "")
        if key in replacements:
            return replacements[key]
        return cleaned.title()
