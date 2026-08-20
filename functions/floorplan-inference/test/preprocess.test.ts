import assert from "node:assert/strict";
import { test } from "node:test";

import { round32 } from "../src/preprocess.ts";

test("round32 rounds up to the nearest multiple of 32", () => {
    assert.equal(round32(32), 32);
    assert.equal(round32(1), 32);
    assert.equal(round32(33), 64);
    assert.equal(round32(2339), 2368);
    assert.equal(round32(3307), 3328);
});
