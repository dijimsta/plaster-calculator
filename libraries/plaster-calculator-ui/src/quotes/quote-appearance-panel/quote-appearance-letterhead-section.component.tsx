import {
    Box,
    Card,
    Divider,
    FormLayoutField,
    Grid,
    Input,
    Paragraph,
    Textarea,
} from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QuoteAppearanceAccentColorField } from "./quote-appearance-accent-color-field.component.tsx";
import { QuoteAppearanceCaption } from "./quote-appearance-caption.component.tsx";
import { QuoteAppearanceLogoField } from "./quote-appearance-logo-field.component.tsx";
import type { QuoteAppearanceFormValues } from "./quote-appearance-panel.types.ts";

export type QuoteAppearanceLetterheadSectionProps = {
    readonly values: QuoteAppearanceFormValues;
    readonly disabled: boolean;
    readonly onChange: (patch: Partial<QuoteAppearanceFormValues>) => void;
    readonly logoUrl: string | null;
    readonly hasSavedLogo: boolean;
    readonly uploadingLogo: boolean;
    readonly onUploadLogo: (file: File) => void;
    readonly onRemoveLogo: () => void;
};

/**
 * `QuoteAppearancePanel`'s "Your business" card: logo, business identity
 * fields, and the accent-colour swatch picker -- split into its own
 * component purely to keep the panel itself under this workspace's
 * `max-lines` ESLint limit, not because it owns any state of its own; every
 * field reads and writes straight through to the panel's own form state via
 * `values`/`onChange`.
 */
export function QuoteAppearanceLetterheadSection({
    values,
    disabled,
    onChange,
    logoUrl,
    hasSavedLogo,
    uploadingLogo,
    onUploadLogo,
    onRemoveLogo,
}: QuoteAppearanceLetterheadSectionProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Card>
            <Card.Title>
                {t("quoteAppearancePanel.letterheadSectionTitle")}
            </Card.Title>
            <Paragraph textSize="sm" variant="muted">
                {t("quoteAppearancePanel.letterheadSectionDescription")}
            </Paragraph>
            <Divider />
            <Box direction="column" gap="lg">
                <QuoteAppearanceLogoField
                    logoUrl={logoUrl}
                    hasSavedLogo={hasSavedLogo}
                    uploading={uploadingLogo}
                    disabled={disabled}
                    onUpload={onUploadLogo}
                    onRemove={onRemoveLogo}
                />
                <FormLayoutField
                    label={
                        <QuoteAppearanceCaption>
                            {t("quoteAppearancePanel.businessNameLabel")}
                        </QuoteAppearanceCaption>
                    }
                    htmlFor="quote-appearance-business-name"
                >
                    <Input
                        id="quote-appearance-business-name"
                        disabled={disabled}
                        value={values.businessName}
                        onChange={(event) =>
                            onChange({ businessName: event.target.value })
                        }
                    />
                </FormLayoutField>
                <Grid columns={{ xs: 1, sm: 6 }} gap="md">
                    <FormLayoutField
                        label={
                            <QuoteAppearanceCaption>
                                {t("quoteAppearancePanel.abnLabel")}
                            </QuoteAppearanceCaption>
                        }
                        htmlFor="quote-appearance-abn"
                        span="half"
                    >
                        <Input
                            id="quote-appearance-abn"
                            disabled={disabled}
                            value={values.abn}
                            onChange={(event) =>
                                onChange({ abn: event.target.value })
                            }
                        />
                    </FormLayoutField>
                    <FormLayoutField
                        label={
                            <QuoteAppearanceCaption>
                                {t("quoteAppearancePanel.licenceNumberLabel")}
                            </QuoteAppearanceCaption>
                        }
                        htmlFor="quote-appearance-licence-number"
                        span="half"
                    >
                        <Input
                            id="quote-appearance-licence-number"
                            disabled={disabled}
                            value={values.licenceNumber}
                            onChange={(event) =>
                                onChange({ licenceNumber: event.target.value })
                            }
                        />
                    </FormLayoutField>
                </Grid>
                <FormLayoutField
                    label={
                        <QuoteAppearanceCaption>
                            {t("quoteAppearancePanel.addressLabel")}
                        </QuoteAppearanceCaption>
                    }
                    htmlFor="quote-appearance-address"
                >
                    <Textarea
                        id="quote-appearance-address"
                        rows={1}
                        disabled={disabled}
                        value={values.address}
                        onChange={(event) =>
                            onChange({ address: event.target.value })
                        }
                    />
                </FormLayoutField>
                <Grid columns={{ xs: 1, sm: 6 }} gap="md">
                    <FormLayoutField
                        label={
                            <QuoteAppearanceCaption>
                                {t("quoteAppearancePanel.phoneNumberLabel")}
                            </QuoteAppearanceCaption>
                        }
                        htmlFor="quote-appearance-phone-number"
                        span="half"
                    >
                        <Input
                            id="quote-appearance-phone-number"
                            type="tel"
                            disabled={disabled}
                            value={values.phoneNumber}
                            onChange={(event) =>
                                onChange({ phoneNumber: event.target.value })
                            }
                        />
                    </FormLayoutField>
                    <FormLayoutField
                        label={
                            <QuoteAppearanceCaption>
                                {t("quoteAppearancePanel.emailLabel")}
                            </QuoteAppearanceCaption>
                        }
                        htmlFor="quote-appearance-email"
                        span="half"
                    >
                        <Input
                            id="quote-appearance-email"
                            type="email"
                            disabled={disabled}
                            value={values.email}
                            onChange={(event) =>
                                onChange({ email: event.target.value })
                            }
                        />
                    </FormLayoutField>
                </Grid>
                <QuoteAppearanceAccentColorField
                    value={values.accentColor}
                    disabled={disabled}
                    onChange={(accentColor) => onChange({ accentColor })}
                />
            </Box>
        </Card>
    );
}
