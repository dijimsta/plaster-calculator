import type { QuotePricingDetail } from "@libraries/plaster-calculator-common";
import { Box, Card, Divider, Paragraph } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QuoteAppearanceCheckboxField } from "./quote-appearance-checkbox-field.component.tsx";
import type { QuoteAppearanceFormValues } from "./quote-appearance-panel.types.ts";
import { QuoteAppearancePricingDetailField } from "./quote-appearance-pricing-detail-field.component.tsx";

export type QuoteAppearanceBuilderSectionProps = {
    readonly values: QuoteAppearanceFormValues;
    readonly disabled: boolean;
    readonly onChange: (patch: Partial<QuoteAppearanceFormValues>) => void;
};

/**
 * `QuoteAppearancePanel`'s "What the builder sees" card: the pricing detail
 * level (mutually exclusive, see `QuoteAppearancePricingDetailField`) plus
 * the independent scope-of-work/take-off-summary/signature-block
 * checkboxes. Split out purely to keep the panel itself under this
 * workspace's `max-lines` limit -- see `QuoteAppearanceLetterheadSection`'s
 * doc comment for the same note, which applies here too.
 */
export function QuoteAppearanceBuilderSection({
    values,
    disabled,
    onChange,
}: QuoteAppearanceBuilderSectionProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Card>
            <Card.Title>
                {t("quoteAppearancePanel.builderSectionTitle")}
            </Card.Title>
            <Paragraph textSize="sm" variant="muted">
                {t("quoteAppearancePanel.builderSectionDescription")}
            </Paragraph>
            <Divider />
            <Box direction="column" gap="lg">
                <QuoteAppearancePricingDetailField
                    value={values.pricingDetail}
                    disabled={disabled}
                    onChange={(pricingDetail: QuotePricingDetail) =>
                        onChange({ pricingDetail })
                    }
                />
                <Divider />
                <Box direction="column" gap="md">
                    <QuoteAppearanceCheckboxField
                        id="quote-appearance-show-scope-of-work"
                        label={t("quoteAppearancePanel.showScopeOfWorkLabel")}
                        description={t(
                            "quoteAppearancePanel.showScopeOfWorkDescription",
                        )}
                        disabled={disabled}
                        checked={values.showScopeOfWork}
                        onChange={(event) =>
                            onChange({
                                showScopeOfWork: event.target.checked,
                            })
                        }
                    />
                    <QuoteAppearanceCheckboxField
                        id="quote-appearance-show-takeoff-summary"
                        label={t(
                            "quoteAppearancePanel.showTakeoffSummaryLabel",
                        )}
                        description={t(
                            "quoteAppearancePanel.showTakeoffSummaryDescription",
                        )}
                        disabled={disabled}
                        checked={values.showTakeoffSummary}
                        onChange={(event) =>
                            onChange({
                                showTakeoffSummary: event.target.checked,
                            })
                        }
                    />
                    <QuoteAppearanceCheckboxField
                        id="quote-appearance-show-signature-block"
                        label={t(
                            "quoteAppearancePanel.showSignatureBlockLabel",
                        )}
                        description={t(
                            "quoteAppearancePanel.showSignatureBlockDescription",
                        )}
                        disabled={disabled}
                        checked={values.showSignatureBlock}
                        onChange={(event) =>
                            onChange({
                                showSignatureBlock: event.target.checked,
                            })
                        }
                    />
                </Box>
            </Box>
        </Card>
    );
}
