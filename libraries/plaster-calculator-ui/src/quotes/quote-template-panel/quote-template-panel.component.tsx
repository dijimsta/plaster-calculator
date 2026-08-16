"use client";

import {
    Card,
    Paragraph,
    Text,
    useNotificationsManager,
} from "@libraries/uikit-web";
import { useCallback, useEffect, useState } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteTemplateForm } from "../quote-template-form/index.ts";
import type {
    QuoteItemSystemKey,
    QuoteTemplateFormValues,
} from "../quote-template-form/index.ts";
import { QuoteTemplateVariationEditor } from "../quote-template-variation-editor/index.ts";

import { QuoteTemplateAddedItemNotice } from "./quote-template-added-item-notice.component.tsx";
import { QuoteTemplateList } from "./quote-template-list.component.tsx";
import { useActiveQuoteTemplate } from "./use-active-quote-template.hook.ts";
import { useQuoteItemTemplates } from "./use-quote-item-templates.hook.ts";
import { useQuoteTemplateList } from "./use-quote-template-list.hook.ts";
import { useSaveQuoteTemplate } from "./use-save-quote-template.hook.ts";

export type QuoteTemplatePanelProps = {
    readonly onCancel: () => void;
    /**
     * Opens this variation's editor as soon as the panel mounts, instead of
     * starting on the default's editor -- the hook an app layer uses to
     * make a variation's URL actually open that variation (WORK-196), e.g.
     * `/quotes/template/[templateId]` reloading straight into it. Read only
     * once, as the initial value of the internal `openVariationId` state
     * below: an app layer that needs this to take effect again after the
     * panel is already mounted (e.g. the URL's id changing) should remount
     * the panel (a `key` keyed on the id), the same way `initialValues`
     * props elsewhere in this panel are refreshed via `key`.
     */
    readonly initialOpenVariationId?: string | null;
    /**
     * Notified whenever this panel switches to showing a variation's editor
     * (WORK-195) -- an optional hook for an app layer that wants to react,
     * e.g. reflect the open variation in the URL (WORK-196). The panel
     * manages "which variation is open" itself either way: every "open a
     * variation" action works whether or not this is supplied.
     */
    readonly onOpenVariation?: (variationId: string) => void;
    /**
     * Notified whenever this panel switches away from a variation's editor
     * back to the default's -- the explicit close action, a delete, or the
     * defensive backstop below -- so an app layer reflecting
     * `onOpenVariation` in the URL can navigate back out of it too
     * (WORK-196), keeping the URL in sync even when the panel closes a
     * variation on its own rather than through a list click.
     */
    readonly onCloseVariation?: () => void;
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
    initialOpenVariationId = null,
    onOpenVariation,
    onCloseVariation,
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
    const [openVariationId, setOpenVariationId] = useState<string | null>(
        initialOpenVariationId,
    );
    const openVariation =
        templates.find((template) => template.id === openVariationId) ?? null;

    const handleOpenVariation = useCallback(
        (variationId: string): void => {
            setOpenVariationId(variationId);
            onOpenVariation?.(variationId);
        },
        [onOpenVariation],
    );
    const handleCloseVariation = useCallback((): void => {
        setOpenVariationId(null);
        onCloseVariation?.();
    }, [onCloseVariation]);

    // Defensive backstop for a variation that stops existing while open --
    // e.g. its own delete action, which also calls `onClose` directly, but
    // this covers any other path (a stale tab, a future bulk-delete) that
    // refreshes `templates` without going through this panel's own close
    // handler. Routed through `handleCloseVariation` (rather than setting
    // state directly) so `onCloseVariation` still fires here too.
    useEffect(() => {
        if (
            openVariationId !== null &&
            !templates.some((template) => template.id === openVariationId)
        ) {
            handleCloseVariation();
        }
    }, [templates, openVariationId, handleCloseVariation]);

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
                onOpenVariation={handleOpenVariation}
            />
            {addedItemNames.length > 0 && (
                <QuoteTemplateAddedItemNotice
                    itemNames={addedItemNames}
                    variations={variations}
                    onOpenVariation={handleOpenVariation}
                    onDismiss={() => setAddedItemNames([])}
                />
            )}
            {openVariation !== null ? (
                <QuoteTemplateVariationEditor
                    variation={openVariation}
                    defaultTemplateItems={allDefaultTemplateItems}
                    isMutatingTemplateList={isMutatingTemplateList}
                    onRenameTemplate={renameTemplate}
                    onDeleteTemplate={deleteTemplate}
                    onClose={handleCloseVariation}
                />
            ) : (
                <>
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
                </>
            )}
        </Card>
    );
}
