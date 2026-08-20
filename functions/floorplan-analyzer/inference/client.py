"""A `Protocol` shared by `InferenceService` (local PyTorch) and
`HttpInferenceClient` (the floorplan-inference Cloud Function, WORK-303),
so callers that only need `prepare_and_run` can accept either without
depending on PyTorch specifically."""

from __future__ import annotations

from typing import Protocol

import torch
from PIL import Image

from inference.preprocess import PreparedImage


class InferenceClient(Protocol):
    def load_image(self, image_bytes: bytes) -> Image.Image: ...

    def prepare_and_run(
        self, image: Image.Image
    ) -> tuple[torch.Tensor, PreparedImage]: ...
