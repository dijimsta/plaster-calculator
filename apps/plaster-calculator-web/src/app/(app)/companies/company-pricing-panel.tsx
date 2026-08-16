"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import {
    FirebaseService,
    useCompaniesService,
} from "@libraries/plaster-calculator-web-core";
import {
    Label,
    SelectMenu,
    Text,
    useNotificationsManager,
} from "@libraries/uikit-web";
import { useState } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";
import { cx, ui } from "../../../lib/styles.js";
import type { CompanyDetail } from "../../../types.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

/** Sentinel `<select>` value for "clear the assignment / use the team's default template". */
const USE_DEFAULT_VALUE = "";

interface CompanyPricingPanelProps {
    readonly company: CompanyDetail;
    readonly onCompanyUpdated: (updated: CompanyDetail) => void;
}

/**
 * The other end of the quote template assignment (WORK-190/WORK-193/
 * WORK-195): which `QuoteTemplate` prices this company's quotes, set from
 * the company page itself rather than only from inside the template screens.
 * Changing the selection mutates immediately via `CompaniesService`'s
 * `assignQuoteTemplate()`/`clearQuoteTemplate()` (WORK-193) -- there is no
 * separate save step, matching how `CompanyProjectsPanel` reads its own data
 * independent of `CompanyDetailsPanel`'s draft/save flow. Picking the "uses
 * the default" option clears `Company.quoteTemplateId`, which is a normal,
 * unwarned choice -- it does not delete or disable anything.
 */
export function CompanyPricingPanel({
    company,
    onCompanyUpdated,
}: CompanyPricingPanelProps) {
    const { t } = useAppTranslation();
    const companiesService = useCompaniesService();
    const { notify } = useNotificationsManager();
    const [isSaving, setIsSaving] = useState(false);
    const { data, isLoading: isLoadingTemplates } =
        DataConnectorReact.useListQuoteTemplatesForTeam(dataConnect);
    const templates = data?.quoteTemplates ?? [];

    const selectedValue = company.quoteTemplateId ?? USE_DEFAULT_VALUE;
    const options = [
        {
            value: USE_DEFAULT_VALUE,
            label: t("companies.pricingPanel.useDefaultOption"),
        },
        ...templates.map((template) => ({
            value: template.id,
            label: template.isDefault
                ? t("companies.pricingPanel.defaultTemplateOption", {
                      name: template.name,
                  })
                : template.name,
        })),
    ];

    async function handleChange(nextTemplateId: string): Promise<void> {
        if (nextTemplateId === selectedValue) return;
        setIsSaving(true);
        try {
            const updated =
                nextTemplateId === USE_DEFAULT_VALUE
                    ? await companiesService.clearQuoteTemplate(company.id)
                    : await companiesService.assignQuoteTemplate(
                          company.id,
                          nextTemplateId,
                      );
            onCompanyUpdated(updated);
            notify({
                intent: "success",
                title:
                    nextTemplateId === USE_DEFAULT_VALUE
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
            setIsSaving(false);
        }
    }

    return (
        <section className={cx(ui.panel, ui.stack)}>
            <h2>{t("companies.pricingPanel.title")}</h2>
            <div className={ui.field}>
                <Label htmlFor="quote-template">
                    {t("companies.pricingPanel.fieldLabel")}
                </Label>
                <SelectMenu
                    id="quote-template"
                    value={selectedValue}
                    options={options}
                    disabled={isSaving || isLoadingTemplates}
                    onChange={(event) => void handleChange(event.target.value)}
                />
                <Text size="sm" variant="muted">
                    {company.quoteTemplateId === null
                        ? t("companies.pricingPanel.usesDefaultDescription")
                        : t("companies.pricingPanel.assignedDescription", {
                              name:
                                  company.quoteTemplateName ??
                                  t(
                                      "companies.pricingPanel.unnamedTemplateFallback",
                                  ),
                          })}
                </Text>
            </div>
        </section>
    );
}
