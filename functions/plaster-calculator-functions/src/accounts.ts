import "./bootstrap.js";

import { randomUUID } from "node:crypto";

import {
    createAccount as dcCreateAccount,
    createAccountContact as dcCreateAccountContact,
    deleteAccount as dcDeleteAccount,
    deleteAccountContact as dcDeleteAccountContact,
    deleteAccountContacts as dcDeleteAccountContacts,
    listAccountContactsByAccountId as dcListAccountContactsByAccountId,
    listAccountsByOwner,
    updateAccount as dcUpdateAccount,
    updateAccountContact as dcUpdateAccountContact,
} from "@generated/example-data-connector";
import { onCall } from "firebase-functions/https";

import { requireAuth } from "./auth.js";
import {
    toAccountContact,
    toAccountDetail,
    toAccountSummary,
} from "./mappers.js";
import {
    requireOwnedAccount,
    requireOwnedAccountContact,
} from "./ownership.js";
import {
    hasField,
    readOptionalNullableString,
    readRequiredString,
} from "./validation.js";

import type {
    AccountContact,
    AccountDetail,
    AccountIdRequest,
    AccountSummary,
    ContactIdRequest,
    CreateAccountContactRequest,
    CreateAccountRequest,
    UpdateAccountContactRequest,
    UpdateAccountRequest,
} from "./types.js";

export const listAccounts = onCall<
    unknown,
    Promise<{ accounts: AccountSummary[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const response = await listAccountsByOwner({ ownerId: auth.uid });
    return { accounts: response.data.accounts.map(toAccountSummary) };
});

export const getAccount = onCall<AccountIdRequest, Promise<AccountDetail>>(
    async (request) => {
        const auth = requireAuth(request);
        return toAccountDetail(
            await requireOwnedAccount(
                readRequiredString(request.data.accountId, "Account ID"),
                auth.uid,
            ),
        );
    },
);

export const listAccountContactsByAccountId = onCall<
    AccountIdRequest,
    Promise<{ contacts: AccountContact[] }>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = readRequiredString(request.data.accountId, "Account ID");
    await requireOwnedAccount(accountId, auth.uid);
    const response = await dcListAccountContactsByAccountId({ accountId });
    return { contacts: response.data.accountContacts.map(toAccountContact) };
});

export const createAccount = onCall<
    CreateAccountRequest,
    Promise<AccountDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = randomUUID();
    await dcCreateAccount({
        id: accountId,
        ownerId: auth.uid,
        companyName: readRequiredString(
            request.data.companyName,
            "Company name",
        ),
        businessNumber: readOptionalNullableString(
            request.data.businessNumber,
            "Business number",
        ),
        phoneNumber: readOptionalNullableString(
            request.data.phoneNumber,
            "Phone number",
        ),
    });

    return toAccountDetail(await requireOwnedAccount(accountId, auth.uid));
});

export const updateAccount = onCall<
    UpdateAccountRequest,
    Promise<AccountDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = readRequiredString(request.data.accountId, "Account ID");
    const account = await requireOwnedAccount(accountId, auth.uid);
    const data = request.data;
    const primaryContactId = hasField(data, "primaryContactId")
        ? readOptionalNullableString(
              data.primaryContactId,
              "Primary contact ID",
          )
        : (account.primaryContactId ?? null);

    if (primaryContactId) {
        await requireOwnedAccountContact(accountId, primaryContactId, auth.uid);
    }

    await dcUpdateAccount({
        id: accountId,
        companyName: hasField(data, "companyName")
            ? readRequiredString(data.companyName, "Company name")
            : account.companyName,
        businessNumber: hasField(data, "businessNumber")
            ? readOptionalNullableString(data.businessNumber, "Business number")
            : (account.businessNumber ?? null),
        phoneNumber: hasField(data, "phoneNumber")
            ? readOptionalNullableString(data.phoneNumber, "Phone number")
            : (account.phoneNumber ?? null),
        primaryContactId,
    });

    return toAccountDetail(await requireOwnedAccount(accountId, auth.uid));
});

