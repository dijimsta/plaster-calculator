from __future__ import annotations

from analysis.schemas import AnalysisParams, AnalysisResult
from analysis.strategies.ocr_flood_fill import OcrFloodFillStrategy
from analysis.strategies.ocr_flood_fill_smoothed import OcrFloodFillSmoothedStrategy
from analysis.strategies.xixi import XixiStrategy

Strategy = OcrFloodFillStrategy | OcrFloodFillSmoothedStrategy | XixiStrategy


class AnalysisService:
    def __init__(self, strategies: dict[str, Strategy]) -> None:
        self.strategies = strategies

    def run(self, strategy_key: str, image_bytes: bytes, params: AnalysisParams) -> tuple[AnalysisResult, bytes]:
        strategy = self.strategies.get(strategy_key)
        if strategy is None:
            raise ValueError(f"Unknown strategy: {strategy_key!r}. Available: {', '.join(self.strategies)}")
        return strategy.run(image_bytes, params)
