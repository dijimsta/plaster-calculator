"""Render a result dict onto its source image as a translucent overlay."""
from __future__ import annotations

from pathlib import Path

import numpy as np
import torch
import torch.nn as nn
from PIL import Image, ImageDraw, ImageFont

_ROOM_COLOURS: dict[str, tuple[int, int, int]] = {
    "Background": (220, 220, 220),
    "Outdoor": (160, 200, 160),
    "Wall": (90, 90, 90),
    "Kitchen": (255, 200, 100),
    "Living Room": (255, 230, 130),
    "Bed Room": (140, 200, 255),
    "Bath": (180, 230, 255),
    "Entry/Corridor": (220, 220, 180),
    "Railing": (200, 200, 200),
    "Storage": (200, 170, 230),
    "Garage": (170, 170, 170),
    "Undefined": (220, 200, 200),
}

_ICON_COLOURS: dict[str, tuple[int, int, int]] = {
    "Window": (50, 200, 255),
    "Door": (255, 100, 50),
    "Closet": (200, 150, 100),
    "Electrical Appliance": (255, 200, 50),
    "Toilet": (255, 50, 200),
    "Sink": (50, 255, 200),
    "Sauna Bench": (180, 130, 80),
    "Fire Place": (255, 80, 50),
    "Bathtub": (130, 200, 255),
    "Chimney": (90, 90, 90),
}

_FALLBACK_PALETTE = [
    (255, 200, 100), (100, 200, 255), (200, 255, 100), (255, 100, 200),
    (100, 255, 200), (255, 150, 50), (50, 150, 255), (200, 100, 255),
    (100, 255, 150), (255, 255, 100), (100, 200, 200), (200, 200, 200),
]


def _label_colour(table: dict[str, tuple[int, int, int]], label: str, idx: int) -> tuple[int, int, int]:
    if label in table:
        return table[label]
    return _FALLBACK_PALETTE[idx % len(_FALLBACK_PALETTE)]


def render_overlay(
    image_path: str | Path,
    result: dict,
    out_path: str | Path,
    *,
    title: str | None = None,
) -> None:
    """Render walls/rooms/icons onto the source image and save to out_path."""
    image = Image.open(image_path).convert("RGB")
    draw = ImageDraw.Draw(image, "RGBA")

    rooms = result.get("rooms", [])
    walls = result.get("walls", [])
    icons = result.get("icons", [])

    for i, room in enumerate(rooms):
        label = room.get("label", "")
        r, g, b = _label_colour(_ROOM_COLOURS, label, i)
        pts = [(x, y) for x, y in room["polygon"]]
        if len(pts) >= 3:
            draw.polygon(pts, fill=(r, g, b, 110), outline=(r, g, b, 220))

    for wall in walls:
        pts = [(x, y) for x, y in wall["polygon"]]
        if len(pts) >= 3:
            draw.polygon(pts, fill=(50, 50, 50, 200), outline=(0, 0, 0, 255))

    for i, icon in enumerate(icons):
        label = icon.get("label", "")
        r, g, b = _label_colour(_ICON_COLOURS, label, i)
        pts = [(x, y) for x, y in icon["polygon"]]
        if len(pts) >= 3:
            draw.polygon(pts, fill=(r, g, b, 140), outline=(r, g, b, 255))

    if title:
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 36)
        except OSError:
            font = ImageFont.load_default()
        draw.rectangle([0, 0, image.size[0], 60], fill=(0, 0, 0, 180))
        draw.text((12, 12), title, fill=(255, 255, 255, 255), font=font)

    image.save(out_path)


# Class index → colour, matching the order in segmentation.result._ROOM_LABELS
_ROOM_COLOUR_LUT: list[tuple[int, int, int]] = [
    _ROOM_COLOURS.get(label, (200, 200, 200))
    for label in [
        "Background", "Outdoor", "Wall", "Kitchen", "Living Room",
        "Bed Room", "Bath", "Entry/Corridor", "Railing", "Storage",
        "Garage", "Undefined",
    ]
]


def render_segmentation_map(image_bytes: bytes, model: nn.Module) -> Image.Image:
    """Return a colour-coded room segmentation map in the original image's pixel space."""
    from segmentation.postprocess import split_outputs
    from inference.preprocess import load_pil, prepare

    image = load_pil(image_bytes)
    prepared = prepare(image)

    with torch.no_grad():
        output = model(prepared.tensor)

    _heatmaps, rooms, _icons = split_outputs(output, prepared.infer_shape)

    room_map = np.argmax(rooms, axis=0).astype(np.int32)

    lut = np.array(_ROOM_COLOUR_LUT, dtype=np.uint8)
    room_map_clipped = np.clip(room_map, 0, len(lut) - 1)
    seg_rgb = lut[room_map_clipped]

    seg_img = Image.fromarray(seg_rgb)

    x0, y0, x1, y1 = prepared.crop_xyxy
    orig_w, orig_h = prepared.original_size
    seg_img = seg_img.resize((x1 - x0, y1 - y0), Image.NEAREST)

    result = Image.new("RGB", (orig_w, orig_h), color=_ROOM_COLOUR_LUT[0])
    result.paste(seg_img, (x0, y0))
    return result
