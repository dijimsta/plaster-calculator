from __future__ import annotations

from typing import TypedDict


class DetectedText(TypedDict):
    text: str
    confidence: float
    bbox: list[list[int]]  # 4 corner points [[x, y], ...]


class OcrSeed(TypedDict):
    x: int
    y: int
    text: str
    label: str
    matched_keyword: str
    confidence: float
