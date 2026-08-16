"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { useQueryClient } from "@tanstack/react-query";
import type { FirebaseError } from "firebase/app";
import { QueryFetchPolicy } from "firebase/data-connect";
import { useCallback, useMemo } from "react";

import { FirebaseService } from "../firebase/firebase.service.ts";

import type { UseQuoteReadinessResult } from "./quote-readiness.types.ts";
import { QuoteReadinessUtils } from "./quote-readiness.utils.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

type ResolvedQuoteReadiness = {
    readonly quoteTemplateId: string | undefined;
    readonly data: DataConnector.GetQuoteReadinessData | undefined;
    readonly isLoading: boolean;
    readonly error: FirebaseError | null;
    readonly defaultTemplateConfigs: DataConnector.GetQuoteReadinessData["quoteItemTemplateConfigs"];
};

type CompanyTemplateResolution = {
    readonly companyTemplateId: string | undefined;
    readonly usesCompanyTemplate: boolean;
};

/**
 * Reads `project.company.quoteTemplateId` off the default template's
 * `GetQuoteReadiness` response, and decides whether it names a *different*
 * template than the default — the one case that needs a second
 * `GetQuoteReadiness` call. A plain function (not a hook) purely to keep
 * `useResolvedQuoteReadiness()` below within this file's complexity limit.
 */
function resolveCompanyTemplateId(
    defaultData: DataConnector.GetQuoteReadinessData | undefined,
    defaultTemplateId: string | undefined,
): CompanyTemplateResolution {
    const companyTemplateId =
        defaultData?.project?.company?.quoteTemplateId ?? undefined;
    return {
        companyTemplateId,
        usesCompanyTemplate:
            companyTemplateId != null &&
            companyTemplateId !== defaultTemplateId,
    };
}

/**
 * The team's default `QuoteTemplate` id (`isDefault: true`, from
 * `ListQuoteTemplatesForTeam`) — the one thing resolvable before a
 * project's own company assignment is. `useResolvedQuoteReadiness()` below
 * always fetches `GetQuoteReadiness` with this id first, both because it's
 * the fallback when a project's company has no assignment of its own, and
 * because its response is where `project.company.quoteTemplateId` (the
 * assignment itself) is read from.
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
 * The two-pass `GetQuoteReadiness` resolution `useQuoteReadiness()` needs
 * (WORK-191/WORK-193): fetch with the default template's id, read
 * `project.company.quoteTemplateId` back from that response, and — only
 * when it names a different template — fetch again with that id. Returns
 * whichever response is "active" (the company's, when it differs from the
 * default) alongside the default template's own configs, which callers
 * need regardless of which template is actually pricing the quote (see
 * `QuoteItemInclusionUtils.resolveInclusion()` in
 * `@libraries/plaster-calculator-common`).
 */
function useResolvedQuoteReadiness(
    projectId: string,
    defaultTemplateId: string | undefined,
): ResolvedQuoteReadiness {
    const defaultResult = DataConnectorReact.useGetQuoteReadiness(
        dataConnect,
        { projectId, quoteTemplateId: defaultTemplateId ?? "" },
        { enabled: defaultTemplateId != null },
    );

    const { companyTemplateId, usesCompanyTemplate } = resolveCompanyTemplateId(
        defaultResult.data,
        defaultTemplateId,
    );

    const companyResult = DataConnectorReact.useGetQuoteReadiness(
        dataConnect,
        { projectId, quoteTemplateId: companyTemplateId ?? "" },
        { enabled: usesCompanyTemplate },
    );

    const activeResult = usesCompanyTemplate ? companyResult : defaultResult;

    return {
        quoteTemplateId: companyTemplateId ?? defaultTemplateId,
        data: activeResult.data,
        isLoading: defaultTemplateId == null || activeResult.isLoading,
        error: activeResult.error ?? null,
        defaultTemplateConfigs:
            defaultResult.data?.quoteItemTemplateConfigs ?? [],
    };
}

/**
 * Joins `GetQuoteReadiness` (WORK-130) to the readiness-check registry
 * (WORK-128/129) — the only place the two meet. Parses each floorplan
 * page's `overlayJson`, runs `READINESS_CHECKS` against the assembled
 * `ReadinessCheckInput`, and returns the ordered results plus an overall
 * `isReady` flag. `refresh()` re-runs the query for whichever template
 * `quoteTemplateId` currently names, so a caller (e.g. an inline-fix
 * control from WORK-140) can re-evaluate readiness after a write.
 *
 * `GetQuoteReadiness` requires a `quoteTemplateId` (WORK-191): which
 * template's configs price this quote. Resolving that (WORK-193) takes two
 * passes, done by `useDefaultQuoteTemplateId()`/`useResolvedQuoteReadiness()`
 * above: the team's default template resolves first (`ListQuoteTemplatesForTeam`,
 * `isDefault: true`), `GetQuoteReadiness` is fetched with it, and — only
 * when that response's `project.company.quoteTemplateId` names a different
 * template — `GetQuoteReadiness` is fetched again with that id, and that
 * second response becomes the one this hook evaluates and exposes. The
 * fallback to the default is silent: there is no separate loading/warning
 * state for it, so readiness and `useGenerateQuote()` (which consumes this
 * hook's `data`/`quoteTemplateId`/`defaultTemplateConfigs` directly rather
 * than re-resolving any of this itself) always agree on which template
 * priced a project. Readiness stays `loading` until a template id resolves,
 * since asking for readiness with no template id yet would be asking the
 * wrong question.
 */
export function useQuoteReadiness(projectId: string): UseQuoteReadinessResult {
    const queryClient = useQueryClient();
    const defaultTemplateId = useDefaultQuoteTemplateId();
    const { quoteTemplateId, data, isLoading, error, defaultTemplateConfigs } =
        useResolvedQuoteReadiness(projectId, defaultTemplateId);

    const results = useMemo(
        () =>
            data
                ? QuoteReadinessUtils.evaluate(data, defaultTemplateConfigs)
                : [],
        [data, defaultTemplateConfigs],
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
        error,
        refresh,
        data,
        quoteTemplateId,
        defaultTemplateConfigs,
    };
}
