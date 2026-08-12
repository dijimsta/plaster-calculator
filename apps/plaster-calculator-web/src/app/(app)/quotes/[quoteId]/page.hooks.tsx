"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import type { QuoteDetailDocumentProps } from "@libraries/plaster-calculator-ui";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useEffect, useRef } from "react";

import { QuoteDetailUtils } from "./quote-detail.utils.js";

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
