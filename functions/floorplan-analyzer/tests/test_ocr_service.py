from __future__ import annotations

import unittest
from unittest.mock import patch

from ocr.service import OcrService


class ReadTextAndSeedsTests(unittest.TestCase):
    def test_returns_full_detected_text_including_unmatched_entries(self) -> None:
        detected = [
            {
                "text": "Bedroom 1",
                "confidence": 0.95,
                "bbox": [[0, 0], [10, 0], [10, 10], [0, 10]],
            },
            {
                "text": "2400",
                "confidence": 0.6,
                "bbox": [[20, 0], [30, 0], [30, 10], [20, 10]],
            },
        ]
        service = OcrService()

        with patch.object(OcrService, "read_text", return_value=detected):
            detected_texts, seeds = service.read_text_and_seeds(image=None)

        self.assertEqual(detected_texts, detected)
        self.assertEqual(len(seeds), 1)
        self.assertEqual(seeds[0]["text"], "Bedroom 1")
        self.assertEqual(seeds[0]["matched_keyword"], "bed")

    def test_summarize_detected_text_drops_low_confidence_and_bbox(self) -> None:
        detected = [
            {"text": "Bedroom 1", "confidence": 0.95, "bbox": [[0, 0]]},
            {"text": "2400", "confidence": 0.2, "bbox": [[0, 0]]},
        ]
        service = OcrService()

        self.assertEqual(
            service.summarize_detected_text(detected),
            [{"text": "Bedroom 1", "confidence": 0.95}],
        )


if __name__ == "__main__":
    unittest.main()
