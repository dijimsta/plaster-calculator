"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE } from "@libraries/plaster-calculator-common";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";

import {
    describeRatePercentDelta,
    type RatePercentDelta,
} from "../quotes/quote-template-variation-editor/index.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

/** How many representative system catalog items the Pricing card features. */
const FEATURED_ITEM_COUNT = 3;

type ItemTemplateRow =
    DataConnector.ListQuoteItemTemplatesData["quoteItemTemplates"][number];
type ItemTemplateConfigRow = {
    readonly itemTemplateId: string;
    readonly unitPriceCents: number;
};
type QuoteTemplateRow = { readonly id: string; readonly isDefault: boolean };

export type CompanyRateItemSummary = {
    readonly id: string;
    readonly name: string;
    readonly unit: string | null;
    readonly unitPriceCents: number;
    readonly percentDelta?: RatePercentDelta;
};

export type UseCompanyRateItemSummariesResult = {
    readonly items: readonly CompanyRateItemSummary[];
    readonly isLoading: boolean;
};

/**
 * `quoteTemplateId` names the specific rates variation assigned to a
 * company; `null` means the company falls back to the team's default
 * template instead of having a config of its own. Resolves both to one
 * `effectiveTemplateId` -- the template whose prices actually apply to this
 * company -- since the item-price lookup must query that template either
 * way, not `quoteTemplateId` literally (a `null` company would otherwise
 * look up prices for template id `""` and find nothing).
 */
function resolveTemplateContext(
    quoteTemplateId: string | null,
    templates: readonly QuoteTemplateRow[],
): {
    readonly effectiveTemplateId: string | null;
    readonly defaultTemplateId: string | null;
    readonly isUsingDefault: boolean;
} {
    const defaultTemplateId =
        templates.find((template) => template.isDefault)?.id ?? null;
    const effectiveTemplateId = quoteTemplateId ?? defaultTemplateId;
    return {
        effectiveTemplateId,
        defaultTemplateId,
        isUsingDefault:
            effectiveTemplateId !== null &&
            effectiveTemplateId === defaultTemplateId,
    };
}

function shouldFetchDefaultConfigs(
    defaultTemplateId: string | null,
    isUsingDefault: boolean,
): boolean {
    return defaultTemplateId !== null && !isUsingDefault;
}

function quoteTemplatesOf(
    data: DataConnector.ListQuoteTemplatesForTeamData | undefined,
): readonly QuoteTemplateRow[] {
    return data?.quoteTemplates ?? [];
}

function itemTemplatesOf(
    data: DataConnector.ListQuoteItemTemplatesData | undefined,
): readonly ItemTemplateRow[] {
    return data?.quoteItemTemplates ?? [];
}

function itemTemplateConfigsOf(
    data:
        | DataConnector.ListQuoteItemTemplateConfigsForQuoteTemplateData
        | undefined,
): readonly ItemTemplateConfigRow[] {
    return data?.quoteItemTemplateConfigs ?? [];
}

function orEmpty(value: string | null): string {
    return value ?? "";
}

function selectFeaturedItemTemplates(
    itemTemplates: readonly ItemTemplateRow[],
): readonly ItemTemplateRow[] {
    return itemTemplates
        .filter(
            (itemTemplate) =>
                itemTemplate.scope === SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE,
        )
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .slice(0, FEATURED_ITEM_COUNT);
}

function resolveDefaultPriceMap(
    isUsingDefault: boolean,
    priceByItemTemplateId: ReadonlyMap<string, number>,
    defaultConfigsData:
        | DataConnector.ListQuoteItemTemplateConfigsForQuoteTemplateData
        | undefined,
): ReadonlyMap<string, number> {
    if (isUsingDefault) {
        return priceByItemTemplateId;
    }
    return mapUnitPrices(itemTemplateConfigsOf(defaultConfigsData));
}

/**
 * This template's price for a handful of representative SYSTEM catalog
 * items (the first `FEATURED_ITEM_COUNT` by `sortOrder`), each with a
 * %-vs-default delta -- the same `describeRatePercentDelta` math
 * `QuoteTemplateCard` uses, generalized from one hardcoded item to a short
 * list. Deliberately read-only, mirroring `useQuoteTemplateRateSummaries`:
 * it must not auto-create missing `QuoteItemTemplateConfig` rows the way
 * `useQuoteItemTemplates` does, since that side effect firing just to
 * render a summary card would multiply writes on every company page load.
 */
