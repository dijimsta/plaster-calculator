"use client";

import { useQuoteAppearance } from "@libraries/plaster-calculator-web-core";
import {
    Button,
    Card,
    FormLayout,
    FormLayoutActions,
    Grid,
    Paragraph,
    useNotificationsManager,
} from "@libraries/uikit-web";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QuoteAppearanceBuilderSection } from "./quote-appearance-builder-section.component.tsx";
import { QuoteAppearanceLetterheadSection } from "./quote-appearance-letterhead-section.component.tsx";
import type { QuoteAppearanceFormValues } from "./quote-appearance-panel.types.ts";
import {
    buildQuoteAppearanceSavePayload,
    previewAppearanceFromFormValues,
    quoteAppearanceToFormValues,
} from "./quote-appearance-panel.utils.ts";
import { QuoteAppearancePreview } from "./quote-appearance-preview.component.tsx";
import { QuoteAppearanceTermsSection } from "./quote-appearance-terms-section.component.tsx";

const FORM_ID = "quote-appearance-form";

/**
 * The team's quote appearance settings: letterhead, logo, accent colour,
 * what a builder sees on a generated quote, and terms/footer -- settings
 * from a single team-wide `QuoteAppearance` row (WORK-200), never per-quote
 * (this panel's copy is deliberately silent on ever changing pricing detail
 * for one quote before sending; see `PCPD-26`). Settings live on the left
 * (`QuoteAppearanceLetterheadSection`/`QuoteAppearanceBuilderSection`/
 * `QuoteAppearanceTermsSection` -- split into their own components purely to
 * keep this file under this workspace's `max-lines` limit, not because they
 * own any state); a live preview (`QuoteAppearancePreview`) lives on the
 * right, re-rendered from this panel's own in-progress form values on every
 * change -- never from what `useQuoteAppearance()` last saved -- so every
 * control's effect on the printed document is visible before saving.
 *
 * Owns its form state as plain local state (`QuoteAppearanceFormValues`)
 * rather than `react-hook-form` (used elsewhere in this package, e.g.
 * `QuoteTemplateForm`): the preview needs every keystroke's current value
 * synchronously, and this form has no dynamic field arrays to justify
 * `react-hook-form`'s extra machinery. Holds no GraphQL queries of its own
 * -- `useQuoteAppearance()` (WORK-203) is this panel's only data dependency,
 * for both reading and saving.
 */
export function QuoteAppearancePanel(): ReactElement {
    const { t } = useQuotesTranslation();
    const { notify } = useNotificationsManager();
    const {
        appearance,
        loading,
        saving,
        save,
        uploadingLogo,
        uploadLogo,
        removeLogo,
    } = useQuoteAppearance();

    const [values, setValues] = useState<QuoteAppearanceFormValues | null>(
        null,
    );
    // A logo uploaded *this session* -- the only logo state this panel can
    // actually render a preview for (see `QuoteAppearanceLogoField`'s doc
    // comment). Independent of `values`: the logo persists itself
    // immediately through `uploadLogo`/`removeLogo` rather than travelling
    // through this form's own save payload.
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    // Seeds `values` from the loaded `appearance` exactly once. A plain
    // `useEffect` keyed on `appearance` would re-seed (and silently discard
    // in-progress edits to every other field) whenever `appearance` is
    // refetched for an unrelated reason -- e.g. `uploadLogo`'s own
    // query-cache invalidation (`use-quote-appearance.hook.ts`).
    const hasInitializedValues = useRef(false);

    useEffect(() => {
        if (appearance && !hasInitializedValues.current) {
            setValues(quoteAppearanceToFormValues(appearance));
            hasInitializedValues.current = true;
        }
    }, [appearance]);

    function updateValues(patch: Partial<QuoteAppearanceFormValues>): void {
        setValues((current) => (current ? { ...current, ...patch } : current));
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();
        if (!values) {
            return;
        }
        try {
            await save(buildQuoteAppearanceSavePayload(values));
            notify({
                intent: "success",
                title: t("quoteAppearancePanel.saveSuccessTitle"),
                description: t("quoteAppearancePanel.saveSuccessDescription"),
            });
        } catch {
            notify({
                intent: "error",
                title: t("quoteAppearancePanel.saveErrorTitle"),
                description: t("quoteAppearancePanel.saveErrorDescription"),
            });
        }
    }

    async function handleUploadLogo(file: File): Promise<void> {
        try {
            setLogoUrl(await uploadLogo(file));
        } catch {
            notify({
                intent: "error",
                title: t("quoteAppearancePanel.logoUploadErrorTitle"),
                description: t(
                    "quoteAppearancePanel.logoUploadErrorDescription",
                ),
            });
        }
    }

    async function handleRemoveLogo(): Promise<void> {
        try {
            await removeLogo();
            setLogoUrl(null);
        } catch {
            notify({
                intent: "error",
                title: t("quoteAppearancePanel.logoRemoveErrorTitle"),
                description: t(
                    "quoteAppearancePanel.logoRemoveErrorDescription",
                ),
            });
        }
    }

    const disabled = saving;

    return (
        <Card>
            <Card.Title>{t("quoteAppearancePanel.title")}</Card.Title>
            <Paragraph measure="narrow" textSize="sm" variant="muted">
                {t("quoteAppearancePanel.description")}
            </Paragraph>
            {loading || !values ? (
                <Paragraph textSize="sm" variant="muted">
                    {t("quoteAppearancePanel.loading")}
                </Paragraph>
            ) : (
                <Grid columns={{ xs: 1, lg: 2 }}>
                    <FormLayout id={FORM_ID} onSubmit={handleSubmit}>
                        <QuoteAppearanceLetterheadSection
                            values={values}
                            disabled={disabled}
                            onChange={updateValues}
                            logoUrl={logoUrl}
                            hasSavedLogo={Boolean(appearance?.logoStoragePath)}
                            uploadingLogo={uploadingLogo}
                            onUploadLogo={handleUploadLogo}
                            onRemoveLogo={handleRemoveLogo}
                        />
                        <QuoteAppearanceBuilderSection
                            values={values}
                            disabled={disabled}
                            onChange={updateValues}
                        />
                        <QuoteAppearanceTermsSection
                            values={values}
                            disabled={disabled}
                            onChange={updateValues}
                        />
                        <FormLayoutActions>
                            <Button type="submit" disabled={disabled}>
                                {saving
                                    ? t("quoteAppearancePanel.saving")
                                    : t("quoteAppearancePanel.saveButton")}
                            </Button>
                        </FormLayoutActions>
                    </FormLayout>
                    <QuoteAppearancePreview
                        appearance={previewAppearanceFromFormValues(values)}
                        logoUrl={logoUrl}
                    />
                </Grid>
            )}
        </Card>
    );
}
