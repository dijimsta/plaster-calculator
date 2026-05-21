from __future__ import annotations

from firebase_functions import https_fn


class HttpStatusError(Exception):
    def __init__(self, status: int, message: str) -> None:
        super().__init__(message)
        self.status = status
        self.message = message


def read_image_bytes(request: https_fn.Request) -> tuple[bytes, str]:
    upload = request.files.get("image") if request.files else None
    if upload is None:
        raise HttpStatusError(400, "Missing 'image' file in multipart form data.")
    return upload.read(), upload.filename or ""


def read_int_query(
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
        raise HttpStatusError(
            422, f"Query parameter '{name}' must be an integer."
        ) from exc
    if minimum is not None and value < minimum:
        raise HttpStatusError(422, f"Query parameter '{name}' must be >= {minimum}.")
    return value


def read_float_query(
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
        raise HttpStatusError(
            422, f"Query parameter '{name}' must be a number."
        ) from exc
    if minimum is not None and value < minimum:
        raise HttpStatusError(422, f"Query parameter '{name}' must be >= {minimum}.")
    if maximum is not None and value > maximum:
        raise HttpStatusError(422, f"Query parameter '{name}' must be <= {maximum}.")
    return value
