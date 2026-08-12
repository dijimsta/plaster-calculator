"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import type { QuotesTableRow } from "@libraries/plaster-calculator-ui";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useRouter } from "next/navigation.js";
import { useCallback } from "react";

import { QuotesListUtils } from "./quotes-list.utils.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

export type QuotesListState = {
    readonly rows: readonly QuotesTableRow[];
    readonly isLoading: boolean;
    readonly error: unknown;
};

export function useQuotesListState(): QuotesListState {
    const { data, isLoading, error } =
        DataConnectorReact.useListQuotesForTeam(dataConnect);

    return {
        rows: QuotesListUtils.toRows(data?.quotes),
        isLoading,
        error: error ?? null,
    };
}

export function useOpenQuoteCallback(): (projectId: string) => void {
    const router = useRouter();

    return useCallback(
        (projectId: string) => {
            router.push(`/projects/${projectId}/quote`);
        },
        [router],
    );
}

/**
 * Opens the project's quote tab in a *new* tab with `?print=1` instead of
 * navigating the current /quotes tab there. Printing needs the full
 * `QuoteDetailDocument` rendered with real line-item data, which
 * `ListQuotesForTeam` doesn't fetch — duplicating a hidden
 * fetch-and-render-for-print flow on this list page would be substantial
 * extra complexity for no benefit over letting the detail route own it.
 * `usePrintQuoteDocument` auto-triggers there (WORK-122) when `?print=1` is
 * present, so the browser's print dialog opens on the new tab while /quotes
 * itself never navigates away.
 */
export function useDownloadQuoteCallback(): (projectId: string) => void {
    return useCallback((projectId: string) => {
        window.open(
            `/projects/${projectId}/quote?print=1`,
            "_blank",
            "noopener,noreferrer",
        );
    }, []);
}
