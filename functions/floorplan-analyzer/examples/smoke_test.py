"""Smoke-test every processor on examples/floorplan.png and dump artifacts to tmp/.

Drop a floor plan image at examples/floorplan.png before running. The image
is not committed (it usually contains PII like addresses and permit numbers).
"""
import json
import os
import sys
from pathlib import Path

os.environ.setdefault("EASYOCR_MODULE_PATH", "/tmp/easyocr")

REPO_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPO_ROOT))

from cubicasa_core import (
    load_model,
    render_segmentation_map,
    run_get_polygons,
    run_inference,
)
from cubicasa_api.ocr_flood_fill import run_ocr_flood_fill_process
from cubicasa_api.ocr_flood_fill_smoothed import run_ocr_flood_fill_smoothed_process
from cubicasa_api.xixi import run_xixi_process

IMAGE = REPO_ROOT / "examples" / "floorplan.png"
OUT = REPO_ROOT / "examples" / "tmp"
OUT.mkdir(exist_ok=True)

image_bytes = IMAGE.read_bytes()
model = load_model()
print(f"loaded image {IMAGE.name} ({len(image_bytes)} bytes), model ready")

result = run_inference(image_bytes, model)
print(
    f"  analyse              -> rooms={len(result['rooms'])} walls={len(result['walls'])} icons={len(result['icons'])}"
)
(OUT / "analyse.json").write_text(json.dumps(result))

result = run_get_polygons(image_bytes, model, threshold=0.5)
print(
    f"  debug_get_polygons   -> polygons={len(result['polygons'])} room_polygons={len(result['room_polygons'])}"
)
(OUT / "debug_get_polygons.json").write_text(json.dumps(result))

seg = render_segmentation_map(image_bytes, model)
seg.save(OUT / "debug_segmentation.png")
print(f"  debug_segmentation   -> {seg.size[0]}x{seg.size[1]} PNG")

xixi_result, xixi_png = run_xixi_process(
    image_bytes, model, source_file=IMAGE.name, min_area=800
)
print(
    f"  xixi_process         -> walls={xixi_result['wall_count']} png={len(xixi_png)}b"
)
(OUT / "xixi.json").write_text(json.dumps(xixi_result))
(OUT / "xixi.png").write_bytes(xixi_png)

ocr_result, ocr_png = run_ocr_flood_fill_process(
    image_bytes, model, source_file=IMAGE.name, min_area=0
)
print(
    f"  ocr_flood_fill       -> rooms={ocr_result['room_count']} seeds={ocr_result['ocr_seed_count']} png={len(ocr_png)}b"
)
(OUT / "ocr_flood_fill.json").write_text(json.dumps(ocr_result))
(OUT / "ocr_flood_fill.png").write_bytes(ocr_png)

smoothed_result, smoothed_png = run_ocr_flood_fill_smoothed_process(
    image_bytes, model, source_file=IMAGE.name, min_area=0
)
print(
    f"  ocr_flood_fill_smoothed -> rooms={smoothed_result['room_count']} seeds={smoothed_result['ocr_seed_count']} unknown={smoothed_result['unknown_room_count']} png={len(smoothed_png)}b"
)
(OUT / "ocr_flood_fill_smoothed.json").write_text(json.dumps(smoothed_result))
(OUT / "ocr_flood_fill_smoothed.png").write_bytes(smoothed_png)

print(f"artifacts written to {OUT}")