export function useCompanyRateItemSummaries(
    quoteTemplateId: string | null,
): UseCompanyRateItemSummariesResult {
    const { data: templatesData, isLoading: isLoadingTemplates } =
        DataConnectorReact.useListQuoteTemplatesForTeam(dataConnect);
    const { effectiveTemplateId, defaultTemplateId, isUsingDefault } =
        resolveTemplateContext(
            quoteTemplateId,
            quoteTemplatesOf(templatesData),
        );

    const { data: itemTemplatesData, isLoading: isLoadingItemTemplates } =
        DataConnectorReact.useListQuoteItemTemplates(dataConnect);
    const { data: priceConfigsData, isLoading: isLoadingPriceConfigs } =
        DataConnectorReact.useListQuoteItemTemplateConfigsForQuoteTemplate(
            dataConnect,
            { quoteTemplateId: orEmpty(effectiveTemplateId) },
            { enabled: effectiveTemplateId !== null },
        );
    const { data: defaultConfigsData, isLoading: isLoadingDefaultConfigs } =
        DataConnectorReact.useListQuoteItemTemplateConfigsForQuoteTemplate(
            dataConnect,
            { quoteTemplateId: orEmpty(defaultTemplateId) },
            {
                enabled: shouldFetchDefaultConfigs(
                    defaultTemplateId,
                    isUsingDefault,
                ),
            },
        );

    const featuredItemTemplates = selectFeaturedItemTemplates(
        itemTemplatesOf(itemTemplatesData),
    );
    const priceByItemTemplateId = mapUnitPrices(
        itemTemplateConfigsOf(priceConfigsData),
    );
    const defaultPriceByItemTemplateId = resolveDefaultPriceMap(
        isUsingDefault,
        priceByItemTemplateId,
        defaultConfigsData,
    );

    return {
        items: featuredItemTemplates.flatMap((itemTemplate) =>
            toRateItemSummary(
                itemTemplate,
                priceByItemTemplateId,
                defaultPriceByItemTemplateId,
                isUsingDefault,
            ),
        ),
        isLoading: resolveIsLoading({
            isLoadingTemplates,
            isLoadingItemTemplates,
            isLoadingPriceConfigs,
            isLoadingDefaultConfigs,
            effectiveTemplateId,
            isUsingDefault,
        }),
    };
}

function resolveIsLoading(state: {
    readonly isLoadingTemplates: boolean;
    readonly isLoadingItemTemplates: boolean;
    readonly isLoadingPriceConfigs: boolean;
    readonly isLoadingDefaultConfigs: boolean;
    readonly effectiveTemplateId: string | null;
    readonly isUsingDefault: boolean;
}): boolean {
    if (state.isLoadingTemplates || state.isLoadingItemTemplates) {
        return true;
    }
    if (state.effectiveTemplateId !== null && state.isLoadingPriceConfigs) {
        return true;
    }
    return !state.isUsingDefault && state.isLoadingDefaultConfigs;
}

function toRateItemSummary(
    itemTemplate: ItemTemplateRow,
    priceByItemTemplateId: ReadonlyMap<string, number>,
    defaultPriceByItemTemplateId: ReadonlyMap<string, number>,
    isUsingDefault: boolean,
): readonly CompanyRateItemSummary[] {
    const unitPriceCents = priceByItemTemplateId.get(itemTemplate.id);
    if (unitPriceCents === undefined) {
        return [];
    }
    const defaultPriceCents = defaultPriceByItemTemplateId.get(itemTemplate.id);
    const percentDelta =
        !isUsingDefault && defaultPriceCents !== undefined
            ? describeRatePercentDelta(
                  unitPriceCents - defaultPriceCents,
                  defaultPriceCents,
              )
            : undefined;
    return [
        {
            id: itemTemplate.id,
            name: itemTemplate.name,
            unit: itemTemplate.unit ?? null,
            unitPriceCents,
            percentDelta,
        },
    ];
}

function mapUnitPrices(
    configs: readonly ItemTemplateConfigRow[],
): ReadonlyMap<string, number> {
    return new Map(
        configs.map((config) => [config.itemTemplateId, config.unitPriceCents]),
    );
}
