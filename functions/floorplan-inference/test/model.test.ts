import assert from "node:assert/strict";
import { test } from "node:test";

import { Tensor } from "onnxruntime-node";

import { getSession, segmentationShape } from "../src/model.ts";

test("the ONNX model loads and runs on a 32-multiple input, producing 44 output channels", async () => {
    const height = 64;
    const width = 96;
    const input = new Float32Array(3 * height * width);

    const session = await getSession();
    const results = await session.run({
        image: new Tensor("float32", input, [1, 3, height, width]),
    });
    const output = results["segmentation"];
    assert.ok(output, "model did not return a 'segmentation' output");

    const shape = segmentationShape(output.dims);
    assert.equal(shape.channels, 44);
    assert.equal(shape.height, height);
    assert.equal(shape.width, width);
});

test("segmentationShape rejects malformed dims", () => {
    assert.throws(() => segmentationShape([1, 44]));
});
