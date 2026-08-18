import assert from "node:assert/strict";
import test from "node:test";

import { toEditableValues } from "../../src/app/(app)/projects/[projectId]/quote/quote-tab.utils.ts";

import { createQuote, createQuoteItem } from "./quote-tab-test-fixtures.ts";

test("toEditableValues maps a quote's reference and line items", () => {
    const quote = createQuote({
        reference: "REF-100",
        items: [
            createQuoteItem({
                id: "item-1",
                name: "Skim coat",
                quantity: 12.5,
                unit: "m2",
                unitPriceCents: 2500,
            }),
        ],
    });

    const result = toEditableValues(quote);

    assert.deepEqual(result, {
        reference: "REF-100",
        lineItems: [
            {
                id: "item-1",
                name: "Skim coat",
                quantity: 12.5,
                unit: "m2",
                unitPriceCents: 2500,
            },
        ],
    });
});

test("toEditableValues defaults a missing reference to an empty string", () => {
    const quote = createQuote({ reference: undefined });

    const result = toEditableValues(quote);

    assert.equal(result.reference, "");
});

test("toEditableValues defaults a missing or null item unit to null", () => {
    const quote = createQuote({
        items: [
            createQuoteItem({ id: "item-1", unit: undefined }),
            createQuoteItem({ id: "item-2", unit: null }),
        ],
    });

    const result = toEditableValues(quote);

    assert.equal(result.lineItems[0]?.unit, null);
    assert.equal(result.lineItems[1]?.unit, null);
});

test("toEditableValues maps an empty items array to an empty line item list", () => {
    const quote = createQuote({ items: [] });

    const result = toEditableValues(quote);

    assert.deepEqual(result.lineItems, []);
});
