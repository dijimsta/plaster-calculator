from __future__ import annotations

import io
import math

import cv2
import numpy as np
from PIL import Image, ImageDraw

from analysis.schemas import XixiParams
from inference.service import InferenceService
from segmentation.service import SegmentationService

WALL_CLASS = 2
RAILING_CLASS = 8
BOUNDARY_CLASSES = (WALL_CLASS, RAILING_CLASS)
UNDEFINED_ROOM_CLASS = 11
ROOM_TYPE_MIN_FRACTION = 0.30
ROOM_CLASSES = [
    "Background",
    "Outdoor",
    "Wall",
    "Kitchen",
    "Living Room",
    "Bed Room",
    "Bath",
    "Entry",
    "Railing",
    "Storage",
    "Garage",
    "Undefined",
]


class XixiStrategy:
    def __init__(self, inference: InferenceService, segmentation: SegmentationService) -> None:
        self.inference = inference
        self.segmentation = segmentation

    def run(self, image_bytes: bytes, params: XixiParams) -> tuple[dict, bytes]:
        image = self.inference.load_image(image_bytes)
        output, prepared = self.inference.prepare_and_run(image)
        seg = self.segmentation.split(output, prepared)

        room_map = np.argmax(seg.rooms, axis=0).astype(np.uint8)
        walls = _extract_walls(room_map, image.size, params.min_area, params.room_type_min_fraction)
        floorplan_png = _render_floorplan(image, room_map, walls)

        width, height = image.size
        result = {
            "source_file": params.source_file,
            "image_size_px": {"width": width, "height": height},
            "scale_m_per_px": None,
            "strategy": "segmap-contours",
            "wall_count": len(walls),
            "walls": walls,
        }
        return result, floorplan_png


