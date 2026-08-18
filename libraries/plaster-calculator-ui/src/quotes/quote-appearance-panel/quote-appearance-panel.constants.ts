/**
 * DOM id of `QuoteAppearancePanel`'s `<form>`. Shared with
 * `QuoteAppearanceSaveButton`, which submits this form via the native
 * `form` attribute from outside it (a page header action, not a descendant
 * of the `<form>` element) -- kept in its own file, rather than exported
 * from `quote-appearance-panel.component.tsx`, so importing it doesn't
 * pull in that component and its own dependency graph.
 */
export const QUOTE_APPEARANCE_FORM_ID = "quote-appearance-form";
