from __future__ import annotations

import re
from functools import lru_cache

import numpy as np
from PIL import Image

from ocr.keywords import OCR_KEYWORDS, OCR_ROOM_TYPE_BY_KEYWORD
from ocr.schemas import DetectedText, OcrSeed

MIN_DETECTED_TEXT_CONFIDENCE = 0.4


@lru_cache(maxsize=1)
def _ocr_reader():
    try:
        import easyocr
    except ImportError as exc:
        raise RuntimeError("easyocr is required for OCR strategies") from exc
    return easyocr.Reader(["en"], gpu=False, verbose=False)


class OcrService:
    def read_text(self, image: Image.Image) -> list[DetectedText]:
        image_rgb = np.asarray(image.convert("RGB"))
        results = _ocr_reader().readtext(image_rgb)
        return [
            DetectedText(
                text=text,
                confidence=float(confidence),
                bbox=[[int(p[0]), int(p[1])] for p in bbox],
            )
            for bbox, text, confidence in results
        ]

    def read_text_and_seeds(
        self, image: Image.Image
    ) -> tuple[list[DetectedText], list[OcrSeed]]:
        detected_texts = self.read_text(image)
        seeds = [
            seed
            for detected in detected_texts
            if (seed := self._seed_from_detected(detected)) is not None
        ]
        return detected_texts, seeds

    def summarize_detected_text(
        self,
        detected_texts: list[DetectedText],
        min_confidence: float = MIN_DETECTED_TEXT_CONFIDENCE,
    ) -> list[dict]:
        return [
            {"text": detected["text"], "confidence": detected["confidence"]}
            for detected in detected_texts
            if detected["confidence"] >= min_confidence
        ]

    def room_type_from_keyword(self, keyword: str | None) -> str | None:
        if keyword is None:
            return None
        return OCR_ROOM_TYPE_BY_KEYWORD.get(keyword)

    def _seed_from_detected(self, detected: DetectedText) -> OcrSeed | None:
        matched = self._match_keyword(detected["text"])
        if matched is None:
            return None
        cx = int(np.mean([p[0] for p in detected["bbox"]]))
        cy = int(np.mean([p[1] for p in detected["bbox"]]))
        return OcrSeed(
            x=cx,
            y=cy,
            text=detected["text"],
            label=self._label_from_text(detected["text"]),
            matched_keyword=matched,
            confidence=detected["confidence"],
        )

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
