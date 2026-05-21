from __future__ import annotations

import io
import json
import zipfile

from firebase_functions import https_fn


def error_response(status: int, message: str) -> https_fn.Response:
    return https_fn.Response(
        json.dumps({"detail": message}),
        status=status,
        mimetype="application/json",
    )


def zip_response(filename: str, members: dict[str, bytes | str]) -> https_fn.Response:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, mode="w", compression=zipfile.ZIP_DEFLATED) as archive:
        for name, payload in members.items():
            archive.writestr(name, payload)
    return https_fn.Response(
        buf.getvalue(),
        mimetype="application/zip",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
