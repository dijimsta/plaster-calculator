"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import type { QuotesTableRow } from "@libraries/plaster-calculator-ui";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useRouter } from "next/navigation.js";
import { useCallback, useState } from "react";

import { toRows } from "./quotes-list.utils.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

/** Quotes shown per page. */
const PAGE_SIZE = 20;

export type QuotesListState = {
    readonly rows: readonly QuotesTableRow[];
    readonly isLoading: boolean;
    readonly error: unknown;
    readonly page: number;
    readonly pageCount: number;
    readonly setPage: (page: number) => void;
};

/**
 * There's no total-count query backing the quotes list, so pagination uses
 * the fetch-one-extra-row technique: request `PAGE_SIZE + 1` rows and, if
 * the extra row comes back, report another page exists without a separate
 * count query.
 */
export function useQuotesListState(): QuotesListState {
    const [page, setPage] = useState(1);
    const { data, isLoading, error } = DataConnectorReact.useListQuotesForTeam(
        dataConnect,
        { limit: PAGE_SIZE + 1, offset: (page - 1) * PAGE_SIZE },
    );

    const quotes = data?.quotes ?? [];
    const hasNextPage = quotes.length > PAGE_SIZE;

    return {
        rows: toRows(hasNextPage ? quotes.slice(0, PAGE_SIZE) : quotes),
        isLoading,
        error: error ?? null,
        page,
        pageCount: hasNextPage ? page + 1 : page,
        setPage,
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
