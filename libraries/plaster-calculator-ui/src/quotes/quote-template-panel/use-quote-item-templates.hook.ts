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
import { useEffect, useRef } from "react";

import type { QuoteTemplateItem } from "./quote-template-panel.types.ts";
import { QuoteTemplatePanelUtils } from "./quote-template-panel.utils.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);
const quoteItemTemplatesListRef =
    DataConnector.listQuoteItemTemplatesRef(dataConnect);

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
    const { mutateAsync: ensureSystemItemTemplates } =
        DataConnectorReact.useEnsureSystemQuoteItemTemplates(dataConnect);
    const { mutateAsync: createItemTemplateConfig } =
        DataConnectorReact.useCreateQuoteItemTemplateConfig(dataConnect);
    const queryClient = useQueryClient();
    const isEnsuringRef = useRef(false);
    const isBackfillingRef = useRef(false);

    const itemTemplates = itemTemplatesData?.quoteItemTemplates ?? [];
    const configs = configsData?.quoteItemTemplateConfigs ?? [];
    const mergedItems = QuoteTemplatePanelUtils.mergeQuoteItemTemplates(
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

    const hasNoSystemItemTemplates =
        !isLoadingItemTemplates &&
        !itemTemplates.some(
            (itemTemplate) =>
                itemTemplate.scope === SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE,
        );
    const missingSystemConfigItemTemplateIds = itemTemplates
        .filter(
            (itemTemplate) =>
                itemTemplate.scope === SYSTEM_QUOTE_ITEM_TEMPLATE_SCOPE &&
                !configs.some(
                    (config) => config.itemTemplateId === itemTemplate.id,
                ),
        )
        .map((itemTemplate) => itemTemplate.id)
        .join(",");

    useEffect(() => {
        if (!hasNoSystemItemTemplates || isEnsuringRef.current) {
            return;
        }
        isEnsuringRef.current = true;
        void ensureSystemItemTemplates(undefined)
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
    }, [ensureSystemItemTemplates, hasNoSystemItemTemplates, queryClient]);

    useEffect(() => {
        if (
            quoteTemplateId === null ||
            isLoadingItemTemplates ||
            isLoadingConfigs ||
            missingSystemConfigItemTemplateIds === "" ||
            isBackfillingRef.current
        ) {
            return;
        }
        isBackfillingRef.current = true;
        const activeQuoteTemplateId = quoteTemplateId;
        void Promise.all(
            missingSystemConfigItemTemplateIds
                .split(",")
                .map((itemTemplateId) =>
                    createItemTemplateConfig({
                        quoteTemplateId: activeQuoteTemplateId,
                        itemTemplateId,
                        unitPriceCents: 0,
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
        isLoadingConfigs,
        isLoadingItemTemplates,
        missingSystemConfigItemTemplateIds,
        quoteTemplateId,
        queryClient,
    ]);

    return {
        defaultItems,
        customItems,
        isLoading: isLoadingItemTemplates || isLoadingConfigs,
    };
}
