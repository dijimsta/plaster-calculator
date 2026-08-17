import type { GetProjectQuoteData } from "@generated/data-connector-web";
import {
    DEFAULT_QUOTE_APPEARANCE,
    FULL_LINE_ITEMS_PRICING_DETAIL,
    type QuoteAppearance,
} from "@libraries/plaster-calculator-common";

import type { ToDocumentPropsOptions } from "../../src/app/(app)/projects/[projectId]/quote/quote-tab.utils.ts";

export type ProjectQuote = NonNullable<
    NonNullable<GetProjectQuoteData["project"]>["quote"]
>;
export type ProjectQuoteItem = ProjectQuote["items"][number];
export type ProjectQuoteAppearanceRow =
    GetProjectQuoteData["appearance"][number];

export function createQuoteItem(
    overrides: Partial<ProjectQuoteItem> = {},
): ProjectQuoteItem {
    return {
        id: "item-1",
        displayOrder: 0,
        name: "Item",
        quantity: 1,
        unitPriceCents: 100,
        materialUnitPriceCents: 60,
        labourUnitPriceCents: 40,
        matchedKeywords: [],
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        ...overrides,
    };
}

export function createQuote(
    overrides: Partial<ProjectQuote> = {},
): ProjectQuote {
    return {
        id: "quote-1",
        teamId: "team-1",
        projectId: "project-1",
        status: "DRAFT",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        items: [],
        ...overrides,
    };
}

export function createAppearanceRow(
    overrides: Partial<ProjectQuoteAppearanceRow> = {},
): ProjectQuoteAppearanceRow {
    return {
        teamId: "team-1",
        pricingDetail: FULL_LINE_ITEMS_PRICING_DETAIL,
        showScopeOfWork: true,
        showTakeoffSummary: false,
        showSignatureBlock: false,
        validForDays: 30,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        ...overrides,
    };
}

export function createAppearance(
    overrides: Partial<QuoteAppearance> = {},
): QuoteAppearance {
    return { ...DEFAULT_QUOTE_APPEARANCE, ...overrides };
}

export function createDocumentPropsOptions(
    overrides: Partial<ToDocumentPropsOptions> = {},
): ToDocumentPropsOptions {
    return {
        quote: createQuote(),
        projectName: "Test Project",
        companyName: null,
        appearance: createAppearance(),
        logoUrl: null,
        scopeOfWorkText: null,
        ...overrides,
    };
}
