import * as DataConnector from "@generated/data-connector-web";
import {
    CompanyContactSchema,
    CompanyDetailSchema,
    CompanySummarySchema,
} from "@libraries/plaster-calculator-common";
import { QueryFetchPolicy, type DataConnect } from "firebase/data-connect";

import { FirebaseService } from "../firebase/firebase.service.ts";

import type {
    CompanyContact,
    CompanyContactPayload,
    CompanyDetail,
    CompanyPayload,
    CompanySummary,
} from "./companies.types.ts";

type CompanyRow = DataConnector.ListMyCompaniesData["companies"][number];
type CompanyDetailRow = NonNullable<DataConnector.GetMyCompanyData["company"]>;
type CompanyContactRow = CompanyDetailRow["contacts"][number];

export class CompaniesService {
    public constructor(
        private readonly dataConnect: DataConnect = FirebaseService.getDataConnect(
            DataConnector.connectorConfig,
        ),
    ) {}

    public async listCompanies(): Promise<CompanySummary[]> {
        const result = await DataConnector.listMyCompanies(
            this.dataConnect,
            {},
            { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
        );
        return result.data.companies.map((company) =>
            this.toCompanySummary(company),
        );
    }

    public async getCompany(companyId: string): Promise<CompanyDetail> {
        const result = await DataConnector.getMyCompany(this.dataConnect, {
            id: companyId,
        });
        if (!result.data.company) {
            throw new Error("Company was not found.");
        }
        return this.toCompanyDetail(result.data.company);
    }

    public async listCompanyContactsByCompanyId(
        companyId: string,
    ): Promise<CompanyContact[]> {
        const result = await DataConnector.listMyCompanyContacts(
            this.dataConnect,
            { companyId },
        );
        return result.data.companyContacts.map((contact) =>
            this.toCompanyContact(contact),
        );
    }

    public async createCompany(
        payload: CompanyPayload & { companyName: string },
    ): Promise<CompanyDetail> {
        const companyId = crypto.randomUUID();
        await DataConnector.createMyCompany(this.dataConnect, {
            id: companyId,
            companyName: payload.companyName,
            businessNumber: payload.businessNumber,
            phoneNumber: payload.phoneNumber,
        });
        return this.getCompany(companyId);
    }

    public async updateCompany(
        companyId: string,
        payload: CompanyPayload & { primaryContactId?: string | null },
    ): Promise<CompanyDetail> {
        const company = await this.getCompany(companyId);

        if (
            payload.primaryContactId !== undefined &&
            payload.primaryContactId !== company.primaryContactId
        ) {
            if (payload.primaryContactId === null) {
                await DataConnector.clearMyCompanyPrimaryContact(
                    this.dataConnect,
                    { companyId },
                );
            } else {
                await DataConnector.setMyCompanyPrimaryContact(
                    this.dataConnect,
                    { companyId, contactId: payload.primaryContactId },
                );
            }
        }

        await DataConnector.updateMyCompany(this.dataConnect, {
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
        return this.getCompany(companyId);
    }

    public async deleteCompany(companyId: string): Promise<void> {
        await DataConnector.deleteMyCompany(this.dataConnect, {
            id: companyId,
        });
    }

    public async createCompanyContact(
        companyId: string,
        payload: CompanyContactPayload & { name: string },
    ): Promise<CompanyDetail> {
        const contactId = crypto.randomUUID();
        await DataConnector.createMyCompanyContact(this.dataConnect, {
            id: contactId,
            companyId,
            name: payload.name,
            email: payload.email,
            phoneNumber: payload.phoneNumber,
            role: payload.role,
        });
        if (payload.makePrimary === true) {
            await DataConnector.setMyCompanyPrimaryContact(this.dataConnect, {
                companyId,
                contactId,
            });
        }
        return this.getCompany(companyId);
    }

    public async updateCompanyContact(
        companyId: string,
        contactId: string,
        payload: CompanyContactPayload,
    ): Promise<CompanyDetail> {
        const company = await this.getCompany(companyId);
        const contact = company.contacts.find((item) => item.id === contactId);
        if (!contact) {
            throw new Error("Contact was not found.");
        }

        await DataConnector.updateMyCompanyContact(this.dataConnect, {
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
        return this.getCompany(companyId);
    }

    public async deleteCompanyContact(
        companyId: string,
        contactId: string,
    ): Promise<CompanyDetail> {
        await DataConnector.deleteMyCompanyContact(this.dataConnect, {
            companyId,
            contactId,
        });
        return this.getCompany(companyId);
    }

    public async setPrimaryCompanyContact(
        companyId: string,
        contactId: string,
    ): Promise<CompanyDetail> {
        await DataConnector.setMyCompanyPrimaryContact(this.dataConnect, {
            companyId,
            contactId,
        });
        return this.getCompany(companyId);
    }

    /**
     * Assigns a `QuoteTemplate` variation to price this company's projects
     * (WORK-190/WORK-193), via `AssignQuoteTemplateToCompany`. Re-reads the
     * company afterwards, matching every other write method on this
     * service, so the returned `CompanyDetail.quoteTemplateId`/
     * `quoteTemplateName` reflect the new assignment rather than a stale
     * pre-write snapshot.
     */
    public async assignQuoteTemplate(
        companyId: string,
        quoteTemplateId: string,
    ): Promise<CompanyDetail> {
        await DataConnector.assignQuoteTemplateToCompany(this.dataConnect, {
            companyId,
            quoteTemplateId,
        });
        return this.getCompany(companyId);
    }

    /**
     * Clears this company's `QuoteTemplate` assignment via
     * `ClearCompanyQuoteTemplate`, so its projects fall back to the team's
     * default template. Matches `clearMyCompanyPrimaryContact`'s
     * re-read-after-write pattern above.
     */
    public async clearQuoteTemplate(companyId: string): Promise<CompanyDetail> {
        await DataConnector.clearCompanyQuoteTemplate(this.dataConnect, {
            companyId,
        });
        return this.getCompany(companyId);
    }

    private toCompanySummary(company: CompanyRow): CompanySummary {
        return {
            ...CompanySummarySchema.parse({
                id: company.id,
                teamId: company.teamId,
                companyName: company.companyName,
                businessNumber: company.businessNumber ?? null,
                phoneNumber: company.phoneNumber ?? null,
                primaryContactId: company.primaryContactId ?? null,
                createdAt: company.createdAt,
                updatedAt: company.updatedAt,
            }),
            quoteTemplateId: company.quoteTemplateId ?? null,
            quoteTemplateName: company.quoteTemplate?.name ?? null,
        };
    }

    private toCompanyDetail(company: CompanyDetailRow): CompanyDetail {
        return {
            ...CompanyDetailSchema.parse({
                ...this.toCompanySummary(company),
                contacts: company.contacts.map((contact) =>
                    this.toCompanyContact(contact),
                ),
            }),
            quoteTemplateId: company.quoteTemplateId ?? null,
            quoteTemplateName: company.quoteTemplate?.name ?? null,
        };
    }

    private toCompanyContact(contact: CompanyContactRow): CompanyContact {
        return CompanyContactSchema.parse({
            id: contact.id,
            companyId: contact.companyId,
            name: contact.name,
            email: contact.email ?? null,
            phoneNumber: contact.phoneNumber ?? null,
            role: contact.role ?? null,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
        });
    }
}
