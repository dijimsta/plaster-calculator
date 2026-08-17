import type { QuoteAppearance } from "@libraries/plaster-calculator-common";
import { Box, Divider, Paragraph, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

export type QuoteDetailDocumentSignatureBlockProps = {
    readonly appearance: QuoteAppearance;
};

/**
 * Acceptance signature block: a blank signature, printed name, and date
 * line for the builder to sign. Gated entirely by
 * `appearance.showSignatureBlock` -- unlike scope-of-work and take-off
 * summary, it needs no external content, so there's nothing else to check
 * before rendering it.
 */
export function QuoteDetailDocumentSignatureBlock({
    appearance,
}: QuoteDetailDocumentSignatureBlockProps): ReactElement | null {
    const { t } = useQuotesTranslation();

    if (!appearance.showSignatureBlock) {
        return null;
    }

    return (
        <Box direction="column" gap="md">
            <Text weight="semibold">
                {t("quoteDetailDocument.signatureBlockTitle")}
            </Text>
            <Paragraph textSize="sm" variant="muted">
                {t("quoteDetailDocument.signatureBlockDescription")}
            </Paragraph>
            <Box direction="row" gap="lg" wrap>
                <SignatureLine
                    label={t("quoteDetailDocument.signatureLabel")}
                />
                <SignatureLine
                    label={t("quoteDetailDocument.printedNameLabel")}
                />
                <SignatureLine label={t("quoteDetailDocument.dateLabel")} />
            </Box>
        </Box>
    );
}

function SignatureLine({ label }: { readonly label: string }): ReactElement {
    return (
        <Box direction="column" gap="xs" grow>
            <Divider />
            <Text size="sm" variant="muted">
                {label}
            </Text>
        </Box>
    );
}
