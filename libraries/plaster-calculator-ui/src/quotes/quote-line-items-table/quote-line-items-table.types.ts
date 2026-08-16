/**
 * A line item's quantity provenance -- how many `QuantitySource` fields
 * (`measurementSource`, `measurementPlasterType`) this library can see. Not
 * every line has one: a flat-fee line (see `QuoteLineItemsTableUtils.
 * provenanceLabel`) carries `null` instead, and is either explained by its
 * `matchedKeywords` or identified as included by default.
 */
export type QuoteLineItemsTableQuantitySource = {
    readonly measurementSource: string;
    readonly measurementPlasterType: string | null;
};

/**
 * One row of the line-items table on a generated quote. Deliberately
 * decoupled from the `GetProjectQuote` GraphQL query shape -- this library
 * must not depend on `@generated/data-connector-web` (see the quotes
 * domain's architecture notes, and `QuoteDetailDocumentLineItem`'s identical
 * convention); a connected container in `plaster-calculator-web` maps the
 * query result into this shape.
 */
export type QuoteLineItemsTableRow = {
    readonly id: string;
    readonly name: string;
    readonly quantity: number;
    readonly unit: string | null;
    /** In integer cents (see `QuoteTotalsUtils`). */
    readonly unitPriceCents: number;
    readonly matchedKeywords: readonly string[];
    readonly quantitySource: QuoteLineItemsTableQuantitySource | null;
};
