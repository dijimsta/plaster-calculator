"""Abstract base class for an inference strategy."""
from __future__ import annotations

from abc import ABC, abstractmethod

import torch.nn as nn


class InferenceStrategy(ABC):
    """Run the model on an image and return room/wall/icon polygons.

    Subclasses register themselves via the registry in
    `cubicasa_core.strategies.__init__`.

    Polygon coordinates returned by `run` are always in the *original* image's
    pixel space, regardless of any internal cropping or rescaling — so result
    JSON and overlays from different strategies are directly comparable.
    """

    name: str = ""
    description: str = ""

    @abstractmethod
    def run(self, image_bytes: bytes, model: nn.Module, threshold: float = 0.5) -> dict:
        """Return `{rooms, walls, icons}` for the given image bytes."""
