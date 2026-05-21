from __future__ import annotations

from typing import TypedDict


class OcrSeed(TypedDict):
    x: int
    y: int
    text: str
    label: str
    matched_keyword: str
    confidence: float
