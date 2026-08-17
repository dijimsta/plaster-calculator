import assert from "node:assert/strict";
import test from "node:test";

import type { TakeoffRollupResult } from "@libraries/plaster-calculator-common";

import type { GenerateQuoteTemplateConfig } from "../../src/quotes/generate-quote.types.ts";
import { resolveQuoteItems } from "../../src/quotes/generate-quote.utils.ts";

const WALL_QUANTITY_SOURCE_ID = "qs-wall-standard";

function templateConfigFixture(
    overrides: Partial<GenerateQuoteTemplateConfig> = {},
): GenerateQuoteTemplateConfig {
    return {
        itemTemplateId: "template-1",
        name: "10mm Plasterboard — walls",
        unit: "m²",
        hasKeywords: false,
        keywords: [],
        quantitySourceId: WALL_QUANTITY_SOURCE_ID,
        quantitySource: rollupResultFixture(),
        sortOrder: 0,
        unitPriceCents: 1000,
        materialUnitPriceCents: 0,
        labourUnitPriceCents: 0,
        ...overrides,
    };
}

function rollupResultFixture(
    overrides: Partial<TakeoffRollupResult> = {},
): TakeoffRollupResult {
    return {
        quantitySourceId: WALL_QUANTITY_SOURCE_ID,
        measurementSource: "WALL_AREA",
        measurementPlasterType: "STANDARD",
        quantity: 52.8,
        contributingPageIds: ["page-1"],
        ...overrides,
    };
}

test("resolveQuoteItems keeps an unconditional template whose quantity source resolved to a non-zero quantity", () => {
    const items = resolveQuoteItems(
        [templateConfigFixture()],
        [rollupResultFixture()],
        "",
    );

    assert.equal(items.length, 1);
    assert.equal(items[0]?.quantity, 52.8);
    assert.deepEqual(items[0]?.matchedKeywords, []);
});

test("resolveQuoteItems drops an unconditional template whose quantity source resolved to zero", () => {
    const items = resolveQuoteItems(
        [templateConfigFixture()],
        [rollupResultFixture({ quantity: 0 })],
        "",
    );

    assert.equal(items.length, 0);
});

test("resolveQuoteItems drops an unconditional template whose quantity source has no rollup entry at all", () => {
    const items = resolveQuoteItems([templateConfigFixture()], [], "");

    assert.equal(items.length, 0);
});

test("resolveQuoteItems drops a keyword-conditional template whose keywords never matched", () => {
    const items = resolveQuoteItems(
        [
            templateConfigFixture({
                hasKeywords: true,
                keywords: ["raised ceiling"],
                quantitySourceId: null,
            }),
        ],
        [],
        "standard flat ceiling throughout",
    );

    assert.equal(items.length, 0);
});

test("resolveQuoteItems resolves a matched keyword-conditional template with no quantity source to a flat quantity of 1", () => {
    const items = resolveQuoteItems(
        [
            templateConfigFixture({
                itemTemplateId: "scaffold-hire",
                name: "Scaffold hire",
                hasKeywords: true,
                keywords: ["raised ceiling"],
                quantitySourceId: null,
            }),
        ],
        [],
        "Plan notes: raised ceiling in the living room.",
    );

    assert.equal(items.length, 1);
    assert.equal(items[0]?.quantity, 1);
    assert.deepEqual(items[0]?.matchedKeywords, ["raised ceiling"]);
});

test("resolveQuoteItems resolves an unconditional template with no quantity source to a flat quantity of 1", () => {
    const items = resolveQuoteItems(
        [
            templateConfigFixture({
                itemTemplateId: "site-setup",
                name: "Site setup",
                quantitySourceId: null,
            }),
        ],
        [],
        "",
    );

    assert.equal(items.length, 1);
    assert.equal(items[0]?.quantity, 1);
    assert.deepEqual(items[0]?.matchedKeywords, []);
});

test("resolveQuoteItems resolves a matched keyword-conditional template that also has a quantity source from the rollup, not a flat 1", () => {
    const items = resolveQuoteItems(
        [
            templateConfigFixture({
                hasKeywords: true,
                keywords: ["wet area"],
                quantitySourceId: WALL_QUANTITY_SOURCE_ID,
            }),
        ],
        [rollupResultFixture({ quantity: 19.2 })],
        "Bathroom notes: wet area walls",
    );

    assert.equal(items.length, 1);
    assert.equal(items[0]?.quantity, 19.2);
});
