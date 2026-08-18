"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useQueries } from "@tanstack/react-query";

import type { QuoteTemplate } from "./quote-template-panel.types.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

/** Every system catalog includes this board -- the representative item `QuoteTemplateCard` summarizes as "Walls $X/LM". */
const WALLS_ITEM_SYSTEM_KEY = "PLASTERBOARD_10MM";

export type QuoteTemplateRateSummary = {
    readonly unit: string | null;
    readonly unitPriceCents: number;
};

export type UseQuoteTemplateRateSummariesResult = {
    readonly rateByTemplateId: ReadonlyMap<string, QuoteTemplateRateSummary>;
    readonly isLoading: boolean;
};

/**
 * Every template's price for one representative item (the 10mm plasterboard
 * wall board every system catalog includes), read purely for
 * `QuoteTemplateCard`'s summary line ("Walls $74/LM", "−8.1% vs default").
 *
 * Deliberately its own lightweight, read-only fetch rather than reusing
 * `useQuoteItemTemplates`: that hook auto-creates missing
 * `QuoteItemTemplateConfig` rows and reconciles the system catalog as a side
 * effect of being called, and firing that once per template just to render
 * a summary card would multiply those writes across every template on every
 * page load. This hook only ever reads.
 *
 * Each per-template fetch uses the exact `[ref.name, ref.variables]` query
 * key `refreshQuoteTemplateItems()` (`quote-template-panel.utils.ts`) uses
 * to write into the cache, which is also the key
 * `DataConnectorReact.useListQuoteItemTemplateConfigsForQuoteTemplate`
 * manages internally -- so opening a template later reuses this cached
 * fetch instead of issuing a second one.
 */
export function useQuoteTemplateRateSummaries(
    templates: readonly QuoteTemplate[],
): UseQuoteTemplateRateSummariesResult {
    const { data: itemTemplatesData, isLoading: isLoadingItemTemplates } =
        DataConnectorReact.useListQuoteItemTemplates(dataConnect);
    const wallsItemTemplate = itemTemplatesData?.quoteItemTemplates.find(
        (itemTemplate) => itemTemplate.systemKey === WALLS_ITEM_SYSTEM_KEY,
    );
    const wallsItemTemplateId = wallsItemTemplate?.id ?? null;
    const wallsUnit = wallsItemTemplate?.unit ?? null;

    const configQueries = useQueries({
        queries: templates.map((template) => {
            const ref =
                DataConnector.listQuoteItemTemplateConfigsForQuoteTemplateRef(
                    dataConnect,
                    { quoteTemplateId: template.id },
                );
            return {
                queryKey: [ref.name, ref.variables ?? null],
                // Returns the same `{ quoteItemTemplateConfigs: [...] }`
                // shape `DataConnectorReact.useListQuoteItemTemplateConfigsForQuoteTemplate`
                // and `refreshQuoteTemplateItems()` cache under this exact
                // key -- not just the bare array -- since react-query
                // doesn't care which query "owns" a key: whichever query
                // (this one, or that hook, wherever else it's mounted)
                // resolves first sets the shape every subscriber to this
                // key reads afterward.
                queryFn: async () => {
                    const result =
                        await DataConnector.listQuoteItemTemplateConfigsForQuoteTemplate(
                            dataConnect,
                            { quoteTemplateId: template.id },
                        );
                    return result.data;
                },
                enabled: wallsItemTemplateId !== null,
            };
        }),
    });

    const rateByTemplateId = new Map<string, QuoteTemplateRateSummary>();
    templates.forEach((template, index) => {
        const configs =
            configQueries[index]?.data?.quoteItemTemplateConfigs ?? [];
        const wallsConfig = configs.find(
            (config) => config.itemTemplateId === wallsItemTemplateId,
        );
        if (wallsConfig !== undefined) {
            rateByTemplateId.set(template.id, {
                unit: wallsUnit,
                unitPriceCents: wallsConfig.unitPriceCents,
            });
        }
    });

    return {
        rateByTemplateId,
        isLoading:
            isLoadingItemTemplates ||
            configQueries.some((result) => result.isLoading),
    };
}
