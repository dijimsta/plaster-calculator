"use client";

import { Paragraph, useNotificationsManager } from "@libraries/uikit-web";
import { useCallback, useMemo } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import type {
    QuoteTemplate,
    QuoteTemplateItem,
} from "../quote-template-panel/quote-template-panel.types.ts";
import { useQuoteItemTemplates } from "../quote-template-panel/use-quote-item-templates.hook.ts";

import type { QuoteTemplateVariationFormValues } from "./quote-template-variation-editor.types.ts";
import { buildFormValues } from "./quote-template-variation-editor.utils.ts";
import { QuoteTemplateVariationForm } from "./quote-template-variation-form.component.tsx";
import { useSaveQuoteTemplateVariationPrices } from "./use-save-quote-template-variation-prices.hook.ts";

export type QuoteTemplateVariationEditorProps = {
    readonly variation: QuoteTemplate;
    /** The default template's own merged items (`defaultItems` + `customItems`), already loaded by `QuoteTemplatePanel` -- read here only for each item's current price, to compute this variation's per-row rate delta without a second fetch of the default's configs. */
    readonly defaultTemplateItems: readonly QuoteTemplateItem[];
    readonly onCancel: () => void;
};

/**
 * A variation's own item prices -- the default's item list at different
 * prices, and nothing else (WORK-195). Name, default status, delete, and
 * "Applies to" companies now live in `QuoteTemplateDetailCard`
 * (`quote-template-panel/`), shared with the default's own editor; this
 * component owns only the prices-only item form (`QuoteTemplateVariationForm`).
 */
export function QuoteTemplateVariationEditor({
    variation,
    defaultTemplateItems,
    onCancel,
}: QuoteTemplateVariationEditorProps): ReactElement {
    const { t } = useQuotesTranslation();
    const { notify } = useNotificationsManager();

    const { defaultItems, customItems, isLoading } = useQuoteItemTemplates(
        variation.id,
    );
    const items = useMemo(
        () => [...defaultItems, ...customItems],
        [defaultItems, customItems],
    );
    const { save, isSaving } = useSaveQuoteTemplateVariationPrices(
        variation.id,
        items,
    );

    const defaultPriceByItemTemplateId = useMemo(
        () =>
            new Map(
                defaultTemplateItems.map((item) => [
                    item.itemTemplateId,
                    item.unitPriceCents,
                ]),
            ),
        [defaultTemplateItems],
    );
    const initialValues = useMemo(
        () => buildFormValues(items, defaultPriceByItemTemplateId),
        [items, defaultPriceByItemTemplateId],
    );
    const formItemKey = [
        variation.id,
        ...items.map((item) => item.itemTemplateId),
    ].join(":");

    const handleSubmit = useCallback(
        async (values: QuoteTemplateVariationFormValues): Promise<void> => {
            try {
                await save(values);
                notify({
                    intent: "success",
                    title: t("quoteTemplateVariationEditor.saveSuccessTitle"),
                    description: t(
                        "quoteTemplateVariationEditor.saveSuccessDescription",
                    ),
                });
            } catch {
                notify({
                    intent: "error",
                    title: t("quoteTemplateVariationEditor.saveErrorTitle"),
                    description: t(
                        "quoteTemplateVariationEditor.saveErrorDescription",
                    ),
                });
            }
        },
        [notify, save, t],
    );

    if (isLoading) {
        return (
            <Paragraph textSize="sm" variant="muted">
                {t("quoteTemplatePanel.loading")}
            </Paragraph>
        );
    }

    return (
        <QuoteTemplateVariationForm
            key={formItemKey}
            formId="quote-template-variation-form"
            initialValues={initialValues}
            disabled={isSaving}
            onCancel={onCancel}
            onSubmit={(values) => void handleSubmit(values)}
        />
    );
}
