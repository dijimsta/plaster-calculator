"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

export type QuoteItemTemplateSummary = {
    readonly id: string;
    readonly name: string;
    readonly unit: string | null;
};

export type UseQuoteItemTemplateCatalogResult = {
    readonly itemTemplates: readonly QuoteItemTemplateSummary[];
    readonly isLoading: boolean;
};

/**
 * Every `QuoteItemTemplate` in the team's catalog (system and custom),
 * sorted by `sortOrder`. This is the denominator the suppliers routes
 * measure cost-estimate coverage against -- `SupplierRow.totalItemCount` and
 * `SupplierCostEstimationCard.items` are both documented as "computed by the
 * host page", the same split `useCompanyRateItemSummaries`
 * (`@libraries/plaster-calculator-ui`) uses to read this same catalog for
 * its own coverage summary.
 */
export function useQuoteItemTemplateCatalog(): UseQuoteItemTemplateCatalogResult {
    const { data, isLoading } =
        DataConnectorReact.useListQuoteItemTemplates(dataConnect);
    const itemTemplates = [...(data?.quoteItemTemplates ?? [])]
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((itemTemplate) => ({
            id: itemTemplate.id,
            name: itemTemplate.name,
            unit: itemTemplate.unit ?? null,
        }));
    return { itemTemplates, isLoading };
}
