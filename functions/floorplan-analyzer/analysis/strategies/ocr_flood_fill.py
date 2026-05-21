from __future__ import annotations

import io

import cv2
import numpy as np
from inference.service import InferenceService
from ocr.schemas import OcrSeed
from ocr.service import OcrService
from PIL import Image, ImageDraw, ImageFont
from segmentation.service import SegmentationService

from analysis.schemas import OcrFloodFillParams

WALL_CLASS = 2
DEFAULT_WALL_KERNEL_SIZE = 15


class OcrFloodFillStrategy:
    def __init__(
        self,
        inference: InferenceService,
        segmentation: SegmentationService,
        ocr: OcrService,
    ) -> None:
        self.inference = inference
        self.segmentation = segmentation
        self.ocr = ocr

    def run(self, image_bytes: bytes, params: OcrFloodFillParams) -> tuple[dict, bytes]:
        image = self.inference.load_image(image_bytes)
        original_w, original_h = image.size
        output, prepared = self.inference.prepare_and_run(image)
        seg = self.segmentation.split(output, prepared)

        room_map_full = np.argmax(seg.rooms, axis=0).astype(np.uint8)
        wall_mask = (room_map_full == WALL_CLASS).astype(np.uint8)
        wall_mask_closed = _close_wall_mask(wall_mask, params.wall_kernel_size)
        seeds = self.ocr.find_seeds(image)
        rooms_result = _rooms_from_seeds(
            wall_mask_closed, seeds, min_area=params.min_area
        )

        result = {
            "source_file": params.source_file,
            "image_size_px": {"width": original_w, "height": original_h},
            "scale_m_per_px": None,
            "strategy": "ocr-flood-fill",
            "wall_kernel_size": params.wall_kernel_size,
            "ocr_seed_count": len(seeds),
            "room_count": len(rooms_result),
            "rooms": rooms_result,
        }
        return result, _render_floorplan(image, rooms_result, seeds, wall_mask_closed)


def _close_wall_mask(wall_mask: np.ndarray, kernel_size: int) -> np.ndarray:
    kernel_size = max(1, int(kernel_size))
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_size, kernel_size))
    return cv2.morphologyEx(wall_mask, cv2.MORPH_CLOSE, kernel)


def _rooms_from_seeds(
    wall_mask_closed: np.ndarray,
    seeds: list[OcrSeed],
    *,
    min_area: int,
) -> list[dict]:
    height, width = wall_mask_closed.shape[:2]
    rooms = []

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
            polygon = contour[:, 0, :].astype(np.float64)
            x, y, w, h = cv2.boundingRect(contour)
            rooms.append(
                {
                    "id": len(rooms),
                    "label": seed["label"],
                    "source_text": seed["text"],
                    "matched_keyword": seed["matched_keyword"],
                    "ocr_confidence": seed["confidence"],
                    "seed": [cx, cy],
                    "polygon": [
                        [round(float(px), 1), round(float(py), 1)] for px, py in polygon
                    ],
                    "bbox": [int(x), int(y), int(w), int(h)],
                    "area_px": contour_area,
                    "pixel_area_px": area,
                    "perimeter_px": float(perimeter),
                }
            )

    return rooms


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
