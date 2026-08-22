/**
 * The minimal `QuoteItem` shape `margin-estimate.utils.ts` needs to
 * estimate a line's cost against a supplier's `SupplierItemEstimate`s — a
 * subset of `GetProjectQuoteData`'s `quote.items`
 * (`data/connector-web/quotes.queries.gql`), the same "minimal local shape"
 * pattern `GenerateQuoteTemplateConfig`/`ResolvedQuoteItem`
 * (`generate-quote.types.ts`) already use for the same query family.
 *
 * `sourceTemplateId` is nullable: a hand-added line (no `QuoteItemTemplate`
 * behind it) carries `sourceTemplateId: null`, and `estimateQuoteMargin()`
 * (`margin-estimate.utils.ts`) always treats a `null` id as uncovered — it
 * is never looked up against a supplier's estimates, so it can never
 * coincidentally match one.
 */
export type MarginEstimateQuoteItem = {
    readonly sourceTemplateId: string | null;
    readonly quantity: number;
    readonly unitPriceCents: number;
};

/**
 * One `MarginEstimateQuoteItem`'s result against a supplier's
 * `SupplierItemEstimate`s. `quantity`/`unitPriceCents` echo the input line
 * so a caller can render its sell price without holding onto the original
 * item.
 *
 * `estimatedMaterialUnitPriceCents`/`lineCostCents`/`marginRatio` are all
 * `null` together for an *uncovered* line — one whose `sourceTemplateId` is
 * `null`, or that has no matching `SupplierItemEstimate` — rather than
 * defaulting to a `0` cost. A `0` cost would understate what the line
 * actually costs (unknown, not free) and overstate its margin; `null` keeps
 * "we don't know" distinct from "this costs nothing."
 *
 * `marginRatio` is `null` whenever this line's sell (`quantity *
 * unitPriceCents`) is `0` cents — e.g. a `0`-quantity line — even when the
 * line is covered: `(sell - cost) / sell` is undefined at `sell = 0`, and
 * `null` avoids surfacing `NaN`/`Infinity` as a `number`. It is otherwise
 * `(sell - lineCostCents) / sell`, negative when `lineCostCents` exceeds
 * sell — never clamped to `0`.
 */
export type QuoteLineMarginEstimate = {
    readonly quantity: number;
    readonly unitPriceCents: number;
    readonly estimatedMaterialUnitPriceCents: number | null;
    readonly lineCostCents: number | null;
    readonly marginRatio: number | null;
};

/**
 * Quote-level rollup of `estimateQuoteMargin()`'s (`margin-estimate.utils.ts`)
 * per-line results. `sellCents`/`costCents`/`marginCents`/`marginRatio` are
 * summed over *covered* lines only — an uncovered line contributes to
 * neither sell nor cost, per `QuoteLineMarginEstimate`'s doc comment above,
 * so a supplier who has priced 2 of a quote's 8 lines is scored on those 2
 * lines' margin, not on a quote-wide total that silently treats the other 6
 * as free. `sellCents` prices each covered line the same way
 * `quote-totals.utils.ts` (`@libraries/plaster-calculator-common`) does —
 * `quantity * unitPriceCents` — and stays ex GST, the same as that module's
 * `subtotalCents`.
 *
 * `marginRatio` is `null` when `sellCents` is `0` — no covered lines at all
 * (nothing priced yet), or every covered line has `0` sell — rather than
 * `0` or `1`: a quote with zero covered sell and zero covered cost is not
 * "0% margin" (implies priced-and-thin) or "100% margin" (implies free), it
 * is simply not yet measurable.
 *
 * `uncoveredLines` names every line excluded from the totals above, so a
 * caller can list what still needs a supplier price instead of only seeing
 * a smaller number.
 */
export type QuoteMarginEstimateSummary = {
    readonly sellCents: number;
    readonly costCents: number;
    readonly marginCents: number;
    readonly marginRatio: number | null;
    readonly uncoveredLines: readonly QuoteLineMarginEstimate[];
};

/**
 * How many of a team's *enabled* `QuoteItemTemplate`s a supplier has an
 * estimate for, out of how many enabled templates the team has — feeds the
 * suppliers list's coverage indicator (e.g. "3 of 8 priced"), computed by
 * `computeSupplierCoverage()` (`margin-estimate.utils.ts`) from
 * `SupplierItemEstimate`/`useSupplierEstimates` (`../suppliers/`, WORK-380).
 */
export type SupplierCoverage = {
    readonly pricedTemplateCount: number;
    readonly totalTemplateCount: number;
};
