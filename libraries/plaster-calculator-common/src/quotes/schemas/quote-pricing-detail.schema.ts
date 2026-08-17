import { z } from "zod";

export const FULL_LINE_ITEMS_PRICING_DETAIL = "FULL_LINE_ITEMS";
export const AMOUNTS_ONLY_PRICING_DETAIL = "AMOUNTS_ONLY";
export const LUMP_SUM_PRICING_DETAIL = "LUMP_SUM";

/**
 * The fixed vocabulary of pricing detail levels a `QuoteAppearance.pricingDetail`
 * (`data/schemas/quotes.gql`, WORK-200) can hold, and the only levels a
 * generated quote document can render its pricing at:
 * `FULL_LINE_ITEMS_PRICING_DETAIL` (every line item, quantity, and rate),
 * `AMOUNTS_ONLY_PRICING_DETAIL` (line items with amounts but no quantity/rate
 * breakdown), and `LUMP_SUM_PRICING_DETAIL` (a single total, no line items).
 * `FULL_LINE_ITEMS_PRICING_DETAIL`'s value matches `QuoteAppearance`'s
 * `@default(value: "FULL_LINE_ITEMS")` exactly. Deliberately closed (no
 * free-text member) so `QuoteAppearance.pricingDetail` and the settings tab's
 * pricing detail picker can never drift apart the way an ad-hoc "other, type
 * your own" escape hatch would let them — this is the one place the list is
 * defined; every other pricing detail picker should read it from here rather
 * than defining its own.
 */
export const QuotePricingDetailSchema = z.union([
    z.literal(FULL_LINE_ITEMS_PRICING_DETAIL),
    z.literal(AMOUNTS_ONLY_PRICING_DETAIL),
    z.literal(LUMP_SUM_PRICING_DETAIL),
]);

export type QuotePricingDetail = z.infer<typeof QuotePricingDetailSchema>;
