"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { QuoteTemplateItem } from "../quote-template-panel/quote-template-panel.types.ts";
import { QuoteTemplatePanelUtils } from "../quote-template-panel/quote-template-panel.utils.ts";

import type { QuoteTemplateVariationFormValues } from "./quote-template-variation-editor.types.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

/**
 * Saves a variation's price changes only -- no create/update/delete of item
 * templates themselves, since this screen has no add/remove and every
 * item's name/unit/keywords are read-only. Reuses
 * `QuoteTemplatePanelUtils.updateQuoteItemPrice()`, the same per-item price
 * writer `useSaveQuoteTemplate` uses for the default template's own items,
 * and its `refreshQuoteTemplateItems()` to bring this variation's cached
 * item/config lists back in sync afterward.
 */
export function useSaveQuoteTemplateVariationPrices(
    quoteTemplateId: string,
    originalItems: readonly QuoteTemplateItem[],
): {
    readonly save: (values: QuoteTemplateVariationFormValues) => Promise<void>;
    readonly isSaving: boolean;
} {
    const { mutateAsync: updateItemTemplateConfig } =
        DataConnectorReact.useUpdateQuoteItemTemplateConfig(dataConnect);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (
            values: QuoteTemplateVariationFormValues,
        ): Promise<void> => {
            const originalsByItemTemplateId = new Map(
                originalItems.map((item) => [item.itemTemplateId, item]),
            );

            await Promise.all(
                values.items.map((item) =>
                    QuoteTemplatePanelUtils.updateQuoteItemPrice(
                        quoteTemplateId,
                        item,
                        originalsByItemTemplateId.get(item.itemTemplateId),
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
