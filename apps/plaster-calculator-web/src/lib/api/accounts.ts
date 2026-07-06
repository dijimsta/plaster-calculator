import * as DataConnector from "@generated/data-connector-web";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";

import type {
    AccountContact,
    AccountDetail,
    AccountSummary,
} from "../../types.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

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

type AccountRow = DataConnector.ListMyAccountsData["accounts"][number];
type AccountDetailRow = NonNullable<DataConnector.GetMyAccountData["account"]>;
type AccountContactRow = AccountDetailRow["contacts"][number];

export async function listAccounts(): Promise<AccountSummary[]> {
    const result = await DataConnector.listMyAccounts(dataConnect);
    return result.data.accounts.map(toAccountSummary);
}

export async function getAccount(accountId: string): Promise<AccountDetail> {
    const result = await DataConnector.getMyAccount(dataConnect, {
        id: accountId,
    });
    if (!result.data.account) {
        throw new Error("Account was not found.");
    }
    return toAccountDetail(result.data.account);
}

export async function listAccountContactsByAccountId(
    accountId: string,
): Promise<AccountContact[]> {
    const result = await DataConnector.listMyAccountContacts(dataConnect, {
        accountId,
    });
    return result.data.accountContacts.map(toAccountContact);
}

export async function createAccount(
    payload: AccountPayload & { companyName: string },
): Promise<AccountDetail> {
    const accountId = crypto.randomUUID();
    await DataConnector.createMyAccount(dataConnect, {
        id: accountId,
        companyName: payload.companyName,
        businessNumber: payload.businessNumber,
        phoneNumber: payload.phoneNumber,
    });
    return getAccount(accountId);
}

export async function updateAccount(
    accountId: string,
    payload: AccountPayload & { primaryContactId?: string | null },
): Promise<AccountDetail> {
    const account = await getAccount(accountId);

    if (
        payload.primaryContactId !== undefined &&
        payload.primaryContactId !== account.primaryContactId
    ) {
        if (payload.primaryContactId === null) {
            await DataConnector.clearMyAccountPrimaryContact(dataConnect, {
                accountId,
            });
        } else {
            await DataConnector.setMyAccountPrimaryContact(dataConnect, {
                accountId,
                contactId: payload.primaryContactId,
            });
        }
    }

    await DataConnector.updateMyAccount(dataConnect, {
        id: accountId,
        companyName: payload.companyName ?? account.companyName,
        businessNumber:
            payload.businessNumber === undefined
                ? account.businessNumber
                : payload.businessNumber,
        phoneNumber:
            payload.phoneNumber === undefined
                ? account.phoneNumber
                : payload.phoneNumber,
    });
    return getAccount(accountId);
}

export async function deleteAccount(accountId: string): Promise<void> {
    await DataConnector.deleteMyAccount(dataConnect, { id: accountId });
}

export async function createAccountContact(
    accountId: string,
    payload: AccountContactPayload & { name: string },
): Promise<AccountDetail> {
    const contactId = crypto.randomUUID();
    await DataConnector.createMyAccountContact(dataConnect, {
        id: contactId,
        accountId,
        name: payload.name,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        role: payload.role,
    });
    if (payload.makePrimary === true) {
        await DataConnector.setMyAccountPrimaryContact(dataConnect, {
            accountId,
            contactId,
        });
    }
    return getAccount(accountId);
}

export async function updateAccountContact(
    accountId: string,
    contactId: string,
    payload: AccountContactPayload,
): Promise<AccountDetail> {
    const account = await getAccount(accountId);
    const contact = account.contacts.find((item) => item.id === contactId);
    if (!contact) {
        throw new Error("Contact was not found.");
    }

    await DataConnector.updateMyAccountContact(dataConnect, {
        accountId,
        contactId,
        name: payload.name ?? contact.name,
        email: payload.email === undefined ? contact.email : payload.email,
        phoneNumber:
            payload.phoneNumber === undefined
                ? contact.phoneNumber
                : payload.phoneNumber,
        role: payload.role === undefined ? contact.role : payload.role,
    });
    return getAccount(accountId);
}

export async function deleteAccountContact(
    accountId: string,
    contactId: string,
): Promise<AccountDetail> {
    await DataConnector.deleteMyAccountContact(dataConnect, {
        accountId,
        contactId,
    });
    return getAccount(accountId);
}

export async function setPrimaryAccountContact(
    accountId: string,
    contactId: string,
): Promise<AccountDetail> {
    await DataConnector.setMyAccountPrimaryContact(dataConnect, {
        accountId,
        contactId,
    });
    return getAccount(accountId);
}

function toAccountSummary(account: AccountRow): AccountSummary {
    return {
        id: account.id,
        ownerId: account.ownerId,
        companyName: account.companyName,
        businessNumber: account.businessNumber ?? null,
        phoneNumber: account.phoneNumber ?? null,
        primaryContactId: account.primaryContactId ?? null,
        createdAt: account.createdAt,
        updatedAt: account.updatedAt,
    };
}

function toAccountDetail(account: AccountDetailRow): AccountDetail {
    return {
        ...toAccountSummary(account),
        contacts: account.contacts.map(toAccountContact),
    };
}

function toAccountContact(contact: AccountContactRow): AccountContact {
    return {
        id: contact.id,
        accountId: contact.accountId,
        name: contact.name,
        email: contact.email ?? null,
        phoneNumber: contact.phoneNumber ?? null,
        role: contact.role ?? null,
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt,
    };
}
