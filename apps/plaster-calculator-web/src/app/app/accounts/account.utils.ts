import type {
    AccountDetailDraft,
    AccountDraft,
    ContactDraft,
} from "./account.types.js";
import type {
    AccountContact,
    AccountDetail,
    AccountSummary,
    ProjectSummary,
} from "../../../types.js";

export function optionalValue(value: string): string | null {
    return value.trim() || null;
}

export function filterAccounts(
    accounts: readonly AccountSummary[],
    query: string,
): AccountSummary[] {
    const q = query.trim().toLowerCase();
    if (!q) return [...accounts];
    return accounts.filter((account) =>
        [
            account.companyName,
            account.businessNumber ?? "",
            account.phoneNumber ?? "",
        ].some((value) => value.toLowerCase().includes(q)),
    );
}

export function countProjectsByAccount(
    projects: readonly ProjectSummary[],
): Map<string, number> {
    const counts = new Map<string, number>();
    for (const project of projects) {
        if (!project.accountId) continue;
        counts.set(project.accountId, (counts.get(project.accountId) ?? 0) + 1);
    }
    return counts;
}

export function toAccountDraft(account: AccountSummary): AccountDraft {
    return {
        companyName: account.companyName,
        businessNumber: account.businessNumber ?? "",
        phoneNumber: account.phoneNumber ?? "",
    };
}

export function toAccountDetailDraft(
    account: AccountDetail,
): AccountDetailDraft {
    return {
        ...toAccountDraft(account),
        primaryContactId: account.primaryContactId ?? "",
    };
}

export function isAccountDetailDraftChanged(
    account: AccountDetail,
    draft: AccountDetailDraft,
): boolean {
    return (
        draft.companyName.trim() !== account.companyName ||
        optionalValue(draft.businessNumber) !==
            (account.businessNumber ?? null) ||
        optionalValue(draft.phoneNumber) !== (account.phoneNumber ?? null) ||
        optionalValue(draft.primaryContactId) !==
            (account.primaryContactId ?? null)
    );
}

export function toContactDraft(contact: AccountContact): ContactDraft {
    return {
        name: contact.name,
        email: contact.email ?? "",
        phoneNumber: contact.phoneNumber ?? "",
        role: contact.role ?? "",
        makePrimary: false,
    };
}
