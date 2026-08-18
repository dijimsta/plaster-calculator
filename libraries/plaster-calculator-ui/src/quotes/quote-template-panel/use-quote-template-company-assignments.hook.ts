"use client";

import { useCompaniesService } from "@libraries/plaster-calculator-web-core";
import type { CompanySummary } from "@libraries/plaster-calculator-web-core";
import { useQuery } from "@tanstack/react-query";

import { QUOTE_TEMPLATE_VARIATION_COMPANIES_QUERY_KEY } from "../quote-template-variation-editor/use-quote-template-variation-companies.hook.ts";

export type UseQuoteTemplateCompanyAssignmentsResult = {
    /** Companies whose `quoteTemplateId` names a given template id. */
    readonly companiesByTemplateId: ReadonlyMap<
        string,
        readonly CompanySummary[]
    >;
    /** Companies with no `quoteTemplateId` -- fall back to the team's default. */
    readonly unassignedCompanies: readonly CompanySummary[];
    readonly isLoading: boolean;
};

/**
 * Buckets the team's companies by which quote template prices them, for
 * `QuoteTemplateCard`'s "applies to" summary line (company names for a
 * variation, "Fallback for N companies..." for the default). Built on the
 * same `CompaniesService.listCompanies()` call and query key
 * `useQuoteTemplateVariationCompanies` uses for the open variation's own
 * interactive "Applies to" list, so this doesn't add a second fetch when
 * both are mounted together.
 */
export function useQuoteTemplateCompanyAssignments(): UseQuoteTemplateCompanyAssignmentsResult {
    const companiesService = useCompaniesService();
    const { data, isLoading } = useQuery({
        queryKey: QUOTE_TEMPLATE_VARIATION_COMPANIES_QUERY_KEY,
        queryFn: () => companiesService.listCompanies(),
    });
    const companies = data ?? [];

    const companiesByTemplateId = new Map<string, CompanySummary[]>();
    const unassignedCompanies: CompanySummary[] = [];
    for (const company of companies) {
        if (company.quoteTemplateId === null) {
            unassignedCompanies.push(company);
            continue;
        }
        const bucket = companiesByTemplateId.get(company.quoteTemplateId) ?? [];
        bucket.push(company);
        companiesByTemplateId.set(company.quoteTemplateId, bucket);
    }

    return { companiesByTemplateId, unassignedCompanies, isLoading };
}
