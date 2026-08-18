import { Decimal } from "decimal.js";

/**
 * Formats integer cents as plain dollars text, e.g. `123456` -> `"1234.56"`.
 */
export function centsToDollarsText(cents: number): string {
    return new Decimal(cents).dividedBy(100).toFixed(2);
}

/**
 * Formats integer cents as AUD display text, e.g. `123456` -> `"$1,234.56"`
 * and `-500` -> `"-$5.00"`. `cents` is expected to already be a whole
 * number, so this only ever formats (currency symbol, thousands
 * separators, sign, fixed 2dp) - it never rounds.
 */
export function centsToAudDisplayText(cents: number): string {
    const isNegative = cents < 0;
    const absoluteDollarsText = new Decimal(cents)
        .abs()
        .dividedBy(100)
        .toFixed(2);
    const decimalPointIndex = absoluteDollarsText.indexOf(".");
    const wholePart = absoluteDollarsText.slice(0, decimalPointIndex);
    const decimalPart = absoluteDollarsText.slice(decimalPointIndex + 1);
    const wholePartWithThousandsSeparators = wholePart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ",",
    );

    return `${isNegative ? "-" : ""}$${wholePartWithThousandsSeparators}.${decimalPart}`;
}

/**
 * Parses dollars text into integer cents, e.g. `"1234.56"` -> `123456`.
 * Returns `0` for text that cannot be parsed as a number.
 */
export function dollarsTextToCents(text: string): number {
    try {
        return new Decimal(text).times(100).round().toNumber();
    } catch {
        return 0;
    }
}
