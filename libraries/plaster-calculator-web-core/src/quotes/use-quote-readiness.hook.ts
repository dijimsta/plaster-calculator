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
 * Joins `GetQuoteReadiness` (WORK-130) to the readiness-check registry
 * (WORK-128/129) — the only place the two meet. Parses each floorplan
 * page's `overlayJson`, runs `READINESS_CHECKS` against the assembled
 * `ReadinessCheckInput`, and returns the ordered results plus an overall
 * `isReady` flag. `refresh()` re-runs the query so a caller (e.g. an
 * inline-fix control from WORK-140) can re-evaluate readiness after a
 * write.
 */
export function useQuoteReadiness(projectId: string): UseQuoteReadinessResult {
    const { data, isLoading, error } = DataConnectorReact.useGetQuoteReadiness(
        dataConnect,
        { projectId },
    );
    const queryClient = useQueryClient();

    const results = useMemo(
        () => (data ? QuoteReadinessUtils.evaluate(data) : []),
        [data],
    );
    const refresh = useCallback(async (): Promise<void> => {
        const ref = DataConnector.getQuoteReadinessRef(dataConnect, {
            projectId,
        });
        const refreshed = await DataConnector.getQuoteReadiness(
            dataConnect,
            { projectId },
            { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
        );
        queryClient.setQueryData(
            [ref.name, ref.variables ?? null],
            refreshed.data,
        );
    }, [projectId, queryClient]);

    return {
        results,
        isReady: QuoteReadinessUtils.isReady(results),
        loading: isLoading,
        error: error ?? null,
        refresh,
    };
}
