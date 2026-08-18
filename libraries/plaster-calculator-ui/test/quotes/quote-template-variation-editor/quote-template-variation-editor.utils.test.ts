import assert from "node:assert/strict";
import test from "node:test";

import { describeRatePercentDelta } from "../../../src/quotes/quote-template-variation-editor/quote-template-variation-editor.utils.ts";

test("describeRatePercentDelta returns undefined when the default price is zero", () => {
    assert.equal(describeRatePercentDelta(500, 0), undefined);
});

test("describeRatePercentDelta reports 'same' with no percent text when there is no delta", () => {
    const delta = describeRatePercentDelta(0, 7400);

    assert.equal(delta?.kind, "same");
    assert.equal(delta?.percentDisplayText, "");
});

test("describeRatePercentDelta reports a decrease as a percent of the default price", () => {
    // 6800 vs a default of 7400 is -600, which is -8.1...% of 7400.
    const delta = describeRatePercentDelta(-600, 7400);

    assert.equal(delta?.kind, "decrease");
    assert.equal(delta?.percentDisplayText, "8.1%");
});

test("describeRatePercentDelta reports an increase as a percent of the default price", () => {
    const delta = describeRatePercentDelta(370, 7400);

    assert.equal(delta?.kind, "increase");
    assert.equal(delta?.percentDisplayText, "5.0%");
});
