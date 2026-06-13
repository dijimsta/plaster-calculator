from __future__ import annotations

import io
import json
import logging
import os
import time

_MODULE_IMPORT_START = time.perf_counter()

os.environ.setdefault("EASYOCR_MODULE_PATH", "/tmp/easyocr")
os.environ.setdefault("MPLCONFIGDIR", "/tmp/matplotlib")

from firebase_functions import https_fn, options  # noqa: E402

# Heavy ML imports are deferred into each handler so the Firebase Functions
# emulator can discover the function manifest within its 10s import budget.

logger = logging.getLogger(__name__)
logging.basicConfig(level=os.environ.get("LOG_LEVEL", "INFO"))

options.set_global_options(region="us-west1", max_instances=5, enforce_app_check=True)

INFERENCE_MEMORY = options.MemoryOption.GB_4
OCR_MEMORY = options.MemoryOption.GB_16
INFERENCE_TIMEOUT = 60 * 60
INFERENCE_CPU = 2
OCR_CPU = 4


def _elapsed_ms(start: float) -> int:
    return int((time.perf_counter() - start) * 1000)


def _log_info(message: str, **fields: object) -> None:
    payload = {"message": message, **fields}
    line = json.dumps(payload, default=str, sort_keys=True)
    logger.info(line)
    print(line, flush=True)


def _is_health_probe(req: https_fn.Request) -> bool:
    return req.method == "GET" and req.path == "/__/health"


_log_info(
    "floorplan-analyzer module imported",
    elapsed_ms=_elapsed_ms(_MODULE_IMPORT_START),
    easyocr_module_path=os.environ.get("EASYOCR_MODULE_PATH"),
    matplotlib_config_dir=os.environ.get("MPLCONFIGDIR"),
)


