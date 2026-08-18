"use client";

import { useQuoteAppearanceSaving } from "@libraries/plaster-calculator-web-core";
import { Button } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QUOTE_APPEARANCE_FORM_ID } from "./quote-appearance-panel.constants.ts";

/**
 * Submits `QuoteAppearancePanel`'s form from the host page's header
 * actions -- a sibling of that `<form>`, not a descendant of it, wired
 * together only through `form={QUOTE_APPEARANCE_FORM_ID}` (the native
 * mechanism for a button outside a `<form>` to submit it) and the shared
 * `useQuoteAppearanceSaving()` mutation-key observer, since this button's
 * own `useQuoteAppearance()` call would otherwise have no way to see a
 * save the panel's own hook instance triggered (see that hook's doc
 * comment). Renders unconditionally -- the host page decides where it
 * lives -- so it disables itself while a save is pending rather than the
 * page needing to know that state itself.
 */
export function QuoteAppearanceSaveButton(): ReactElement {
    const { t } = useQuotesTranslation();
    const saving = useQuoteAppearanceSaving();

    return (
        <Button type="submit" form={QUOTE_APPEARANCE_FORM_ID} disabled={saving}>
            {saving
                ? t("quoteAppearancePanel.saving")
                : t("quoteAppearancePanel.saveButton")}
        </Button>
    );
}
