import type { QuoteAppearance } from "@libraries/plaster-calculator-common";
import { Box, Paragraph, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteDetailDocument } from "../quote-detail-document/index.ts";

import {
    QUOTE_APPEARANCE_PANEL_SAMPLE_COMPANY_NAME,
    QUOTE_APPEARANCE_PANEL_SAMPLE_ISSUED_AT,
    QUOTE_APPEARANCE_PANEL_SAMPLE_LINE_ITEMS,
    QUOTE_APPEARANCE_PANEL_SAMPLE_PROJECT_NAME,
    QUOTE_APPEARANCE_PANEL_SAMPLE_REFERENCE,
    QUOTE_APPEARANCE_PANEL_SAMPLE_SCOPE_OF_WORK_TEXT,
    QUOTE_APPEARANCE_PANEL_SAMPLE_TAKEOFF_SUMMARY_TEXT,
} from "./quote-appearance-panel.utils.ts";

export type QuoteAppearancePreviewProps = {
    /**
     * Derived from the panel's in-progress form values on every render (see
     * `previewAppearanceFromFormValues()`, `quote-appearance-panel.utils.ts`)
     * -- never `useQuoteAppearance()`'s last-saved `appearance` -- so every
     * control's effect on the printed document is visible before saving.
     */
    readonly appearance: QuoteAppearance;
    /** The logo preview URL a fresh upload resolved this session, if any -- see `QuoteAppearanceLogoField`'s doc comment. */
    readonly logoUrl: string | null;
};

/**
 * The live preview column: the real `QuoteDetailDocument` (WORK-204) against
 * fixed sample line items authored for this panel
 * (`QUOTE_APPEARANCE_PANEL_SAMPLE_LINE_ITEMS`) -- reusing the actual printed
 * component is the point, so this preview can never drift from what a real
 * quote renders.
 */
export function QuoteAppearancePreview({
    appearance,
    logoUrl,
}: QuoteAppearancePreviewProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Box direction="column" gap="sm">
            <Text size="lg" weight="semibold">
                {t("quoteAppearancePanel.previewTitle")}
            </Text>
            <Paragraph textSize="sm" variant="muted">
                {t("quoteAppearancePanel.previewDescription")}
            </Paragraph>
            <QuoteDetailDocument
                reference={QUOTE_APPEARANCE_PANEL_SAMPLE_REFERENCE}
                projectName={QUOTE_APPEARANCE_PANEL_SAMPLE_PROJECT_NAME}
                companyName={QUOTE_APPEARANCE_PANEL_SAMPLE_COMPANY_NAME}
                issuedAt={QUOTE_APPEARANCE_PANEL_SAMPLE_ISSUED_AT}
                lineItems={QUOTE_APPEARANCE_PANEL_SAMPLE_LINE_ITEMS}
                appearance={appearance}
                logoUrl={logoUrl}
                scopeOfWorkText={
                    QUOTE_APPEARANCE_PANEL_SAMPLE_SCOPE_OF_WORK_TEXT
                }
                takeoffSummaryText={
                    QUOTE_APPEARANCE_PANEL_SAMPLE_TAKEOFF_SUMMARY_TEXT
                }
            />
        </Box>
    );
}
