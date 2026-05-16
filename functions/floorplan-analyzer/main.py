from __future__ import annotations

import io
import json
import logging
import os
import zipfile
from functools import lru_cache

os.environ.setdefault("EASYOCR_MODULE_PATH", "/tmp/easyocr")
os.environ.setdefault("MPLCONFIGDIR", "/tmp/matplotlib")

from firebase_functions import https_fn, options

from cubicasa_core import (
    load_model,
    render_segmentation_map,
    run_get_polygons,
    run_inference,
)
from cubicasa_api.ocr_flood_fill import run_ocr_flood_fill_process
from cubicasa_api.ocr_flood_fill_smoothed import (
    DEFAULT_UNKNOWN_ROOM_MIN_AREA,
    run_ocr_flood_fill_smoothed_process,
)
from cubicasa_api.xixi import ROOM_TYPE_MIN_FRACTION, run_xixi_process

logger = logging.getLogger(__name__)

options.set_global_options(region="us-west1", max_instances=5)

INFERENCE_MEMORY = options.MemoryOption.GB_4
OCR_MEMORY = options.MemoryOption.GB_8
INFERENCE_TIMEOUT = 540
INFERENCE_CPU = 2
OCR_CPU = 4


@lru_cache(maxsize=1)
def _model():
    return load_model()


def _read_image_bytes(request: https_fn.Request) -> tuple[bytes, str]:
    upload = request.files.get("image") if request.files else None
    if upload is None:
        raise _http_error(400, "Missing 'image' file in multipart form data.")
    return upload.read(), upload.filename or ""


def _http_error(status: int, message: str) -> https_fn.HttpsError:
    return _HttpStatusError(status, message)


class _HttpStatusError(Exception):
    def __init__(self, status: int, message: str) -> None:
        super().__init__(message)
        self.status = status
        self.message = message


def _error_response(status: int, message: str) -> https_fn.Response:
    return https_fn.Response(
        json.dumps({"detail": message}),
        status=status,
        mimetype="application/json",
    )


def _read_int_query(
    request: https_fn.Request,
    name: str,
    default: int,
    *,
    minimum: int | None = None,
) -> int:
    raw = request.args.get(name)
    if raw is None:
        return default
    try:
        value = int(raw)
    except ValueError as exc:
        raise _http_error(422, f"Query parameter '{name}' must be an integer.") from exc
    if minimum is not None and value < minimum:
        raise _http_error(422, f"Query parameter '{name}' must be >= {minimum}.")
    return value


def _read_float_query(
    request: https_fn.Request,
    name: str,
    default: float,
    *,
    minimum: float | None = None,
    maximum: float | None = None,
) -> float:
    raw = request.args.get(name)
    if raw is None:
        return default
    try:
        value = float(raw)
    except ValueError as exc:
        raise _http_error(422, f"Query parameter '{name}' must be a number.") from exc
    if minimum is not None and value < minimum:
        raise _http_error(422, f"Query parameter '{name}' must be >= {minimum}.")
    if maximum is not None and value > maximum:
        raise _http_error(422, f"Query parameter '{name}' must be <= {maximum}.")
    return value


