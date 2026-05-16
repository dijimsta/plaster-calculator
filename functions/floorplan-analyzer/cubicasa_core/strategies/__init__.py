"""Inference strategies. Each strategy converts an image to the same result
shape `{rooms, walls, icons}` with polygon coordinates in the original image
pixel space, but they vary in how they preprocess and post-process the model
outputs to trade off accuracy for compute.
"""
from __future__ import annotations

from cubicasa_core.strategies.autocrop import (
    AutocropFitLong1024Strategy,
    AutocropStrategy,
)
from cubicasa_core.strategies.base import InferenceStrategy
from cubicasa_core.strategies.baseline import BaselineStrategy
from cubicasa_core.strategies.fit_scale import (
    FitLong1024Strategy,
    FitLong1536Strategy,
    FitShort512Strategy,
)
from cubicasa_core.strategies.hflip_tta import (
    AutocropHFlipTTA1024Strategy,
    HFlipTTAStrategy,
)
from cubicasa_core.strategies.mask_rooms import MaskRoomsStrategy
from cubicasa_core.strategies.multiscale import AutocropMultiscaleTTAStrategy
from cubicasa_core.strategies.segmap_rooms import SegmapRoomsStrategy

_STRATEGY_CLASSES: list[type[InferenceStrategy]] = [
    BaselineStrategy,
    FitLong1024Strategy,
    FitLong1536Strategy,
    FitShort512Strategy,
    AutocropStrategy,
    AutocropFitLong1024Strategy,
    HFlipTTAStrategy,
    AutocropHFlipTTA1024Strategy,
    AutocropMultiscaleTTAStrategy,
    SegmapRoomsStrategy,
    MaskRoomsStrategy,
]

_REGISTRY: dict[str, type[InferenceStrategy]] = {cls.name: cls for cls in _STRATEGY_CLASSES}


def list_strategies() -> list[str]:
    return list(_REGISTRY.keys())


def get_strategy(name: str) -> InferenceStrategy:
    if name not in _REGISTRY:
        raise KeyError(
            f"unknown strategy {name!r}; available: {', '.join(_REGISTRY)}"
        )
    return _REGISTRY[name]()


__all__ = [
    "AutocropFitLong1024Strategy",
    "AutocropHFlipTTA1024Strategy",
    "AutocropMultiscaleTTAStrategy",
    "AutocropStrategy",
    "BaselineStrategy",
    "FitLong1024Strategy",
    "FitLong1536Strategy",
    "FitShort512Strategy",
    "HFlipTTAStrategy",
    "InferenceStrategy",
    "MaskRoomsStrategy",
    "SegmapRoomsStrategy",
    "get_strategy",
    "list_strategies",
]
