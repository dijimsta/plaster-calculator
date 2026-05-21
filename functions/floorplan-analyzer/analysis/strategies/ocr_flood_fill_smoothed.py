from __future__ import annotations

import io
import math

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

from analysis.schemas import OcrFloodFillSmoothedParams
from analysis.strategies.xixi import ROOM_TYPE_MIN_FRACTION, _get_room_type
from inference.service import InferenceService
from ocr.service import OcrService
from ocr.schemas import OcrSeed
from segmentation.service import SegmentationService

WALL_CLASS = 2
RAILING_CLASS = 8
BOUNDARY_CLASSES = (WALL_CLASS, RAILING_CLASS)
DEFAULT_WALL_KERNEL_SIZE = 15
DEFAULT_SIMPLIFY_EPSILON_RATIO = 0.005
DEFAULT_ORTHO_TOLERANCE_DEGREES = 8.0
DEFAULT_MIN_POINT_DISTANCE_PX = 3.0
DEFAULT_UNKNOWN_ROOM_MIN_AREA = 1000


class OcrFloodFillSmoothedStrategy:
    def __init__(
        self,
        inference: InferenceService,
        segmentation: SegmentationService,
        ocr: OcrService,
    ) -> None:
        self.inference = inference
        self.segmentation = segmentation
        self.ocr = ocr

    def run(self, image_bytes: bytes, params: OcrFloodFillSmoothedParams) -> tuple[dict, bytes]:
        image = self.inference.load_image(image_bytes)
        original_w, original_h = image.size
        output, prepared = self.inference.prepare_and_run(image)
        seg = self.segmentation.split(output, prepared)

        room_map_full = np.argmax(seg.rooms, axis=0).astype(np.uint8)
        room_map_orig = cv2.resize(room_map_full, (original_w, original_h), interpolation=cv2.INTER_NEAREST)

        wall_mask = np.isin(room_map_full, BOUNDARY_CLASSES).astype(np.uint8)
        wall_mask = cv2.resize(wall_mask, (original_w, original_h), interpolation=cv2.INTER_NEAREST)
        wall_mask_closed = _close_wall_mask(wall_mask, params.wall_kernel_size)
        seeds = self.ocr.find_seeds(image)
        rooms_result = _rooms_from_seeds(
            wall_mask_closed,
            seeds,
            room_map_orig=room_map_orig,
            min_area=params.min_area,
            simplify_epsilon_ratio=params.simplify_epsilon_ratio,
            ortho_tolerance_degrees=params.ortho_tolerance_degrees,
            min_point_distance_px=params.min_point_distance_px,
            unknown_room_min_area=params.unknown_room_min_area,
            ocr_service=self.ocr,
        )

        result = {
            "source_file": params.source_file,
            "image_size_px": {"width": original_w, "height": original_h},
            "scale_m_per_px": None,
            "strategy": "ocr-flood-fill-smoothed",
            "wall_kernel_size": params.wall_kernel_size,
            "simplify_epsilon_ratio": params.simplify_epsilon_ratio,
            "ortho_tolerance_degrees": params.ortho_tolerance_degrees,
            "min_point_distance_px": params.min_point_distance_px,
            "unknown_room_min_area": params.unknown_room_min_area,
            "ocr_seed_count": len(seeds),
            "room_count": len(rooms_result),
            "unknown_room_count": sum(1 for room in rooms_result if room.get("source") == "closed_region_fallback"),
            "rooms": rooms_result,
        }
        return result, _render_floorplan(image, rooms_result, seeds, wall_mask_closed)


def _close_wall_mask(wall_mask: np.ndarray, kernel_size: int) -> np.ndarray:
    kernel_size = max(1, int(kernel_size))
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_size, kernel_size))
    return cv2.morphologyEx(wall_mask, cv2.MORPH_CLOSE, kernel)


def _room_type_for_contour(
    seed: OcrSeed,
    contour: np.ndarray,
    room_map_orig: np.ndarray | None,
    ocr_service: OcrService,
) -> str | None:
    return ocr_service.room_type_from_keyword(seed.get("matched_keyword")) or (
        _get_room_type(contour, room_map_orig, ROOM_TYPE_MIN_FRACTION)
        if room_map_orig is not None
        else None
    )


