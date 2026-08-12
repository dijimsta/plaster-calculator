/**
 * A line item's quantity provenance — how many `QuantitySource` fields
 * (`measurementSource`, `measurementPlasterType`) this library can see. Not
 * every line has one: manually-entered / custom items carry `null`.
 */
export type QuoteDetailDocumentQuantitySource = {
    readonly measurementSource: string;
    readonly measurementPlasterType: string | null;
};

/**
 * One priced line on a quote document. Deliberately decoupled from the
 * `GetQuoteById` GraphQL query shape — this library must not depend on
 * `@generated/data-connector-web`; a connected container in
 * `plaster-calculator-web` maps the query result into this shape.
 */
export type QuoteDetailDocumentLineItem = {
    readonly id: string;
    readonly name: string;
    readonly quantity: number;
    /** In integer cents (see `QuoteTotalsUtils`). */
    readonly unitPriceCents: number;
    readonly quantitySource: QuoteDetailDocumentQuantitySource | null;
};
