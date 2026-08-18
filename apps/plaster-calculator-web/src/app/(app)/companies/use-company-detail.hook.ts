"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import {
    useCompanyRateItemSummaries,
    type CompanyPricingCardTemplate,
    type CompanyRateItemSummary,
} from "@libraries/plaster-calculator-ui";
import {
    FirebaseService,
    useCompaniesService,
    useProjectsService,
} from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useEffect, useState } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";
import type { CompanyDetail, ProjectSummary } from "../../../types.js";

import type { CompanyDetailDraft } from "./company.types.js";
import {
    isCompanyDetailDraftChanged,
    optionalValue,
    toCompanyDetailDraft,
} from "./company.utils.js";
import {
    useCompanyContacts,
    type UseCompanyContactsResult,
} from "./use-company-contacts.hook.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

export type UseCompanyDetailResult = UseCompanyContactsResult & {
    readonly company: CompanyDetail | null;
    readonly draft: CompanyDetailDraft | null;
    readonly projects: readonly ProjectSummary[];
    readonly templates: readonly CompanyPricingCardTemplate[];
    readonly rateItems: readonly CompanyRateItemSummary[];
    readonly hasCompanyChanges: boolean;
    readonly editRatesHref: string;
    readonly isLoading: boolean;
    readonly isSavingPricing: boolean;
    readonly busyMessage: string;
    readonly message: string;
    readonly setDraft: (draft: CompanyDetailDraft) => void;
    readonly refresh: () => void;
    readonly saveCompany: () => void;
    readonly removeCompany: () => void;
    readonly changeQuoteTemplate: (templateId: string | null) => void;
};

/** Owns every stateful concern of the company detail page, so `CompanyDetailView` stays a thin rendering shell. */
export function useCompanyDetail(
    companyId: string,
    onCompanyDeleted: () => void,
): UseCompanyDetailResult {
    const companiesService = useCompaniesService();
    const projectsService = useProjectsService();
    const { notify } = useNotificationsManager();
    const { t } = useAppTranslation();
    const { data: templatesData } =
        DataConnectorReact.useListQuoteTemplatesForTeam(dataConnect);
    const [company, setCompany] = useState<CompanyDetail | null>(null);
    const { items: rateItems } = useCompanyRateItemSummaries(
        company?.quoteTemplateId ?? null,
    );
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
    const [draft, setDraft] = useState<CompanyDetailDraft | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSavingPricing, setIsSavingPricing] = useState(false);
    const [busyMessage, setBusyMessage] = useState("");
    const [message, setMessage] = useState("");

    function updateCompanyState(updated: CompanyDetail): void {
        setCompany(updated);
        setDraft(toCompanyDetailDraft(updated));
    }

    const contacts = useCompanyContacts({
        companyId,
        contacts: company?.contacts ?? [],
        onCompanyUpdated: updateCompanyState,
        setBusyMessage,
        setMessage,
    });

    useEffect(() => {
        void load();
    }, [companyId, companiesService, projectsService]);

    async function load(): Promise<void> {
        setIsLoading(true);
        setMessage("");
        try {
            const [nextCompany, nextProjects] = await Promise.all([
                companiesService.getCompany(companyId),
                projectsService.listProjectsByCompany(companyId),
            ]);
            setCompany(nextCompany);
            setDraft(toCompanyDetailDraft(nextCompany));
            setProjects(nextProjects);
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : t("companies.detail.unableToLoad"),
            );
        } finally {
            setIsLoading(false);
        }
    }

    async function saveCompany(): Promise<void> {
        if (!draft) return;
        const companyName = draft.companyName.trim();
        if (!companyName) return;
        try {
            const updated = await companiesService.updateCompany(companyId, {
                companyName,
                businessNumber: optionalValue(draft.businessNumber),
                phoneNumber: optionalValue(draft.phoneNumber),
                primaryContactId: optionalValue(draft.primaryContactId),
            });
            updateCompanyState(updated);
        } catch (error) {
            setMessage(errorMessage(error, t("companies.detail.unableToSave")));
        }
    }

    async function changeQuoteTemplate(
        nextTemplateId: string | null,
    ): Promise<void> {
        if (!company || nextTemplateId === company.quoteTemplateId) return;
        setIsSavingPricing(true);
        try {
            const updated =
                nextTemplateId === null
                    ? await companiesService.clearQuoteTemplate(company.id)
                    : await companiesService.assignQuoteTemplate(
                          company.id,
                          nextTemplateId,
                      );
            updateCompanyState(updated);
            notify({
                intent: "success",
                title:
                    nextTemplateId === null
                        ? t("companies.pricingPanel.clearedNotification")
                        : t("companies.pricingPanel.assignedNotification"),
            });
        } catch (error) {
            notify({
                intent: "error",
                title: t("companies.pricingPanel.unableToSave"),
                description: error instanceof Error ? error.message : undefined,
            });
        } finally {
            setIsSavingPricing(false);
        }
    }

    async function removeCompany(): Promise<void> {
        if (!company) return;
        if (projects.length > 0) {
            window.alert(t("companies.detail.linkedProjectsWarning"));
            return;
        }
        const confirmed = window.confirm(
            t("companies.detail.deleteCompanyConfirmation", {
                name: company.companyName,
            }),
        );
        if (!confirmed) return;
        setBusyMessage(t("companies.detail.deletingCompany"));
        try {
            await companiesService.deleteCompany(company.id);
            onCompanyDeleted();
        } catch (error) {
            setBusyMessage("");
            setMessage(
                errorMessage(
                    error,
                    t("companies.detail.unableToDeleteCompany"),
                ),
            );
        }
    }

    return {
        ...contacts,
        company,
        draft,
        projects,
        templates: templatesData?.quoteTemplates ?? [],
        rateItems,
        hasCompanyChanges: resolveHasCompanyChanges(company, draft),
        editRatesHref: resolveEditRatesHref(company?.quoteTemplateId ?? null),
        isLoading,
        isSavingPricing,
        busyMessage,
        message,
        setDraft,
        refresh: () => void load(),
        saveCompany: () => void saveCompany(),
        removeCompany: () => void removeCompany(),
        changeQuoteTemplate: (templateId) =>
            void changeQuoteTemplate(templateId),
    };
}

function resolveHasCompanyChanges(
    company: CompanyDetail | null,
    draft: CompanyDetailDraft | null,
): boolean {
    if (company === null || draft === null) return false;
    return isCompanyDetailDraftChanged(company, draft);
}

function resolveEditRatesHref(quoteTemplateId: string | null): string {
    return quoteTemplateId
        ? `/quotes/template/${quoteTemplateId}`
        : "/quotes/template";
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}
