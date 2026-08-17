import type * as DataConnector from "@generated/data-connector-web";

import type { QuoteTemplateFormValues } from "../../../src/quotes/quote-template-form/index.ts";
import type { QuoteTemplateItem } from "../../../src/quotes/quote-template-panel/quote-template-panel.types.ts";

type QuoteItemTemplateRow =
    DataConnector.ListQuoteItemTemplatesData["quoteItemTemplates"][number];
type QuoteItemTemplateConfigRow =
    DataConnector.ListQuoteItemTemplateConfigsForQuoteTemplateData["quoteItemTemplateConfigs"][number];
type CustomItem = QuoteTemplateFormValues["customItems"][number];

export function itemTemplateRowFixture(
    overrides: Partial<QuoteItemTemplateRow> = {},
): QuoteItemTemplateRow {
    return {
        id: "item-1",
        scope: "TEAM",
        systemKey: null,
        name: "Skim coat",
        unit: "m²",
        hasKeywords: false,
        keywords: [],
        sortOrder: 0,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
        ...overrides,
    };
}

export function itemTemplateConfigRowFixture(
    overrides: Partial<QuoteItemTemplateConfigRow> = {},
): QuoteItemTemplateConfigRow {
    const itemTemplateId = overrides.itemTemplateId ?? "item-1";
    return {
        quoteTemplateId: "quote-template-1",
        itemTemplateId,
        enabled: true,
        unitPriceCents: 1000,
        materialUnitPriceCents: 400,
        labourUnitPriceCents: 600,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
        itemTemplate: {
            id: itemTemplateId,
            name: "Skim coat",
            unit: "m²",
            hasKeywords: false,
            keywords: [],
            sortOrder: 0,
        },
        ...overrides,
    };
}

export function quoteTemplateItemFixture(
    overrides: Partial<QuoteTemplateItem> = {},
): QuoteTemplateItem {
    return {
        itemTemplateId: "item-1",
        quoteTemplateId: "quote-template-1",
        scope: "TEAM",
        systemKey: null,
        name: "Skim coat",
        unit: "m²",
        hasKeywords: false,
        keywords: [],
        sortOrder: 0,
        enabled: true,
        unitPriceCents: 1000,
        materialUnitPriceCents: 400,
        labourUnitPriceCents: 600,
        ...overrides,
    };
}

export function customItemFixture(
    overrides: Partial<CustomItem> = {},
): CustomItem {
    return {
        name: "Skim coat",
        unit: "m²",
        hasKeywords: false,
        enabled: true,
        keywords: [],
        unitPriceCents: 1000,
        ...overrides,
    };
}

/** Records every call's `vars` and resolves with a fixed `data` value, standing in for a Data Connect mutation function. */
export function recordingAsync<TVars, TData>(
    calls: TVars[],
    data: TData,
): (vars: TVars) => Promise<TData> {
    return async (vars) => {
        calls.push(vars);
        return data;
    };
}
