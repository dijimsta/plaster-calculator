import assert from "node:assert/strict";
import test from "node:test";

import { formatQuantityText } from "../../src/index.ts";

test("formatQuantityText trims a trailing zero", () => {
    assert.equal(formatQuantityText(12.5), "12.5");
});

test("formatQuantityText trims both decimal places for a whole number", () => {
    assert.equal(formatQuantityText(12), "12");
});

test("formatQuantityText rounds beyond 2dp", () => {
    assert.equal(formatQuantityText(12.505), "12.51");
});

test("formatQuantityText formats zero", () => {
    assert.equal(formatQuantityText(0), "0");
});
