import assert from "node:assert/strict";
import test from "node:test";

import {
    haveSameKeywords,
    mapUnitPricesByItemTemplateId,
    mergeQuoteItemTemplates,
    resolveBackfillPriceCents,
    resolveDefaultTemplateContext,
} from "../../../src/quotes/quote-template-panel/quote-template-panel.utils.ts";

import {
    itemTemplateConfigRowFixture,
    itemTemplateRowFixture,
} from "./quote-template-panel-test-fixtures.ts";

// mergeQuoteItemTemplates

test("mergeQuoteItemTemplates merges a matching item template and config into a QuoteTemplateItem", () => {
    const itemTemplates = [
        itemTemplateRowFixture({
            id: "item-1",
            scope: "TEAM",
            name: "Skim coat",
            unit: "m²",
            hasKeywords: true,
            keywords: ["cornice"],
            sortOrder: 3,
        }),
    ];
    const configs = [
        itemTemplateConfigRowFixture({
            itemTemplateId: "item-1",
            enabled: true,
            unitPriceCents: 1000,
            materialUnitPriceCents: 400,
            labourUnitPriceCents: 600,
        }),
    ];

    const merged = mergeQuoteItemTemplates(
        "quote-template-1",
        itemTemplates,
        configs,
    );

    assert.deepEqual(merged, [
        {
            itemTemplateId: "item-1",
            quoteTemplateId: "quote-template-1",
            scope: "TEAM",
            systemKey: null,
            name: "Skim coat",
            unit: "m²",
            hasKeywords: true,
            keywords: ["cornice"],
            sortOrder: 3,
            enabled: true,
            unitPriceCents: 1000,
            materialUnitPriceCents: 400,
            labourUnitPriceCents: 600,
        },
    ]);
});

test("mergeQuoteItemTemplates drops item templates with no matching config", () => {
    const itemTemplates = [
        itemTemplateRowFixture({ id: "item-1" }),
        itemTemplateRowFixture({ id: "item-2" }),
    ];
    const configs = [
        itemTemplateConfigRowFixture({ itemTemplateId: "item-1" }),
    ];

    const merged = mergeQuoteItemTemplates(
        "quote-template-1",
        itemTemplates,
        configs,
    );

    assert.equal(merged.length, 1);
    assert.equal(merged[0]?.itemTemplateId, "item-1");
});

test("mergeQuoteItemTemplates returns an empty array when there are no item templates", () => {
    const configs = [
        itemTemplateConfigRowFixture({ itemTemplateId: "item-1" }),
    ];

    assert.deepEqual(
        mergeQuoteItemTemplates("quote-template-1", [], configs),
        [],
    );
});

test("mergeQuoteItemTemplates returns an empty array when there are no configs", () => {
    const itemTemplates = [itemTemplateRowFixture({ id: "item-1" })];

    assert.deepEqual(
        mergeQuoteItemTemplates("quote-template-1", itemTemplates, []),
        [],
    );
});

test("mergeQuoteItemTemplates defaults a missing systemKey and unit to null", () => {
    const itemTemplates = [
        itemTemplateRowFixture({
            id: "item-1",
            systemKey: undefined,
            unit: undefined,
        }),
    ];
    const configs = [
        itemTemplateConfigRowFixture({ itemTemplateId: "item-1" }),
    ];

    const merged = mergeQuoteItemTemplates(
        "quote-template-1",
        itemTemplates,
        configs,
    );

    assert.equal(merged[0]?.systemKey, null);
    assert.equal(merged[0]?.unit, null);
});

test("mergeQuoteItemTemplates parses a SYSTEM scope", () => {
    const itemTemplates = [
        itemTemplateRowFixture({ id: "item-1", scope: "SYSTEM" }),
    ];
    const configs = [
        itemTemplateConfigRowFixture({ itemTemplateId: "item-1" }),
    ];

    const merged = mergeQuoteItemTemplates(
        "quote-template-1",
        itemTemplates,
        configs,
    );

    assert.equal(merged[0]?.scope, "SYSTEM");
});

test("mergeQuoteItemTemplates throws when the item template's scope is neither SYSTEM nor TEAM", () => {
    const itemTemplates = [
        itemTemplateRowFixture({ id: "item-1", scope: "BOGUS" }),
    ];
    const configs = [
        itemTemplateConfigRowFixture({ itemTemplateId: "item-1" }),
    ];

    assert.throws(() =>
        mergeQuoteItemTemplates("quote-template-1", itemTemplates, configs),
    );
});

// haveSameKeywords

test("haveSameKeywords is true for two empty arrays", () => {
    assert.equal(haveSameKeywords([], []), true);
});

