import type {
    CompanyContact,
    CompanyDetail,
    CompanySummary,
} from "../../../types.js";

import type {
    CompanyDetailDraft,
    CompanyDraft,
    ContactDraft,
} from "./company.types.js";

export function optionalValue(value: string): string | null {
    return value.trim() || null;
}

export function filterCompanies(
    companies: readonly CompanySummary[],
    query: string,
): CompanySummary[] {
    const q = query.trim().toLowerCase();
    if (!q) return [...companies];
    return companies.filter((company) =>
        [
            company.companyName,
            company.businessNumber ?? "",
            company.phoneNumber ?? "",
        ].some((value) => value.toLowerCase().includes(q)),
    );
}

export function mergeCompanies(
    ...companyLists: readonly (readonly CompanySummary[])[]
): CompanySummary[] {
    const companiesById = new Map<string, CompanySummary>();
    for (const companies of companyLists) {
        for (const company of companies) {
            if (!companiesById.has(company.id)) {
                companiesById.set(company.id, company);
            }
        }
    }
    return [...companiesById.values()];
}

export function toCompanyDraft(company: CompanySummary): CompanyDraft {
    return {
        companyName: company.companyName,
        businessNumber: company.businessNumber ?? "",
        phoneNumber: company.phoneNumber ?? "",
    };
}

export function toCompanyDetailDraft(
    company: CompanyDetail,
): CompanyDetailDraft {
    return {
        ...toCompanyDraft(company),
        primaryContactId: company.primaryContactId ?? "",
    };
}

export function isCompanyDetailDraftChanged(
    company: CompanyDetail,
    draft: CompanyDetailDraft,
): boolean {
    return (
        draft.companyName.trim() !== company.companyName ||
        optionalValue(draft.businessNumber) !==
            (company.businessNumber ?? null) ||
        optionalValue(draft.phoneNumber) !== (company.phoneNumber ?? null) ||
        optionalValue(draft.primaryContactId) !==
            (company.primaryContactId ?? null)
    );
}

export function toContactDraft(contact: CompanyContact): ContactDraft {
    return {
        name: contact.name,
        email: contact.email ?? "",
        phoneNumber: contact.phoneNumber ?? "",
        role: contact.role ?? "",
        makePrimary: false,
    };
}
