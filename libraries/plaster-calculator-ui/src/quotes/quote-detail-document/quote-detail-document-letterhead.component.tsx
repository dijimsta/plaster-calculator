import type { QuoteAppearance } from "@libraries/plaster-calculator-common";
import { Avatar, Box, Card, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { QuoteDetailDocumentUtils } from "./quote-detail-document.utils.ts";

export type QuoteDetailDocumentLetterheadProps = {
    readonly appearance: QuoteAppearance;
    /**
     * Resolved download URL for `appearance.logoStoragePath`. See
     * `QuoteDetailDocumentProps.logoUrl`'s doc comment (quote-detail-document.component.tsx)
     * for why this library can't resolve that path itself.
     */
    readonly logoUrl?: string | null;
    readonly reference: string | null;
    readonly issuedAt: string;
};

/**
 * Left: logo, business name, address, phone, email, and an ABN/licence
 * line -- every field but the logo is nullable ("not filled in yet",
 * `QuoteAppearanceSchema`), so each renders only when present. Right:
 * "QUOTE", reference, date, and computed validity.
 */
export function QuoteDetailDocumentLetterhead({
    appearance,
    logoUrl,
    reference,
    issuedAt,
}: QuoteDetailDocumentLetterheadProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Box direction="row" justify="between" align="start" wrap gap="lg">
            <QuoteDetailDocumentLetterheadIssuer
                appearance={appearance}
                logoUrl={logoUrl}
            />
            <Box direction="column" gap="xs" align="end">
                <Card.Title>{t("quoteDetailDocument.title")}</Card.Title>
                <Text>{reference ?? t("quoteDetailDocument.noReference")}</Text>
                <Text size="sm" variant="muted">
                    {new Date(issuedAt).toLocaleDateString()}
                </Text>
                <Text size="sm" variant="muted">
                    {QuoteDetailDocumentUtils.validUntilLabel(
                        issuedAt,
                        appearance.validForDays,
                        t,
                    )}
                </Text>
            </Box>
        </Box>
    );
}

type QuoteDetailDocumentLetterheadIssuerProps = {
    readonly appearance: QuoteAppearance;
    readonly logoUrl?: string | null;
};

function QuoteDetailDocumentLetterheadIssuer({
    appearance,
    logoUrl,
}: QuoteDetailDocumentLetterheadIssuerProps): ReactElement {
    const { t } = useQuotesTranslation();
    const abnLicenceLine = QuoteDetailDocumentUtils.abnLicenceLine(
        appearance.abn,
        appearance.licenceNumber,
        t,
    );

    return (
        <Box direction="column" gap="xs">
            {logoUrl && (
                // `Avatar` renders a genuinely loaded `<img>` (not a CSS
                // background image) when given `src` -- required so a later
                // print-readiness call site (WORK-207) can await its `load`
                // event before invoking `window.print()`. This ticket only
                // needs the `<img>` rendered correctly, not that wiring.
                <Avatar
                    src={logoUrl}
                    alt={
                        appearance.businessName ??
                        t("quoteDetailDocument.logoAlt")
                    }
                    shape="square"
                    size="xl"
                />
            )}
            {appearance.businessName && (
                <Text weight="semibold" size="lg">
                    {appearance.businessName}
                </Text>
            )}
            {appearance.address && (
                <Text size="sm" variant="muted">
                    {appearance.address}
                </Text>
            )}
            {appearance.phoneNumber && (
                <Text size="sm" variant="muted">
                    {appearance.phoneNumber}
                </Text>
            )}
            {appearance.email && (
                <Text size="sm" variant="muted">
                    {appearance.email}
                </Text>
            )}
            {abnLicenceLine && (
                <Text size="sm" variant="muted">
                    {abnLicenceLine}
                </Text>
            )}
        </Box>
    );
}
