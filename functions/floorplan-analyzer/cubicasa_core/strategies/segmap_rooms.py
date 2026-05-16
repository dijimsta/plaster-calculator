"""Strategy that extracts rooms and walls directly from the segmentation map.

Instead of using the heatmap-based polygon extractor (floortrans.get_polygons),
room and wall boundaries are derived from the argmax of the room classification
channels. This produces polygons that align exactly with the dark wall lines
visible in the segmentation colour map. Icons still come from the heatmap path.
"""
from __future__ import annotations

import torch
import torch.nn as nn

from cubicasa_core.postprocess import (
    build_result_in_original_space,
    polygons_from_predictions,
    rooms_from_segmap,
    split_outputs,
    walls_from_segmap,
)
from cubicasa_core.preprocess import load_pil, prepare
from cubicasa_core.strategies.base import InferenceStrategy


class SegmapRoomsStrategy(InferenceStrategy):
    name = "segmap_rooms"
    description = (
        "Extract room and wall polygons directly from the argmax room segmentation "
        "map. Boundaries align with the dark wall lines in the segmentation colour "
        "map. Icons still use the standard heatmap path."
    )

    def run(self, image_bytes: bytes, model: nn.Module, threshold: float = 0.5) -> dict:
        image = load_pil(image_bytes)
        prepared = prepare(image)
        with torch.no_grad():
            output = model(prepared.tensor)
        predictions = split_outputs(output, prepared.infer_shape)
        _heatmaps, rooms_array, _icons = predictions
        # get_polygons mutates rooms_array in place — copy before heatmap call
        rooms_array = rooms_array.copy()

        # Icons via heatmap path only
        polygons, types, _, _ = polygons_from_predictions(predictions, threshold)
        icons_result = build_result_in_original_space(polygons, types, [], [], prepared)

        return {
            "rooms": rooms_from_segmap(rooms_array, prepared),
            "walls": walls_from_segmap(rooms_array, prepared),
            "icons": icons_result["icons"],
        }
