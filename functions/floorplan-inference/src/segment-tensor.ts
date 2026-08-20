import { onRequest } from "firebase-functions/https";
import { Tensor } from "onnxruntime-node";

import { HttpStatusError } from "./http.js";
import { getSession, segmentationShape } from "./model.js";
import { INFERENCE_RUNTIME_OPTIONS } from "./runtime-options.js";

const SHAPE_HEADER = "x-tensor-shape";

/** Runs the segmentation model on an already-preprocessed (1, 3, H, W)
 * tensor and returns its raw (1, 44, H, W) output, both as binary
 * `application/octet-stream` bodies (little-endian float32).
 *
 * This is the endpoint floorplan-analyzer's OCR/flood-fill code should
 * call (WORK-303) — deliberately *not* image-in/tensor-out. Preprocessing
 * (resize-to-32-multiple, normalize) stays in Python via the existing,
 * already-correct `inference/preprocess.py`: it never needed `torch` in
 * the first place, so there's no reason to re-risk it in a cross-language
 * port. See `segment.ts` for why image-in isn't good enough yet — its
 * sharp-based resize doesn't match PIL's closely enough (WORK-302). */
export const segmentTensor = onRequest(
    INFERENCE_RUNTIME_OPTIONS,
    async (request, response) => {
        try {
            const shapeHeader = request.headers[SHAPE_HEADER];
            if (typeof shapeHeader !== "string" || !request.rawBody) {
                throw new HttpStatusError(
                    400,
                    `Missing '${SHAPE_HEADER}' header or request body.`,
                );
            }
            const dims = shapeHeader.split(",").map(Number);
            if (
                dims.length !== 4 ||
                dims.some((dim) => !Number.isInteger(dim))
            ) {
                throw new HttpStatusError(
                    400,
                    `'${SHAPE_HEADER}' must be 4 comma-separated integers.`,
                );
            }

            const data = new Float32Array(
                request.rawBody.buffer,
                request.rawBody.byteOffset,
                request.rawBody.byteLength / Float32Array.BYTES_PER_ELEMENT,
            );

            const session = await getSession();
            const results = await session.run({
                image: new Tensor("float32", data, dims),
            });
            const output = results["segmentation"];
            if (!output) {
                throw new Error(
                    "Model did not return a 'segmentation' output.",
                );
            }

            const { channels, height, width } = segmentationShape(output.dims);
            response.set(
                SHAPE_HEADER.toUpperCase(),
                `1,${channels},${height},${width}`,
            );
            response.set("Content-Type", "application/octet-stream");
            response.send(Buffer.from((output.data as Float32Array).buffer));
        } catch (error) {
            if (error instanceof HttpStatusError) {
                response.status(error.status).json({ detail: error.message });
                return;
            }
            console.error("Tensor inference failed", error);
            response.status(500).json({ detail: "Inference failed" });
        }
    },
);
