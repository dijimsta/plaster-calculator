"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import {
    ACCEPTED_QUOTE_STATUS,
    DRAFT_QUOTE_STATUS,
    SENT_QUOTE_STATUS,
} from "@libraries/plaster-calculator-common";
import type { QuoteStatus } from "@libraries/plaster-calculator-common";
import type { QuoteDetailDocumentProps } from "@libraries/plaster-calculator-ui";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

import { QuoteDetailUtils } from "./quote-detail.utils.js";
import { QuoteQueryKeyUtils } from "./quote-query-key.utils.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

export type QuoteDetailState = {
    readonly document: QuoteDetailDocumentProps | null;
    readonly isLoading: boolean;
    /**
     * `GetQuoteById`'s `@check` guard (`this != null && this.teamId ==
     * auth.token.teamId`) throws the same "You do not have access to this
     * quote" error whether `$id` doesn't exist at all or belongs to another
     * team — Data Connect gives the client no way to tell those two cases
     * apart (the same shape `GetQuoteReadiness`'s `project` check uses one
     * level up), so this single flag covers both a not-found and an
     * unauthorised quote id.
     */
    readonly isInaccessible: boolean;
};

export function useQuoteDetailState(quoteId: string): QuoteDetailState {
    const { data, isLoading, error } = DataConnectorReact.useGetQuoteById(
        dataConnect,
        { id: quoteId },
    );

    return {
        document: data?.quote
            ? QuoteDetailUtils.toDocumentProps(data.quote)
            : null,
        isLoading,
        isInaccessible: error != null || (!isLoading && !data?.quote),
    };
}

/**
 * Fires `printQuoteDocument` once, as soon as `isReady` becomes true, when
 * `shouldPrint` is set — the WORK-121 "download without navigating" flow
 * lands here with `?print=1` and expects the browser print dialog to open
 * automatically rather than requiring a click. Gated on `isReady` (the
 * document has actually loaded) so `window.print()` never fires against a
 * still-loading or empty page. The ref guards against firing again if
 * `isReady` flips due to an unrelated refetch.
 */
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

/**
 * Wires Mark as sent / Mark accepted to `UpdateQuoteStatus`: an optimistic
 * write to the `GetQuoteById` cache entry (so the badge flips the instant
 * the button is clicked), rolled back to its prior value and surfaced via an
 * error toast (`useNotificationsManager`, the same shape every other
 * page.hooks.ts mutation callback in this app already uses — see
 * questionnaires/page.hooks.ts) if `UpdateQuoteStatus` rejects. On success,
 * `ListQuotesForTeam`'s cache is invalidated so `/quotes` reflects the new
 * status on return, matching WORK-140's "mutate, then make the relevant
 * cached queries fresh again" shape.
 *
 * `UpdateQuoteStatus` (WORK-113) deliberately does not enforce
 * draft -> sent -> accepted ordering server-side — see that mutation's own
 * comments, which explicitly defer transition-order enforcement to the web
 * app layer "WORK-123". `canMarkAsSent`/`canMarkAccepted` are that
 * enforcement: only the one valid next transition from `status` is ever
 * true (and neither is true until `hasQuote`, or while a transition is
 * already in flight), so the caller can disable (or hide) whichever action
 * isn't without repeating that gating logic itself.
 */
export function useQuoteStatusActions(
    quoteId: string,
    status: QuoteStatus,
    hasQuote: boolean,
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
            const quoteQueryKey = QuoteQueryKeyUtils.forQuoteById(
                dataConnect,
                quoteId,
            );
            const previousData =
                queryClient.getQueryData<DataConnector.GetQuoteByIdData>(
                    quoteQueryKey,
                );

            if (previousData?.quote) {
                queryClient.setQueryData<DataConnector.GetQuoteByIdData>(
                    quoteQueryKey,
                    {
                        ...previousData,
                        quote: { ...previousData.quote, status: nextStatus },
                    },
                );
            }

            try {
                await mutateAsync({ id: quoteId, status: nextStatus });
                await queryClient.invalidateQueries({
                    queryKey: QuoteQueryKeyUtils.forQuotesForTeam(dataConnect),
                });
            } catch {
                if (previousData) {
                    queryClient.setQueryData(quoteQueryKey, previousData);
                }
                notify({
                    intent: "error",
                    title: errorTitle,
                    description: errorDescription,
                });
            }
        },
        [mutateAsync, notify, queryClient, quoteId],
    );

    return {
        canMarkAsSent: hasQuote && !isPending && status === DRAFT_QUOTE_STATUS,
        canMarkAccepted: hasQuote && !isPending && status === SENT_QUOTE_STATUS,
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
