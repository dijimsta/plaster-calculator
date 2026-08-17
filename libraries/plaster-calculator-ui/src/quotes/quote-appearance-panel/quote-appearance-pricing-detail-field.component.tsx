import {
    AMOUNTS_ONLY_PRICING_DETAIL,
    FULL_LINE_ITEMS_PRICING_DETAIL,
    LUMP_SUM_PRICING_DETAIL,
    type QuotePricingDetail,
} from "@libraries/plaster-calculator-common";
import { RadioGroup, RadioGroupOption } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

export type QuoteAppearancePricingDetailFieldProps = {
    readonly value: QuotePricingDetail;
    readonly disabled?: boolean;
    readonly onChange: (value: QuotePricingDetail) => void;
};

/**
 * The three mutually-exclusive pricing-detail levels a quote can render at
 * (WORK-202's closed `QuotePricingDetailSchema` union) -- exactly the levels
 * `QuoteDetailDocumentPricingTable` (`../quote-detail-document/index.ts`)
 * knows how to draw, so this picker can never select a level the printed
 * document doesn't support. Each option's `description` states the level's
 * consequence for the builder reading the quote in one line, per this
 * panel's copy constraint: what changes here is team-wide -- nothing here
 * implies a level can be swapped per quote before sending.
 */
export function QuoteAppearancePricingDetailField({
    value,
    disabled = false,
    onChange,
}: QuoteAppearancePricingDetailFieldProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <RadioGroup
            name="quote-appearance-pricing-detail"
            legend={t("quoteAppearancePanel.pricingDetailLegend")}
            description={t("quoteAppearancePanel.pricingDetailDescription")}
            disabled={disabled}
        >
            <RadioGroupOption
                value={FULL_LINE_ITEMS_PRICING_DETAIL}
                checked={value === FULL_LINE_ITEMS_PRICING_DETAIL}
                onChange={() => onChange(FULL_LINE_ITEMS_PRICING_DETAIL)}
                label={t(
                    "quoteAppearancePanel.pricingDetailFullLineItemsLabel",
                )}
                description={t(
                    "quoteAppearancePanel.pricingDetailFullLineItemsConsequence",
                )}
            />
            <RadioGroupOption
                value={AMOUNTS_ONLY_PRICING_DETAIL}
                checked={value === AMOUNTS_ONLY_PRICING_DETAIL}
                onChange={() => onChange(AMOUNTS_ONLY_PRICING_DETAIL)}
                label={t("quoteAppearancePanel.pricingDetailAmountsOnlyLabel")}
                description={t(
                    "quoteAppearancePanel.pricingDetailAmountsOnlyConsequence",
                )}
            />
            <RadioGroupOption
                value={LUMP_SUM_PRICING_DETAIL}
                checked={value === LUMP_SUM_PRICING_DETAIL}
                onChange={() => onChange(LUMP_SUM_PRICING_DETAIL)}
                label={t("quoteAppearancePanel.pricingDetailLumpSumLabel")}
                description={t(
                    "quoteAppearancePanel.pricingDetailLumpSumConsequence",
                )}
            />
        </RadioGroup>
    );
}
