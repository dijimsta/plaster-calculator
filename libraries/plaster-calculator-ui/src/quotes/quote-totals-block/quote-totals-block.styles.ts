import type { TextSize, TextVariant, TextWeight } from "@libraries/uikit-web";

export type QuoteTotalsBlockRowStyle = {
    readonly textSize: TextSize;
    readonly labelVariant: TextVariant;
    readonly weight: TextWeight;
};

/**
 * Text size/variant/weight for a totals row, keyed by whether it's the
 * emphasised total row or a plain (subtotal/GST) row. Kept as a lookup
 * table rather than an inline ternary in the component, mirroring
 * `quoteStatusBadgeColors`.
 */
export const quoteTotalsBlockRowStyles: Readonly<
    Record<"plain" | "emphasized", QuoteTotalsBlockRowStyle>
> = Object.freeze({
    plain: { textSize: "sm", labelVariant: "muted", weight: "normal" },
    emphasized: {
        textSize: "base",
        labelVariant: "default",
        weight: "semibold",
    },
});
