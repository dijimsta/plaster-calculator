/**
 * GST rate applied to every quote total, as a decimal fraction (10%).
 * Named so it never appears as a bare literal at call sites.
 */
export const GST_RATE = 0.1;

/**
 * Pure helpers for quote line/subtotal/GST/total maths.
 *
 * All amounts are integer cents, matching the `unitPriceCents` /
 * `materialUnitPriceCents` / `labourUnitPriceCents` convention already used
 * throughout `plaster-calculator-common` and `plaster-calculator-ui` (see
 * `quote-template-form.types.ts`). Money is never represented as a
 * fractional-dollar `number` here — floating-point dollars accumulate
 * rounding error across line items in a way integer cents don't. The one
 * place a float is unavoidable is multiplying by a fractional `quantity` or
 * by `GST_RATE`; those intermediate results are rounded back to the nearest
 * whole cent immediately with `Math.round`, so error never carries forward
 * into the next calculation.
 */

/** `quantity x unitPriceCents`, rounded to the nearest whole cent. */
export function lineAmountCents(
    quantity: number,
    unitPriceCents: number,
): number {
    return Math.round(quantity * unitPriceCents);
}

/** Sum of every line's amount, in cents. */
export function subtotalCents(lineAmountsCents: readonly number[]): number {
    return lineAmountsCents.reduce((sum, cents) => sum + cents, 0);
}

/** GST on `subtotalCents` at {@link GST_RATE}, rounded to the nearest cent. */
export function gstCents(subtotalCents: number): number {
    return Math.round(subtotalCents * GST_RATE);
}

/** `subtotalCents + gstCents`, i.e. the total a customer is invoiced. */
export function totalIncGstCents(
    subtotalCents: number,
    gstCents: number,
): number {
    return subtotalCents + gstCents;
}
