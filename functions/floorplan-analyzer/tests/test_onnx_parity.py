from __future__ import annotations

import unittest
from pathlib import Path

import numpy as np
import onnxruntime as ort
import torch
from inference.model import load_model
from inference.preprocess import prepare
from PIL import Image, ImageDraw

_ONNX_PATH = (
    Path(__file__).resolve().parent.parent
    / "floortrans"
    / "weights"
    / "model_best_val_loss_var.onnx"
)


def _synthetic_floorplan(width: int, height: int) -> Image.Image:
    """A simple wall-and-room line drawing, not a real floorplan. Good enough
    to exercise the model's shape handling without shipping real customer
    drawings in the repo."""
    image = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(image)
    draw.rectangle([20, 20, width - 20, height - 20], outline="black", width=4)
    draw.line([(width // 2, 20), (width // 2, height - 20)], fill="black", width=4)
    draw.line([(20, height // 3), (width - 20, height // 3)], fill="black", width=4)
    return image


class OnnxParityTests(unittest.TestCase):
    """Confirms the exported ONNX model (scripts/convert_to_onnx.py) matches
    the original PyTorch model's output. See WORK-301: validated against
    real floorplans separately; this synthetic-image check guards against
    future regressions (e.g. a re-export drifting from the checkpoint)."""

    @classmethod
    def setUpClass(cls) -> None:
        if not _ONNX_PATH.exists():
            raise unittest.SkipTest(
                f"{_ONNX_PATH} not found; run scripts/convert_to_onnx.py first"
            )
        cls.model = load_model()
        cls.session = ort.InferenceSession(
            str(_ONNX_PATH), providers=["CPUExecutionProvider"]
        )

    def test_matches_pytorch_on_landscape_input(self) -> None:
        self._assert_parity(_synthetic_floorplan(1024, 736))

    def test_matches_pytorch_on_portrait_input(self) -> None:
        self._assert_parity(_synthetic_floorplan(608, 1024))

    def _assert_parity(self, image: Image.Image) -> None:
        tensor = prepare(image).tensor

        with torch.no_grad():
            pt_output = self.model(tensor).numpy()
        (onnx_output,) = self.session.run(None, {"image": tensor.numpy()})

        self.assertEqual(pt_output.shape, onnx_output.shape)
        agreement = (pt_output.argmax(axis=1) == onnx_output.argmax(axis=1)).mean()
        self.assertGreaterEqual(agreement, 0.999)
        self.assertLess(np.abs(pt_output - onnx_output).max(), 0.01)


if __name__ == "__main__":
    unittest.main()
