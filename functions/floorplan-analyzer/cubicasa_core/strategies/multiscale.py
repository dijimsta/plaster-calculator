"""Multi-scale test-time augmentation.

Runs the model at three scales of the (auto-cropped) image and averages the
outputs. Different scales surface different errors: at small scales the model
sees the building footprint cleanly but small icons are missed; at large
scales icon detection improves but dimension lines and text get classified as
walls. Averaging the logits suppresses both kinds of error.
"""
from __future__ import annotations

import torch
import torch.nn as nn
import torch.nn.functional as F

from cubicasa_core.postprocess import (
    build_result_in_original_space,
    polygons_from_predictions,
    split_outputs,
)
from cubicasa_core.preprocess import detect_drawing_bbox, load_pil, prepare
from cubicasa_core.strategies.base import InferenceStrategy


class _MultiscaleBase(InferenceStrategy):
    autocrop: bool = False
    long_edges: tuple[int, ...] = (768, 1024, 1280)

    def run(self, image_bytes: bytes, model: nn.Module, threshold: float = 0.5) -> dict:
        image = load_pil(image_bytes)
        bbox = detect_drawing_bbox(image) if self.autocrop else None
        ref_long = max(self.long_edges)
        prepared_ref = prepare(image, crop_xyxy=bbox, fit_long=ref_long)
        ref_h, ref_w = prepared_ref.infer_shape

        accum: torch.Tensor | None = None
        with torch.no_grad():
            for le in self.long_edges:
                if le == ref_long:
                    out = model(prepared_ref.tensor)
                else:
                    prep = prepare(image, crop_xyxy=bbox, fit_long=le)
                    out = model(prep.tensor)
                if out.shape[-2:] != (ref_h, ref_w):
                    out = F.interpolate(
                        out, size=(ref_h, ref_w), mode="bilinear", align_corners=False
                    )
                accum = out if accum is None else accum + out
        assert accum is not None
        avg = accum / len(self.long_edges)

        predictions = split_outputs(avg, prepared_ref.infer_shape)
        polygons, types, room_polygons, room_types = polygons_from_predictions(
            predictions, threshold
        )
        return build_result_in_original_space(
            polygons, types, room_polygons, room_types, prepared_ref
        )


class AutocropMultiscaleTTAStrategy(_MultiscaleBase):
    name = "autocrop_multiscale_tta"
    description = (
        "Auto-crop to the floor plan, run inference at long-edge sizes "
        "768/1024/1280 and average the outputs."
    )
    autocrop = True
    long_edges = (768, 1024, 1280)
