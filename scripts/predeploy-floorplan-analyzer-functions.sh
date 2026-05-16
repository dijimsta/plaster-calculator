#!/usr/bin/env bash

SCRIPTS_DIR="$(dirname "$(realpath "$0")")"
ROOT_DIR=${SCRIPTS_DIR}/..

cd ${ROOT_DIR}/functions/floorplan-analyzer

uv pip compile pyproject.toml --output-file requirements.txt
uv venv venv
uv pip sync requirements.txt --python venv
