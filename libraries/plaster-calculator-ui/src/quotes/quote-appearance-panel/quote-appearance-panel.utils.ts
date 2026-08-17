import {
    resolveQuoteAppearance,
    type QuoteAppearance,
} from "@libraries/plaster-calculator-common";

import type { QuoteDetailDocumentLineItem } from "../quote-detail-document/index.ts";

import type {
    QuoteAppearanceAccentColorSwatch,
    QuoteAppearanceFormValues,
} from "./quote-appearance-panel.types.ts";

/**
 * The only accent colours a team can choose (see `QuoteAppearanceFormValues.accentColor`'s
 * doc comment): an arbitrary colour picker would let a team pick a shade
 * that prints badly (too light to photocopy, illegible against white paper)
 * or simply reads as unbranded noise, so the choice is a short, curated list
 * instead. Each entry reuses one of `Avatar`'s nine built-in `AvatarColor`
 * tones (`@libraries/uikit-web`) -- the closest thing this workspace has to
 * a design-system colour scale -- restricted to the subset that reads as
 * professional/trade-appropriate on a printed quote; the brighter
 * `AvatarColor` tones (`pink`, `purple`) are left out as too playful for a
 * building-trade document. `value` is that tone's exact Tailwind 500-shade
 * hex so the swatch a user clicks is pixel-identical to
 * `QuoteDetailDocumentLetterhead`'s printed divider colour.
 */

/**
 * The default swatch a team with no `accentColor` saved yet starts from
 * (see `quoteAppearanceToFormValues()` below) -- kept as its own named
 * constant, rather than indexing `QUOTE_APPEARANCE_ACCENT_COLOR_SWATCHES[0]`,
 * so its value's type doesn't depend on this workspace's `noUncheckedIndexedAccess`
 * setting treating an array index as possibly `undefined`.
 */
const DEFAULT_ACCENT_COLOR_SWATCH: QuoteAppearanceAccentColorSwatch = {
    value: "#6b7280",
    avatarColor: "gray",
};

export const QUOTE_APPEARANCE_ACCENT_COLOR_SWATCHES: readonly QuoteAppearanceAccentColorSwatch[] =
    [
        DEFAULT_ACCENT_COLOR_SWATCH,
        { value: "#3b82f6", avatarColor: "blue" },
        { value: "#22c55e", avatarColor: "green" },
        { value: "#6366f1", avatarColor: "indigo" },
        { value: "#f59e0b", avatarColor: "amber" },
        { value: "#f97316", avatarColor: "orange" },
        { value: "#ef4444", avatarColor: "red" },
    ];

/**
 * Converts a loaded `QuoteAppearance` into this form's editable shape (see
 * `QuoteAppearanceFormValues`'s doc comment for the nullable-to-`""`
 * substitution). An unset `accentColor` (a team that has never opened this
 * panel) defaults to the first swatch rather than leaving the picker with no
 * selection -- every team gets a deliberately-chosen accent on their first
 * save instead of a document that renders with no accent at all.
 */
export function quoteAppearanceToFormValues(
    appearance: QuoteAppearance,
): QuoteAppearanceFormValues {
    return {
        businessName: appearance.businessName ?? "",
        abn: appearance.abn ?? "",
        licenceNumber: appearance.licenceNumber ?? "",
        address: appearance.address ?? "",
        phoneNumber: appearance.phoneNumber ?? "",
        email: appearance.email ?? "",
        accentColor:
            appearance.accentColor ?? DEFAULT_ACCENT_COLOR_SWATCH.value,
        pricingDetail: appearance.pricingDetail,
        showScopeOfWork: appearance.showScopeOfWork,
        showTakeoffSummary: appearance.showTakeoffSummary,
        showSignatureBlock: appearance.showSignatureBlock,
        validForDays: appearance.validForDays,
        terms: appearance.terms ?? "",
    };
}

/**
 * Converts this form's values back into a `useQuoteAppearance().save()`
 * payload, restoring `""` text fields to `null` -- the "not filled in yet"
 * value `QuoteAppearanceSchema` (`@libraries/plaster-calculator-common`)
 * expects, matching `resolveQuoteAppearance()`'s own contract. `terms` is
 * the one text field left as `""` rather than `null` on purpose: an empty
 * terms block is meant to omit the terms section, not merely be "not filled
 * in", per `DEFAULT_QUOTE_APPEARANCE`'s doc comment.
 */
