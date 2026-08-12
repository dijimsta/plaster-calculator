import assert from "node:assert/strict";
import test from "node:test";

import { CurrencyUtils } from "../../src/index.ts";

test("centsToAudDisplayText formats a simple sub-dollar amount", () => {
    assert.equal(CurrencyUtils.centsToAudDisplayText(500), "$5.00");
});

test("centsToAudDisplayText inserts a thousands separator", () => {
    assert.equal(CurrencyUtils.centsToAudDisplayText(123456), "$1,234.56");
});

test("centsToAudDisplayText prefixes a negative amount's sign before the dollar sign", () => {
    assert.equal(CurrencyUtils.centsToAudDisplayText(-500), "-$5.00");
});

test("centsToAudDisplayText formats zero", () => {
    assert.equal(CurrencyUtils.centsToAudDisplayText(0), "$0.00");
});
