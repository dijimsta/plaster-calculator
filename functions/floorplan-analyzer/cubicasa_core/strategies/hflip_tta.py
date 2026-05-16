"""Horizontal-flip test-time augmentation.

Runs the model on the input AND its horizontally-mirrored version, then
averages the two outputs (after re-aligning the mirrored output back to the
original orientation). For the heatmap channels — which encode wall junctions,
door endpoints and icon corners by *direction* — a channel permutation is
applied so that, e.g., what the flipped pass detected as a "right-pointing"
junction contributes to the "left-pointing" channel in the average.

Channel layout (21 heatmap channels):
- 0..3   I-junctions (1 arm), arms point   [up, right, down, left]
- 4..7   L-junctions (2 arms), corners are [TL, TR, BR, BL]
- 8..11  T-junctions (3 arms), missing arm [down, left, up, right]
- 12     X-junction (4 arms), symmetric
- 13..16 door endpoints, point             [left, right, up, down]
- 17..20 icon corners                      [BR, BL, TR, TL]

Horizontal flip: swap left<->right and TL<->TR / BL<->BR / BR<->BL / TR<->TL.
"""
from __future__ import annotations

import torch
import torch.nn as nn

from cubicasa_core.postprocess import (
    build_result_in_original_space,
    polygons_from_predictions,
    split_outputs,
)
from cubicasa_core.preprocess import detect_drawing_bbox, load_pil, prepare
from cubicasa_core.strategies.base import InferenceStrategy


def _hflip_channel_permutation(n: int = 21) -> list[int]:
    perm = list(range(n))
    # I-junctions: chan 1 (right) <-> chan 3 (left)
    perm[1], perm[3] = 3, 1
    # L-junctions: TL(4)<->TR(5), BR(6)<->BL(7)
    perm[4], perm[5] = 5, 4
    perm[6], perm[7] = 7, 6
    # T-junctions: pt-left(9) <-> pt-right(11)
    perm[9], perm[11] = 11, 9
    # X-junction (12): symmetric
    # door endpoints: left(13) <-> right(14)
    perm[13], perm[14] = 14, 13
    # icon corners: BR(17)<->BL(18), TR(19)<->TL(20)
    perm[17], perm[18] = 18, 17
    perm[19], perm[20] = 20, 19
    return perm


class _HFlipTTABase(InferenceStrategy):
    fit_long: int | None = None
    autocrop: bool = False

    def run(self, image_bytes: bytes, model: nn.Module, threshold: float = 0.5) -> dict:
        image = load_pil(image_bytes)
        bbox = detect_drawing_bbox(image) if self.autocrop else None
        prepared = prepare(image, crop_xyxy=bbox, fit_long=self.fit_long)

        with torch.no_grad():
            out_orig = model(prepared.tensor)
            out_flip = model(torch.flip(prepared.tensor, dims=(-1,)))

        # Bring the flipped pass back into the original orientation:
        # spatially un-flip the W axis, then permute heatmap channels.
        out_flip_unflipped = torch.flip(out_flip, dims=(-1,))
        heat_orig, room_orig, icon_orig = torch.split(out_orig, [21, 12, 11], dim=1)
        heat_flip, room_flip, icon_flip = torch.split(
            out_flip_unflipped, [21, 12, 11], dim=1
        )
        perm = _hflip_channel_permutation(21)
        heat_flip_perm = heat_flip[:, perm, :, :]

        # Average raw logits (rooms/icons get softmax later in split_prediction).
        heat_avg = (heat_orig + heat_flip_perm) / 2.0
        room_avg = (room_orig + room_flip) / 2.0
        icon_avg = (icon_orig + icon_flip) / 2.0
        avg = torch.cat([heat_avg, room_avg, icon_avg], dim=1)

        predictions = split_outputs(avg, prepared.infer_shape)
        polygons, types, room_polygons, room_types = polygons_from_predictions(
            predictions, threshold
        )
        return build_result_in_original_space(
            polygons, types, room_polygons, room_types, prepared
        )


class HFlipTTAStrategy(_HFlipTTABase):
    name = "hflip_tta"
    description = (
        "Run inference on the input + its horizontal mirror and average the "
        "outputs (with channel permutation for direction-encoded heatmaps)."
    )
    fit_long = None
    autocrop = False


class AutocropHFlipTTA1024Strategy(_HFlipTTABase):
    name = "autocrop_hflip_tta_1024"
    description = (
        "Auto-crop to the floor plan, resize the long edge to 1024px, then "
        "average original + horizontal-mirror inferences."
    )
    fit_long = 1024
    autocrop = True
