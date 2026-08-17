"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import {
    SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE,
    TEAM_QUOTE_ITEM_TEMPLATE_SCOPE,
} from "@libraries/plaster-calculator-common";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useQueryClient } from "@tanstack/react-query";
import { QueryFetchPolicy } from "firebase/data-connect";
import { useEffect, useMemo, useRef } from "react";

import type { QuoteTemplateItem } from "./quote-template-panel.types.ts";
import {
    mapUnitPricesByItemTemplateId,
    mergeQuoteItemTemplates,
    resolveBackfillPriceCents,
    resolveDefaultTemplateContext,
} from "./quote-template-panel.utils.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);
const quoteItemTemplatesListRef =
    DataConnector.listQuoteItemTemplatesRef(dataConnect);

type DefaultTemplateBackfillPrices = {
    readonly isDefaultTemplate: boolean;
    readonly needsDefaultPricesForBackfill: boolean;
    readonly isLoadingDefaultConfigs: boolean;
    readonly defaultPriceByItemTemplateId: ReadonlyMap<string, number>;
};

/**
 * Which template is the default, and -- when `quoteTemplateId` names some
 * *other* template (a variation) -- the default's own configs, read only
 * for their price. Split out of `useQuoteItemTemplates()` to keep that
 * hook's own branching within this file's complexity limit; see
 * `resolveBackfillPriceCents()` (`quote-template-panel.utils.ts`), the caller of
 * `defaultPriceByItemTemplateId`, for why a variation needs this at all.
 */
function useDefaultTemplateBackfillPrices(
    quoteTemplateId: string | null,
): DefaultTemplateBackfillPrices {
    const { data: templatesData } =
        DataConnectorReact.useListQuoteTemplatesForTeam(dataConnect);
    const {
        defaultTemplateId,
        isDefaultTemplate,
        needsDefaultPricesForBackfill,
    } = resolveDefaultTemplateContext(
        quoteTemplateId,
        templatesData?.quoteTemplates ?? [],
    );
    const { data: defaultConfigsData, isLoading: isLoadingDefaultConfigs } =
        DataConnectorReact.useListQuoteItemTemplateConfigsForQuoteTemplate(
            dataConnect,
            { quoteTemplateId: defaultTemplateId ?? "" },
            { enabled: needsDefaultPricesForBackfill },
        );
    const defaultPriceByItemTemplateId = useMemo(
        () =>
            mapUnitPricesByItemTemplateId(
                defaultConfigsData?.quoteItemTemplateConfigs ?? [],
            ),
        [defaultConfigsData],
    );

    return {
        isDefaultTemplate,
        needsDefaultPricesForBackfill,
        isLoadingDefaultConfigs,
        defaultPriceByItemTemplateId,
    };
}

const SYSTEM_ITEM_KEYS = new Set([
    "PLASTERBOARD_10MM",
    "PLASTERBOARD_13MM",
    "VILLABOARD_9MM",
    "VILLABOARD_6MM",
    "ACOUSTIC_SOUNDCHEK_10MM",
    "ACOUSTIC_SOUNDCHEK_13MM",
    "WATER_RESISTANT_10MM",
    "WATER_RESISTANT_13MM",
    "FIRE_RESISTANT_DRY_13MM",
    "FIRE_RESISTANT_DRY_16MM",
    "FIRE_RESISTANT_WET_13MM",
    "FIRE_RESISTANT_WET_16MM",
    "FLEXIBLE_BOARD_6_5MM",
]);

