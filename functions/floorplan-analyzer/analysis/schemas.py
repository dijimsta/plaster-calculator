from __future__ import annotations

from typing import Any


class AnalysisParams:
    pass


class OcrFloodFillParams(AnalysisParams):
    def __init__(
        self,
        source_file: str,
        min_area: int,
        wall_kernel_size: int,
    ) -> None:
        self.source_file = source_file
        self.min_area = min_area
        self.wall_kernel_size = wall_kernel_size


class OcrFloodFillSmoothedParams(AnalysisParams):
    def __init__(
        self,
        source_file: str,
        min_area: int,
        wall_kernel_size: int,
        simplify_epsilon_ratio: float,
        ortho_tolerance_degrees: float,
        min_point_distance_px: float,
        unknown_room_min_area: int,
    ) -> None:
        self.source_file = source_file
        self.min_area = min_area
        self.wall_kernel_size = wall_kernel_size
        self.simplify_epsilon_ratio = simplify_epsilon_ratio
        self.ortho_tolerance_degrees = ortho_tolerance_degrees
        self.min_point_distance_px = min_point_distance_px
        self.unknown_room_min_area = unknown_room_min_area


class XixiParams(AnalysisParams):
    def __init__(
        self,
        source_file: str,
        min_area: int,
        room_type_min_fraction: float,
    ) -> None:
        self.source_file = source_file
        self.min_area = min_area
        self.room_type_min_fraction = room_type_min_fraction


AnalysisResult = dict[str, Any]
