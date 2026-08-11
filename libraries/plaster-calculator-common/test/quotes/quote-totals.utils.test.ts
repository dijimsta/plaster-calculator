import assert from "node:assert/strict";
import test from "node:test";

import { GST_RATE, QuoteTotalsUtils } from "../../src/index.ts";

test("GST_RATE is 10%", () => {
    assert.equal(GST_RATE, 0.1);
});

test("lineAmountCents multiplies an integer quantity by the unit price", () => {
    assert.equal(QuoteTotalsUtils.lineAmountCents(3, 1999), 5997);
});

test("lineAmountCents rounds a fractional quantity to the nearest whole cent", () => {
    // 2.5 * 333 = 832.5 exactly in IEEE 754, so this also pins down which way
    // a half-cent rounds (up, via Math.round).
    assert.equal(QuoteTotalsUtils.lineAmountCents(2.5, 333), 833);
});

test("subtotalCents sums an empty list of lines to zero", () => {
    assert.equal(QuoteTotalsUtils.subtotalCents([]), 0);
});

test("subtotalCents sums line amounts exactly", () => {
    const lineAmounts = [
        QuoteTotalsUtils.lineAmountCents(3, 1999),
        QuoteTotalsUtils.lineAmountCents(1, 995),
    ];
    assert.equal(QuoteTotalsUtils.subtotalCents(lineAmounts), 6992);
});

test("subtotalCents avoids the floating-point drift naive dollar-float summation hits across many lines", () => {
    // 21 lines of fractional quantities (e.g. metres of board) against
    // arbitrary cent unit prices. Summing each line as a *dollar* float
    // (quantity * (unitPriceCents / 100)) and rounding once at the end -
    // the naive approach - gives 7527 cents for this exact data, because
    // IEEE 754 addition of the non-terminating binary fractions drifts by
    // more than half a cent over 21 additions. Rounding each line to the
    // nearest cent first (what lineAmountCents does) and then summing
    // integers, as below, is immune to that drift and gives the correct
    // 7526.
    const unitPricesCents = [
        8, 21, 34, 47, 60, 73, 86, 99, 112, 125, 138, 151, 164, 177, 190, 203,
        216, 229, 242, 255, 268,
    ];
    const quantities = [
        0.31, 0.48, 0.65, 0.82, 0.99, 1.16, 1.33, 1.5, 1.67, 1.84, 2.01, 2.18,
        2.35, 2.52, 2.69, 2.86, 3.03, 3.2, 3.37, 3.54, 3.71,
    ];

    const lineAmounts = unitPricesCents.map((unitPriceCents, index) =>
        QuoteTotalsUtils.lineAmountCents(quantities[index], unitPriceCents),
    );

    assert.equal(QuoteTotalsUtils.subtotalCents(lineAmounts), 7526);
});

test("gstCents rounds an exact half-cent up", () => {
    // 1005 * 0.1 = 100.5 exactly, so this pins down the rounding direction.
    assert.equal(QuoteTotalsUtils.gstCents(1005), 101);
});

test("gstCents computes 10% of the subtotal", () => {
    assert.equal(QuoteTotalsUtils.gstCents(6992), 699);
});

test("totalIncGstCents adds the subtotal and GST", () => {
    assert.equal(QuoteTotalsUtils.totalIncGstCents(6992, 699), 7691);
});

test("end-to-end: 3 units at $19.99 plus 1 unit at $9.95 totals $76.91 inc. GST", () => {
    const lineAmounts = [
        QuoteTotalsUtils.lineAmountCents(3, 1999),
        QuoteTotalsUtils.lineAmountCents(1, 995),
    ];
    const subtotalCents = QuoteTotalsUtils.subtotalCents(lineAmounts);
    const gstCents = QuoteTotalsUtils.gstCents(subtotalCents);
    const totalIncGstCents = QuoteTotalsUtils.totalIncGstCents(
        subtotalCents,
        gstCents,
    );

    assert.equal(subtotalCents, 6992);
    assert.equal(gstCents, 699);
    assert.equal(totalIncGstCents, 7691);
});
