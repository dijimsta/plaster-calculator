import type { QuotePricingDetail } from "@libraries/plaster-calculator-common";
import type { AvatarColor } from "@libraries/uikit-web";

/**
 * Editable mirror of `QuoteAppearance` (WORK-202): every nullable text field
 * is surfaced as `""` rather than `null` so each can back a controlled
 * `Input`/`Textarea` without React's "switching from uncontrolled to
 * controlled" warning -- the same substitution `QuoteTemplateForm` makes for
 * a template item's `unit` (`quote-template-form.component.tsx`). Converted
 * back to `QuoteAppearance`'s nullable shape in
 * `quote-appearance-panel.utils.ts`'s `buildQuoteAppearanceSavePayload()`.
 * `logoStoragePath` is deliberately absent -- the logo uploads and removes
 * itself immediately through `useQuoteAppearance()`'s `uploadLogo`/`removeLogo`
 * (WORK-203), so it never travels through this form's own save payload.
 */
export type QuoteAppearanceFormValues = {
    readonly businessName: string;
    readonly abn: string;
    readonly licenceNumber: string;
    readonly address: string;
    readonly phoneNumber: string;
    readonly email: string;
    /** A hex value from `QUOTE_APPEARANCE_ACCENT_COLOR_SWATCHES` -- never a free-form colour. */
    readonly accentColor: string;
    readonly pricingDetail: QuotePricingDetail;
    readonly showScopeOfWork: boolean;
    readonly showTakeoffSummary: boolean;
    readonly showSignatureBlock: boolean;
    readonly validForDays: number;
    readonly terms: string;
};

/**
 * One entry in the fixed accent-colour swatch set (see
 * `QUOTE_APPEARANCE_ACCENT_COLOR_SWATCHES` in `quote-appearance-panel.utils.ts`
 * for why the set is closed rather than a free colour picker). `avatarColor`
 * drives the swatch's own visual preview through `Avatar`'s `color` prop
 * (`@libraries/uikit-web`) -- the library's only public API that renders a
 * flat colour swatch -- so the preview is composed entirely from public
 * UIKit props rather than a new className or inline style in this
 * (presentation-primitive-free) package. `value` is the literal hex string
 * saved as `QuoteAppearance.accentColor` and is chosen to match
 * `avatarColor`'s own Tailwind shade exactly, so the swatch a user clicks is
 * pixel-identical to the accent colour the printed document renders.
 */
export type QuoteAppearanceAccentColorSwatch = {
    readonly value: string;
    readonly avatarColor: AvatarColor;
};
