import assert from "node:assert/strict";
import test from "node:test";

import {
    DAY_QUOTE_UNIT,
    EACH_QUOTE_UNIT,
    HOUR_QUOTE_UNIT,
    ITEM_QUOTE_UNIT,
    LINEAR_METRE_QUOTE_UNIT,
    QuoteUnitSchema,
    SQUARE_METRE_QUOTE_UNIT,
} from "../../src/index.ts";

test("QuoteUnitSchema accepts every fixed unit", () => {
    for (const unit of [
        SQUARE_METRE_QUOTE_UNIT,
        LINEAR_METRE_QUOTE_UNIT,
        EACH_QUOTE_UNIT,
        ITEM_QUOTE_UNIT,
        HOUR_QUOTE_UNIT,
        DAY_QUOTE_UNIT,
    ]) {
        assert.equal(QuoteUnitSchema.parse(unit), unit);
    }
});

test("QuoteUnitSchema rejects free-text units", () => {
    const result = QuoteUnitSchema.safeParse("box");
    assert.equal(result.success, false);
});

test("QuoteUnitSchema rejects a near-miss of a valid unit", () => {
    // "m2" (no superscript) is a plausible typo for SQUARE_METRE_QUOTE_UNIT
    // ("m²") - it must not be silently accepted as equivalent.
    const result = QuoteUnitSchema.safeParse("m2");
    assert.equal(result.success, false);
});