export function buildQuoteAppearanceSavePayload(
    values: QuoteAppearanceFormValues,
): Partial<QuoteAppearance> {
    return {
        businessName: toNullable(values.businessName),
        abn: toNullable(values.abn),
        licenceNumber: toNullable(values.licenceNumber),
        address: toNullable(values.address),
        phoneNumber: toNullable(values.phoneNumber),
        email: toNullable(values.email),
        accentColor: toNullable(values.accentColor),
        pricingDetail: values.pricingDetail,
        showScopeOfWork: values.showScopeOfWork,
        showTakeoffSummary: values.showTakeoffSummary,
        showSignatureBlock: values.showSignatureBlock,
        validForDays: values.validForDays,
        terms: values.terms,
    };
}

function toNullable(value: string): string | null {
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
}

/**
 * Projects the in-progress form values (plus the current logo preview URL)
 * straight into a `QuoteAppearance` for the live preview, without going
 * through a save -- `resolveQuoteAppearance()` fills in `logoStoragePath`
 * (not part of this form; see `QuoteAppearanceFormValues`'s doc comment) so
 * the result always satisfies `QuoteDetailDocumentProps.appearance`.
 */
export function previewAppearanceFromFormValues(
    values: QuoteAppearanceFormValues,
): QuoteAppearance {
    return resolveQuoteAppearance(buildQuoteAppearanceSavePayload(values));
}

/**
 * Fixed sample line items for the live preview -- authored once here rather
 * than reusing `apps/storybook-web`'s quote-detail-document stubs, since
 * this library must not depend on the Storybook app. A small mix of
 * measured and manually-entered items so every pricing-detail level and the
 * take-off summary sample below have something realistic to describe.
 */
export const QUOTE_APPEARANCE_PANEL_SAMPLE_LINE_ITEMS: readonly QuoteDetailDocumentLineItem[] =
    [
        {
            id: "sample-line-1",
            name: "10mm Plasterboard — walls",
            quantity: 128,
            unit: "m²",
            unitPriceCents: 1250,
            quantitySource: {
                measurementSource: "PLASTERBOARD_AREA",
                measurementPlasterType: "10mm Plasterboard",
            },
        },
        {
            id: "sample-line-2",
            name: "10mm Plasterboard — ceilings",
            quantity: 84,
            unit: "m²",
            unitPriceCents: 1350,
            quantitySource: {
                measurementSource: "PLASTERBOARD_AREA",
                measurementPlasterType: "10mm Plasterboard",
            },
        },
        {
            id: "sample-line-3",
            name: "90mm cove cornice",
            quantity: 52,
            unit: "m",
            unitPriceCents: 450,
            quantitySource: {
                measurementSource: "CORNICE_LENGTH",
                measurementPlasterType: null,
            },
        },
        {
            id: "sample-line-4",
            name: "Access scaffolding",
            quantity: 1,
            unit: "ea",
            unitPriceCents: 45000,
            quantitySource: null,
        },
    ];

/** Sample recipient details for the live preview -- never sent, so an obviously fictional project reads better than a blank field. */
export const QUOTE_APPEARANCE_PANEL_SAMPLE_REFERENCE = "Q-1024";
export const QUOTE_APPEARANCE_PANEL_SAMPLE_PROJECT_NAME =
    "Sample Renovation Project";
export const QUOTE_APPEARANCE_PANEL_SAMPLE_COMPANY_NAME = "Sample Builders Co.";
/**
 * Fixed rather than `new Date().toISOString()` -- a live preview that
 * re-derives "now" on every render would shift the printed "Valid until"
 * date as the user types, which has nothing to do with the setting they're
 * adjusting.
 */
export const QUOTE_APPEARANCE_PANEL_SAMPLE_ISSUED_AT = new Date(
    Date.UTC(2026, 0, 15),
).toISOString();

export const QUOTE_APPEARANCE_PANEL_SAMPLE_SCOPE_OF_WORK_TEXT =
    "Supply and install 10mm plasterboard to all internal walls and ceilings as per plan, including 90mm cove cornice throughout.";

export const QUOTE_APPEARANCE_PANEL_SAMPLE_TAKEOFF_SUMMARY_TEXT =
    "Wall area: 128 m² · Ceiling area: 84 m² · Cornice: 52 m linear.";
