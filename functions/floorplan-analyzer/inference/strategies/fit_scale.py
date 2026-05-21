"""Strategies that resize the image to a fixed target size before inference.

The CubiCasa hourglass network was trained on relatively small crops (~256
to ~512px). Architectural drawings with large outer margins can be 3000+ pixels
on a side, so the network sees floor-plan elements at a much smaller relative
scale than during training. Down-scaling to a familiar resolution often reduces
false detections in dimension lines and title-block text.
"""

from __future__ import annotations

import torch
import torch.nn as nn
from segmentation.postprocess import (
    build_result_in_original_space,
    polygons_from_predictions,
    split_outputs,
)

from inference.preprocess import load_pil, prepare
from inference.strategies.base import InferenceStrategy


class _FitScaleBase(InferenceStrategy):
    fit_long: int | None = None
    fit_short: int | None = None

    def run(self, image_bytes: bytes, model: nn.Module, threshold: float = 0.5) -> dict:
        image = load_pil(image_bytes)
        prepared = prepare(image, fit_long=self.fit_long, fit_short=self.fit_short)
        with torch.no_grad():
            output = model(prepared.tensor)
        predictions = split_outputs(output, prepared.infer_shape)
        polygons, types, room_polygons, room_types = polygons_from_predictions(
            predictions, threshold
        )
        return build_result_in_original_space(
            polygons, types, room_polygons, room_types, prepared
        )


class FitLong1024Strategy(_FitScaleBase):
    name = "fit_long_1024"
    description = "Resize the image so the long edge is 1024px before inference."
    fit_long = 1024


class FitLong1536Strategy(_FitScaleBase):
    name = "fit_long_1536"
    description = "Resize the image so the long edge is 1536px before inference."
    fit_long = 1536


class FitShort512Strategy(_FitScaleBase):
    name = "fit_short_512"
    description = "Resize the image so the short edge is 512px before inference."
    fit_short = 512