def _rooms_from_seeds(
    wall_mask_closed: np.ndarray,
    seeds: list[OcrSeed],
    *,
    room_map_orig: np.ndarray | None = None,
    min_area: int,
    simplify_epsilon_ratio: float,
    ortho_tolerance_degrees: float,
    min_point_distance_px: float,
    unknown_room_min_area: int,
    ocr_service: OcrService,
) -> list[dict]:
    height, width = wall_mask_closed.shape[:2]
    rooms = []
    accepted_mask = np.zeros((height, width), dtype=bool)
    accepted_regions: list[dict] = []

    for seed in seeds:
        cx = int(seed["x"])
        cy = int(seed["y"])
        if cx < 0 or cy < 0 or cx >= width or cy >= height:
            continue

        canvas = wall_mask_closed.copy()
        if canvas[cy, cx] != 0:
            continue

        flood_mask = np.zeros((height + 2, width + 2), dtype=np.uint8)
        filled = canvas.copy()
        cv2.floodFill(filled, flood_mask, (cx, cy), 2)
        region = filled == 2

        if _touches_border(region):
            continue

        area = int(region.sum())
        if area < min_area:
            continue

        duplicate = _find_duplicate_region(region, accepted_regions)
        if duplicate is not None:
            _add_duplicate_seed(duplicate["room"], seed, cx, cy)
            continue

        contours, _ = cv2.findContours(
            region.astype(np.uint8),
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE,
        )
        if not contours:
            continue

        for contour in contours:
            if len(contour) < 3:
                continue
            contour_area = float(cv2.contourArea(contour))
            if contour_area < min_area:
                continue
            perimeter = cv2.arcLength(contour, closed=True)
            if perimeter <= 0:
                continue
            polygon = _smooth_room_contour(
                contour,
                perimeter,
                simplify_epsilon_ratio=simplify_epsilon_ratio,
                ortho_tolerance_degrees=ortho_tolerance_degrees,
                min_point_distance_px=min_point_distance_px,
            )
            if len(polygon) < 3:
                continue
            x, y, w, h = cv2.boundingRect(contour)
            room_type = _room_type_for_contour(seed, contour, room_map_orig, ocr_service)
            room = {
                "id": len(rooms),
                "label": seed["label"],
                "source_text": seed["text"],
                "matched_keyword": seed["matched_keyword"],
                "room_type": room_type,
                "ocr_confidence": seed["confidence"],
                "seed": [cx, cy],
                "polygon": [
                    [round(float(px), 1), round(float(py), 1)]
                    for px, py in polygon
                ],
                "bbox": [int(x), int(y), int(w), int(h)],
                "area_px": contour_area,
                "pixel_area_px": area,
                "perimeter_px": float(perimeter),
                "raw_point_count": int(len(contour)),
                "smoothed_point_count": int(len(polygon)),
                "ocr_seeds": [_seed_summary(seed, cx, cy)],
                "duplicate_ocr_seeds": [],
                "merged_labels": [seed["label"]],
            }
            rooms.append(room)
            accepted_mask |= region
            accepted_regions.append({"region": region.copy(), "room": room})

    rooms.extend(
        _unknown_rooms_from_closed_regions(
            wall_mask_closed,
            accepted_mask,
            start_id=len(rooms),
            min_area=unknown_room_min_area,
            simplify_epsilon_ratio=simplify_epsilon_ratio,
            ortho_tolerance_degrees=ortho_tolerance_degrees,
            min_point_distance_px=min_point_distance_px,
        )
    )

    return rooms


def _find_duplicate_region(region: np.ndarray, accepted_regions: list[dict]) -> dict | None:
    area = int(region.sum())
    if area <= 0:
        return None
    for accepted in accepted_regions:
        accepted_region = accepted["region"]
        accepted_area = int(accepted_region.sum())
        if accepted_area <= 0:
            continue
        overlap = int(np.logical_and(region, accepted_region).sum())
        if overlap / min(area, accepted_area) >= 0.98:
            return accepted
    return None


def _seed_summary(seed: OcrSeed, cx: int, cy: int) -> dict:
    return {
        "text": seed["text"],
        "label": seed["label"],
        "matched_keyword": seed["matched_keyword"],
        "confidence": float(seed["confidence"]),
        "seed": [int(cx), int(cy)],
    }


def _add_duplicate_seed(room: dict, seed: OcrSeed, cx: int, cy: int) -> None:
    summary = _seed_summary(seed, cx, cy)
    room.setdefault("duplicate_ocr_seeds", []).append(summary)
    labels = room.setdefault("merged_labels", [room.get("label")])
    if seed["label"] not in labels:
        labels.append(seed["label"])


