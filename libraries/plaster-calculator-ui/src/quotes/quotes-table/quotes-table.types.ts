import type { QuoteStatus } from "@libraries/plaster-calculator-common";

/**
 * One row of the all-quotes table. Deliberately decoupled from the
 * `ListQuotesForTeam` GraphQL query shape — this library must not depend on
 * `@generated/data-connector-web` (see the quotes domain's architecture
 * notes); a connected container in `plaster-calculator-web` maps the query
 * result into this shape.
 */
export type QuotesTableRow = {
    readonly quoteId: string;
    readonly reference: string | null;
    readonly projectName: string;
    readonly companyName: string | null;
    readonly status: QuoteStatus;
    /** Total including GST, in integer cents (see `QuoteTotalsUtils`). */
    readonly totalIncGstCents: number;
    /** ISO 8601 timestamp the quote was created. */
    readonly createdAt: string;
};
