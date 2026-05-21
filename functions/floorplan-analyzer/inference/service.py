from __future__ import annotations

import torch
import torch.nn as nn
from PIL import Image

from inference.model import load_model as _load_model
from inference.overlay import render_segmentation_map as _render_segmentation_map
from inference.pipeline import run_get_polygons as _run_get_polygons
from inference.pipeline import run_inference as _run_inference
from inference.preprocess import PreparedImage, load_pil, prepare
from inference.strategies import InferenceStrategy


def load_model(weights_path=None) -> nn.Module:
    return _load_model(weights_path)


class InferenceService:
    def __init__(self, model: nn.Module) -> None:
        self.model = model

    def run(
        self,
        image_bytes: bytes,
        strategy: str | InferenceStrategy | None = None,
        threshold: float = 0.5,
    ) -> dict:
        return _run_inference(
            image_bytes, self.model, threshold=threshold, strategy=strategy
        )

    def run_get_polygons(self, image_bytes: bytes, threshold: float = 0.5) -> dict:
        return _run_get_polygons(image_bytes, self.model, threshold=threshold)

    def render_segmentation_map(self, image_bytes: bytes) -> Image.Image:
        return _render_segmentation_map(image_bytes, self.model)

    def prepare_and_run(self, image: Image.Image) -> tuple[torch.Tensor, PreparedImage]:
        prepared = prepare(image)
        with torch.no_grad():
            output = self.model(prepared.tensor)
        return output, prepared

    def load_image(self, image_bytes: bytes) -> Image.Image:
        return load_pil(image_bytes)