def _unknown_rooms_from_closed_regions(
    wall_mask_closed: np.ndarray,
    accepted_mask: np.ndarray,
    *,
    start_id: int,
    min_area: int,
    simplify_epsilon_ratio: float,
    ortho_tolerance_degrees: float,
    min_point_distance_px: float,
) -> list[dict]:
    fillable = (wall_mask_closed == 0).astype(np.uint8)
    label_count, labels, stats, centroids = cv2.connectedComponentsWithStats(fillable, connectivity=8)
    rooms = []

    for label_idx in range(1, label_count):
        area = int(stats[label_idx, cv2.CC_STAT_AREA])
        if area < min_area:
            continue

        region = labels == label_idx
        if _touches_border(region):
            continue

        if accepted_mask[region].any():
            continue

        contours, _ = cv2.findContours(
            region.astype(np.uint8),
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE,
        )
        if not contours:
            continue

        cx, cy = centroids[label_idx]
        for contour in contours:
            if len(contour) < 3:
                continue
            contour_area = float(cv2.contourArea(contour))
            if contour_area < min_area:
                continue
            perimeter = cv2.arcLength(contour, closed=True)
            if perimeter <= 0:
                continue
            polygon = _smooth_room_contour(
                contour,
                perimeter,
                simplify_epsilon_ratio=simplify_epsilon_ratio,
                ortho_tolerance_degrees=ortho_tolerance_degrees,
                min_point_distance_px=min_point_distance_px,
            )
            if len(polygon) < 3:
                continue
            x, y, w, h = cv2.boundingRect(contour)
            rooms.append(
                {
                    "id": start_id + len(rooms),
                    "label": "Unknown",
                    "source": "closed_region_fallback",
                    "source_text": "",
                    "matched_keyword": None,
                    "ocr_confidence": None,
                    "seed": [int(round(cx)), int(round(cy))],
                    "polygon": [
                        [round(float(px), 1), round(float(py), 1)]
                        for px, py in polygon
                    ],
                    "bbox": [int(x), int(y), int(w), int(h)],
                    "area_px": contour_area,
                    "pixel_area_px": area,
                    "perimeter_px": float(perimeter),
                    "raw_point_count": int(len(contour)),
                    "smoothed_point_count": int(len(polygon)),
                }
            )

    return rooms


def _smooth_room_contour(
    contour: np.ndarray,
    perimeter: float,
    *,
    simplify_epsilon_ratio: float,
    ortho_tolerance_degrees: float,
    min_point_distance_px: float,
) -> list[list[float]]:
    epsilon = max(0.0, simplify_epsilon_ratio) * perimeter
    approx = cv2.approxPolyDP(contour, epsilon, closed=True)
    polygon = approx.reshape(-1, 2).astype(np.float64).tolist()
    return _smooth_ortho(
        polygon,
        tolerance=ortho_tolerance_degrees,
        epsilon_ratio=simplify_epsilon_ratio,
        min_point_distance=min_point_distance_px,
    )


def _smooth_ortho(
    polygon: list[list[float]],
    *,
    tolerance: float,
    epsilon_ratio: float,
    min_point_distance: float,
) -> list[list[float]]:
    if len(polygon) < 3:
        return polygon

    pts = np.array(polygon, dtype=np.float64)
    cv_pts = pts.reshape(-1, 1, 2).astype(np.float32)
    perim = cv2.arcLength(cv_pts, closed=True)
    approx = cv2.approxPolyDP(cv_pts, max(0.0, epsilon_ratio) * perim, closed=True)
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
        if math.hypot(point[0] - deduped[-1][0], point[1] - deduped[-1][1]) >= min_point_distance:
            deduped.append(point)
    if len(deduped) > 1 and math.hypot(deduped[0][0] - deduped[-1][0], deduped[0][1] - deduped[-1][1]) < min_point_distance:
        deduped = deduped[:-1]

    return np.array(deduped).tolist() if len(deduped) >= 3 else polygon


def _touches_border(region: np.ndarray) -> bool:
    return bool(
        region[0, :].any()
        or region[-1, :].any()
        or region[:, 0].any()
        or region[:, -1].any()
    )


def _render_floorplan(
    image: Image.Image,
    rooms: list[dict],
    seeds: list[OcrSeed],
    wall_mask_closed: np.ndarray,
) -> bytes:
    overlay = image.convert("RGBA")

    wall_img = Image.fromarray((wall_mask_closed * 255).astype(np.uint8), mode="L")
    wall_overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    wall_overlay.putalpha(wall_img.point(lambda px: 70 if px else 0))
    overlay = Image.alpha_composite(overlay, wall_overlay)
    draw = ImageDraw.Draw(overlay, "RGBA")

    palette = [
        (255, 200, 100),
        (100, 180, 255),
        (180, 100, 255),
        (100, 230, 230),
        (230, 200, 50),
        (150, 220, 150),
        (220, 150, 100),
        (200, 120, 220),
    ]
    font = _font()
    for i, room in enumerate(rooms):
        colour = palette[i % len(palette)]
        points = [tuple(point) for point in room["polygon"]]
        if len(points) < 3:
            continue
        draw.polygon(points, fill=(*colour, 90), outline=(*colour, 240))
        sx, sy = room["seed"]
        draw.text((sx + 4, sy + 4), room["label"], fill=(255, 255, 255, 255), font=font)

    for seed in seeds:
        cx = int(seed["x"])
        cy = int(seed["y"])
        draw.line([(cx - 8, cy), (cx + 8, cy)], fill=(255, 0, 0, 255), width=2)
        draw.line([(cx, cy - 8), (cx, cy + 8)], fill=(255, 0, 0, 255), width=2)

    buffer = io.BytesIO()
    overlay.convert("RGB").save(buffer, format="PNG")
    return buffer.getvalue()


def _font():
    try:
        return ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 18)
    except OSError:
        return ImageFont.load_default()
