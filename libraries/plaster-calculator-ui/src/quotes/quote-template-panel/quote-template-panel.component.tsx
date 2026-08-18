"use client";

import { Box, Paragraph, useNotificationsManager } from "@libraries/uikit-web";
import { useCallback, useState } from "react";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteTemplateForm } from "../quote-template-form/index.ts";
import type {
    QuoteItemSystemKey,
    QuoteTemplateFormValues,
} from "../quote-template-form/index.ts";
import {
    QuoteTemplateVariationEditor,
    useQuoteTemplateVariationCompanies,
} from "../quote-template-variation-editor/index.ts";

import { QuoteTemplateAddedItemNotice } from "./quote-template-added-item-notice.component.tsx";
import { QuoteTemplateCardGrid } from "./quote-template-card-grid.component.tsx";
import { QuoteTemplateDetailCard } from "./quote-template-detail-card.component.tsx";
import type { QuoteTemplateDetailCardProps } from "./quote-template-detail-card.component.tsx";
import type {
    QuoteTemplate,
    QuoteTemplateItem,
} from "./quote-template-panel.types.ts";
import { useActiveQuoteTemplate } from "./use-active-quote-template.hook.ts";
import { useOpenQuoteTemplate } from "./use-open-quote-template.hook.ts";
import { useQuoteItemTemplates } from "./use-quote-item-templates.hook.ts";
import { useQuoteTemplateCompanyAssignments } from "./use-quote-template-company-assignments.hook.ts";
import { useQuoteTemplateList } from "./use-quote-template-list.hook.ts";
import { useQuoteTemplateRateSummaries } from "./use-quote-template-rate-summaries.hook.ts";
import { useSaveQuoteTemplate } from "./use-save-quote-template.hook.ts";

function templateIdOr<T>(
    template: QuoteTemplate | null,
    fallback: T,
): string | T {
    return template === null ? fallback : template.id;
}

export type QuoteTemplatePanelProps = {
    readonly onCancel: () => void;
    /**
     * Opens this variation's editor as soon as the panel mounts, instead of
     * starting on the default's editor -- the hook an app layer uses to
     * make a variation's URL actually open that variation (WORK-196), e.g.
     * `/quotes/template/[templateId]` reloading straight into it. Read only
     * once, as the initial value of `useOpenQuoteTemplate`'s internal
     * state: an app layer that needs this to take effect again after the
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
     * back to the default's -- clicking the default's own card, a delete,
     * or the defensive backstop in `useOpenQuoteTemplate` -- so an app
     * layer reflecting `onOpenVariation` in the URL can navigate back out
     * of it too (WORK-196), keeping the URL in sync even when the panel
     * closes a variation on its own rather than through a card click.
     */
    readonly onCloseVariation?: () => void;
};

/**
 * A connected panel hosting the team's template card grid (default +
 * variations) and the currently-open template's own detail card and item
 * editor. The item list -- names, units, keywords, include rules, add/remove
 * -- has exactly one home: the default, edited here. Everything a variation
 * is allowed to do (WORK-195) is defined by what this screen owns.
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
    const quoteTemplateId = templateIdOr(activeTemplate, null);
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
        setAsDefault,
    } = useQuoteTemplateList(quoteTemplateId, allDefaultTemplateItems);
    const { rateByTemplateId } = useQuoteTemplateRateSummaries(templates);
    const {
        companiesByTemplateId,
        unassignedCompanies,
        isLoading: isLoadingCompanyAssignments,
    } = useQuoteTemplateCompanyAssignments();
    const { notify } = useNotificationsManager();
    const [addedItemNames, setAddedItemNames] = useState<readonly string[]>([]);

    const {
        openTemplate,
        openVariation,
        onOpenTemplate,
        onOpenVariation: handleOpenVariation,
        onRenameOpenTemplate,
        onSetOpenTemplateAsDefault,
        onDeleteOpenTemplate,
    } = useOpenQuoteTemplate({
        templates,
        activeTemplate,
        initialOpenVariationId,
        onOpenVariation,
        onCloseVariation,
        renameTemplate,
        setAsDefault,
        deleteTemplate,
    });
    const variationCompanies = useQuoteTemplateVariationCompanies(
        templateIdOr(openVariation, ""),
    );

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

    const variations = templates.filter((template) => !template.isDefault);
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
        <Box direction="column" gap="lg">
            <QuoteTemplateCardGrid
                templates={templates}
                openTemplateId={templateIdOr(openTemplate, null)}
                isMutating={isMutatingTemplateList}
                companiesByTemplateId={companiesByTemplateId}
                unassignedCompanyCount={unassignedCompanies.length}
                rateByTemplateId={rateByTemplateId}
                onOpenTemplate={onOpenTemplate}
                onCreateVariation={createVariation}
            />
            {addedItemNames.length > 0 && (
                <QuoteTemplateAddedItemNotice
                    itemNames={addedItemNames}
                    variations={variations}
                    onOpenVariation={handleOpenVariation}
                    onDismiss={() => setAddedItemNames([])}
                />
            )}
            <QuoteTemplateOpenTemplateDetail
                openTemplate={openTemplate}
                isLoadingTemplateList={isLoadingTemplateList}
                isLoadingDefaultCompanies={isLoadingCompanyAssignments}
                isMutatingTemplateList={isMutatingTemplateList}
                onRename={onRenameOpenTemplate}
                onSetAsDefault={onSetOpenTemplateAsDefault}
                onDelete={onDeleteOpenTemplate}
                unassignedCompanies={unassignedCompanies}
                assignedCompanies={variationCompanies.assignedCompanies}
                candidateCompanies={variationCompanies.otherCompanies}
                isLoadingVariationCompanies={variationCompanies.isLoading}
                isMutatingCompanies={variationCompanies.isMutating}
                onAssignCompany={variationCompanies.assignCompany}
                onUnassignCompany={variationCompanies.unassignCompany}
            />
            <QuoteTemplateOpenTemplateItems
                openVariation={openVariation}
                defaultTemplateItems={allDefaultTemplateItems}
                isLoadingTemplate={isLoadingTemplate}
                isLoadingItems={isLoadingItems}
                quoteTemplateId={quoteTemplateId}
                formItemKey={formItemKey}
                initialValues={initialValues}
                isSaving={isSaving}
                onCancel={onCancel}
                onSubmit={handleSubmit}
            />
        </Box>
    );
}

type QuoteTemplateOpenTemplateDetailProps = {
    readonly openTemplate: QuoteTemplate | null;
    readonly isLoadingTemplateList: boolean;
    /** Loading state of the *default's* fallback company list -- used only when `openTemplate` is the default. */
    readonly isLoadingDefaultCompanies: boolean;
    /** Loading state of the *open variation's* company list -- used only when `openTemplate` is a variation. */
    readonly isLoadingVariationCompanies: boolean;
} & Omit<QuoteTemplateDetailCardProps, "template" | "isLoadingCompanies">;

