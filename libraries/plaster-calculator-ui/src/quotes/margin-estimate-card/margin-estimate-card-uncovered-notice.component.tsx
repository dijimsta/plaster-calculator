"use client";

import { Alert, Box, Button, Paragraph } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import type { MarginEstimateCardLine } from "./margin-estimate-card.types.ts";

export type MarginEstimateCardUncoveredNoticeProps = {
    /**
     * Lines with no estimate from the selected supplier. Always non-empty
     * -- `MarginEstimateCard` omits this notice entirely otherwise.
     */
    readonly uncoveredLines: readonly MarginEstimateCardLine[];
    readonly onPriceUncoveredLines: () => void;
};

/**
 * Names every uncovered line so a user knows what's still missing from the
 * selected supplier's pricing, with a "Price them" action the host page
 * wires to that supplier's estimate editor (`onPriceUncoveredLines` --
 * this component owns no routing itself, see `MarginEstimateCard`'s doc
 * comment). Structured like `QuoteTemplateAddedItemNotice`
 * (`../quote-template-panel/quote-template-added-item-notice.component.tsx`):
 * an `Alert` with a titled count, a description naming the specifics, and
 * an action button in its body.
 */
export function MarginEstimateCardUncoveredNotice({
    uncoveredLines,
    onPriceUncoveredLines,
}: MarginEstimateCardUncoveredNoticeProps): ReactElement {
    const { t } = useQuotesTranslation();
    const names = uncoveredLines.map((line) => line.name).join(", ");

    return (
        <Alert
            intent="warn"
            title={t("marginEstimateCard.uncoveredNoticeTitle", {
                count: uncoveredLines.length,
            })}
        >
            <Paragraph textSize="sm">
                {t("marginEstimateCard.uncoveredNoticeDescription", { names })}
            </Paragraph>
            <Box direction="row" gap="xs" wrap>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onPriceUncoveredLines}
                >
                    {t("marginEstimateCard.priceThemAction")}
                </Button>
            </Box>
        </Alert>
    );
}
