"""Strategy that derives room polygons from connected components of the mask.

Wall pixels in the segmentation map act as boundaries. Connected components of
all non-wall, non-background pixels are found and labelled by majority class.
This produces room polygons that are genuinely enclosed by the wall lines rather
than traced around per-class pixel blobs.
"""
from __future__ import annotations

import torch
import torch.nn as nn

from segmentation.postprocess import (
    build_result_in_original_space,
    polygons_from_predictions,
    rooms_from_mask,
    split_outputs,
    walls_from_segmap,
)
from inference.preprocess import load_pil, prepare
from inference.strategies.base import InferenceStrategy


class MaskRoomsStrategy(InferenceStrategy):
    name = "mask_rooms"
    description = (
        "Treat wall pixels as boundaries and find connected components of the "
        "remaining pixels. Each component is labelled by majority class vote. "
        "Produces room polygons genuinely enclosed by wall lines. Walls come "
        "from the wall class in the segmap. Icons use the standard heatmap path."
    )

    def run(self, image_bytes: bytes, model: nn.Module, threshold: float = 0.5) -> dict:
        image = load_pil(image_bytes)
        prepared = prepare(image)
        with torch.no_grad():
            output = model(prepared.tensor)
        predictions = split_outputs(output, prepared.infer_shape)
        _heatmaps, rooms_array, _icons = predictions
        rooms_array = rooms_array.copy()

        polygons, types, _, _ = polygons_from_predictions(predictions, threshold)
        icons_result = build_result_in_original_space(polygons, types, [], [], prepared)

        return {
            "rooms": rooms_from_mask(rooms_array, prepared),
            "walls": walls_from_segmap(rooms_array, prepared),
            "icons": icons_result["icons"],
        }
