"use client";

import { Card, Paragraph, useNotificationsManager } from "@libraries/uikit-web";
import { useCallback } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteTemplateForm } from "../quote-template-form/index.ts";
import type {
    QuoteItemSystemKey,
    QuoteTemplateFormValues,
} from "../quote-template-form/index.ts";

import { useActiveQuoteTemplate } from "./use-active-quote-template.hook.ts";
import { useQuoteItemTemplates } from "./use-quote-item-templates.hook.ts";
import { useSaveQuoteTemplate } from "./use-save-quote-template.hook.ts";

export type QuoteTemplatePanelProps = {
    readonly onCancel: () => void;
};

/** A connected panel that loads, edits, and saves the team's quote template. */
export function QuoteTemplatePanel({
    onCancel,
}: QuoteTemplatePanelProps): ReactElement {
    const { t } = useQuotesTranslation();
    const { activeTemplate, isLoading: isLoadingTemplate } =
        useActiveQuoteTemplate();
    const quoteTemplateId = activeTemplate?.id ?? null;
    const {
        defaultItems,
        customItems,
        isLoading: isLoadingItems,
    } = useQuoteItemTemplates(quoteTemplateId);
    const { save, isSaving } = useSaveQuoteTemplate(
        quoteTemplateId,
        defaultItems,
        customItems,
    );
    const { notify } = useNotificationsManager();

    const handleSubmit = useCallback(
        async (values: QuoteTemplateFormValues): Promise<void> => {
            try {
                await save(values);
                notify({
                    intent: "success",
                    title: t("quoteTemplatePanel.saveSuccessTitle"),
                    description: t("quoteTemplatePanel.saveSuccessDescription"),
                });
            } catch {
                notify({
                    intent: "error",
                    title: t("quoteTemplatePanel.saveErrorTitle"),
                    description: t("quoteTemplatePanel.saveErrorDescription"),
                });
            }
        },
        [notify, save, t],
    );

    const isLoading =
        isLoadingTemplate || isLoadingItems || quoteTemplateId === null;

    const initialValues: QuoteTemplateFormValues = {
        defaultItems: defaultItems.map((item) => ({
            itemTemplateId: item.itemTemplateId,
            systemKey: (item.systemKey ?? "") as QuoteItemSystemKey,
            name: item.name,
            unit: item.unit ?? "m²",
            unitPriceCents: item.unitPriceCents,
        })),
        customItems: customItems.map((item) => ({
            itemTemplateId: item.itemTemplateId,
            name: item.name,
            unit: item.unit ?? "",
            hasKeywords: item.hasKeywords,
            enabled: item.enabled,
            keywords: item.keywords,
            unitPriceCents: item.unitPriceCents,
        })),
    };
    const formItemKey = [
        quoteTemplateId,
        ...[...defaultItems, ...customItems].map((item) => item.itemTemplateId),
    ].join(":");

    return (
        <Card>
            <Card.Title>{t("quoteTemplatePanel.title")}</Card.Title>
            <Paragraph measure="narrow" textSize="sm" variant="muted">
                {t("quoteTemplatePanel.description")}
            </Paragraph>
            {isLoading ? (
                <Paragraph textSize="sm" variant="muted">
                    {t("quoteTemplatePanel.loading")}
                </Paragraph>
            ) : (
                <QuoteTemplateForm
                    key={formItemKey}
                    formId="quote-template-form"
                    initialValues={initialValues}
                    disabled={isSaving}
                    onCancel={onCancel}
                    onSubmit={handleSubmit}
                />
            )}
        </Card>
    );
}