def _extract_walls(
    room_map: np.ndarray,
    original_size: tuple[int, int],
    min_area: int,
    room_type_min_fraction: float = ROOM_TYPE_MIN_FRACTION,
) -> list[dict]:
    room_map_orig = cv2.resize(room_map.astype(np.uint8), original_size, interpolation=cv2.INTER_NEAREST)
    wall_mask = np.isin(room_map, BOUNDARY_CLASSES).astype(np.uint8) * 255
    wall_mask = cv2.resize(wall_mask, original_size, interpolation=cv2.INTER_NEAREST)
    contours, hierarchy = cv2.findContours(wall_mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    walls = []
    for i, contour in enumerate(contours):
        area = cv2.contourArea(contour)
        if area < min_area:
            continue

        perimeter = cv2.arcLength(contour, closed=True)
        x, y, w, h = cv2.boundingRect(contour)
        epsilon = 0.005 * perimeter
        approx = cv2.approxPolyDP(contour, epsilon, closed=True)
        polygon = approx.reshape(-1, 2).astype(np.float64).tolist()
        polygon = _smooth_ortho(polygon)

        has_parent = bool(hierarchy is not None and hierarchy[0][i][3] >= 0)
        room_type = _get_room_type(contour, room_map_orig, room_type_min_fraction) if has_parent else None
        approx_len = float(max(w, h))
        walls.append(
            {
                "id": len(walls),
                "polygon": [[round(float(px), 1), round(float(py), 1)] for px, py in polygon],
                "bbox": [int(x), int(y), int(w), int(h)],
                "area_px": float(area),
                "perimeter_px": float(perimeter),
                "approx_length_px": approx_len,
                "approx_length_m": None,
                "is_hole": has_parent,
                "room_type": room_type,
            }
        )

    walls.sort(key=lambda wall: wall["approx_length_px"], reverse=True)
    for idx, wall in enumerate(walls):
        wall["id"] = idx
    return walls


def _get_room_type(
    contour: np.ndarray,
    room_map_orig: np.ndarray,
    min_fraction: float = ROOM_TYPE_MIN_FRACTION,
) -> str | None:
    height, width = room_map_orig.shape
    mask = np.zeros((height, width), dtype=np.uint8)
    cv2.drawContours(mask, [contour], -1, 255, thickness=cv2.FILLED)

    interior_pixels = room_map_orig[mask > 0]
    if interior_pixels.size == 0:
        return None

    meaningful_pixels = interior_pixels[
        (interior_pixels != 0) & ~np.isin(interior_pixels, BOUNDARY_CLASSES)
    ]
    if meaningful_pixels.size == 0:
        return None

    strong_counts = {
        int(class_idx): int(np.sum(meaningful_pixels == class_idx))
        for class_idx in np.unique(meaningful_pixels)
        if int(class_idx) != UNDEFINED_ROOM_CLASS
    }
    if not strong_counts:
        return None

    dominant = max(strong_counts, key=strong_counts.get)
    if strong_counts[dominant] / meaningful_pixels.size < min_fraction:
        return None

    return ROOM_CLASSES[dominant] if dominant < len(ROOM_CLASSES) else "Unknown"


def _smooth_ortho(polygon: list[list[float]], tolerance: float = 8.0) -> list[list[float]]:
    if len(polygon) < 3:
        return polygon

    pts = np.array(polygon, dtype=np.float64)
    cv_pts = pts.reshape(-1, 1, 2).astype(np.float32)
    perim = cv2.arcLength(cv_pts, closed=True)
    approx = cv2.approxPolyDP(cv_pts, 0.005 * perim, closed=True)
    pts = approx.reshape(-1, 2).astype(np.float64)
    result = pts.copy()

    for i in range(len(pts)):
        p1 = pts[i]
        p2 = pts[(i + 1) % len(pts)]
        dx = p2[0] - p1[0]
        dy = p2[1] - p1[1]
        angle = math.degrees(math.atan2(abs(dy), abs(dx)))
        if angle <= tolerance:
            avg_y = (p1[1] + p2[1]) / 2
            result[i][1] = avg_y
            result[(i + 1) % len(pts)][1] = avg_y
        elif angle >= 90 - tolerance:
            avg_x = (p1[0] + p2[0]) / 2
            result[i][0] = avg_x
            result[(i + 1) % len(pts)][0] = avg_x

    deduped = [result[0]]
    for point in result[1:]:
        if math.hypot(point[0] - deduped[-1][0], point[1] - deduped[-1][1]) >= 3.0:
            deduped.append(point)
    if len(deduped) > 1 and math.hypot(deduped[0][0] - deduped[-1][0], deduped[0][1] - deduped[-1][1]) < 3.0:
        deduped = deduped[:-1]

    return np.array(deduped).tolist() if len(deduped) >= 3 else polygon


def _render_floorplan(image: Image.Image, room_map: np.ndarray, walls: list[dict]) -> bytes:
    original_w, original_h = image.size
    seg_image = _render_segmentation(room_map).resize((original_w, original_h), Image.NEAREST)

    overlay_base = Image.blend(image.convert("RGB"), seg_image.convert("RGB"), alpha=0.25)
    overlay = overlay_base.convert("RGBA")
    draw = ImageDraw.Draw(overlay)
    for wall in walls:
        points = [tuple(point) for point in wall["polygon"]]
        if len(points) >= 2:
            draw.polygon(points, outline=(0, 220, 60, 230), width=6)
        x, y, _w, _h = wall["bbox"]
        draw.text((x + 2, y + 2), f"W{wall['id']}", fill=(0, 220, 60, 255))

    buffer = io.BytesIO()
    overlay.convert("RGB").save(buffer, format="PNG")
    return buffer.getvalue()


def _render_segmentation(room_map: np.ndarray) -> Image.Image:
    colour_map = {
        0: (200, 200, 200),
        1: (50, 200, 50),
        2: (30, 30, 30),
        3: (255, 200, 100),
        4: (100, 180, 255),
        5: (180, 100, 255),
        6: (100, 230, 230),
        7: (230, 200, 50),
        8: (180, 180, 50),
        9: (150, 220, 150),
        10: (220, 150, 100),
        11: (200, 200, 200),
    }
    seg_rgb = np.zeros((*room_map.shape, 3), dtype=np.uint8)
    for class_idx, colour in colour_map.items():
        seg_rgb[room_map == class_idx] = colour
    return Image.fromarray(seg_rgb)