test("haveSameKeywords is true when both arrays hold the same values in the same order", () => {
    assert.equal(
        haveSameKeywords(["cornice", "cement"], ["cornice", "cement"]),
        true,
    );
});

test("haveSameKeywords is false when the arrays have different lengths", () => {
    assert.equal(haveSameKeywords(["cornice"], ["cornice", "cement"]), false);
});

test("haveSameKeywords is false when the same values appear in a different order", () => {
    assert.equal(
        haveSameKeywords(["cornice", "cement"], ["cement", "cornice"]),
        false,
    );
});

// mapUnitPricesByItemTemplateId

test("mapUnitPricesByItemTemplateId returns an empty map for an empty list of configs", () => {
    const prices = mapUnitPricesByItemTemplateId([]);

    assert.equal(prices.size, 0);
});

test("mapUnitPricesByItemTemplateId maps each config's item template id to its unit price", () => {
    const configs = [
        itemTemplateConfigRowFixture({
            itemTemplateId: "item-1",
            unitPriceCents: 1000,
        }),
        itemTemplateConfigRowFixture({
            itemTemplateId: "item-2",
            unitPriceCents: 2000,
        }),
    ];

    const prices = mapUnitPricesByItemTemplateId(configs);

    assert.equal(prices.size, 2);
    assert.equal(prices.get("item-1"), 1000);
    assert.equal(prices.get("item-2"), 2000);
});

test("mapUnitPricesByItemTemplateId keeps the last price when an item template id repeats", () => {
    const configs = [
        itemTemplateConfigRowFixture({
            itemTemplateId: "item-1",
            unitPriceCents: 1000,
        }),
        itemTemplateConfigRowFixture({
            itemTemplateId: "item-1",
            unitPriceCents: 1500,
        }),
    ];

    const prices = mapUnitPricesByItemTemplateId(configs);

    assert.equal(prices.size, 1);
    assert.equal(prices.get("item-1"), 1500);
});

// resolveDefaultTemplateContext

test("resolveDefaultTemplateContext finds no default and needs no backfill when templates is empty", () => {
    const context = resolveDefaultTemplateContext("template-1", []);

    assert.deepEqual(context, {
        defaultTemplateId: null,
        isDefaultTemplate: false,
        needsDefaultPricesForBackfill: false,
    });
});

test("resolveDefaultTemplateContext resolves the default template id even when quoteTemplateId is null", () => {
    const templates = [
        { id: "template-1", isDefault: false },
        { id: "template-2", isDefault: true },
    ];

    const context = resolveDefaultTemplateContext(null, templates);

    assert.deepEqual(context, {
        defaultTemplateId: "template-2",
        isDefaultTemplate: false,
        needsDefaultPricesForBackfill: false,
    });
});

test("resolveDefaultTemplateContext marks the default template as itself, needing no backfill", () => {
    const templates = [
        { id: "template-1", isDefault: false },
        { id: "template-2", isDefault: true },
    ];

    const context = resolveDefaultTemplateContext("template-2", templates);

    assert.deepEqual(context, {
        defaultTemplateId: "template-2",
        isDefaultTemplate: true,
        needsDefaultPricesForBackfill: false,
    });
});

test("resolveDefaultTemplateContext marks a variation as needing default prices for backfill", () => {
    const templates = [
        { id: "template-1", isDefault: false },
        { id: "template-2", isDefault: true },
    ];

    const context = resolveDefaultTemplateContext("template-1", templates);

    assert.deepEqual(context, {
        defaultTemplateId: "template-2",
        isDefaultTemplate: false,
        needsDefaultPricesForBackfill: true,
    });
});

test("resolveDefaultTemplateContext needs no backfill when no template is marked default", () => {
    const templates = [
        { id: "template-1", isDefault: false },
        { id: "template-2", isDefault: false },
    ];

    const context = resolveDefaultTemplateContext("template-1", templates);

    assert.deepEqual(context, {
        defaultTemplateId: null,
        isDefaultTemplate: false,
        needsDefaultPricesForBackfill: false,
    });
});

// resolveBackfillPriceCents

test("resolveBackfillPriceCents is always zero for the default template", () => {
    const prices = new Map([["item-1", 1500]]);

    assert.equal(resolveBackfillPriceCents(true, "item-1", prices), 0);
});

test("resolveBackfillPriceCents copies the default template's current price for a variation", () => {
    const prices = new Map([["item-1", 1500]]);

    assert.equal(resolveBackfillPriceCents(false, "item-1", prices), 1500);
});

test("resolveBackfillPriceCents falls back to zero for a variation when the default has no price for the item yet", () => {
    const prices = new Map<string, number>();

    assert.equal(resolveBackfillPriceCents(false, "item-1", prices), 0);
});
