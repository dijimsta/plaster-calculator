from __future__ import annotations

import numpy as np


class SegmentationOutput:
    def __init__(
        self,
        heatmaps: np.ndarray,
        rooms: np.ndarray,
        icons: np.ndarray,
    ) -> None:
        self.heatmaps = heatmaps
        self.rooms = rooms
        self.icons = icons
