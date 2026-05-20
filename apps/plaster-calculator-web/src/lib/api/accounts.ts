import { httpsCallable } from "firebase/functions";

import { functions } from "../../firebase/firebase.utils.js";

import type {
    AccountContact,
    AccountDetail,
    AccountSummary,
} from "../../types.js";

type AccountPayload = {
    companyName?: string;
    businessNumber?: string | null;
    phoneNumber?: string | null;
};

type AccountContactPayload = {
    name?: string;
    email?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
    makePrimary?: boolean;
};

const listAccountsCallable = httpsCallable<
    unknown,
    { accounts: AccountSummary[] }
>(functions, "listAccounts");
const getAccountCallable = httpsCallable<{ accountId: string }, AccountDetail>(
    functions,
    "getAccount",
);
const listAccountContactsByAccountIdCallable = httpsCallable<
    { accountId: string },
    { contacts: AccountContact[] }
>(functions, "listAccountContactsByAccountId");
const createAccountCallable = httpsCallable<AccountPayload, AccountDetail>(
    functions,
    "createAccount",
);
const updateAccountCallable = httpsCallable<
    AccountPayload & { accountId: string; primaryContactId?: string | null },
    AccountDetail
>(functions, "updateAccount");
const deleteAccountCallable = httpsCallable<
    { accountId: string },
    { ok: true }
>(functions, "deleteAccount");
const createAccountContactCallable = httpsCallable<
    AccountContactPayload & { accountId: string },
    AccountDetail
>(functions, "createAccountContact");
const updateAccountContactCallable = httpsCallable<
    AccountContactPayload & { accountId: string; contactId: string },
    AccountDetail
>(functions, "updateAccountContact");
const deleteAccountContactCallable = httpsCallable<
    { accountId: string; contactId: string },
    AccountDetail
>(functions, "deleteAccountContact");
const setPrimaryAccountContactCallable = httpsCallable<
    { accountId: string; contactId: string },
    AccountDetail
>(functions, "setPrimaryAccountContact");

export async function listAccounts() {
    const result = await listAccountsCallable();
    return result.data.accounts;
}

export async function getAccount(accountId: string) {
    const result = await getAccountCallable({ accountId });
    return result.data;
}

export async function listAccountContactsByAccountId(accountId: string) {
    const result = await listAccountContactsByAccountIdCallable({ accountId });
    return result.data.contacts;
}

export async function createAccount(
    payload: AccountPayload & { companyName: string },
) {
    const result = await createAccountCallable(payload);
    return result.data;
}

export async function updateAccount(
    accountId: string,
    payload: AccountPayload & { primaryContactId?: string | null },
) {
    const result = await updateAccountCallable({ accountId, ...payload });
    return result.data;
}

export async function deleteAccount(accountId: string) {
    await deleteAccountCallable({ accountId });
}

export async function createAccountContact(
    accountId: string,
    payload: AccountContactPayload & { name: string },
) {
    const result = await createAccountContactCallable({
        accountId,
        ...payload,
    });
    return result.data;
}

export async function updateAccountContact(
    accountId: string,
    contactId: string,
    payload: AccountContactPayload,
) {
    const result = await updateAccountContactCallable({
        accountId,
        contactId,
        ...payload,
    });
    return result.data;
}

export async function deleteAccountContact(
    accountId: string,
    contactId: string,
) {
    const result = await deleteAccountContactCallable({ accountId, contactId });
    return result.data;
}

export async function setPrimaryAccountContact(
    accountId: string,
    contactId: string,
) {
    const result = await setPrimaryAccountContactCallable({
        accountId,
        contactId,
    });
    return result.data;
}
