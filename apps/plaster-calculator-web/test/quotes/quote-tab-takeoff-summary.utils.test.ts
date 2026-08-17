import assert from "node:assert/strict";
import test from "node:test";

import { toDocumentProps } from "../../src/app/(app)/projects/[projectId]/quote/quote-tab.utils.ts";

import {
    createDocumentPropsOptions,
    createQuote,
    createQuoteItem,
} from "./quote-tab-test-fixtures.ts";

/**
 * `takeoffSummaryText()`, `addTakeoffQuantity()`, and `formatTakeoffSummaryEntry()`
 * in `quote-tab.utils.ts` are unexported module-scope helpers, so they're
 * exercised here through `toDocumentProps()`'s `takeoffSummaryText` field --
 * the only path that reaches them.
 */

test("toDocumentProps omits takeoffSummaryText when no items carry a quantitySource", () => {
    const options = createDocumentPropsOptions({
        quote: createQuote({
            items: [
                createQuoteItem({ id: "item-1", quantitySource: undefined }),
                createQuoteItem({ id: "item-2", quantitySource: undefined }),
            ],
        }),
    });

    const result = toDocumentProps(options);

    assert.equal(result.takeoffSummaryText, undefined);
});

test("toDocumentProps omits takeoffSummaryText for a quote with no line items at all", () => {
    const options = createDocumentPropsOptions({
        quote: createQuote({ items: [] }),
    });

    const result = toDocumentProps(options);

    assert.equal(result.takeoffSummaryText, undefined);
});

test("toDocumentProps groups, sums, humanizes, and joins the take-off summary", () => {
    const options = createDocumentPropsOptions({
        quote: createQuote({
            items: [
                // Same source + unit as the next item: sums into one entry.
                createQuoteItem({
                    id: "item-1",
                    unit: "m2",
                    quantity: 10.2,
                    quantitySource: {
                        id: "source-1",
                        measurementSource: "WALL_AREA",
                    },
                }),
                createQuoteItem({
                    id: "item-2",
                    unit: "m2",
                    quantity: 5.3,
                    quantitySource: {
                        id: "source-1",
                        measurementSource: "WALL_AREA",
                    },
                }),
                // Distinct plaster type: a separate entry with an em-dash label.
                createQuoteItem({
                    id: "item-3",
                    unit: "m2",
                    quantity: 45,
                    quantitySource: {
                        id: "source-2",
                        measurementSource: "CEILING_AREA",
                        measurementPlasterType: "TEN_MM_PLASTERBOARD",
                    },
                }),
                // Same label as item-1/item-2 but no unit: a separate entry.
                createQuoteItem({
                    id: "item-4",
                    unit: undefined,
                    quantity: 3,
                    quantitySource: {
                        id: "source-1",
                        measurementSource: "WALL_AREA",
                    },
                }),
                // Manually entered: excluded entirely from the summary.
                createQuoteItem({ id: "item-5", quantitySource: undefined }),
            ],
        }),
    });

    const result = toDocumentProps(options);

    assert.equal(
        result.takeoffSummaryText,
        "Wall Area: 15.5 m2, Ceiling Area — Ten Mm Plasterboard: 45 m2, Wall Area: 3",
    );
});

test("toDocumentProps rounds take-off quantities to two decimal places", () => {
    const options = createDocumentPropsOptions({
        quote: createQuote({
            items: [
                createQuoteItem({
                    id: "item-1",
                    unit: "m2",
                    quantity: 120.556,
                    quantitySource: {
                        id: "source-1",
                        measurementSource: "AREA_ONE",
                    },
                }),
                createQuoteItem({
                    id: "item-2",
                    unit: "m2",
                    quantity: 45.671,
                    quantitySource: {
                        id: "source-2",
                        measurementSource: "AREA_TWO",
                    },
                }),
            ],
        }),
    });

    const result = toDocumentProps(options);

    assert.equal(
        result.takeoffSummaryText,
        "Area One: 120.56 m2, Area Two: 45.67 m2",
    );
});
