import {
    Box,
    Card,
    Divider,
    FormLayoutField,
    Input,
    Paragraph,
    Textarea,
} from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QuoteAppearanceCaption } from "./quote-appearance-caption.component.tsx";
import type { QuoteAppearanceFormValues } from "./quote-appearance-panel.types.ts";

export type QuoteAppearanceTermsSectionProps = {
    readonly values: QuoteAppearanceFormValues;
    readonly disabled: boolean;
    readonly onChange: (patch: Partial<QuoteAppearanceFormValues>) => void;
};

/**
 * `QuoteAppearancePanel`'s "Terms & footer" card: the validity period and
 * terms text printed at the bottom of every quote. Split out purely to keep
 * the panel itself under this workspace's `max-lines` limit -- see
 * `QuoteAppearanceLetterheadSection`'s doc comment for the same note.
 */
export function QuoteAppearanceTermsSection({
    values,
    disabled,
    onChange,
}: QuoteAppearanceTermsSectionProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Card>
            <Card.Title>
                {t("quoteAppearancePanel.termsSectionTitle")}
            </Card.Title>
            <Paragraph textSize="sm" variant="muted">
                {t("quoteAppearancePanel.termsSectionDescription")}
            </Paragraph>
            <Divider />
            <Box direction="column" gap="lg">
                <FormLayoutField
                    label={
                        <QuoteAppearanceCaption>
                            {t("quoteAppearancePanel.validForDaysLabel")}
                        </QuoteAppearanceCaption>
                    }
                    htmlFor="quote-appearance-valid-for-days"
                >
                    <Input
                        id="quote-appearance-valid-for-days"
                        type="number"
                        inputMode="numeric"
                        min={1}
                        disabled={disabled}
                        value={values.validForDays}
                        trailingAddon={t(
                            "quoteAppearancePanel.validForDaysSuffix",
                        )}
                        onChange={(event) =>
                            onChange({
                                validForDays: Number(event.target.value),
                            })
                        }
                    />
                </FormLayoutField>
                <FormLayoutField
                    label={
                        <QuoteAppearanceCaption>
                            {t("quoteAppearancePanel.termsLabel")}
                        </QuoteAppearanceCaption>
                    }
                    htmlFor="quote-appearance-terms"
                >
                    <Textarea
                        id="quote-appearance-terms"
                        rows={4}
                        placeholder={t("quoteAppearancePanel.termsPlaceholder")}
                        disabled={disabled}
                        value={values.terms}
                        onChange={(event) =>
                            onChange({ terms: event.target.value })
                        }
                    />
                </FormLayoutField>
            </Box>
        </Card>
    );
}
