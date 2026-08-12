import * as DataConnector from "@generated/data-connector-web";
import type { DataConnect } from "firebase/data-connect";

/**
 * `@tanstack-query-firebase/react`'s query cache key for a Data Connect
 * query is `[ref.name, ref.variables ?? null]` — the same shape
 * `useRefreshProjectQuestionnaireCallback` (questionnaires/page.hooks.ts)
 * already builds by hand to patch the cache directly via
 * `queryClient.setQueryData`. Centralised here since WORK-123's optimistic
 * update/rollback and its `ListQuotesForTeam` cache invalidation both need
 * the exact same keys the underlying `useGetQuoteById`/`useListQuotesForTeam`
 * hooks are keyed under.
 */
export class QuoteQueryKeyUtils {
    public static forQuoteById(
        dataConnect: DataConnect,
        quoteId: string,
    ): readonly [string, unknown] {
        const ref = DataConnector.getQuoteByIdRef(dataConnect, {
            id: quoteId,
        });
        return [ref.name, ref.variables ?? null];
    }

    public static forQuotesForTeam(
        dataConnect: DataConnect,
    ): readonly [string, unknown] {
        const ref = DataConnector.listQuotesForTeamRef(dataConnect);
        return [ref.name, ref.variables ?? null];
    }
}
