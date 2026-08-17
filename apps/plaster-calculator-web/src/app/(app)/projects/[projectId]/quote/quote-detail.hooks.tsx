"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import {
    ACCEPTED_QUOTE_STATUS,
    DRAFT_QUOTE_STATUS,
    SENT_QUOTE_STATUS,
} from "@libraries/plaster-calculator-common";
import type { QuoteStatus } from "@libraries/plaster-calculator-common";
import { QUOTE_DETAIL_DOCUMENT_PRINT_ROOT_ID } from "@libraries/plaster-calculator-ui";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

import { QuoteQueryKeyUtils } from "./quote-query-key.utils.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

const LOGO_IMAGE_READY_POLL_INTERVAL_MS = 50;
const LOGO_IMAGE_READY_TIMEOUT_MS = 5000;

function findQuoteLogoImage(): HTMLImageElement | null {
    return (
        document
            .getElementById(QUOTE_DETAIL_DOCUMENT_PRINT_ROOT_ID)
            ?.querySelector("img") ?? null
    );
}

/**
 * Resolves once `img` has finished loading or failed -- per spec,
 * `HTMLImageElement.complete` becomes `true` in both cases, so a broken logo
 * URL settles this instead of hanging it.
 */
function waitForImageToSettle(img: HTMLImageElement): Promise<void> {
    if (img.complete) {
        return Promise.resolve();
    }
    return new Promise((resolve) => {
        const onSettle = (): void => {
            img.removeEventListener("load", onSettle);
            img.removeEventListener("error", onSettle);
            resolve();
        };
        img.addEventListener("load", onSettle);
        img.addEventListener("error", onSettle);
    });
}

/**
 * Waits for the quote document's logo `<img>` (`Avatar`, rendered by
 * `QuoteDetailDocumentLetterhead` -- see its WORK-204 doc comment noting
 * this ticket's job) to finish loading before resolving, so
 * `printQuoteDocument()`/a PDF download never fires while the browser is
 * still fetching the logo -- which would otherwise silently omit it from
 * the printed output. `hasLogo` (from `appearance.logoStoragePath`) is the
 * source of truth for "a logo is configured": the `<img>` itself may not
 * exist in the DOM yet while `useProjectQuoteState()`'s `logoUrl` is still
 * resolving (a separate Storage round trip), so this briefly polls for it
 * to mount -- via `QUOTE_DETAIL_DOCUMENT_PRINT_ROOT_ID`, the same id the
 * print stylesheet already keys off -- before awaiting its `load`/`error`
 * event. Fails open after `LOGO_IMAGE_READY_TIMEOUT_MS` so a stuck or
 * never-mounted image can never block printing indefinitely.
 */
function waitForQuoteLogoReady(hasLogo: boolean): Promise<void> {
    if (!hasLogo) {
        return Promise.resolve();
    }
    return new Promise((resolve) => {
        const deadline = Date.now() + LOGO_IMAGE_READY_TIMEOUT_MS;
        const poll = (): void => {
            const img = findQuoteLogoImage();
            if (img) {
                void waitForImageToSettle(img).then(resolve);
            } else if (Date.now() >= deadline) {
                resolve();
            } else {
                setTimeout(poll, LOGO_IMAGE_READY_POLL_INTERVAL_MS);
            }
        };
        poll();
    });
}

/**
 * Wraps `printQuoteDocument` (`usePrintQuoteDocument()`) so both call sites
 * that trigger it -- the Download PDF button and `useAutoPrintOnMount`
 * below -- share one gate: `waitForQuoteLogoReady()` first, so neither ever
 * prints/downloads before a configured logo has actually loaded.
 */
export function useQuoteDocumentPrintTrigger(
    printQuoteDocument: () => void,
    hasLogo: boolean,
): () => void {
    return useCallback(() => {
        void waitForQuoteLogoReady(hasLogo).then(printQuoteDocument);
    }, [hasLogo, printQuoteDocument]);
}

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
