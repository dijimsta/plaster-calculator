from __future__ import annotations

import unittest

import numpy as np
from analysis.strategies.ocr_flood_fill_smoothed import _sink_icons
from inference.preprocess import PreparedImage


class SinkIconTests(unittest.TestCase):
    def test_sink_geometry_is_mapped_to_original_image_coordinates(self) -> None:
        icons = np.zeros((11, 20, 40), dtype=np.float32)
        icons[6, 4:10, 8:16] = 1
        prepared = PreparedImage(
            tensor=None,
            infer_shape=(20, 40),
            crop_xyxy=(10, 20, 210, 120),
            original_size=(300, 200),
        )

        self.assertEqual(
            _sink_icons(icons, prepared),
            [
                {
                    "label": "Sink",
                    "polygon": [
                        [50.0, 40.0],
                        [90.0, 40.0],
                        [90.0, 70.0],
                        [50.0, 70.0],
                    ],
                }
            ],
        )


if __name__ == "__main__":
    unittest.main()
