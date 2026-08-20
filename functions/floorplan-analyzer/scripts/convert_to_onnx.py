"""Export the floorplan segmentation model to ONNX.

Run with `uv run --group dev python scripts/convert_to_onnx.py` from
`functions/floorplan-analyzer/`. Requires the `dev` dependency group
(`onnx`, `onnxruntime`, `onnxscript`), which is not installed in the
deployed Cloud Function.
"""

from __future__ import annotations

import sys
from pathlib import Path

import torch

_PACKAGE_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_PACKAGE_ROOT))

from inference.model import load_model  # noqa: E402

_WEIGHTS_DIR = _PACKAGE_ROOT / "floortrans" / "weights"
_ONNX_OUT = _WEIGHTS_DIR / "model_best_val_loss_var.onnx"

# The hourglass network is fully convolutional, so height and width are
# exported as dynamic axes — but the *specific* example shape used to trace
# still matters. The decoder's skip connections do
# `if y.shape != x.shape: interpolate(x, size=y.shape) + y else: x + y`
# (see floortrans/models/hg_furukawa_original.py). Tracing freezes whichever
# branch that condition takes for the example shape: a shape with headroom
# beyond the required 32-multiple (e.g. 512 = 32*16, plenty of factors of 2)
# keeps every intermediate feature map exactly matched, so the graph never
# records the interpolate branch at all — and then fails outright at inference
# time on shapes that *do* need it. A shape with the *minimum* possible
# 32-multiple (32 * an odd number, e.g. 736 = 32*23) hits a genuine mismatch
# partway through the hourglass, so the interpolate branch gets traced in —
# and, being a real dynamic `size=(H, W)` interpolation rather than a
# hardcoded shape, it correctly handles every other shape too (verified
# across 10 real and extreme aspect ratios; see WORK-301).
_EXAMPLE_SHAPE = (1, 3, 32 * 23, 32 * 32)  # (736, 1024): minimal height, generous width


def convert(
    weights_path: str | Path | None = None, onnx_path: Path = _ONNX_OUT
) -> Path:
    """Export `model_best_val_loss_var.pkl` to ONNX. Returns the output path."""
    model = load_model(weights_path)
    example = torch.zeros(_EXAMPLE_SHAPE)

    # `dynamo=False` uses the older TorchScript-based tracer. The newer
    # default (dynamo=True) exporter's symbolic shape solver cannot prove
    # the hourglass network's internal resize arithmetic, and fails outright
    # on this model. See WORK-301 for the parity validation this relies on.
    torch.onnx.export(
        model,
        example,
        str(onnx_path),
        input_names=["image"],
        output_names=["segmentation"],
        dynamic_axes={
            "image": {0: "batch", 2: "height", 3: "width"},
            "segmentation": {0: "batch", 2: "height", 3: "width"},
        },
        opset_version=17,
        dynamo=False,
    )
    return onnx_path


if __name__ == "__main__":
    output_path = convert()
    size_mb = output_path.stat().st_size / (1024 * 1024)
    print(f"Exported {output_path} ({size_mb:.1f} MB)")
