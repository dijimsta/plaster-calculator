import type { QuotePricingDetail } from "@libraries/plaster-calculator-common";
import {
    FormLayoutField,
    FormLayoutSection,
    Toggle,
} from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import type { QuoteAppearanceFormValues } from "./quote-appearance-panel.types.ts";
import { QuoteAppearancePricingDetailField } from "./quote-appearance-pricing-detail-field.component.tsx";

export type QuoteAppearanceBuilderSectionProps = {
    readonly values: QuoteAppearanceFormValues;
    readonly disabled: boolean;
    readonly onChange: (patch: Partial<QuoteAppearanceFormValues>) => void;
};

/**
 * `QuoteAppearancePanel`'s "what the builder sees" section: the pricing
 * detail level (mutually exclusive, see `QuoteAppearancePricingDetailField`)
 * plus the independent scope-of-work/take-off-summary/signature-block
 * toggles. Split out purely to keep the panel itself under this workspace's
 * `max-lines` limit -- see `QuoteAppearanceLetterheadSection`'s doc comment
 * for the same note, which applies here too.
 */
export function QuoteAppearanceBuilderSection({
    values,
    disabled,
    onChange,
}: QuoteAppearanceBuilderSectionProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <FormLayoutSection
            title={t("quoteAppearancePanel.builderSectionTitle")}
            description={t("quoteAppearancePanel.builderSectionDescription")}
        >
            <FormLayoutField label="" span="full">
                <QuoteAppearancePricingDetailField
                    value={values.pricingDetail}
                    disabled={disabled}
                    onChange={(pricingDetail: QuotePricingDetail) =>
                        onChange({ pricingDetail })
                    }
                />
            </FormLayoutField>
            <FormLayoutField
                label={t("quoteAppearancePanel.showScopeOfWorkLabel")}
                description={t(
                    "quoteAppearancePanel.showScopeOfWorkDescription",
                )}
                htmlFor="quote-appearance-show-scope-of-work"
            >
                <Toggle
                    id="quote-appearance-show-scope-of-work"
                    disabled={disabled}
                    checked={values.showScopeOfWork}
                    onChange={(event) =>
                        onChange({ showScopeOfWork: event.target.checked })
                    }
                />
            </FormLayoutField>
            <FormLayoutField
                label={t("quoteAppearancePanel.showTakeoffSummaryLabel")}
                description={t(
                    "quoteAppearancePanel.showTakeoffSummaryDescription",
                )}
                htmlFor="quote-appearance-show-takeoff-summary"
            >
                <Toggle
                    id="quote-appearance-show-takeoff-summary"
                    disabled={disabled}
                    checked={values.showTakeoffSummary}
                    onChange={(event) =>
                        onChange({
                            showTakeoffSummary: event.target.checked,
                        })
                    }
                />
            </FormLayoutField>
            <FormLayoutField
                label={t("quoteAppearancePanel.showSignatureBlockLabel")}
                description={t(
                    "quoteAppearancePanel.showSignatureBlockDescription",
                )}
                htmlFor="quote-appearance-show-signature-block"
            >
                <Toggle
                    id="quote-appearance-show-signature-block"
                    disabled={disabled}
                    checked={values.showSignatureBlock}
                    onChange={(event) =>
                        onChange({
                            showSignatureBlock: event.target.checked,
                        })
                    }
                />
            </FormLayoutField>
        </FormLayoutSection>
    );
}