def _zip_response(filename: str, members: dict[str, bytes | str]) -> https_fn.Response:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, mode="w", compression=zipfile.ZIP_DEFLATED) as archive:
        for name, payload in members.items():
            archive.writestr(name, payload)
    return https_fn.Response(
        buf.getvalue(),
        mimetype="application/zip",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@https_fn.on_request(memory=options.MemoryOption.MB_256, timeout_sec=60, cpu=1)
def health(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response(
        json.dumps({"status": "ok"}),
        mimetype="application/json",
    )


@https_fn.on_request(memory=INFERENCE_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=INFERENCE_CPU)
def analyse(req: https_fn.Request) -> https_fn.Response:
    try:
        image_bytes, _ = _read_image_bytes(req)
        result = run_inference(image_bytes, _model())
    except _HttpStatusError as exc:
        return _error_response(exc.status, exc.message)
    except (ValueError, OSError) as exc:
        return _error_response(422, str(exc))
    except Exception:
        logger.exception("Inference failed")
        return _error_response(500, "Inference failed")
    return https_fn.Response(json.dumps(result), mimetype="application/json")


@https_fn.on_request(memory=INFERENCE_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=INFERENCE_CPU)
def xixi_process(req: https_fn.Request) -> https_fn.Response:
    try:
        image_bytes, filename = _read_image_bytes(req)
        min_area = _read_int_query(req, "min_area", 800, minimum=0)
        room_type_min_fraction = _read_float_query(
            req,
            "room_type_min_fraction",
            ROOM_TYPE_MIN_FRACTION,
            minimum=0.0,
            maximum=1.0,
        )
        result, floorplan_png = run_xixi_process(
            image_bytes,
            _model(),
            source_file=filename,
            min_area=min_area,
            room_type_min_fraction=room_type_min_fraction,
        )
    except _HttpStatusError as exc:
        return _error_response(exc.status, exc.message)
    except (ValueError, OSError) as exc:
        return _error_response(422, str(exc))
    except Exception:
        logger.exception("Xixi process endpoint failed")
        return _error_response(500, "Xixi process endpoint failed")

    return _zip_response(
        "xixi-process.zip",
        {"walls.json": json.dumps(result), "floorplan.png": floorplan_png},
    )


@https_fn.on_request(memory=OCR_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=OCR_CPU)
def ocr_flood_fill(req: https_fn.Request) -> https_fn.Response:
    try:
        image_bytes, filename = _read_image_bytes(req)
        min_area = _read_int_query(req, "min_area", 0, minimum=0)
        wall_kernel_size = _read_int_query(req, "wall_kernel_size", 15, minimum=1)
        result, floorplan_png = run_ocr_flood_fill_process(
            image_bytes,
            _model(),
            source_file=filename,
            min_area=min_area,
            wall_kernel_size=wall_kernel_size,
        )
    except _HttpStatusError as exc:
        return _error_response(exc.status, exc.message)
    except (RuntimeError, ValueError, OSError) as exc:
        return _error_response(422, str(exc))
    except Exception:
        logger.exception("OCR flood-fill endpoint failed")
        return _error_response(500, "OCR flood-fill endpoint failed")

    return _zip_response(
        "ocr-flood-fill.zip",
        {"rooms.json": json.dumps(result), "floorplan.png": floorplan_png},
    )


@https_fn.on_request(memory=OCR_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=OCR_CPU)
def ocr_flood_fill_smoothed(req: https_fn.Request) -> https_fn.Response:
    try:
        image_bytes, filename = _read_image_bytes(req)
        min_area = _read_int_query(req, "min_area", 0, minimum=0)
        wall_kernel_size = _read_int_query(req, "wall_kernel_size", 15, minimum=1)
        simplify_epsilon_ratio = _read_float_query(
            req, "simplify_epsilon_ratio", 0.005, minimum=0.0
        )
        ortho_tolerance_degrees = _read_float_query(
            req, "ortho_tolerance_degrees", 8.0, minimum=0.0, maximum=45.0
        )
        min_point_distance_px = _read_float_query(
            req, "min_point_distance_px", 3.0, minimum=0.0
        )
        unknown_room_min_area = _read_int_query(
            req, "unknown_room_min_area", DEFAULT_UNKNOWN_ROOM_MIN_AREA, minimum=0
        )
        result, floorplan_png = run_ocr_flood_fill_smoothed_process(
            image_bytes,
            _model(),
            source_file=filename,
            min_area=min_area,
            wall_kernel_size=wall_kernel_size,
            simplify_epsilon_ratio=simplify_epsilon_ratio,
            ortho_tolerance_degrees=ortho_tolerance_degrees,
            min_point_distance_px=min_point_distance_px,
            unknown_room_min_area=unknown_room_min_area,
        )
    except _HttpStatusError as exc:
        return _error_response(exc.status, exc.message)
    except (RuntimeError, ValueError, OSError) as exc:
        return _error_response(422, str(exc))
    except Exception:
        logger.exception("OCR flood-fill smoothed endpoint failed")
        return _error_response(500, "OCR flood-fill smoothed endpoint failed")

    return _zip_response(
        "ocr-flood-fill-smoothed.zip",
        {"rooms.json": json.dumps(result), "floorplan.png": floorplan_png},
    )


@https_fn.on_request(memory=INFERENCE_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=INFERENCE_CPU)
def debug_segmentation(req: https_fn.Request) -> https_fn.Response:
    try:
        image_bytes, _ = _read_image_bytes(req)
        seg_img = render_segmentation_map(image_bytes, _model())
    except _HttpStatusError as exc:
        return _error_response(exc.status, exc.message)
    except (ValueError, OSError) as exc:
        return _error_response(422, str(exc))
    except Exception:
        logger.exception("Segmentation render failed")
        return _error_response(500, "Segmentation render failed")

    buf = io.BytesIO()
    seg_img.save(buf, format="PNG")
    return https_fn.Response(buf.getvalue(), mimetype="image/png")


@https_fn.on_request(memory=INFERENCE_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=INFERENCE_CPU)
def debug_get_polygons(req: https_fn.Request) -> https_fn.Response:
    try:
        image_bytes, _ = _read_image_bytes(req)
        threshold = _read_float_query(req, "threshold", 0.5, minimum=0.0, maximum=1.0)
        result = run_get_polygons(image_bytes, _model(), threshold=threshold)
    except _HttpStatusError as exc:
        return _error_response(exc.status, exc.message)
    except (ValueError, OSError) as exc:
        return _error_response(422, str(exc))
    except Exception:
        logger.exception("get_polygons debug endpoint failed")
        return _error_response(500, "get_polygons debug endpoint failed")
    return https_fn.Response(json.dumps(result), mimetype="application/json")
