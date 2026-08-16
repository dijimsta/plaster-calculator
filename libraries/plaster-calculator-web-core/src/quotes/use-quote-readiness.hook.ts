"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { useQueryClient } from "@tanstack/react-query";
import { QueryFetchPolicy } from "firebase/data-connect";
import { useCallback, useMemo } from "react";

import { FirebaseService } from "../firebase/firebase.service.ts";

import type { UseQuoteReadinessResult } from "./quote-readiness.types.ts";
import { QuoteReadinessUtils } from "./quote-readiness.utils.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

/**
 * Resolves the team's default `QuoteTemplate` id (WORK-191). Interim: always
 * the default, regardless of the project's company. WORK-193 replaces this
 * with a company-aware lookup (the project's company's assigned variation,
 * falling back to this same default) — kept as its own hook so that swap is
 * a one-line change at each call site below.
 */
function useDefaultQuoteTemplateId(): string | undefined {
    const { data } =
        DataConnectorReact.useListQuoteTemplatesForTeam(dataConnect);
    return useMemo(
        () => data?.quoteTemplates.find((template) => template.isDefault)?.id,
        [data],
    );
}

/**
 * Joins `GetQuoteReadiness` (WORK-130) to the readiness-check registry
 * (WORK-128/129) — the only place the two meet. Parses each floorplan
 * page's `overlayJson`, runs `READINESS_CHECKS` against the assembled
 * `ReadinessCheckInput`, and returns the ordered results plus an overall
 * `isReady` flag. `refresh()` re-runs the query so a caller (e.g. an
 * inline-fix control from WORK-140) can re-evaluate readiness after a
 * write.
 *
 * `GetQuoteReadiness` requires a `quoteTemplateId` (WORK-191): which
 * template's configs price this quote. Resolved via
 * `useDefaultQuoteTemplateId()` above; readiness stays `loading` until that
 * resolves, since asking for readiness with no template id yet would be
 * asking the wrong question.
 */
export function useQuoteReadiness(projectId: string): UseQuoteReadinessResult {
    const quoteTemplateId = useDefaultQuoteTemplateId();
    const { data, isLoading, error } = DataConnectorReact.useGetQuoteReadiness(
        dataConnect,
        { projectId, quoteTemplateId: quoteTemplateId ?? "" },
        { enabled: quoteTemplateId != null },
    );
    const queryClient = useQueryClient();

    const results = useMemo(
        () => (data ? QuoteReadinessUtils.evaluate(data) : []),
        [data],
    );
    const refresh = useCallback(async (): Promise<void> => {
        if (!quoteTemplateId) {
            return;
        }
        const ref = DataConnector.getQuoteReadinessRef(dataConnect, {
            projectId,
            quoteTemplateId,
        });
        const refreshed = await DataConnector.getQuoteReadiness(
            dataConnect,
            { projectId, quoteTemplateId },
            { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
        );
        queryClient.setQueryData(
            [ref.name, ref.variables ?? null],
            refreshed.data,
        );
    }, [projectId, quoteTemplateId, queryClient]);

    return {
        results,
        isReady:
            quoteTemplateId != null && QuoteReadinessUtils.isReady(results),
        loading: isLoading || quoteTemplateId == null,
        error: error ?? null,
        refresh,
        data,
        quoteTemplateId,
    };
}
