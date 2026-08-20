import { fileURLToPath } from "node:url";

import * as ort from "onnxruntime-node";

const MODEL_PATH = fileURLToPath(
    new URL("../models/model_best_val_loss_var.onnx", import.meta.url),
);

let sessionPromise: Promise<ort.InferenceSession> | undefined;

/** Loads the ONNX segmentation model once per warm instance and reuses it
 * across requests. */
export function getSession(): Promise<ort.InferenceSession> {
    sessionPromise ??= ort.InferenceSession.create(MODEL_PATH, {
        executionProviders: ["cpu"],
    });
    return sessionPromise;
}

export type SegmentationShape = {
    readonly channels: number;
    readonly height: number;
    readonly width: number;
};

/** Reads the (channels, height, width) of a (1, C, H, W) model output,
 * failing loudly if the model ever stops returning that shape. */
export function segmentationShape(dims: readonly number[]): SegmentationShape {
    const [, channels, height, width] = dims;
    if (channels === undefined || height === undefined || width === undefined) {
        throw new Error(`Unexpected model output shape: [${dims.join(", ")}]`);
    }
    return { channels, height, width };
}
