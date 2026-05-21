"""Reusable preprocessing primitives used by inference strategies.

The CubiCasa hourglass network is fully convolutional and accepts inputs of any
spatial size, but its internal max-pooling stack requires both height and width
to be multiples of 32. Strategies build their preprocessing on top of these
primitives.
"""

from __future__ import annotations

import io
import math
from dataclasses import dataclass

import cv2
import numpy as np
import torch
from PIL import Image

_MEAN = np.array([0.5, 0.5, 0.5], dtype=np.float32)
_STD = np.array([0.5, 0.5, 0.5], dtype=np.float32)


def round32(n: int) -> int:
    return math.ceil(n / 32) * 32


@dataclass(frozen=True)
class PreparedImage:
    """An image that's been resized + normalised + tensorised, plus the affine
    map back to the original image's coordinate space.

    Polygons produced from inference on `tensor` live in pixel coordinates of
    `(infer_h, infer_w)`. To map them back to original image coordinates, use
    `to_original_xy`.
    """

    tensor: torch.Tensor  # (1, 3, H, W) in [-1, 1]
    infer_shape: tuple[int, int]  # (H, W) of the inference tensor
    crop_xyxy: tuple[int, int, int, int]  # (x0, y0, x1, y1) in original image coords
    original_size: tuple[int, int]  # (W, H) of the original image

    def to_original_xy(self, polygon_xy: np.ndarray) -> np.ndarray:
        """Map (N, 2) polygon coords from inference space back to the original
        image's coordinate space (pixels of `original_size`)."""
        infer_h, infer_w = self.infer_shape
        x0, y0, x1, y1 = self.crop_xyxy
        crop_w = max(1, x1 - x0)
        crop_h = max(1, y1 - y0)
        sx = crop_w / infer_w
        sy = crop_h / infer_h
        out = polygon_xy.astype(np.float32, copy=True)
        out[:, 0] = out[:, 0] * sx + x0
        out[:, 1] = out[:, 1] * sy + y0
        return out


def load_pil(image_bytes: bytes) -> Image.Image:
    return Image.open(io.BytesIO(image_bytes)).convert("RGB")


def to_normalized_tensor(image: Image.Image) -> torch.Tensor:
    arr = np.asarray(image, dtype=np.float32) / 255.0
    arr = (arr - _MEAN) / _STD
    return torch.from_numpy(arr.transpose(2, 0, 1)).unsqueeze(0).contiguous()


def resize_round32(image: Image.Image) -> tuple[Image.Image, tuple[int, int]]:
    """Resize an image so both sides are multiples of 32. Returns the resized
    image and its `(H, W)` shape."""
    w, h = image.size
    new_w, new_h = round32(w), round32(h)
    if (new_w, new_h) != (w, h):
        image = image.resize((new_w, new_h), Image.LANCZOS)
    return image, (new_h, new_w)


def fit_long_edge(image: Image.Image, target: int) -> Image.Image:
    """Resize so the longest edge equals `target`, preserving aspect ratio."""
    w, h = image.size
    long_edge = max(w, h)
    if long_edge == target:
        return image
    scale = target / long_edge
    return image.resize(
        (max(1, int(round(w * scale))), max(1, int(round(h * scale)))), Image.LANCZOS
    )


def fit_short_edge(image: Image.Image, target: int) -> Image.Image:
    """Resize so the shortest edge equals `target`, preserving aspect ratio."""
    w, h = image.size
    short_edge = min(w, h)
    if short_edge == target:
        return image
    scale = target / short_edge
    return image.resize(
        (max(1, int(round(w * scale))), max(1, int(round(h * scale)))), Image.LANCZOS
    )


def detect_drawing_bbox(
    image: Image.Image,
    ink_threshold: int = 220,
    window_frac: float = 0.04,
    density_threshold: float = 0.08,
    pad_frac: float = 0.01,
) -> tuple[int, int, int, int]:
    """Auto-detect the bounding box of the densest ink region.

    Architectural drawings embed the floor plan in a sea of dimension lines,
    title blocks, legends and area-analysis tables. Naive connected-component
    analysis fails because the page-frame line connects everything, and a
    morphological-closing approach is sensitive to whether the walls are drawn
    as thick filled strokes vs. parallel-line pairs.

    Instead we compute *local ink density* in a window roughly the size of a
    small room (`window_frac` of the short edge), threshold at
    `density_threshold` to get a "where is there a lot of stuff" mask, find
    connected components, and return the bbox of the largest. The floor plan
    has high local density (walls everywhere) while title blocks, legends and
    dimension lines are sparser — so the largest dense region is reliably the
    floor plan.

    Returns `(x0, y0, x1, y1)` in pixels.
    """
    w, h = image.size
    grey = np.asarray(image.convert("L"), dtype=np.uint8)
    ink = (grey < ink_threshold).astype(np.float32)
    win = max(40, int(round(min(w, h) * window_frac)))
    density = cv2.boxFilter(ink, ddepth=cv2.CV_32F, ksize=(win, win))
    dense = (density > density_threshold).astype(np.uint8) * 255

    n_labels, _labels, stats, _ = cv2.connectedComponentsWithStats(
        dense, connectivity=8
    )
    if n_labels <= 1:
        return 0, 0, w, h
    areas = stats[1:, cv2.CC_STAT_AREA]
    largest = 1 + int(np.argmax(areas))
    x = int(stats[largest, cv2.CC_STAT_LEFT])
    y = int(stats[largest, cv2.CC_STAT_TOP])
    bw = int(stats[largest, cv2.CC_STAT_WIDTH])
    bh = int(stats[largest, cv2.CC_STAT_HEIGHT])
    pad = int(round(min(w, h) * pad_frac))
    x0 = max(0, x - pad)
    y0 = max(0, y - pad)
    x1 = min(w, x + bw + pad)
    y1 = min(h, y + bh + pad)
    if x1 - x0 < 32 or y1 - y0 < 32:
        return 0, 0, w, h
    return x0, y0, x1, y1


def prepare(
    image: Image.Image,
    *,
    crop_xyxy: tuple[int, int, int, int] | None = None,
    fit_long: int | None = None,
    fit_short: int | None = None,
) -> PreparedImage:
    """Crop / resize / normalise an image into a tensor ready for the model.

    Parameters
    ----------
    crop_xyxy
        Optional `(x0, y0, x1, y1)` crop in the original image's coords.
    fit_long
        If set, resize the (cropped) image so its longest edge equals this.
    fit_short
        If set, resize the (cropped) image so its shortest edge equals this.

    Both `fit_long` and `fit_short` are mutually exclusive. After fitting the
    image is always rounded up to the nearest 32 multiple (the network
    requires this).
    """
    if fit_long is not None and fit_short is not None:
        raise ValueError("fit_long and fit_short are mutually exclusive")
    original_w, original_h = image.size
    if crop_xyxy is None:
        crop_xyxy = (0, 0, original_w, original_h)
    x0, y0, x1, y1 = crop_xyxy
    cropped = image.crop((x0, y0, x1, y1))
    if fit_long is not None:
        cropped = fit_long_edge(cropped, fit_long)
    elif fit_short is not None:
        cropped = fit_short_edge(cropped, fit_short)
    cropped, infer_shape = resize_round32(cropped)
    tensor = to_normalized_tensor(cropped)
    return PreparedImage(
        tensor=tensor,
        infer_shape=infer_shape,
        crop_xyxy=crop_xyxy,
        original_size=(original_w, original_h),
    )
