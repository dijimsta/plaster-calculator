"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { ProjectPlanTextCorpusUtils } from "@libraries/plaster-calculator-common";
import { useMutation } from "@tanstack/react-query";
import type { FirebaseError } from "firebase/app";

import { FirebaseService } from "../firebase/firebase.service.ts";

import {
    GenerateQuoteError,
    type UseGenerateQuoteResult,
} from "./generate-quote.types.ts";
import { GenerateQuoteUtils } from "./generate-quote.utils.ts";
import { useQuoteReadiness } from "./use-quote-readiness.hook.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

function buildProjectSearchText(
    data: DataConnector.GetQuoteReadinessData | undefined,
): string {
    return ProjectPlanTextCorpusUtils.buildSearchableCorpus({
        extractedTextJson: data?.project?.extractedTextJson ?? null,
        pages: (data?.floorplanPages ?? []).map((page) => ({
            ocrTextContent: page.ocrTextContent ?? null,
        })),
    });
}

/**
 * The Quote tab's take-off -> match -> price -> persist entry point (a
 * later ticket wires the tab itself to this hook). Consumes
 * `useQuoteReadiness()` (WORK-130/WORK-193) for both the readiness gate
 * *and* the resolved pricing template — its `data`, `quoteTemplateId`, and
 * `defaultTemplateConfigs` — rather than re-fetching or re-resolving any of
 * that itself, so readiness and generation always agree on which
 * `QuoteTemplate` priced a project's take-off. `generate()` delegates all
 * take-off/match/price/slot-mapping logic to `GenerateQuoteUtils`, matching
 * `useSaveQuoteTemplate()`'s "thin hook, pure utils" split.
 *
 * `GenerateQuoteUtils.build()` refuses to run at all — no
 * `CreateQuoteWithItems` call — when the readiness gate isn't met, the
 * pricing template hasn't resolved yet, or matching+quantity-resolution
 * produced more than `CreateQuoteWithItems`'s 20 slots can hold; every
 * refusal surfaces as a thrown `GenerateQuoteError`, which `useMutation`
 * turns into this hook's `error`, the same way a `CreateQuoteWithItems`
 * network/`@check` failure would surface as a `FirebaseError`.
 */
export function useGenerateQuote(projectId: string): UseGenerateQuoteResult {
    const { isReady, data, quoteTemplateId, defaultTemplateConfigs } =
        useQuoteReadiness(projectId);
    const { mutateAsync: createQuoteWithItems } =
        DataConnectorReact.useCreateQuoteWithItems(dataConnect);

    const mutation = useMutation<string, GenerateQuoteError | FirebaseError>({
        mutationFn: async (): Promise<string> => {
            if (!quoteTemplateId) {
                throw new GenerateQuoteError(
                    "NOT_READY",
                    "The project's pricing template has not resolved yet; refusing to generate a quote.",
                );
            }

            const quoteId = crypto.randomUUID();
            const result = GenerateQuoteUtils.build({
                isReady,
                projectId,
                quoteId,
                quoteTemplateId,
                pages: GenerateQuoteUtils.buildPageTakeoffInputs(
                    data?.floorplanPages ?? [],
                ),
                templateConfigs: GenerateQuoteUtils.buildTemplateConfigs(
                    data?.quoteItemTemplateConfigs ?? [],
                    defaultTemplateConfigs,
                ),
                searchText: buildProjectSearchText(data),
            });

            if (!result.ok) {
                throw new GenerateQuoteError(result.reason, result.message);
            }

            await createQuoteWithItems(result.variables);
            return quoteId;
        },
    });

    return {
        generate: () => mutation.mutateAsync(),
        isGenerating: mutation.isPending,
        error: mutation.error ?? null,
    };
}
