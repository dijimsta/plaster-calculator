/**
 * Formats a decimal quantity for display: rounds to 2dp and trims trailing
 * zeroes, e.g. `12.5` -> `"12.5"` and `12` -> `"12"`. Intended for plain
 * (non-cents) quantities rather than money -- see `CurrencyUtils` for
 * currency display formatting.
 */
export function formatQuantityText(quantity: number): string {
    return String(Number(quantity.toFixed(2)));
}
