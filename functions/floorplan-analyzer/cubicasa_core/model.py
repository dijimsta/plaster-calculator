import os
from pathlib import Path

import torch
from floortrans.models.hg_furukawa_original import hg_furukawa_original

_N_CLASSES = 44
_REPO_ROOT = Path(__file__).resolve().parent.parent
_DEFAULT_WEIGHTS = _REPO_ROOT / "floortrans" / "weights" / "model_best_val_loss_var.pkl"


def load_model(weights_path: str | Path | None = None) -> hg_furukawa_original:
    if weights_path is None:
        env_path = os.environ.get("MODEL_PATH")
        path = Path(env_path) if env_path else _DEFAULT_WEIGHTS
    else:
        path = Path(weights_path)
    model = hg_furukawa_original(n_classes=_N_CLASSES)
    checkpoint = torch.load(path, map_location="cpu", weights_only=False)
    state = checkpoint["model_state"] if "model_state" in checkpoint else checkpoint
    model.load_state_dict(state)
    model.eval()
    return model
