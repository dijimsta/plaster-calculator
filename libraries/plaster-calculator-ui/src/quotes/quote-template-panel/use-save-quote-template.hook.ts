"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { QuoteTemplateFormValues } from "../quote-template-form/index.ts";

import type { QuoteTemplateItem } from "./quote-template-panel.types.ts";
import { QuoteTemplatePanelUtils } from "./quote-template-panel.utils.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

export function useSaveQuoteTemplate(
    quoteTemplateId: string | null,
    originalDefaultItems: readonly QuoteTemplateItem[],
    originalCustomItems: readonly QuoteTemplateItem[],
): {
    readonly save: (values: QuoteTemplateFormValues) => Promise<void>;
    readonly isSaving: boolean;
} {
    const { mutateAsync: createItemTemplate } =
        DataConnectorReact.useCreateQuoteItemTemplateWithUnit(dataConnect);
    const { mutateAsync: updateItemTemplate } =
        DataConnectorReact.useUpdateQuoteItemTemplateWithUnit(dataConnect);
    const { mutateAsync: deleteItemTemplate } =
        DataConnectorReact.useDeleteQuoteItemTemplate(dataConnect);
    const { mutateAsync: createItemTemplateConfig } =
        DataConnectorReact.useCreateQuoteItemTemplateConfig(dataConnect);
    const { mutateAsync: updateItemTemplateConfig } =
        DataConnectorReact.useUpdateQuoteItemTemplateConfig(dataConnect);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (values: QuoteTemplateFormValues): Promise<void> => {
            if (quoteTemplateId === null) {
                return;
            }

            const originalCustomItemsById = new Map(
                originalCustomItems.map((item) => [item.itemTemplateId, item]),
            );
            const remainingCustomItemIds = new Set(
                values.customItems.flatMap((item) =>
                    item.itemTemplateId === undefined
                        ? []
                        : [item.itemTemplateId],
                ),
            );

            await Promise.all(
                originalCustomItems
                    .filter(
                        (item) =>
                            !remainingCustomItemIds.has(item.itemTemplateId),
                    )
                    .map((item) =>
                        deleteItemTemplate({ id: item.itemTemplateId }),
                    ),
            );

            await Promise.all(
                values.customItems.map((item) => {
                    if (item.itemTemplateId === undefined) {
                        return QuoteTemplatePanelUtils.createCustomQuoteItem(
                            quoteTemplateId,
                            item,
                            createItemTemplate,
                            createItemTemplateConfig,
                            updateItemTemplateConfig,
                        );
                    }
                    const original = originalCustomItemsById.get(
                        item.itemTemplateId,
                    );
                    return original === undefined
                        ? Promise.resolve()
                        : QuoteTemplatePanelUtils.updateExistingCustomQuoteItem(
                              quoteTemplateId,
                              item.itemTemplateId,
                              item,
                              original,
                              updateItemTemplate,
                              updateItemTemplateConfig,
                          );
                }),
            );

            await Promise.all(
                values.defaultItems.map((item) =>
                    QuoteTemplatePanelUtils.updateDefaultQuoteItemPrice(
                        quoteTemplateId,
                        item,
                        originalDefaultItems.find(
                            (original) =>
                                original.itemTemplateId === item.itemTemplateId,
                        ),
                        updateItemTemplateConfig,
                    ),
                ),
            );

            await QuoteTemplatePanelUtils.refreshQuoteTemplateItems(
                dataConnect,
                quoteTemplateId,
                queryClient,
            );
        },
    });

    return {
        save: mutation.mutateAsync,
        isSaving: mutation.isPending,
    };
}
