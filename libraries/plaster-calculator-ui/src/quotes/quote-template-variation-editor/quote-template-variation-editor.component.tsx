"use client";

import {
    Box,
    Button,
    Paragraph,
    Text,
    useNotificationsManager,
} from "@libraries/uikit-web";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteTemplateDeleteDialog } from "../quote-template-panel/quote-template-delete-dialog.component.tsx";
import { QuoteTemplateNameDialog } from "../quote-template-panel/quote-template-name-dialog.component.tsx";
import type {
    QuoteTemplate,
    QuoteTemplateItem,
} from "../quote-template-panel/quote-template-panel.types.ts";
import { useQuoteItemTemplates } from "../quote-template-panel/use-quote-item-templates.hook.ts";

import { QuoteTemplateVariationCompanyList } from "./quote-template-variation-company-list.component.tsx";
import type { QuoteTemplateVariationFormValues } from "./quote-template-variation-editor.types.ts";
import { QuoteTemplateVariationEditorUtils } from "./quote-template-variation-editor.utils.ts";
import { QuoteTemplateVariationForm } from "./quote-template-variation-form.component.tsx";
import { useQuoteTemplateVariationCompanies } from "./use-quote-template-variation-companies.hook.ts";
import { useSaveQuoteTemplateVariationPrices } from "./use-save-quote-template-variation-prices.hook.ts";

export type QuoteTemplateVariationEditorProps = {
    readonly variation: QuoteTemplate;
    /** The default template's own merged items (`defaultItems` + `customItems`), already loaded by `QuoteTemplatePanel` -- read here only for each item's current price, to compute this variation's per-row rate delta without a second fetch of the default's configs. */
    readonly defaultTemplateItems: readonly QuoteTemplateItem[];
    readonly isMutatingTemplateList: boolean;
    readonly onRenameTemplate: (id: string, name: string) => Promise<void>;
    readonly onDeleteTemplate: (id: string) => Promise<void>;
    /** Back to the default editor. Also called after this variation is deleted from within here. */
    readonly onClose: () => void;
};

type DialogState =
    | { readonly kind: "closed" }
    | { readonly kind: "rename" }
    | { readonly kind: "delete" };

/**
 * A variation: the default's item list at different prices, and nothing
 * else (WORK-195). Opened via `onOpenVariation`
 * (`quote-template-panel.component.tsx`'s `handleOpenVariation`), which
 * keeps a local "which variation is open" state and renders this in place
 * of the default editor -- there is no routing here, just panel
 * composition; WORK-196 wires real URLs later.
 *
 * Reuses the WORK-194 name/delete dialogs for this variation's own
 * rename/delete (the same dialogs `QuoteTemplateList` uses for every row),
 * and owns two things the default editor doesn't: a prices-only item table
 * (`QuoteTemplateVariationForm`) and the "Applies to" company list
 * (`QuoteTemplateVariationCompanyList`).
 */
export function QuoteTemplateVariationEditor({
    variation,
    defaultTemplateItems,
    isMutatingTemplateList,
    onRenameTemplate,
    onDeleteTemplate,
    onClose,
}: QuoteTemplateVariationEditorProps): ReactElement {
    const { t } = useQuotesTranslation();
    const { notify } = useNotificationsManager();
    const [dialog, setDialog] = useState<DialogState>({ kind: "closed" });

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
    const companies = useQuoteTemplateVariationCompanies(variation.id);

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
        () =>
            QuoteTemplateVariationEditorUtils.buildFormValues(
                items,
                defaultPriceByItemTemplateId,
            ),
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

    async function handleRename(name: string): Promise<void> {
        try {
            await onRenameTemplate(variation.id, name);
            setDialog({ kind: "closed" });
        } catch {
            notify({
                intent: "error",
                title: t("quoteTemplateList.renameErrorTitle"),
                description: t("quoteTemplateList.renameErrorDescription"),
            });
        }
    }

    async function handleDelete(): Promise<void> {
        try {
            await onDeleteTemplate(variation.id);
            setDialog({ kind: "closed" });
            onClose();
        } catch {
            notify({
                intent: "error",
                title: t("quoteTemplateList.deleteErrorTitle"),
                description: t("quoteTemplateList.deleteErrorDescription"),
            });
        }
    }

    return (
        <Box direction="column" gap="md">
            <Box direction="row" align="center" gap="sm">
                <Button
                    type="button"
                    variant="ghost"
                    icon={<ArrowLeft size={16} aria-hidden="true" />}
                    onClick={onClose}
                >
                    {t("quoteTemplateVariationEditor.backAction")}
                </Button>
                <Text size="lg" weight="semibold">
                    {variation.name}
                </Text>
                <Button
                    type="button"
                    variant="ghost"
                    icon={<Pencil size={16} aria-hidden="true" />}
                    label={t("quoteTemplateList.renameAction", {
                        name: variation.name,
                    })}
                    onClick={() => setDialog({ kind: "rename" })}
                />
                <Button
                    type="button"
                    variant="ghost"
                    icon={<Trash2 size={16} aria-hidden="true" />}
                    label={t("quoteTemplateList.deleteAction", {
                        name: variation.name,
                    })}
                    onClick={() => setDialog({ kind: "delete" })}
                />
            </Box>
            {isLoading ? (
                <Paragraph textSize="sm" variant="muted">
                    {t("quoteTemplatePanel.loading")}
                </Paragraph>
            ) : (
                <QuoteTemplateVariationForm
                    key={formItemKey}
                    formId="quote-template-variation-form"
                    initialValues={initialValues}
                    disabled={isSaving}
                    onCancel={onClose}
                    onSubmit={(values) => void handleSubmit(values)}
                />
            )}
            <QuoteTemplateVariationCompanyList
                variationName={variation.name}
                assignedCompanies={companies.assignedCompanies}
                candidateCompanies={companies.otherCompanies}
                isLoading={companies.isLoading}
                isMutating={companies.isMutating}
                onAssign={companies.assignCompany}
                onUnassign={companies.unassignCompany}
            />
            <QuoteTemplateNameDialog
                open={dialog.kind === "rename"}
                mode="rename"
                initialName={variation.name}
                isSaving={isMutatingTemplateList}
                onClose={() => setDialog({ kind: "closed" })}
                onSubmit={(name) => void handleRename(name)}
            />
            <QuoteTemplateDeleteDialog
                open={dialog.kind === "delete"}
                templateName={variation.name}
                isDeleting={isMutatingTemplateList}
                onClose={() => setDialog({ kind: "closed" })}
                onConfirm={() => void handleDelete()}
            />
        </Box>
    );
}
