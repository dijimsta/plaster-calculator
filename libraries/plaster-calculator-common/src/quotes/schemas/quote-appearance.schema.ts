import { z } from "zod";

import {
    FULL_LINE_ITEMS_PRICING_DETAIL,
    QuotePricingDetailSchema,
} from "./quote-pricing-detail.schema.ts";

/**
 * Mirrors the `QuoteAppearance` table (`data/schemas/quotes.gql`, WORK-200) —
 * a team's letterhead, output detail, and terms settings for generated quote
 * documents. Letterhead fields (`logoStoragePath` through `accentColor`) are
 * nullable with no defaults, matching the table exactly: "not filled in yet"
 * must stay distinguishable from "deliberately blank" so a document can omit
 * a line instead of printing an empty one. Output fields (`pricingDetail`
 * through `showSignatureBlock`) and `validForDays` are non-null, matching the
 * table's `@default`s — see `DEFAULT_QUOTE_APPEARANCE`. `terms` is nullable
 * like the letterhead fields, but resolves to `""` rather than staying
 * `null` — see `DEFAULT_QUOTE_APPEARANCE`'s doc comment for why.
 */
export const QuoteAppearanceSchema = z
    .object({
        logoStoragePath: z.string().nullable(),
        businessName: z.string().nullable(),
        abn: z.string().nullable(),
        licenceNumber: z.string().nullable(),
        address: z.string().nullable(),
        phoneNumber: z.string().nullable(),
        email: z.string().nullable(),
        accentColor: z.string().nullable(),
        pricingDetail: QuotePricingDetailSchema,
        showScopeOfWork: z.boolean(),
        showTakeoffSummary: z.boolean(),
        showSignatureBlock: z.boolean(),
        validForDays: z.number(),
        terms: z.string().nullable(),
    })
    .readonly();

export type QuoteAppearance = z.infer<typeof QuoteAppearanceSchema>;

/**
 * `QuoteAppearance`'s defaults for a team that has never opened the settings
 * tab, matching `QuoteAppearance`'s (`data/schemas/quotes.gql`, WORK-200)
 * database-level `@default`s exactly: full line items, scope of work shown,
 * take-off summary and signature block hidden, and a 30-day validity period.
 * `terms` defaults to `""` rather than a placeholder sentence — a
 * "insert your terms here"-style default that ships to a real quote unedited
 * is worse than a missing section, so the document renderer should treat an
 * empty `terms` as "omit the terms block", not print filler copy. Letterhead
 * fields have no database default and are not "chosen" values here either;
 * `resolveQuoteAppearance()` below fills them with `null`, the same "not
 * filled in yet" value the table itself uses.
 */
export const DEFAULT_QUOTE_APPEARANCE: QuoteAppearance = {
    logoStoragePath: null,
    businessName: null,
    abn: null,
    licenceNumber: null,
    address: null,
    phoneNumber: null,
    email: null,
    accentColor: null,
    pricingDetail: FULL_LINE_ITEMS_PRICING_DETAIL,
    showScopeOfWork: true,
    showTakeoffSummary: false,
    showSignatureBlock: false,
    validForDays: 30,
    terms: "",
};

/**
 * Fills a partial, absent, or `null` `QuoteAppearance` record with
 * `DEFAULT_QUOTE_APPEARANCE`, so callers (the settings tab, the document
 * renderer) always get a complete record back and never have to separately
 * handle "no row saved yet" or a field missing from one. A team that has
 * never saved appearance settings passes `null`/`undefined` and gets
 * `DEFAULT_QUOTE_APPEARANCE` back unchanged; a team with a saved row passes
 * it straight through, since a full row already satisfies `QuoteAppearance`.
 * A plain merge is safe here because `appearance`'s fields are either present
 * with a real value or absent entirely — never explicitly `undefined` — the
 * shape every caller (a GraphQL row, or `{}` for "no row yet") produces.
 */
export function resolveQuoteAppearance(
    appearance: Partial<QuoteAppearance> | null | undefined,
): QuoteAppearance {
    return { ...DEFAULT_QUOTE_APPEARANCE, ...appearance };
}
