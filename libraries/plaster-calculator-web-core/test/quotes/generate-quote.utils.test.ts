import assert from "node:assert/strict";
import test from "node:test";

import type {
    TakeoffRollupResult,
    PageTakeoffInput,
} from "@libraries/plaster-calculator-common";

import type {
    GenerateQuoteInput,
    GenerateQuoteTemplateConfig,
    ResolvedQuoteItem,
} from "../../src/quotes/generate-quote.types.ts";
import { GenerateQuoteUtils } from "../../src/quotes/generate-quote.utils.ts";

const WALL_QUANTITY_SOURCE_ID = "qs-wall-standard";
const SYSTEM_WALL_QUANTITY_SOURCE_ID = "c1b8d7b7bfda440099d664a366c02f62";

function templateConfigFixture(
    overrides: Partial<GenerateQuoteTemplateConfig> = {},
): GenerateQuoteTemplateConfig {
    return {
        itemTemplateId: "template-1",
        name: "10mm Plasterboard — walls",
        hasKeywords: false,
        keywords: [],
        quantitySourceId: WALL_QUANTITY_SOURCE_ID,
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

function resolvedItemFixture(
    overrides: Partial<ResolvedQuoteItem> = {},
): ResolvedQuoteItem {
    return {
        sourceTemplateId: "template-1",
        name: "10mm Plasterboard — walls",
        displayOrder: 0,
        quantity: 52.8,
        quantitySourceId: WALL_QUANTITY_SOURCE_ID,
        unitPriceCents: 1000,
        materialUnitPriceCents: 0,
        labourUnitPriceCents: 0,
        matchedKeywords: [],
        ...overrides,
    };
}

test("resolveQuoteItems keeps an unconditional template whose quantity source resolved to a non-zero quantity", () => {
    const items = GenerateQuoteUtils.resolveQuoteItems(
        [templateConfigFixture()],
        [rollupResultFixture()],
        "",
    );

    assert.equal(items.length, 1);
    assert.equal(items[0]?.quantity, 52.8);
    assert.deepEqual(items[0]?.matchedKeywords, []);
});

test("resolveQuoteItems drops an unconditional template whose quantity source resolved to zero", () => {
    const items = GenerateQuoteUtils.resolveQuoteItems(
        [templateConfigFixture()],
        [rollupResultFixture({ quantity: 0 })],
        "",
    );

    assert.equal(items.length, 0);
});

test("resolveQuoteItems drops an unconditional template whose quantity source has no rollup entry at all", () => {
    const items = GenerateQuoteUtils.resolveQuoteItems(
        [templateConfigFixture()],
        [],
        "",
    );

    assert.equal(items.length, 0);
});

test("resolveQuoteItems drops a keyword-conditional template whose keywords never matched", () => {
    const items = GenerateQuoteUtils.resolveQuoteItems(
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
    const items = GenerateQuoteUtils.resolveQuoteItems(
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
    const items = GenerateQuoteUtils.resolveQuoteItems(
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
    const items = GenerateQuoteUtils.resolveQuoteItems(
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

test("build refuses to run at all when the readiness gate is not met", () => {
    const input: GenerateQuoteInput = {
        isReady: false,
        projectId: "project-1",
        quoteId: "quote-1",
        pages: [],
        templateConfigs: [templateConfigFixture()],
        searchText: "",
    };

    const result = GenerateQuoteUtils.build(input);

    assert.equal(result.ok, false);
    if (!result.ok) {
        assert.equal(result.reason, "NOT_READY");
    }
});

test("build proceeds and produces mutation variables when the readiness gate is met", () => {
    const input: GenerateQuoteInput = {
        isReady: true,
        projectId: "project-1",
        quoteId: "quote-1",
        pages: [] as readonly PageTakeoffInput[],
        templateConfigs: [
            templateConfigFixture({
                hasKeywords: true,
                keywords: ["skylight"],
                quantitySourceId: null,
            }),
        ],
        searchText: "roof plan shows a skylight over the kitchen",
    };

    const result = GenerateQuoteUtils.build(input);

    assert.equal(result.ok, true);
    if (result.ok) {
        assert.equal(result.itemCount, 1);
        assert.equal(result.variables.projectId, "project-1");
        assert.equal(result.variables.quoteId, "quote-1");
        assert.equal(result.variables.includeItem1, true);
        assert.equal(result.variables.item1Quantity, 1);
        assert.deepEqual(result.variables.item1MatchedKeywords, ["skylight"]);
    }
});

test("build matches Data Connect's compact quantity-source UUIDs to measured rollups", () => {
    const input: GenerateQuoteInput = {
        isReady: true,
        projectId: "project-1",
        quoteId: "quote-1",
        pages: [
            {
                pageId: "page-1",
                overlay: {
                    areas: [
                        {
                            id: "room-1",
                            label: "Living room",
                            points: [
                                [0, 0],
                                [100, 0],
                                [100, 100],
                                [0, 100],
                            ],
                            wallBoardType: "10mm Plasterboard",
                            ceilingPlasterType: "Standard",
                            ceilingHeightMm: 2400,
                            source: "detected",
                            deleted: false,
                        },
                    ],
                },
                scaleMmPerPx: 5,
                pageHeightMm: null,
            },
        ],
        templateConfigs: [
            templateConfigFixture({
                quantitySourceId: SYSTEM_WALL_QUANTITY_SOURCE_ID,
            }),
        ],
        searchText: "",
    };

    const result = GenerateQuoteUtils.build(input);

    assert.equal(result.ok, true);
    if (result.ok) {
        assert.equal(result.itemCount, 1);
        assert.equal(result.variables.item1Quantity, 4.8);
        assert.equal(
            result.variables.item1QuantitySourceId,
            SYSTEM_WALL_QUANTITY_SOURCE_ID,
        );
    }
});

test("build refuses to persist an empty quote when no items resolve", () => {
    const input: GenerateQuoteInput = {
        isReady: true,
        projectId: "project-1",
        quoteId: "quote-1",
        pages: [],
        templateConfigs: [
            templateConfigFixture({
                hasKeywords: true,
                keywords: ["skylight"],
                quantitySourceId: null,
            }),
        ],
        searchText: "standard ceiling throughout",
    };

    const result = GenerateQuoteUtils.build(input);

    assert.equal(result.ok, false);
    if (!result.ok) {
        assert.equal(result.reason, "NO_ITEMS");
    }
});

test("buildMutationVariables maps up to 20 resolved items onto their fixed slots", () => {
    const items = Array.from({ length: 20 }, (_, index) =>
        resolvedItemFixture({
            sourceTemplateId: `template-${String(index + 1)}`,
            name: `Item ${String(index + 1)}`,
            displayOrder: index,
        }),
    );

    const result = GenerateQuoteUtils.buildMutationVariables(
        "project-1",
        "quote-1",
        items,
    );

    assert.equal(result.ok, true);
    if (result.ok) {
        assert.equal(result.itemCount, 20);
        assert.equal(result.variables.includeItem1, true);
        assert.equal(result.variables.item1Name, "Item 1");
        assert.equal(result.variables.includeItem20, true);
        assert.equal(result.variables.item20Name, "Item 20");
    }
});

test("buildMutationVariables refuses rather than truncates when there are more than 20 resolved items", () => {
    const items = Array.from({ length: 21 }, (_, index) =>
        resolvedItemFixture({
            sourceTemplateId: `template-${String(index + 1)}`,
            displayOrder: index,
        }),
    );

    const result = GenerateQuoteUtils.buildMutationVariables(
        "project-1",
        "quote-1",
        items,
    );

    assert.equal(result.ok, false);
    if (!result.ok) {
        assert.equal(result.reason, "TOO_MANY_ITEMS");
    }
});
