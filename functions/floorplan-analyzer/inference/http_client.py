"""Runs segmentation via the `floorplan-inference` Cloud Function instead of
loading PyTorch locally (WORK-303). Implements the same `prepare_and_run`
contract as `InferenceService` (see `inference/client.py`), so it's a
drop-in replacement for that one call — preprocessing still happens here,
unchanged, via `inference/preprocess.py`; only model *execution* moves.
"""

from __future__ import annotations

import os

import numpy as np
import requests
import torch
from PIL import Image

from inference.preprocess import PreparedImage, load_pil, prepare

_REGION = "us-west1"
_FUNCTION_NAME = "segmentTensor"
_TIMEOUT_S = 300
_SHAPE_HEADER = "X-Tensor-Shape"


def _is_emulator() -> bool:
    return bool(os.environ.get("FUNCTIONS_EMULATOR"))


def _project_id() -> str:
    return (
        os.environ.get("GCLOUD_PROJECT")
        or os.environ.get("GCP_PROJECT")
        or os.environ.get("FIREBASE_PROJECT")
        or ""
    )


def _service_url() -> str:
    project = _project_id()
    if _is_emulator():
        host = os.environ.get("FUNCTIONS_EMULATOR_HOST", "127.0.0.1:5001")
        return f"http://{host}/{project}/{_REGION}/{_FUNCTION_NAME}"
    return f"https://{_REGION}-{project}.cloudfunctions.net/{_FUNCTION_NAME}"


def _auth_headers(url: str) -> dict[str, str]:
    if _is_emulator():
        return {}
    import google.auth.transport.requests
    import google.oauth2.id_token

    token = google.oauth2.id_token.fetch_id_token(
        google.auth.transport.requests.Request(), url
    )
    return {"Authorization": f"Bearer {token}"}


class HttpInferenceClient:
    def load_image(self, image_bytes: bytes) -> Image.Image:
        return load_pil(image_bytes)

    def prepare_and_run(self, image: Image.Image) -> tuple[torch.Tensor, PreparedImage]:
        prepared = prepare(image)
        tensor = prepared.tensor

        url = _service_url()
        headers = {
            **_auth_headers(url),
            _SHAPE_HEADER: ",".join(str(dim) for dim in tensor.shape),
            "Content-Type": "application/octet-stream",
        }
        response = requests.post(
            url,
            data=tensor.numpy().tobytes(),
            headers=headers,
            timeout=_TIMEOUT_S,
        )
        response.raise_for_status()

        shape_header = response.headers.get(_SHAPE_HEADER)
        if not shape_header:
            raise RuntimeError(
                f"floorplan-inference response missing '{_SHAPE_HEADER}' header."
            )
        shape = tuple(int(dim) for dim in shape_header.split(","))

        output = np.frombuffer(response.content, dtype=np.float32).reshape(shape)
        return torch.from_numpy(output.copy()), prepared
