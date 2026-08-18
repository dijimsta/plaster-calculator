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
import {
    build,
    buildMutationVariables,
} from "../../src/quotes/generate-quote.utils.ts";

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

function resolvedItemFixture(
    overrides: Partial<ResolvedQuoteItem> = {},
): ResolvedQuoteItem {
    return {
        sourceTemplateId: "template-1",
        name: "10mm Plasterboard — walls",
        displayOrder: 0,
        quantity: 52.8,
        unit: "m²",
        quantitySourceId: WALL_QUANTITY_SOURCE_ID,
        unitPriceCents: 1000,
        materialUnitPriceCents: 0,
        labourUnitPriceCents: 0,
        matchedKeywords: [],
        ...overrides,
    };
}

function generateQuoteInputFixture(
    overrides: Partial<GenerateQuoteInput> = {},
): GenerateQuoteInput {
    return {
        isReady: true,
        projectId: "project-1",
        quoteId: "quote-1",
        quoteTemplateId: "template-set-1",
        pages: [],
        templateConfigs: [],
        searchText: "",
        ...overrides,
    };
}

test("build refuses to run at all when the readiness gate is not met", () => {
    const input = generateQuoteInputFixture({
        isReady: false,
        templateConfigs: [templateConfigFixture()],
    });

    const result = build(input);

    assert.equal(result.ok, false);
    if (!result.ok) {
        assert.equal(result.reason, "NOT_READY");
    }
});

test("build proceeds and produces mutation variables when the readiness gate is met", () => {
    const input = generateQuoteInputFixture({
        pages: [] as readonly PageTakeoffInput[],
        templateConfigs: [
            templateConfigFixture({
                hasKeywords: true,
                keywords: ["skylight"],
                quantitySourceId: null,
            }),
        ],
        searchText: "roof plan shows a skylight over the kitchen",
    });

    const result = build(input);

    assert.equal(result.ok, true);
    if (result.ok) {
        assert.equal(result.itemCount, 1);
        assert.equal(result.variables.projectId, "project-1");
        assert.equal(result.variables.quoteId, "quote-1");
        assert.equal(result.variables.includeItem1, true);
        assert.equal(result.variables.item1Quantity, 1);
        assert.equal(result.variables.item1Unit, "m²");
        assert.deepEqual(result.variables.item1MatchedKeywords, ["skylight"]);
    }
});

test("build matches Data Connect's compact quantity-source UUIDs to measured rollups", () => {
    const input = generateQuoteInputFixture({
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
                quantitySourceId: "c1b8d7b7bfda440099d664a366c02f62",
            }),
        ],
    });

    const result = build(input);

    assert.equal(result.ok, true);
    if (result.ok) {
        assert.equal(result.itemCount, 1);
        assert.equal(result.variables.item1Quantity, 4.8);
        assert.equal(
            result.variables.item1QuantitySourceId,
            "c1b8d7b7bfda440099d664a366c02f62",
        );
    }
});

test("build refuses to persist an empty quote when no items resolve", () => {
    const input = generateQuoteInputFixture({
        templateConfigs: [
            templateConfigFixture({
                hasKeywords: true,
                keywords: ["skylight"],
                quantitySourceId: null,
            }),
        ],
        searchText: "standard ceiling throughout",
    });

    const result = build(input);

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

    const result = buildMutationVariables("project-1", "quote-1", items);

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

    const result = buildMutationVariables("project-1", "quote-1", items);

    assert.equal(result.ok, false);
    if (!result.ok) {
        assert.equal(result.reason, "TOO_MANY_ITEMS");
    }
});