@https_fn.on_request(memory=options.MemoryOption.MB_256, timeout_sec=60, cpu=1)
def health(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response(json.dumps({"status": "ok"}), mimetype="application/json")


@https_fn.on_request(
    memory=INFERENCE_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=INFERENCE_CPU
)
def analyse(req: https_fn.Request) -> https_fn.Response:
    from api.request import HttpStatusError, read_image_bytes
    from api.response import error_response
    from inference.service import InferenceService, load_model

    try:
        image_bytes, _ = read_image_bytes(req)
        result = InferenceService(load_model()).run(image_bytes)
    except HttpStatusError as exc:
        return error_response(exc.status, exc.message)
    except (ValueError, OSError) as exc:
        return error_response(422, str(exc))
    except Exception:
        logger.exception("Inference failed")
        return error_response(500, "Inference failed")
    return https_fn.Response(json.dumps(result), mimetype="application/json")


@https_fn.on_request(
    memory=INFERENCE_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=INFERENCE_CPU
)
def xixi_process(req: https_fn.Request) -> https_fn.Response:
    from analysis.strategies.xixi import ROOM_TYPE_MIN_FRACTION
    from api.request import (
        HttpStatusError,
        read_float_query,
        read_image_bytes,
        read_int_query,
    )
    from api.response import error_response, zip_response

    try:
        image_bytes, filename = read_image_bytes(req)
        min_area = read_int_query(req, "min_area", 800, minimum=0)
        room_type_min_fraction = read_float_query(
            req,
            "room_type_min_fraction",
            ROOM_TYPE_MIN_FRACTION,
            minimum=0.0,
            maximum=1.0,
        )
        from analysis.schemas import XixiParams
        from analysis.strategies.xixi import XixiStrategy
        from inference.service import InferenceService, load_model
        from segmentation.service import SegmentationService

        strategy = XixiStrategy(InferenceService(load_model()), SegmentationService())
        result, floorplan_png = strategy.run(
            image_bytes, XixiParams(filename, min_area, room_type_min_fraction)
        )
    except HttpStatusError as exc:
        return error_response(exc.status, exc.message)
    except (ValueError, OSError) as exc:
        return error_response(422, str(exc))
    except Exception:
        logger.exception("Xixi process endpoint failed")
        return error_response(500, "Xixi process endpoint failed")
    return zip_response(
        "xixi-process.zip",
        {"walls.json": json.dumps(result), "floorplan.png": floorplan_png},
    )


@https_fn.on_request(memory=OCR_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=OCR_CPU)
def ocr_flood_fill(req: https_fn.Request) -> https_fn.Response:
    from api.request import HttpStatusError, read_image_bytes, read_int_query
    from api.response import error_response, zip_response

    try:
        image_bytes, filename = read_image_bytes(req)
        min_area = read_int_query(req, "min_area", 0, minimum=0)
        wall_kernel_size = read_int_query(req, "wall_kernel_size", 15, minimum=1)
        from analysis.schemas import OcrFloodFillParams
        from analysis.strategies.ocr_flood_fill import OcrFloodFillStrategy
        from inference.service import InferenceService, load_model
        from ocr.service import OcrService
        from segmentation.service import SegmentationService

        strategy = OcrFloodFillStrategy(
            InferenceService(load_model()), SegmentationService(), OcrService()
        )
        result, floorplan_png = strategy.run(
            image_bytes, OcrFloodFillParams(filename, min_area, wall_kernel_size)
        )
    except HttpStatusError as exc:
        return error_response(exc.status, exc.message)
    except (RuntimeError, ValueError, OSError) as exc:
        return error_response(422, str(exc))
    except Exception:
        logger.exception("OCR flood-fill endpoint failed")
        return error_response(500, "OCR flood-fill endpoint failed")
    return zip_response(
        "ocr-flood-fill.zip",
        {"rooms.json": json.dumps(result), "floorplan.png": floorplan_png},
    )


@https_fn.on_request(memory=OCR_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=OCR_CPU)
def ocr_flood_fill_smoothed(req: https_fn.Request) -> https_fn.Response:
    if _is_health_probe(req):
        return https_fn.Response(
            json.dumps({"status": "ok"}), mimetype="application/json"
        )

    started_at = time.perf_counter()
    _log_info(
        "ocr_flood_fill_smoothed request started",
        method=req.method,
        content_length=req.content_length,
        content_type=req.content_type,
        query=dict(req.args),
    )

    from api.request import (
        HttpStatusError,
        read_float_query,
        read_image_bytes,
        read_int_query,
    )
    from api.response import error_response, zip_response

    try:
        read_started_at = time.perf_counter()
        image_bytes, filename = read_image_bytes(req)
        _log_info(
            "ocr_flood_fill_smoothed image read",
            elapsed_ms=_elapsed_ms(started_at),
            filename=filename,
            image_bytes=len(image_bytes),
            read_ms=_elapsed_ms(read_started_at),
        )

        min_area = read_int_query(req, "min_area", 0, minimum=0)
        wall_kernel_size = read_int_query(req, "wall_kernel_size", 15, minimum=1)
        simplify_epsilon_ratio = read_float_query(
            req, "simplify_epsilon_ratio", 0.005, minimum=0.0
        )
        ortho_tolerance_degrees = read_float_query(
            req, "ortho_tolerance_degrees", 8.0, minimum=0.0, maximum=45.0
        )
        min_point_distance_px = read_float_query(
            req, "min_point_distance_px", 3.0, minimum=0.0
        )

        import_started_at = time.perf_counter()
        from analysis.schemas import OcrFloodFillSmoothedParams
        from analysis.strategies.ocr_flood_fill_smoothed import (
            DEFAULT_UNKNOWN_ROOM_MIN_AREA,
            OcrFloodFillSmoothedStrategy,
        )
        from inference.service import InferenceService, load_model
        from ocr.service import OcrService
        from segmentation.service import SegmentationService

        _log_info(
            "ocr_flood_fill_smoothed imports loaded",
            elapsed_ms=_elapsed_ms(started_at),
            import_ms=_elapsed_ms(import_started_at),
        )

        unknown_room_min_area = read_int_query(
            req, "unknown_room_min_area", DEFAULT_UNKNOWN_ROOM_MIN_AREA, minimum=0
        )
        _log_info(
            "ocr_flood_fill_smoothed parameters parsed",
            elapsed_ms=_elapsed_ms(started_at),
            min_area=min_area,
            wall_kernel_size=wall_kernel_size,
            simplify_epsilon_ratio=simplify_epsilon_ratio,
            ortho_tolerance_degrees=ortho_tolerance_degrees,
            min_point_distance_px=min_point_distance_px,
            unknown_room_min_area=unknown_room_min_area,
        )

        model_started_at = time.perf_counter()
        model = load_model()
        _log_info(
            "ocr_flood_fill_smoothed model loaded",
            elapsed_ms=_elapsed_ms(started_at),
            model_ms=_elapsed_ms(model_started_at),
        )

        process_started_at = time.perf_counter()
        strategy = OcrFloodFillSmoothedStrategy(
            InferenceService(model), SegmentationService(), OcrService()
        )
        params = OcrFloodFillSmoothedParams(
            source_file=filename,
            min_area=min_area,
            wall_kernel_size=wall_kernel_size,
            simplify_epsilon_ratio=simplify_epsilon_ratio,
            ortho_tolerance_degrees=ortho_tolerance_degrees,
            min_point_distance_px=min_point_distance_px,
            unknown_room_min_area=unknown_room_min_area,
        )
        result, floorplan_png = strategy.run(image_bytes, params)
        _log_info(
            "ocr_flood_fill_smoothed processing completed",
            elapsed_ms=_elapsed_ms(started_at),
            processing_ms=_elapsed_ms(process_started_at),
            room_count=result.get("room_count"),
            ocr_seed_count=result.get("ocr_seed_count"),
            unknown_room_count=result.get("unknown_room_count"),
            floorplan_png_bytes=len(floorplan_png),
        )
    except HttpStatusError as exc:
        _log_info(
            "ocr_flood_fill_smoothed request rejected",
            elapsed_ms=_elapsed_ms(started_at),
            status=exc.status,
            detail=exc.message,
        )
        return error_response(exc.status, exc.message)
    except (RuntimeError, ValueError, OSError) as exc:
        logger.exception("OCR flood-fill smoothed endpoint validation failed")
        _log_info(
            "ocr_flood_fill_smoothed validation failed",
            elapsed_ms=_elapsed_ms(started_at),
            error_type=type(exc).__name__,
            detail=str(exc),
        )
        return error_response(422, str(exc))
    except Exception:
        logger.exception("OCR flood-fill smoothed endpoint failed")
        _log_info("ocr_flood_fill_smoothed failed", elapsed_ms=_elapsed_ms(started_at))
        return error_response(500, "OCR flood-fill smoothed endpoint failed")

    _log_info(
        "ocr_flood_fill_smoothed response ready", elapsed_ms=_elapsed_ms(started_at)
    )
    return zip_response(
        "ocr-flood-fill-smoothed.zip",
        {"rooms.json": json.dumps(result), "floorplan.png": floorplan_png},
    )


@https_fn.on_request(memory=OCR_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=OCR_CPU)
def ocr_read_text(req: https_fn.Request) -> https_fn.Response:
    from api.request import HttpStatusError, read_image_bytes
    from api.response import error_response
    from ocr.service import OcrService

    try:
        import io as _io

        from PIL import Image

        image_bytes, _ = read_image_bytes(req)
        image = Image.open(_io.BytesIO(image_bytes))
        results = OcrService().read_text(image)
    except HttpStatusError as exc:
        return error_response(exc.status, exc.message)
    except (RuntimeError, ValueError, OSError) as exc:
        return error_response(422, str(exc))
    except Exception:
        logger.exception("OCR read-text endpoint failed")
        return error_response(500, "OCR read-text endpoint failed")
    return https_fn.Response(
        json.dumps({"texts": results}), mimetype="application/json"
    )


@https_fn.on_request(
    memory=INFERENCE_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=INFERENCE_CPU
)
def debug_segmentation(req: https_fn.Request) -> https_fn.Response:
    from api.request import HttpStatusError, read_image_bytes
    from api.response import error_response
    from inference.service import InferenceService, load_model

    try:
        image_bytes, _ = read_image_bytes(req)
        seg_img = InferenceService(load_model()).render_segmentation_map(image_bytes)
    except HttpStatusError as exc:
        return error_response(exc.status, exc.message)
    except (ValueError, OSError) as exc:
        return error_response(422, str(exc))
    except Exception:
        logger.exception("Segmentation render failed")
        return error_response(500, "Segmentation render failed")

    buf = io.BytesIO()
    seg_img.save(buf, format="PNG")
    return https_fn.Response(buf.getvalue(), mimetype="image/png")


@https_fn.on_request(
    memory=INFERENCE_MEMORY, timeout_sec=INFERENCE_TIMEOUT, cpu=INFERENCE_CPU
)
def debug_get_polygons(req: https_fn.Request) -> https_fn.Response:
    from api.request import HttpStatusError, read_float_query, read_image_bytes
    from api.response import error_response
    from inference.service import InferenceService, load_model

    try:
        image_bytes, _ = read_image_bytes(req)
        threshold = read_float_query(req, "threshold", 0.5, minimum=0.0, maximum=1.0)
        result = InferenceService(load_model()).run_get_polygons(
            image_bytes, threshold=threshold
        )
    except HttpStatusError as exc:
        return error_response(exc.status, exc.message)
    except (ValueError, OSError) as exc:
        return error_response(422, str(exc))
    except Exception:
        logger.exception("get_polygons debug endpoint failed")
        return error_response(500, "get_polygons debug endpoint failed")
    return https_fn.Response(json.dumps(result), mimetype="application/json")
