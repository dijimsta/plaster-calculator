"use client";

import { useCallback, useEffect, useState } from "react";

import type { QuoteTemplate } from "./quote-template-panel.types.ts";

export type UseOpenQuoteTemplateOptions = {
    readonly templates: readonly QuoteTemplate[];
    readonly activeTemplate: QuoteTemplate | null;
    readonly initialOpenVariationId: string | null;
    readonly onOpenVariation?: (variationId: string) => void;
    readonly onCloseVariation?: () => void;
    readonly renameTemplate: (id: string, name: string) => Promise<void>;
    readonly setAsDefault: (id: string) => Promise<void>;
    readonly deleteTemplate: (id: string) => Promise<void>;
};

export type UseOpenQuoteTemplateResult = {
    /** The currently-open template: a variation, or the default once one isn't. */
    readonly openTemplate: QuoteTemplate | null;
    /** Non-null only when the open template is a variation (not the default). */
    readonly openVariation: QuoteTemplate | null;
    /** Opens a card grid template: the default routes back to `onCloseVariation`, any other template opens as a variation. */
    readonly onOpenTemplate: (templateId: string) => void;
    readonly onOpenVariation: (variationId: string) => void;
    readonly onRenameOpenTemplate: (name: string) => Promise<void>;
    readonly onSetOpenTemplateAsDefault: () => Promise<void>;
    readonly onDeleteOpenTemplate: () => Promise<void>;
};

/**
 * Which template `QuoteTemplatePanel` currently shows the detail card and
 * item editor for, and the actions that change it (open, rename, set as
 * default, delete) -- split out of the panel itself to keep its own
 * complexity within this workspace's ESLint limit; see
 * `docs/typescript-guidelines.md`.
 */
export function useOpenQuoteTemplate({
    templates,
    activeTemplate,
    initialOpenVariationId,
    onOpenVariation: notifyOpenVariation,
    onCloseVariation,
    renameTemplate,
    setAsDefault,
    deleteTemplate,
}: UseOpenQuoteTemplateOptions): UseOpenQuoteTemplateResult {
    const [openVariationId, setOpenVariationId] = useState<string | null>(
        initialOpenVariationId,
    );
    const openVariation =
        templates.find((template) => template.id === openVariationId) ?? null;
    const openTemplate = openVariation ?? activeTemplate;

    const onOpenVariation = useCallback(
        (variationId: string): void => {
            setOpenVariationId(variationId);
            notifyOpenVariation?.(variationId);
        },
        [notifyOpenVariation],
    );
    const closeVariation = useCallback((): void => {
        setOpenVariationId(null);
        onCloseVariation?.();
    }, [onCloseVariation]);

    // Defensive backstop for a variation that stops existing while open --
    // e.g. its own delete action, which also routes through
    // `closeVariation` directly, but this covers any other path (a stale
    // tab, a future bulk-delete) that refreshes `templates` without going
    // through this hook's own close handler.
    useEffect(() => {
        if (
            openVariationId !== null &&
            !templates.some((template) => template.id === openVariationId)
        ) {
            closeVariation();
        }
    }, [templates, openVariationId, closeVariation]);

    const onOpenTemplate = useCallback(
        (templateId: string): void => {
            if (templateId === activeTemplate?.id) {
                closeVariation();
                return;
            }
            onOpenVariation(templateId);
        },
        [activeTemplate, closeVariation, onOpenVariation],
    );

    const onRenameOpenTemplate = useCallback(
        async (name: string): Promise<void> => {
            if (openTemplate === null) return;
            await renameTemplate(openTemplate.id, name);
        },
        [openTemplate, renameTemplate],
    );

    const onSetOpenTemplateAsDefault = useCallback(async (): Promise<void> => {
        if (openTemplate === null) return;
        await setAsDefault(openTemplate.id);
    }, [openTemplate, setAsDefault]);

    const onDeleteOpenTemplate = useCallback(async (): Promise<void> => {
        if (openTemplate === null) return;
        await deleteTemplate(openTemplate.id);
        closeVariation();
    }, [openTemplate, deleteTemplate, closeVariation]);

    return {
        openTemplate,
        openVariation,
        onOpenTemplate,
        onOpenVariation,
        onRenameOpenTemplate,
        onSetOpenTemplateAsDefault,
        onDeleteOpenTemplate,
    };
}