/** Loading fallback vs. `QuoteTemplateDetailCard`, factored out to keep `QuoteTemplatePanel`'s own complexity within this workspace's ESLint limit. */
function QuoteTemplateOpenTemplateDetail({
    openTemplate,
    isLoadingTemplateList,
    isLoadingDefaultCompanies,
    isLoadingVariationCompanies,
    ...detailCardProps
}: QuoteTemplateOpenTemplateDetailProps): ReactElement {
    const { t } = useQuotesTranslation();

    if (isLoadingTemplateList || openTemplate === null) {
        return (
            <Paragraph textSize="sm" variant="muted">
                {t("quoteTemplatePanel.loading")}
            </Paragraph>
        );
    }

    return (
        <QuoteTemplateDetailCard
            key={openTemplate.id}
            template={openTemplate}
            isLoadingCompanies={
                openTemplate.isDefault
                    ? isLoadingDefaultCompanies
                    : isLoadingVariationCompanies
            }
            {...detailCardProps}
        />
    );
}

type QuoteTemplateOpenTemplateItemsProps = {
    readonly openVariation: QuoteTemplate | null;
    readonly defaultTemplateItems: readonly QuoteTemplateItem[];
    readonly isLoadingTemplate: boolean;
    readonly isLoadingItems: boolean;
    readonly quoteTemplateId: string | null;
    readonly formItemKey: string;
    readonly initialValues: QuoteTemplateFormValues;
    readonly isSaving: boolean;
    readonly onCancel: () => void;
    readonly onSubmit: (values: QuoteTemplateFormValues) => void;
};

/** The open template's item editor -- a variation's prices-only form, or the default's full form -- factored out for the same reason as `QuoteTemplateOpenTemplateDetail`. */
function QuoteTemplateOpenTemplateItems({
    openVariation,
    defaultTemplateItems,
    isLoadingTemplate,
    isLoadingItems,
    quoteTemplateId,
    formItemKey,
    initialValues,
    isSaving,
    onCancel,
    onSubmit,
}: QuoteTemplateOpenTemplateItemsProps): ReactElement {
    const { t } = useQuotesTranslation();

    if (openVariation !== null) {
        return (
            <QuoteTemplateVariationEditor
                variation={openVariation}
                defaultTemplateItems={defaultTemplateItems}
                onCancel={onCancel}
            />
        );
    }
    if (isLoadingTemplate || isLoadingItems || quoteTemplateId === null) {
        return (
            <Paragraph textSize="sm" variant="muted">
                {t("quoteTemplatePanel.loading")}
            </Paragraph>
        );
    }
    return (
        <QuoteTemplateForm
            key={formItemKey}
            formId="quote-template-form"
            initialValues={initialValues}
            disabled={isSaving}
            onCancel={onCancel}
            onSubmit={onSubmit}
        />
    );
}
