"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import {
    ACCEPTED_QUOTE_STATUS,
    DRAFT_QUOTE_STATUS,
    SENT_QUOTE_STATUS,
} from "@libraries/plaster-calculator-common";
import type { QuoteStatus } from "@libraries/plaster-calculator-common";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

import { QuoteQueryKeyUtils } from "./quote-query-key.utils.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

/** Prints once after a `?print=1` project quote has finished loading. */
export function useAutoPrintOnMount(
    printQuoteDocument: () => void,
    shouldPrint: boolean,
    isReady: boolean,
): void {
    const hasPrintedRef = useRef(false);

    useEffect(() => {
        if (shouldPrint && isReady && !hasPrintedRef.current) {
            hasPrintedRef.current = true;
            printQuoteDocument();
        }
    }, [isReady, printQuoteDocument, shouldPrint]);
}

export type QuoteStatusActionsState = {
    readonly canMarkAsSent: boolean;
    readonly canMarkAccepted: boolean;
    readonly markAsSent: () => Promise<void>;
    readonly markAccepted: () => Promise<void>;
};

/** Updates status from the project quote tab and keeps both quote caches fresh. */
export function useQuoteStatusActions(
    projectId: string,
    quoteId: string | null,
    status: QuoteStatus,
): QuoteStatusActionsState {
    const { mutateAsync, isPending } =
        DataConnectorReact.useUpdateQuoteStatus(dataConnect);
    const queryClient = useQueryClient();
    const { notify } = useNotificationsManager();

    const transitionTo = useCallback(
        async (
            nextStatus: QuoteStatus,
            errorTitle: string,
            errorDescription: string,
        ): Promise<void> => {
            if (!quoteId) return;

            const projectQuoteQueryKey = QuoteQueryKeyUtils.forProjectQuote(
                dataConnect,
                projectId,
            );
            const previousData =
                queryClient.getQueryData<DataConnector.GetProjectQuoteData>(
                    projectQuoteQueryKey,
                );

            if (previousData?.project?.quote) {
                queryClient.setQueryData<DataConnector.GetProjectQuoteData>(
                    projectQuoteQueryKey,
                    {
                        ...previousData,
                        project: {
                            ...previousData.project,
                            quote: {
                                ...previousData.project.quote,
                                status: nextStatus,
                            },
                        },
                    },
                );
            }

            try {
                await mutateAsync({ id: quoteId, status: nextStatus });
                await Promise.all([
                    queryClient.invalidateQueries({
                        queryKey: projectQuoteQueryKey,
                    }),
                    queryClient.invalidateQueries({
                        queryKey:
                            QuoteQueryKeyUtils.forQuotesForTeam(dataConnect),
                    }),
                ]);
            } catch {
                if (previousData) {
                    queryClient.setQueryData(
                        projectQuoteQueryKey,
                        previousData,
                    );
                }
                notify({
                    intent: "error",
                    title: errorTitle,
                    description: errorDescription,
                });
            }
        },
        [mutateAsync, notify, projectId, queryClient, quoteId],
    );

    return {
        canMarkAsSent:
            quoteId !== null && !isPending && status === DRAFT_QUOTE_STATUS,
        canMarkAccepted:
            quoteId !== null && !isPending && status === SENT_QUOTE_STATUS,
        markAsSent: () =>
            transitionTo(
                SENT_QUOTE_STATUS,
                "Couldn't mark as sent",
                "Something went wrong while updating the status. Please try again.",
            ),
        markAccepted: () =>
            transitionTo(
                ACCEPTED_QUOTE_STATUS,
                "Couldn't mark accepted",
                "Something went wrong while updating the status. Please try again.",
            ),
    };
}
