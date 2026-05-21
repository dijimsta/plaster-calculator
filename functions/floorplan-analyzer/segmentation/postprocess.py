"""Glue between raw model output and the high-level result dict.

Splits the network's tensor output into heatmaps + room/icon segmentations,
runs the floortrans polygon extractor, and maps polygon coordinates back to
the original image's coordinate space using the strategy's `PreparedImage`.
"""
from __future__ import annotations

import cv2
import numpy as np
import torch
from floortrans.post_prosessing import get_polygons, split_prediction

from inference.preprocess import PreparedImage
from segmentation.result import _ROOM_LABELS, build_result

# Room class indices to skip when extracting room polygons from the segmap
_SEGMAP_SKIP_CLASSES = {
    0,  # Background
    1,  # Outdoor
    2,  # Wall
}

_SPLIT = [21, 12, 11]
_ALL_OPENING_TYPES = [1, 2]


def split_outputs(
    output: torch.Tensor, infer_shape: tuple[int, int]
) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Run the same post-split that floortrans uses internally."""
    return split_prediction(output, infer_shape, _SPLIT)


def polygons_from_predictions(
    predictions: tuple[np.ndarray, np.ndarray, np.ndarray],
    threshold: float,
) -> tuple[np.ndarray, list[dict], list, list[dict]]:
    return get_polygons(predictions, threshold, _ALL_OPENING_TYPES)


def build_result_in_original_space(
    polygons: np.ndarray,
    types: list[dict],
    room_polygons: list,
    room_types: list[dict],
    prepared: PreparedImage,
) -> dict:
    """Build the user-facing result dict with coordinates in the original
    image's pixel space."""
    return _remap_result(build_result(polygons, types, room_polygons, room_types), prepared)


def walls_from_segmap(
    rooms: np.ndarray,
    prepared: PreparedImage,
    min_perimeter_px: int = 20,
) -> list[dict]:
    """Extract wall polygons directly from the wall class in the room segmentation."""
    room_map = np.argmax(rooms, axis=0).astype(np.uint8)
    mask = (room_map == 2).astype(np.uint8) * 255  # Wall class
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    result = []
    for cnt in contours:
        perimeter = cv2.arcLength(cnt, True)
        if perimeter < min_perimeter_px:
            continue
        epsilon = 0.005 * perimeter
        approx = cv2.approxPolyDP(cnt, epsilon, True)
        polygon_xy = approx.reshape(-1, 2).astype(np.float32)
        polygon_orig = prepared.to_original_xy(polygon_xy)
        result.append({
            "polygon": [[round(float(x), 2), round(float(y), 2)] for x, y in polygon_orig],
        })

    return result


def rooms_from_mask(
    rooms: np.ndarray,
    prepared: PreparedImage,
    min_area_px: int = 500,
) -> list[dict]:
    """Extract room polygons by treating wall pixels as boundaries."""
    room_map = np.argmax(rooms, axis=0).astype(np.int32)

    valid = (~np.isin(room_map, list(_SEGMAP_SKIP_CLASSES))).astype(np.uint8)
    n_labels, label_map = cv2.connectedComponents(valid, connectivity=8)

    result = []
    for lbl in range(1, n_labels):
        component = (label_map == lbl)
        if component.sum() < min_area_px:
            continue

        cls_pixels = room_map[component]
        cls_idx = int(np.bincount(cls_pixels.astype(np.intp)).argmax())
        label = _ROOM_LABELS[cls_idx] if cls_idx < len(_ROOM_LABELS) else str(cls_idx)

        mask = component.astype(np.uint8) * 255
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            continue
        cnt = max(contours, key=cv2.contourArea)
        epsilon = 0.005 * cv2.arcLength(cnt, True)
        approx = cv2.approxPolyDP(cnt, epsilon, True)
        polygon_xy = approx.reshape(-1, 2).astype(np.float32)
        polygon_orig = prepared.to_original_xy(polygon_xy)
        result.append({
            "label": label,
            "polygon": [[round(float(x), 2), round(float(y), 2)] for x, y in polygon_orig],
        })

    return result


def rooms_from_segmap(
    rooms: np.ndarray,
    prepared: PreparedImage,
    min_area_px: int = 500,
) -> list[dict]:
    """Extract room polygons directly from the argmax of the room segmentation."""
    room_map = np.argmax(rooms, axis=0).astype(np.uint8)

    result = []
    for cls_idx, label in enumerate(_ROOM_LABELS):
        if cls_idx in _SEGMAP_SKIP_CLASSES:
            continue
        mask = (room_map == cls_idx).astype(np.uint8) * 255
        if not mask.any():
            continue
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        for cnt in contours:
            if cv2.contourArea(cnt) < min_area_px:
                continue
            epsilon = 0.005 * cv2.arcLength(cnt, True)
            approx = cv2.approxPolyDP(cnt, epsilon, True)
            polygon_xy = approx.reshape(-1, 2).astype(np.float32)
            polygon_orig = prepared.to_original_xy(polygon_xy)
            result.append({
                "label": label,
                "polygon": [[round(float(x), 2), round(float(y), 2)] for x, y in polygon_orig],
            })

    return result


def _remap_result(result: dict, prepared: PreparedImage) -> dict:
    def remap(coords: list[list[float]]) -> list[list[float]]:
        if not coords:
            return coords
        arr = np.asarray(coords, dtype=np.float32)
        mapped = prepared.to_original_xy(arr)
        return [[round(float(x), 2), round(float(y), 2)] for x, y in mapped]

    return {
        "rooms": [{**r, "polygon": remap(r["polygon"])} for r in result["rooms"]],
        "walls": [{**w, "polygon": remap(w["polygon"])} for w in result["walls"]],
        "icons": [{**i, "polygon": remap(i["polygon"])} for i in result["icons"]],
    }
