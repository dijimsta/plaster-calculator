"use client";

import {
    Card,
    Paragraph,
    Text,
    useNotificationsManager,
} from "@libraries/uikit-web";
import { useCallback, useState } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteTemplateForm } from "../quote-template-form/index.ts";
import type {
    QuoteItemSystemKey,
    QuoteTemplateFormValues,
} from "../quote-template-form/index.ts";

import { QuoteTemplateAddedItemNotice } from "./quote-template-added-item-notice.component.tsx";
import { QuoteTemplateList } from "./quote-template-list.component.tsx";
import { useActiveQuoteTemplate } from "./use-active-quote-template.hook.ts";
import { useQuoteItemTemplates } from "./use-quote-item-templates.hook.ts";
import { useQuoteTemplateList } from "./use-quote-template-list.hook.ts";
import { useSaveQuoteTemplate } from "./use-save-quote-template.hook.ts";

export type QuoteTemplatePanelProps = {
    readonly onCancel: () => void;
    /** Undefined until a variation editor exists (WORK-195) -- every "open a variation" action in the template list and the added-item notice renders disabled rather than linking nowhere. */
    readonly onOpenVariation?: (variationId: string) => void;
};

/**
 * A connected panel hosting the team's template list (default + variations)
 * and the default template's own editor. The item list -- names, units,
 * keywords, include rules, add/remove -- has exactly one home: the default,
 * edited here. Everything a variation is allowed to do (WORK-195) is
 * defined by what this screen owns.
 */
export function QuoteTemplatePanel({
    onCancel,
    onOpenVariation,
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
    const allDefaultTemplateItems = [...defaultItems, ...customItems];
    const {
        templates,
        isLoading: isLoadingTemplateList,
        isMutating: isMutatingTemplateList,
        createVariation,
        renameTemplate,
        deleteTemplate,
    } = useQuoteTemplateList(quoteTemplateId, allDefaultTemplateItems);
    const variations = templates.filter((template) => !template.isDefault);
    const { notify } = useNotificationsManager();
    const [addedItemNames, setAddedItemNames] = useState<readonly string[]>([]);

    const handleSubmit = useCallback(
        async (values: QuoteTemplateFormValues): Promise<void> => {
            const newlyCreatedItemNames = values.customItems
                .filter((item) => item.itemTemplateId === undefined)
                .map((item) => item.name);
            try {
                await save(values);
                setAddedItemNames(newlyCreatedItemNames);
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
            // Surfaces the real (possibly missing) unit rather than
            // substituting "m²" for a null one, which would hide a template
            // item that isn't actually priceable per-unit yet -- see
            // `QuoteTemplateFormDefaultItemRow`, which renders this blank
            // value as "not set" rather than a false "m²".
            unit: item.unit ?? "",
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
            <QuoteTemplateList
                templates={templates}
                isLoading={isLoadingTemplateList}
                isMutating={isMutatingTemplateList}
                onCreateVariation={createVariation}
                onRenameTemplate={renameTemplate}
                onDeleteTemplate={deleteTemplate}
                onOpenVariation={onOpenVariation}
            />
            {addedItemNames.length > 0 && (
                <QuoteTemplateAddedItemNotice
                    itemNames={addedItemNames}
                    variations={variations}
                    onOpenVariation={onOpenVariation}
                    onDismiss={() => setAddedItemNames([])}
                />
            )}
            <Text size="lg" weight="semibold">
                {t("quoteTemplatePanel.defaultEditorTitle")}
            </Text>
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
