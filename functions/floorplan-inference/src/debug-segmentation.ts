import { onRequest } from "firebase-functions/https";
import { Tensor } from "onnxruntime-node";

import { HttpStatusError, readImageBytes } from "./http.js";
import { getSession, segmentationShape } from "./model.js";
import { renderSegmentationMap } from "./postprocess.js";
import { prepare } from "./preprocess.js";
import { INFERENCE_RUNTIME_OPTIONS } from "./runtime-options.js";

/** Renders a colour-coded room segmentation map for the uploaded image, in
 * the original image's pixel dimensions — a debug/inspection tool, not
 * part of the production critical path. Mirrors floorplan-analyzer's
 * `debug_segmentation` endpoint (main.py). */
export const debugSegmentation = onRequest(
    INFERENCE_RUNTIME_OPTIONS,
    async (request, response) => {
        try {
            const imageBytes = await readImageBytes(request);
            const prepared = await prepare(imageBytes);

            const session = await getSession();
            const feeds = {
                image: new Tensor("float32", prepared.data, prepared.shape),
            };
            const results = await session.run(feeds);
            const output = results["segmentation"];
            if (!output) {
                throw new Error(
                    "Model did not return a 'segmentation' output.",
                );
            }
            const { height, width } = segmentationShape(output.dims);

            const png = await renderSegmentationMap(
                output.data as Float32Array,
                height,
                width,
            );
            response.set("Content-Type", "image/png");
            response.send(png);
        } catch (error) {
            if (error instanceof HttpStatusError) {
                response.status(error.status).json({ detail: error.message });
                return;
            }
            console.error("Segmentation render failed", error);
            response.status(500).json({ detail: "Segmentation render failed" });
        }
    },
);