export function useQuoteItemTemplates(quoteTemplateId: string | null): {
    readonly defaultItems: readonly QuoteTemplateItem[];
    readonly customItems: readonly QuoteTemplateItem[];
    readonly isLoading: boolean;
} {
    const { data: itemTemplatesData, isLoading: isLoadingItemTemplates } =
        DataConnectorReact.useListQuoteItemTemplates(dataConnect);
    const { data: configsData, isLoading: isLoadingConfigs } =
        DataConnectorReact.useListQuoteItemTemplateConfigsForQuoteTemplate(
            dataConnect,
            { quoteTemplateId: quoteTemplateId ?? "" },
            { enabled: quoteTemplateId !== null },
        );
    const {
        isDefaultTemplate,
        needsDefaultPricesForBackfill,
        isLoadingDefaultConfigs,
        defaultPriceByItemTemplateId,
    } = useDefaultTemplateBackfillPrices(quoteTemplateId);
    const { mutateAsync: reconcileSystemItemTemplates } =
        DataConnectorReact.useReconcileSystemQuoteItemTemplates(dataConnect);
    const { mutateAsync: createItemTemplateConfig } =
        DataConnectorReact.useCreateQuoteItemTemplateConfig(dataConnect);
    const queryClient = useQueryClient();
    const isEnsuringRef = useRef(false);
    const isBackfillingRef = useRef(false);

    const itemTemplates = itemTemplatesData?.quoteItemTemplates ?? [];
    const configs = configsData?.quoteItemTemplateConfigs ?? [];
    const mergedItems = mergeQuoteItemTemplates(
        quoteTemplateId ?? "",
        itemTemplates,
        configs,
    );
    const defaultItems = mergedItems.filter(
        (item) => item.scope === SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE,
    );
    const customItems = mergedItems.filter(
        (item) => item.scope === TEAM_QUOTE_ITEM_TEMPLATE_SCOPE,
    );

    const systemItemKeys = itemTemplates.flatMap((itemTemplate) =>
        itemTemplate.scope === SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE &&
        itemTemplate.systemKey
            ? [itemTemplate.systemKey]
            : [],
    );
    const systemCatalogNeedsReconciliation =
        !isLoadingItemTemplates &&
        (systemItemKeys.length !== SYSTEM_ITEM_KEYS.size ||
            systemItemKeys.some((key) => !SYSTEM_ITEM_KEYS.has(key)));
    // Every item template missing a config row for `quoteTemplateId` -- not
    // just SYSTEM ones. A custom item created against the default (via
    // `QuoteTemplatePanel`'s "add item") only gets a `QuoteItemTemplateConfig`
    // for the default itself; every variation is missing one for it, the
    // same gap a SYSTEM item the team's catalog doesn't have yet leaves on
    // every template. `resolveBackfillPriceCents()` decides what price a
    // backfilled row for either kind lands at.
    const missingConfigItemTemplateIds = itemTemplates
        .filter(
            (itemTemplate) =>
                !configs.some(
                    (config) => config.itemTemplateId === itemTemplate.id,
                ),
        )
        .map((itemTemplate) => itemTemplate.id)
        .join(",");

    useEffect(() => {
        if (!systemCatalogNeedsReconciliation || isEnsuringRef.current) {
            return;
        }
        isEnsuringRef.current = true;
        void reconcileSystemItemTemplates(undefined)
            .then(async () => {
                const refreshed = await DataConnector.listQuoteItemTemplates(
                    dataConnect,
                    { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
                );
                queryClient.setQueryData(
                    [
                        quoteItemTemplatesListRef.name,
                        quoteItemTemplatesListRef.variables ?? null,
                    ],
                    refreshed.data,
                );
            })
            .finally(() => {
                isEnsuringRef.current = false;
            });
    }, [
        queryClient,
        reconcileSystemItemTemplates,
        systemCatalogNeedsReconciliation,
    ]);

    useEffect(() => {
        if (
            quoteTemplateId === null ||
            isLoadingItemTemplates ||
            isLoadingConfigs ||
            (needsDefaultPricesForBackfill && isLoadingDefaultConfigs) ||
            missingConfigItemTemplateIds === "" ||
            isBackfillingRef.current
        ) {
            return;
        }
        isBackfillingRef.current = true;
        const activeQuoteTemplateId = quoteTemplateId;
        void Promise.all(
            missingConfigItemTemplateIds.split(",").map((itemTemplateId) =>
                createItemTemplateConfig({
                    quoteTemplateId: activeQuoteTemplateId,
                    itemTemplateId,
                    unitPriceCents: resolveBackfillPriceCents(
                        isDefaultTemplate,
                        itemTemplateId,
                        defaultPriceByItemTemplateId,
                    ),
                    materialUnitPriceCents: 0,
                    labourUnitPriceCents: 0,
                }),
            ),
        )
            .then(async () => {
                const ref =
                    DataConnector.listQuoteItemTemplateConfigsForQuoteTemplateRef(
                        dataConnect,
                        { quoteTemplateId: activeQuoteTemplateId },
                    );
                const refreshed =
                    await DataConnector.listQuoteItemTemplateConfigsForQuoteTemplate(
                        dataConnect,
                        { quoteTemplateId: activeQuoteTemplateId },
                        { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
                    );
                queryClient.setQueryData(
                    [ref.name, ref.variables ?? null],
                    refreshed.data,
                );
            })
            .finally(() => {
                isBackfillingRef.current = false;
            });
    }, [
        createItemTemplateConfig,
        defaultPriceByItemTemplateId,
        isDefaultTemplate,
        isLoadingConfigs,
        isLoadingDefaultConfigs,
        isLoadingItemTemplates,
        missingConfigItemTemplateIds,
        needsDefaultPricesForBackfill,
        quoteTemplateId,
        queryClient,
    ]);

    return {
        defaultItems,
        customItems,
        isLoading: isLoadingItemTemplates || isLoadingConfigs,
    };
}
