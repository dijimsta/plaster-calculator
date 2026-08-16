import { z } from "zod";

export const SQUARE_METRE_QUOTE_UNIT = "m²";
export const LINEAR_METRE_QUOTE_UNIT = "LM";
export const EACH_QUOTE_UNIT = "ea";
export const ITEM_QUOTE_UNIT = "item";
export const HOUR_QUOTE_UNIT = "hr";
export const DAY_QUOTE_UNIT = "day";

/**
 * The fixed vocabulary of units a `QuoteItemTemplate.unit` (`data/schemas/
 * quotes.gql`) can hold, and the only units a quote line item can be priced
 * in. Deliberately closed (no free-text member) so `QuoteItemTemplate.unit`
 * and the UI's unit picker can never drift apart the way an ad-hoc "other,
 * type your own" escape hatch would let them — this is the one place the
 * list is defined; every other unit picker (e.g. `plaster-calculator-ui`'s
 * quote unit input) should read it from here rather than defining its own.
 */
export const QuoteUnitSchema = z.union([
    z.literal(SQUARE_METRE_QUOTE_UNIT),
    z.literal(LINEAR_METRE_QUOTE_UNIT),
    z.literal(EACH_QUOTE_UNIT),
    z.literal(ITEM_QUOTE_UNIT),
    z.literal(HOUR_QUOTE_UNIT),
    z.literal(DAY_QUOTE_UNIT),
]);

export type QuoteUnit = z.infer<typeof QuoteUnitSchema>;
