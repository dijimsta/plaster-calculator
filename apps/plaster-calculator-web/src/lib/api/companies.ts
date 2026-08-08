import * as DataConnector from "@generated/data-connector-web";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";

import type {
    CompanyContact,
    CompanyDetail,
    CompanySummary,
} from "../../types.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

type CompanyPayload = {
    companyName?: string;
    businessNumber?: string | null;
    phoneNumber?: string | null;
};

type CompanyContactPayload = {
    name?: string;
    email?: string | null;
    phoneNumber?: string | null;
    role?: string | null;
    makePrimary?: boolean;
};

type CompanyRow = DataConnector.ListMyCompaniesData["companies"][number];
type CompanyDetailRow = NonNullable<DataConnector.GetMyCompanyData["company"]>;
type CompanyContactRow = CompanyDetailRow["contacts"][number];

export async function listCompanies(): Promise<CompanySummary[]> {
    const result = await DataConnector.listMyCompanies(dataConnect);
    return result.data.companies.map(toCompanySummary);
}

export async function getCompany(companyId: string): Promise<CompanyDetail> {
    const result = await DataConnector.getMyCompany(dataConnect, {
        id: companyId,
    });
    if (!result.data.company) {
        throw new Error("Company was not found.");
    }
    return toCompanyDetail(result.data.company);
}

export async function listCompanyContactsByCompanyId(
    companyId: string,
): Promise<CompanyContact[]> {
    const result = await DataConnector.listMyCompanyContacts(dataConnect, {
        companyId,
    });
    return result.data.companyContacts.map(toCompanyContact);
}

export async function createCompany(
    payload: CompanyPayload & { companyName: string },
): Promise<CompanyDetail> {
    const companyId = crypto.randomUUID();
    await DataConnector.createMyCompany(dataConnect, {
        id: companyId,
        companyName: payload.companyName,
        businessNumber: payload.businessNumber,
        phoneNumber: payload.phoneNumber,
    });
    return getCompany(companyId);
}

export async function updateCompany(
    companyId: string,
    payload: CompanyPayload & { primaryContactId?: string | null },
): Promise<CompanyDetail> {
    const company = await getCompany(companyId);

    if (
        payload.primaryContactId !== undefined &&
        payload.primaryContactId !== company.primaryContactId
    ) {
        if (payload.primaryContactId === null) {
            await DataConnector.clearMyCompanyPrimaryContact(dataConnect, {
                companyId,
            });
        } else {
            await DataConnector.setMyCompanyPrimaryContact(dataConnect, {
                companyId,
                contactId: payload.primaryContactId,
            });
        }
    }

    await DataConnector.updateMyCompany(dataConnect, {
        id: companyId,
        companyName: payload.companyName ?? company.companyName,
        businessNumber:
            payload.businessNumber === undefined
                ? company.businessNumber
                : payload.businessNumber,
        phoneNumber:
            payload.phoneNumber === undefined
                ? company.phoneNumber
                : payload.phoneNumber,
    });
    return getCompany(companyId);
}

export async function deleteCompany(companyId: string): Promise<void> {
    await DataConnector.deleteMyCompany(dataConnect, { id: companyId });
}

export async function createCompanyContact(
    companyId: string,
    payload: CompanyContactPayload & { name: string },
): Promise<CompanyDetail> {
    const contactId = crypto.randomUUID();
    await DataConnector.createMyCompanyContact(dataConnect, {
        id: contactId,
        companyId,
        name: payload.name,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        role: payload.role,
    });
    if (payload.makePrimary === true) {
        await DataConnector.setMyCompanyPrimaryContact(dataConnect, {
            companyId,
            contactId,
        });
    }
    return getCompany(companyId);
}

export async function updateCompanyContact(
    companyId: string,
    contactId: string,
    payload: CompanyContactPayload,
): Promise<CompanyDetail> {
    const company = await getCompany(companyId);
    const contact = company.contacts.find((item) => item.id === contactId);
    if (!contact) {
        throw new Error("Contact was not found.");
    }

    await DataConnector.updateMyCompanyContact(dataConnect, {
        companyId,
        contactId,
        name: payload.name ?? contact.name,
        email: payload.email === undefined ? contact.email : payload.email,
        phoneNumber:
            payload.phoneNumber === undefined
                ? contact.phoneNumber
                : payload.phoneNumber,
        role: payload.role === undefined ? contact.role : payload.role,
    });
    return getCompany(companyId);
}

export async function deleteCompanyContact(
    companyId: string,
    contactId: string,
): Promise<CompanyDetail> {
    await DataConnector.deleteMyCompanyContact(dataConnect, {
        companyId,
        contactId,
    });
    return getCompany(companyId);
}

export async function setPrimaryCompanyContact(
    companyId: string,
    contactId: string,
): Promise<CompanyDetail> {
    await DataConnector.setMyCompanyPrimaryContact(dataConnect, {
        companyId,
        contactId,
    });
    return getCompany(companyId);
}

function toCompanySummary(company: CompanyRow): CompanySummary {
    return {
        id: company.id,
        teamId: company.teamId,
        companyName: company.companyName,
        businessNumber: company.businessNumber ?? null,
        phoneNumber: company.phoneNumber ?? null,
        primaryContactId: company.primaryContactId ?? null,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
    };
}

function toCompanyDetail(company: CompanyDetailRow): CompanyDetail {
    return {
        ...toCompanySummary(company),
        contacts: company.contacts.map(toCompanyContact),
    };
}

function toCompanyContact(contact: CompanyContactRow): CompanyContact {
    return {
        id: contact.id,
        companyId: contact.companyId,
        name: contact.name,
        email: contact.email ?? null,
        phoneNumber: contact.phoneNumber ?? null,
        role: contact.role ?? null,
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt,
    };
}
