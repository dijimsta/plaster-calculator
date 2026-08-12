"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import type {
    EditableQuoteFormValues,
    QuoteDetailDocumentProps,
} from "@libraries/plaster-calculator-ui";
import { useQuotesTranslation } from "@libraries/plaster-calculator-ui";
import {
    FirebaseService,
    GenerateQuoteError,
    useGenerateQuote,
} from "@libraries/plaster-calculator-web-core";
import { useCallback, useMemo } from "react";

import type { ProjectDetail } from "../../../../../types.js";

import { QuoteTabUtils } from "./quote-tab.utils.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

export type ProjectQuoteState = {
    readonly document: QuoteDetailDocumentProps | null;
    readonly editableValues: EditableQuoteFormValues | null;
    readonly quoteId: string | null;
    readonly hasQuote: boolean;
    readonly isLoading: boolean;
    readonly error: unknown;
    readonly refresh: () => Promise<void>;
};

/**
 * Reads back `GetProjectQuote` — the Quote tab's "does this project already
 * have a generated quote" query, independent of whether generation just
 * happened in this session or the tab is simply being revisited. Maps the
 * query's quote onto the printable detail document via `QuoteTabUtils`.
 * `refresh()` re-runs the query —
 * `useGenerateQuoteAction` below calls it once `CreateQuoteWithItems`
 * resolves, since that mutation has no automatic cache relationship to this
 * query.
 */
export function useProjectQuoteState(
    projectId: string,
    project: ProjectDetail | null,
): ProjectQuoteState {
    const { data, refetch, isLoading, error } =
        DataConnectorReact.useGetProjectQuote(dataConnect, { projectId });
    const quote = data?.project?.quote ?? null;

    const document = useMemo(
        () =>
            quote && project
                ? QuoteTabUtils.toDocumentProps(
                      quote,
                      project.name,
                      project.companyName ?? null,
                  )
                : null,
        [project, quote],
    );
    const editableValues = useMemo(
        () => (quote ? QuoteTabUtils.toEditableValues(quote) : null),
        [quote],
    );
    const refresh = useCallback(async (): Promise<void> => {
        await refetch();
    }, [refetch]);

    return {
        document,
        editableValues,
        quoteId: quote?.id ?? null,
        hasQuote: quote !== null,
        isLoading,
        error: error ?? null,
        refresh,
    };
}

export type GenerateQuoteActionState = {
    readonly isGenerating: boolean;
    readonly errorMessage: string | null;
    readonly handleGenerateQuote: () => void;
};

/**
 * Wires the Quote tab's Generate quote button to `useGenerateQuote()`
 * (`@libraries/plaster-calculator-web-core`), which itself refuses to call
 * `CreateQuoteWithItems` at all when the readiness gate isn't met or
 * matching produced too many lines (see that hook's own doc comment) — this
 * callback doesn't re-check readiness itself; `ReadinessSummaryHeader`
 * already disables the button it's attached to. On success, `onGenerated`
 * (`useProjectQuoteState().refresh`) re-runs `GetProjectQuote` so the newly
 * generated quote appears without a page reload. On failure, `error` is
 * mapped onto the `generateQuote` i18n namespace (WORK-150): a
 * `GenerateQuoteError`'s `.reason` selects `errorMessages.NOT_READY`/
 * `TOO_MANY_ITEMS`; anything else (a `CreateQuoteWithItems` network/`@check`
 * failure) falls back to `genericError`. Neither path disables the button
 * itself — `useGenerateQuote()`'s `isGenerating` already resets to `false`
 * once `generate()` settles, and calling `generate()` again resets its own
 * `error` (react-query's default `useMutation` behaviour), so the button
 * stays clickable for a retry.
 */
export function useGenerateQuoteAction(
    projectId: string,
    onGenerated: () => Promise<void>,
): GenerateQuoteActionState {
    const { generate, isGenerating, error } = useGenerateQuote(projectId);
    const { t } = useQuotesTranslation();

    const handleGenerateQuote = useCallback((): void => {
        void (async () => {
            try {
                await generate();
                await onGenerated();
            } catch {
                // Surfaced via `error` (below) rather than an unhandled
                // rejection — `useGenerateQuote()`'s mutation already
                // tracks it.
            }
        })();
    }, [generate, onGenerated]);

    const errorMessage = useMemo(() => {
        if (!error) return null;
        return error instanceof GenerateQuoteError
            ? t(`generateQuote.errorMessages.${error.reason}`)
            : t("generateQuote.genericError");
    }, [error, t]);

    return { isGenerating, errorMessage, handleGenerateQuote };
}
