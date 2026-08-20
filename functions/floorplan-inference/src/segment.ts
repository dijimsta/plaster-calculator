import { onRequest } from "firebase-functions/https";
import { Tensor } from "onnxruntime-node";

import { HttpStatusError, readImageBytes } from "./http.js";
import { getSession, segmentationShape } from "./model.js";
import { prepare } from "./preprocess.js";

/** Image-in convenience endpoint: decodes and preprocesses an uploaded
 * image (resize to a 32-multiple, normalize) in-service via `sharp`, then
 * runs the model and returns its raw (1, 44, H, W) output as a binary
 * `application/octet-stream` body (little-endian float32, channel-first).
 *
 * NOT what floorplan-analyzer's OCR/flood-fill endpoints should call —
 * see `segment-tensor.ts` for that. This endpoint's `sharp`-based resize
 * has a measured ~4% final-argmax disagreement against the original PIL
 * pipeline on real floorplans (isolated to the resize step specifically;
 * everything else — normalize, tensor layout, the model itself — matches
 * exactly). Fine for standalone/debug use where minor fidelity loss is
 * acceptable; not yet good enough to replace the production pipeline.
 * See WORK-302 comments for the investigation.
 *
 * NOTE: a full-resolution 44-channel float32 tensor is large — e.g.
 * 44 * 1024 * 1024 * 4 bytes ≈ 180MB, likely well past typical HTTP
 * payload limits for big scans. This works for the images tested so far;
 * reconsider payload size (e.g. float16, capping input resolution, or only
 * requesting the channel groups actually needed) before relying on this
 * for arbitrarily large real-world uploads. */
export const segment = onRequest(async (request, response) => {
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
            throw new Error("Model did not return a 'segmentation' output.");
        }

        const { channels, height, width } = segmentationShape(output.dims);
        response.set("X-Tensor-Shape", `1,${channels},${height},${width}`);
        response.set(
            "X-Original-Size",
            `${prepared.originalWidth},${prepared.originalHeight}`,
        );
        response.set("Content-Type", "application/octet-stream");
        response.send(Buffer.from((output.data as Float32Array).buffer));
    } catch (error) {
        if (error instanceof HttpStatusError) {
            response.status(error.status).json({ detail: error.message });
            return;
        }
        console.error("Segmentation inference failed", error);
        response.status(500).json({ detail: "Inference failed" });
    }
});