export const deleteAccount = onCall<AccountIdRequest, Promise<{ ok: true }>>(
    async (request) => {
        const auth = requireAuth(request);
        const accountId = readRequiredString(
            request.data.accountId,
            "Account ID",
        );
        await requireOwnedAccount(accountId, auth.uid);
        await dcDeleteAccountContacts({ accountId });
        await dcDeleteAccount({ id: accountId });
        return { ok: true };
    },
);

export const createAccountContact = onCall<
    CreateAccountContactRequest,
    Promise<AccountDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = readRequiredString(request.data.accountId, "Account ID");
    const account = await requireOwnedAccount(accountId, auth.uid);
    const contactId = randomUUID();
    await dcCreateAccountContact({
        id: contactId,
        accountId,
        name: readRequiredString(request.data.name, "Contact name"),
        email: readOptionalNullableString(request.data.email, "Email"),
        phoneNumber: readOptionalNullableString(
            request.data.phoneNumber,
            "Phone number",
        ),
        role: readOptionalNullableString(request.data.role, "Role"),
    });
    await dcUpdateAccount({
        id: accountId,
        companyName: account.companyName,
        businessNumber: account.businessNumber ?? null,
        phoneNumber: account.phoneNumber ?? null,
        primaryContactId:
            request.data.makePrimary === true
                ? contactId
                : (account.primaryContactId ?? null),
    });
    return toAccountDetail(await requireOwnedAccount(accountId, auth.uid));
});

export const updateAccountContact = onCall<
    UpdateAccountContactRequest,
    Promise<AccountDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = readRequiredString(request.data.accountId, "Account ID");
    const contactId = readRequiredString(request.data.contactId, "Contact ID");
    const contact = await requireOwnedAccountContact(
        accountId,
        contactId,
        auth.uid,
    );
    const data = request.data;

    await dcUpdateAccountContact({
        id: contactId,
        name: hasField(data, "name")
            ? readRequiredString(data.name, "Contact name")
            : contact.name,
        email: hasField(data, "email")
            ? readOptionalNullableString(data.email, "Email")
            : (contact.email ?? null),
        phoneNumber: hasField(data, "phoneNumber")
            ? readOptionalNullableString(data.phoneNumber, "Phone number")
            : (contact.phoneNumber ?? null),
        role: hasField(data, "role")
            ? readOptionalNullableString(data.role, "Role")
            : (contact.role ?? null),
    });

    return toAccountDetail(await requireOwnedAccount(accountId, auth.uid));
});

export const deleteAccountContact = onCall<
    ContactIdRequest,
    Promise<AccountDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = readRequiredString(request.data.accountId, "Account ID");
    const contactId = readRequiredString(request.data.contactId, "Contact ID");
    const account = await requireOwnedAccount(accountId, auth.uid);
    await requireOwnedAccountContact(accountId, contactId, auth.uid);

    if (account.primaryContactId === contactId) {
        await dcUpdateAccount({
            id: accountId,
            companyName: account.companyName,
            businessNumber: account.businessNumber ?? null,
            phoneNumber: account.phoneNumber ?? null,
            primaryContactId: null,
        });
    }

    await dcDeleteAccountContact({ id: contactId });
    return toAccountDetail(await requireOwnedAccount(accountId, auth.uid));
});

export const setPrimaryAccountContact = onCall<
    ContactIdRequest,
    Promise<AccountDetail>
>(async (request) => {
    const auth = requireAuth(request);
    const accountId = readRequiredString(request.data.accountId, "Account ID");
    const contactId = readRequiredString(request.data.contactId, "Contact ID");
    const account = await requireOwnedAccount(accountId, auth.uid);
    await requireOwnedAccountContact(accountId, contactId, auth.uid);
    await dcUpdateAccount({
        id: accountId,
        companyName: account.companyName,
        businessNumber: account.businessNumber ?? null,
        phoneNumber: account.phoneNumber ?? null,
        primaryContactId: contactId,
    });
    return toAccountDetail(await requireOwnedAccount(accountId, auth.uid));
});
