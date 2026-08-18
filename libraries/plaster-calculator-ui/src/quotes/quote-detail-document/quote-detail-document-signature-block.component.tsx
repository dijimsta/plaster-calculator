import type { QuoteAppearance } from "@libraries/plaster-calculator-common";
import { Box, Divider, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

export type QuoteDetailDocumentSignatureBlockProps = {
    readonly appearance: QuoteAppearance;
};

/**
 * Acceptance signature block: an "Accepted by" line and a date line for the
 * builder to sign. Gated entirely by `appearance.showSignatureBlock` --
 * unlike scope-of-work and take-off summary, it needs no external content,
 * so there's nothing else to check before rendering it. Deliberately just
 * these two lines, with no title or explanatory paragraph above them --
 * this panel's target design treats the labelled blank lines themselves as
 * self-explanatory.
 */
export function QuoteDetailDocumentSignatureBlock({
    appearance,
}: QuoteDetailDocumentSignatureBlockProps): ReactElement | null {
    const { t } = useQuotesTranslation();

    if (!appearance.showSignatureBlock) {
        return null;
    }

    return (
        <Box direction="row" gap="lg" wrap>
            <SignatureLine label={t("quoteDetailDocument.acceptedByLabel")} />
            <SignatureLine label={t("quoteDetailDocument.dateLabel")} />
        </Box>
    );
}

/**
 * The leading empty `Box` is a blank spacer, not a layout mistake -- with
 * no children, its `padding="lg"` renders as pure height (top padding plus
 * bottom padding, nothing in between) above the `Divider`, opening up room
 * for an actual pen signature or handwritten date on a printed copy.
 * Applying that padding to the whole line's own `Box` instead would add the
 * same inset on its left/right edges, pulling "Accepted by" and "Date" out
 * of alignment with every other left-aligned block in the document.
 */
function SignatureLine({ label }: { readonly label: string }): ReactElement {
    return (
        <Box direction="column" gap="xs" grow>
            <Box padding="lg" />
            <Divider />
            <Text size="sm" variant="muted">
                {label}
            </Text>
        </Box>
    );
}
