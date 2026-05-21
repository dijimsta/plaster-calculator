from __future__ import annotations

import torch
from inference.preprocess import PreparedImage

from segmentation.postprocess import split_outputs as _split_outputs
from segmentation.schemas import SegmentationOutput


class SegmentationService:
    def split(
        self, output: torch.Tensor, prepared: PreparedImage
    ) -> SegmentationOutput:
        heatmaps, rooms, icons = _split_outputs(output, prepared.infer_shape)
        return SegmentationOutput(heatmaps=heatmaps, rooms=rooms, icons=icons)
