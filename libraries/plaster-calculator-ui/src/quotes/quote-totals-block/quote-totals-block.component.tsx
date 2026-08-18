import { Box, Divider, Text } from "@libraries/uikit-web";
import { centsToAudDisplayText } from "@libraries/utilities";
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
 * `centsToAudDisplayText`. Reusable by both the project Quote tab (WORK-151)
 * and `QuoteDetailDocument`.
 */
export function QuoteTotalsBlock({
    subtotalCents,
    gstCents,
    totalIncGstCents,
}: QuoteTotalsBlockProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Box direction="column" gap="xs" align="end">
            {/* An inner, un-stretched box so its own width resolves to its
                widest row's content (`QuoteTotalsBlockRow`'s own `justify="end"`
                keeps every row's label/amount pair flush with that width) --
                `Divider` has no explicit width of its own, so nesting it directly
                under the outer `align="end"` box would collapse it to zero width
                instead of spanning the same band as the rows above and below it. */}
            <Box direction="column" gap="xs">
                <QuoteTotalsBlockRow
                    label={t("quoteTotalsBlock.subtotal")}
                    amountCents={subtotalCents}
                />
                <QuoteTotalsBlockRow
                    label={t("quoteTotalsBlock.gst")}
                    amountCents={gstCents}
                />
                <Divider />
                <QuoteTotalsBlockRow
                    label={t("quoteTotalsBlock.totalIncGst")}
                    amountCents={totalIncGstCents}
                    emphasized
                />
            </Box>
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
    const { textSize, labelVariant, weight } =
        quoteTotalsBlockRowStyles[emphasized ? "emphasized" : "plain"];

    return (
        <Box direction="row" justify="end" gap="md">
            <Text size={textSize} variant={labelVariant} weight={weight}>
                {label}
            </Text>
            <Text size={textSize} weight={weight}>
                {centsToAudDisplayText(amountCents)}
            </Text>
        </Box>
    );
}
