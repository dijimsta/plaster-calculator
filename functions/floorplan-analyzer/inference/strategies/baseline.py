"""Baseline strategy — preserves the original pre-strategy behaviour.

Resizes the image so each side is rounded up to the nearest multiple of 32,
normalises to [-1, 1] with mean=0.5/std=0.5 and runs the model directly. This
is what `run_inference` did before the strategy refactor and is preserved here
as the default for backwards compatibility.
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


class BaselineStrategy(InferenceStrategy):
    name = "baseline"
    description = (
        "Resize each side up to the nearest multiple of 32 (mild upscale), no "
        "crop, no TTA. This is the original pipeline."
    )

    def run(self, image_bytes: bytes, model: nn.Module, threshold: float = 0.5) -> dict:
        image = load_pil(image_bytes)
        prepared = prepare(image)
        with torch.no_grad():
            output = model(prepared.tensor)
        predictions = split_outputs(output, prepared.infer_shape)
        polygons, types, room_polygons, room_types = polygons_from_predictions(
            predictions, threshold
        )
        return build_result_in_original_space(
            polygons, types, room_polygons, room_types, prepared
        )
