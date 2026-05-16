"""High-level inference entry point.

`run_inference` accepts an image and a strategy name (or instance) and returns
a `{rooms, walls, icons}` dict in the *original* image's pixel space. The
default strategy preserves the previous pre-strategy behaviour.
"""
from __future__ import annotations

import torch.nn as nn
import torch

from cubicasa_core.postprocess import polygons_from_predictions, split_outputs
from cubicasa_core.preprocess import load_pil, prepare
from cubicasa_core.strategies import (
    BaselineStrategy,
    InferenceStrategy,
    get_strategy,
)


def run_inference(
    image_bytes: bytes,
    model: nn.Module,
    threshold: float = 0.5,
    strategy: str | InferenceStrategy | None = None,
) -> dict:
    if strategy is None:
        strategy_obj: InferenceStrategy = BaselineStrategy()
    elif isinstance(strategy, str):
        strategy_obj = get_strategy(strategy)
    else:
        strategy_obj = strategy
    return strategy_obj.run(image_bytes, model, threshold=threshold)


def run_get_polygons(
    image_bytes: bytes,
    model: nn.Module,
    threshold: float = 0.5,
) -> dict:
    """Run the baseline pipeline and return raw `floortrans.get_polygons` output.

    The returned polygons are in inference-image coordinates, before
    `cubicasa_core` remaps them back to the original image or attaches labels.
    """
    image = load_pil(image_bytes)
    prepared = prepare(image)
    with torch.no_grad():
        output = model(prepared.tensor)

    predictions = split_outputs(output, prepared.infer_shape)
    polygons, types, room_polygons, room_types = polygons_from_predictions(
        predictions, threshold
    )

    return {
        "threshold": threshold,
        "infer_shape": list(prepared.infer_shape),
        "original_size": list(prepared.original_size),
        "crop_xyxy": list(prepared.crop_xyxy),
        "polygons": [
            {
                **_json_type(t),
                "polygon": _polygon_to_coords(polygon),
            }
            for polygon, t in zip(polygons, types)
        ],
        "room_polygons": [
            {
                **_json_type(t),
                "polygon": coords,
            }
            for geom, t in zip(room_polygons, room_types)
            for coords in _geometry_to_coord_lists(geom)
        ],
    }


def _json_type(t: dict) -> dict:
    result = {"type": t["type"], "class": int(t["class"])}
    if "prob" in t:
        result["prob"] = float(t["prob"])
    return result


def _polygon_to_coords(polygon) -> list[list[float]]:
    return [[round(float(x), 2), round(float(y), 2)] for x, y in polygon]


def _geometry_to_coord_lists(geom) -> list[list[list[float]]]:
    if hasattr(geom, "geoms"):
        return [_polygon_ring_to_coords(polygon) for polygon in geom.geoms]
    return [_polygon_ring_to_coords(geom)]


def _polygon_ring_to_coords(polygon) -> list[list[float]]:
    x, y = polygon.exterior.coords.xy
    return [[round(float(xi), 2), round(float(yi), 2)] for xi, yi in zip(x, y)]
