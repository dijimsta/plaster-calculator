import assert from "node:assert/strict";
import test from "node:test";

import type { GetQuoteReadinessData } from "@generated/data-connector-web";

import { GenerateQuoteUtils } from "../../src/quotes/generate-quote.utils.ts";

const WALL_QUANTITY_SOURCE_ID = "qs-wall-standard";

type QueryTemplateConfig =
    GetQuoteReadinessData["quoteItemTemplateConfigs"][number];

/**
 * A raw `GetQuoteReadiness` `quoteItemTemplateConfigs` row — the shape
 * `GenerateQuoteUtils.buildTemplateConfigs()` actually receives for a
 * `QuoteTemplate` (the resolved pricing template, or the team's default),
 * before it's mapped onto `GenerateQuoteTemplateConfig`.
 */
function queryTemplateConfigFixture(
    overrides: Partial<QueryTemplateConfig> = {},
): QueryTemplateConfig {
    const itemTemplateId = overrides.itemTemplateId ?? "template-1";
    return {
        itemTemplateId,
        enabled: true,
        unitPriceCents: 1000,
        itemTemplate: {
            id: itemTemplateId,
            name: "10mm Plasterboard — walls",
            unit: "m²",
            hasKeywords: false,
            keywords: [],
            sortOrder: 0,
            quantitySourceId: WALL_QUANTITY_SOURCE_ID,
            quantitySource: {
                id: WALL_QUANTITY_SOURCE_ID,
                measurementSource: "WALL_AREA",
                measurementPlasterType: "STANDARD",
            },
        },
        ...overrides,
    };
}

test("buildTemplateConfigs prices from the variation when the company is assigned to one", () => {
    const variationConfigs = [
        queryTemplateConfigFixture({ unitPriceCents: 1500 }),
    ];
    const defaultConfigs = [
        queryTemplateConfigFixture({ unitPriceCents: 1000 }),
    ];

    const configs = GenerateQuoteUtils.buildTemplateConfigs(
        variationConfigs,
        defaultConfigs,
    );

    assert.equal(configs.length, 1);
    assert.equal(configs[0]?.unitPriceCents, 1500);
});

test("buildTemplateConfigs prices from the default when the company has no variation assigned", () => {
    const defaultConfigs = [
        queryTemplateConfigFixture({ unitPriceCents: 1000 }),
    ];

    const configs = GenerateQuoteUtils.buildTemplateConfigs(
        defaultConfigs,
        defaultConfigs,
    );

    assert.equal(configs.length, 1);
    assert.equal(configs[0]?.unitPriceCents, 1000);
});

test("buildTemplateConfigs keeps an item excluded on the default off a variation-priced quote, even when the variation's own row is enabled", () => {
    const variationConfigs = [
        queryTemplateConfigFixture({ enabled: true, unitPriceCents: 1500 }),
    ];
    const defaultConfigs = [
        queryTemplateConfigFixture({ enabled: false, unitPriceCents: 1000 }),
    ];

    const configs = GenerateQuoteUtils.buildTemplateConfigs(
        variationConfigs,
        defaultConfigs,
    );

    assert.equal(configs.length, 0);
});

test("buildTemplateConfigs drops an item the variation prices but the default never configured at all", () => {
    const variationConfigs = [
        queryTemplateConfigFixture({
            itemTemplateId: "variation-only-item",
            enabled: true,
            unitPriceCents: 1500,
        }),
    ];
    const defaultConfigs: readonly QueryTemplateConfig[] = [];

    const configs = GenerateQuoteUtils.buildTemplateConfigs(
        variationConfigs,
        defaultConfigs,
    );

    assert.equal(configs.length, 0);
});
