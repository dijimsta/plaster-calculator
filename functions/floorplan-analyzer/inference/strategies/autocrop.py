"""Auto-crop strategies that isolate the floor plan from surrounding content.

Architectural drawings often embed the floor plan inside a sea of dimension
lines, title blocks, area-analysis tables and revision history blocks. The
network spends capacity classifying that as walls/rooms when it shouldn't,
which produces spurious wall and room polygons in the legend / title areas.

The auto-crop here finds the largest connected ink blob (after a coarse
morphological closing), bounds it, and crops to that region before running
inference. Polygons are produced in original-image coordinates so the overlay
naturally lines up with the input.
"""

from __future__ import annotations

import torch
import torch.nn as nn
from segmentation.postprocess import (
    build_result_in_original_space,
    polygons_from_predictions,
    split_outputs,
)

from inference.preprocess import detect_drawing_bbox, load_pil, prepare
from inference.strategies.base import InferenceStrategy


class AutocropStrategy(InferenceStrategy):
    name = "autocrop"
    description = (
        "Auto-detect and crop to the largest contiguous ink region (the floor "
        "plan), then run baseline inference on the crop."
    )
    fit_long: int | None = None

    def run(self, image_bytes: bytes, model: nn.Module, threshold: float = 0.5) -> dict:
        image = load_pil(image_bytes)
        bbox = detect_drawing_bbox(image)
        prepared = prepare(image, crop_xyxy=bbox, fit_long=self.fit_long)
        with torch.no_grad():
            output = model(prepared.tensor)
        predictions = split_outputs(output, prepared.infer_shape)
        polygons, types, room_polygons, room_types = polygons_from_predictions(
            predictions, threshold
        )
        return build_result_in_original_space(
            polygons, types, room_polygons, room_types, prepared
        )


class AutocropFitLong1024Strategy(AutocropStrategy):
    name = "autocrop_fit_long_1024"
    description = (
        "Auto-crop to the floor-plan region, then resize so the long edge of "
        "the crop is 1024px before inference."
    )
    fit_long = 1024
