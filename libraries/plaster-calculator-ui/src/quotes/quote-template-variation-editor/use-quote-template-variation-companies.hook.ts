"use client";

import { useCompaniesService } from "@libraries/plaster-calculator-web-core";
import type { CompanySummary } from "@libraries/plaster-calculator-web-core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const QUOTE_TEMPLATE_VARIATION_COMPANIES_QUERY_KEY = [
    "quoteTemplateVariationCompanies",
];

export type UseQuoteTemplateVariationCompaniesResult = {
    /** Companies whose `quoteTemplateId` already names this variation. */
    readonly assignedCompanies: readonly CompanySummary[];
    /** Every other company on the team -- candidates for the "+ Add company" picker, some already assigned to a *different* variation. */
    readonly otherCompanies: readonly CompanySummary[];
    readonly isLoading: boolean;
    readonly isMutating: boolean;
    readonly assignCompany: (companyId: string) => Promise<void>;
    readonly unassignCompany: (companyId: string) => Promise<void>;
};

/**
 * The team's companies, split by whether `Company.quoteTemplateId` (WORK-190)
 * already names this variation, plus assign/unassign. Built on
 * `CompaniesService` (`@libraries/plaster-calculator-web-core`) --
 * `assignQuoteTemplate()`/`clearQuoteTemplate()` -- the same service the web
 * app's own company pages already use, rather than a new data-connector-web
 * dependency here. The company list is fetched once per team (not scoped to
 * one variation) and shared across every open picker/list via one query
 * key, so moving a company off another variation here is reflected the next
 * time that variation's own list is read.
 */
export function useQuoteTemplateVariationCompanies(
    variationId: string,
): UseQuoteTemplateVariationCompaniesResult {
    const companiesService = useCompaniesService();
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: QUOTE_TEMPLATE_VARIATION_COMPANIES_QUERY_KEY,
        queryFn: () => companiesService.listCompanies(),
    });
    const companies = data ?? [];

    const invalidate = useCallback(
        () =>
            queryClient.invalidateQueries({
                queryKey: QUOTE_TEMPLATE_VARIATION_COMPANIES_QUERY_KEY,
            }),
        [queryClient],
    );

    const assignMutation = useMutation({
        mutationFn: (companyId: string) =>
            companiesService.assignQuoteTemplate(companyId, variationId),
        onSuccess: invalidate,
    });
    const unassignMutation = useMutation({
        mutationFn: (companyId: string) =>
            companiesService.clearQuoteTemplate(companyId),
        onSuccess: invalidate,
    });

    return {
        assignedCompanies: companies.filter(
            (company) => company.quoteTemplateId === variationId,
        ),
        otherCompanies: companies.filter(
            (company) => company.quoteTemplateId !== variationId,
        ),
        isLoading,
        isMutating: assignMutation.isPending || unassignMutation.isPending,
        assignCompany: async (companyId: string): Promise<void> => {
            await assignMutation.mutateAsync(companyId);
        },
        unassignCompany: async (companyId: string): Promise<void> => {
            await unassignMutation.mutateAsync(companyId);
        },
    };
}
