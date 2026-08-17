import { Box, Text } from "@libraries/uikit-web";
import { CurrencyUtils } from "@libraries/utilities";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { quoteTotalsBlockRowStyles } from "./quote-totals-block.styles.ts";

export type QuoteTotalsBlockProps = {
    /** In integer cents (see `quote-totals.utils.ts`). */
    readonly subtotalCents: number;
    /** In integer cents (see `quote-totals.utils.ts`). */
    readonly gstCents: number;
    /** In integer cents (see `quote-totals.utils.ts`). */
    readonly totalIncGstCents: number;
};

/**
 * Subtotal / GST / total-inc-GST rows, right-aligned with the total row
 * visually emphasised. Takes already-computed cents -- callers derive them
 * via the quote-totals helpers (`quote-totals.utils.ts`) -- so this
 * component does no currency maths itself, only formatting via
 * `CurrencyUtils`. Reusable by both the project Quote tab (WORK-151) and
 * `QuoteDetailDocument`.
 */
export function QuoteTotalsBlock({
    subtotalCents,
    gstCents,
    totalIncGstCents,
}: QuoteTotalsBlockProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Box direction="column" gap="xs" align="end">
            <QuoteTotalsBlockRow
                label={t("quoteTotalsBlock.subtotal")}
                amountCents={subtotalCents}
            />
            <QuoteTotalsBlockRow
                label={t("quoteTotalsBlock.gst")}
                amountCents={gstCents}
            />
            <QuoteTotalsBlockRow
                label={t("quoteTotalsBlock.totalIncGst")}
                amountCents={totalIncGstCents}
                emphasized
            />
        </Box>
    );
}

type QuoteTotalsBlockRowProps = {
    readonly label: string;
    readonly amountCents: number;
    readonly emphasized?: boolean;
};

function QuoteTotalsBlockRow({
    label,
    amountCents,
    emphasized = false,
}: QuoteTotalsBlockRowProps): ReactElement {
    const { textSize, labelVariant } =
        quoteTotalsBlockRowStyles[emphasized ? "emphasized" : "plain"];

    return (
        <Box direction="row" gap="md">
            <Text size={textSize} variant={labelVariant}>
                {label}
            </Text>
            <Text size={textSize}>
                {CurrencyUtils.centsToAudDisplayText(amountCents)}
            </Text>
        </Box>
    );
}
