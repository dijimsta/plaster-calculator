"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import type { EditableQuoteFormValues } from "@libraries/plaster-calculator-ui";
import { useQuotesTranslation } from "@libraries/plaster-calculator-ui";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

import { QuoteQueryKeyUtils } from "./quote-query-key.utils.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

export type SaveProjectQuoteState = {
    readonly isSaving: boolean;
    readonly saveQuote: (
        quoteId: string,
        initialValues: EditableQuoteFormValues,
        values: EditableQuoteFormValues,
    ) => Promise<boolean>;
};

/** Persists header and line-item edits without modifying the source template. */
export function useSaveProjectQuote(projectId: string): SaveProjectQuoteState {
    const updateDetails = DataConnectorReact.useUpdateQuoteDetails(dataConnect);
    const updateItem = DataConnectorReact.useUpdateQuoteItem(dataConnect);
    const createItem = DataConnectorReact.useCreateQuoteItem(dataConnect);
    const deleteItem = DataConnectorReact.useDeleteQuoteItem(dataConnect);
    const queryClient = useQueryClient();
    const { notify } = useNotificationsManager();
    const { t } = useQuotesTranslation();

    const saveQuote = useCallback(
        async (
            quoteId: string,
            initialValues: EditableQuoteFormValues,
            values: EditableQuoteFormValues,
        ): Promise<boolean> => {
            const retainedIds = new Set(
                values.lineItems.flatMap((item) => (item.id ? [item.id] : [])),
            );
            const deletedIds = initialValues.lineItems.flatMap((item) =>
                item.id && !retainedIds.has(item.id) ? [item.id] : [],
            );
            const updatedItems = values.lineItems.flatMap(
                (item, displayOrder) =>
                    item.id &&
                    quoteItemNeedsUpdate(initialValues, item, displayOrder)
                        ? [{ id: item.id, item, displayOrder }]
                        : [],
            );
            const newItems = values.lineItems.flatMap((item, displayOrder) =>
                item.id ? [] : [{ item, displayOrder }],
            );

            try {
                await updateDetails.mutateAsync({
                    id: quoteId,
                    reference: values.reference.trim() || null,
                });
                await Promise.all([
                    ...deletedIds.map((id) => deleteItem.mutateAsync({ id })),
                    ...updatedItems.map(({ id, item, displayOrder }) =>
                        updateItem.mutateAsync({
                            id,
                            displayOrder,
                            name: item.name.trim(),
                            quantity: item.quantity,
                            unitPriceCents: item.unitPriceCents,
                        }),
                    ),
                    ...newItems.map(({ item, displayOrder }) =>
                        createItem.mutateAsync({
                            id: crypto.randomUUID(),
                            quoteId,
                            displayOrder,
                            name: item.name.trim(),
                            quantity: item.quantity,
                            unitPriceCents: item.unitPriceCents,
                        }),
                    ),
                ]);
                await Promise.all([
                    queryClient.invalidateQueries({
                        queryKey: QuoteQueryKeyUtils.forProjectQuote(
                            dataConnect,
                            projectId,
                        ),
                    }),
                    queryClient.invalidateQueries({
                        queryKey:
                            QuoteQueryKeyUtils.forQuotesForTeam(dataConnect),
                    }),
                ]);
                notify({
                    intent: "success",
                    title: t("editableQuoteForm.saveSuccessTitle"),
                    description: t("editableQuoteForm.saveSuccessDescription"),
                });
                return true;
            } catch {
                await queryClient.invalidateQueries({
                    queryKey: QuoteQueryKeyUtils.forProjectQuote(
                        dataConnect,
                        projectId,
                    ),
                });
                notify({
                    intent: "error",
                    title: t("editableQuoteForm.saveErrorTitle"),
                    description: t("editableQuoteForm.saveErrorDescription"),
                });
                return false;
            }
        },
        [
            createItem,
            deleteItem,
            notify,
            projectId,
            queryClient,
            t,
            updateDetails,
            updateItem,
        ],
    );

    return {
        isSaving:
            updateDetails.isPending ||
            updateItem.isPending ||
            createItem.isPending ||
            deleteItem.isPending,
        saveQuote,
    };
}

function quoteItemNeedsUpdate(
    initialValues: EditableQuoteFormValues,
    item: EditableQuoteFormValues["lineItems"][number],
    displayOrder: number,
): boolean {
    const initialIndex = initialValues.lineItems.findIndex(
        (initialItem) => initialItem.id === item.id,
    );
    const initialItem = initialValues.lineItems[initialIndex];
    return (
        initialItem !== undefined &&
        (initialIndex !== displayOrder ||
            initialItem.name !== item.name ||
            initialItem.quantity !== item.quantity ||
            initialItem.unitPriceCents !== item.unitPriceCents)
    );
}
