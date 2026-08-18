import type { CompanySummary } from "../types.js";

/**
 * Resolves the search input's displayed value: the live query while the
 * popover is open, otherwise the selected company's name (falling back to a
 * caller-supplied label while the selected company hasn't loaded yet).
 */
export function companyInputValue(
    isOpen: boolean,
    query: string,
    selectedCompany: CompanySummary | undefined,
    selectedCompanyLabel: string | null,
): string {
    if (isOpen) return query;
    return selectedCompany?.companyName ?? selectedCompanyLabel ?? query;
}

/**
 * Finds up to three already-loaded companies whose name overlaps the given
 * name, so the create panel can suggest an existing company instead of a
 * duplicate. Matches bidirectionally (each name containing the other) to
 * catch both partially-typed names and abbreviations.
 */
export function findNearMatches(
    companies: readonly CompanySummary[],
    name: string,
): CompanySummary[] {
    const normalizedName = name.trim().toLowerCase();
    if (!normalizedName) return [];
    return companies
        .filter((company) => {
            const normalizedCompanyName = company.companyName.toLowerCase();
            return (
                normalizedCompanyName.includes(normalizedName) ||
                normalizedName.includes(normalizedCompanyName)
            );
        })
        .slice(0, 3);
}

/** Trims a form field, converting a blank result to `null` for optional payload fields. */
export function trimmedOrNull(value: string): string | null {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
}
