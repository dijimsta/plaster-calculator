import type { QuoteItemTemplateScope } from "@libraries/plaster-calculator-common";

export type QuoteTemplate = {
    readonly id: string;
    readonly name: string;
    readonly createdAt: string;
    readonly updatedAt: string;
};

export type QuoteTemplateItem = {
    readonly itemTemplateId: string;
    readonly quoteTemplateId: string;
    readonly scope: QuoteItemTemplateScope;
    readonly systemKey: string | null;
    readonly name: string;
    readonly unit: string | null;
    readonly hasKeywords: boolean;
    readonly keywords: readonly string[];
    readonly sortOrder: number;
    readonly enabled: boolean;
    readonly unitPriceCents: number;
    readonly materialUnitPriceCents: number;
    readonly labourUnitPriceCents: number;
};
