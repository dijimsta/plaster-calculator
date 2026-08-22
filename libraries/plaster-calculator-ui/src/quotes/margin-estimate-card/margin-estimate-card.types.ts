import type {
    QuoteLineMarginEstimate,
    QuoteMarginEstimateSummary,
} from "@libraries/plaster-calculator-web-core";

/**
 * The card's three headline figures -- `QuoteMarginEstimateSummary`
 * (`@libraries/plaster-calculator-web-core`, WORK-381) minus
 * `uncoveredLines`. This card derives the uncovered-lines notice from its
 * own `lines` prop instead (`MarginEstimateCardLine`, below), since only
 * that richer shape carries each line's name -- `QuoteLineMarginEstimate`
 * itself has none, so `summary.uncoveredLines` alone could never name
 * anything.
 */
export type MarginEstimateCardSummary = Pick<
    QuoteMarginEstimateSummary,
    "sellCents" | "costCents" | "marginCents" | "marginRatio"
>;

/**
 * One row of the margin estimate card's per-line table: a quote line's
 * identity (`id`/`name`) joined to its `estimateQuoteMargin()` result
 * (`QuoteLineMarginEstimate`, WORK-381). Deliberately decoupled from the
 * connector query shape -- mirrors `QuoteLineItemsTableRow`
 * (`../quote-line-items-table/quote-line-items-table.types.ts`) and
 * `QuoteDetailDocumentLineItem`'s identical convention -- and needed
 * because `QuoteLineMarginEstimate` carries no item identity of its own:
 * `estimateQuoteMargin()` computes purely off `MarginEstimateQuoteItem`
 * (`quantity`/`unitPriceCents`/`sourceTemplateId`), so a connected caller
 * (WORK-386) zips its own display rows with that result to build this
 * shape.
 */
export type MarginEstimateCardLine = QuoteLineMarginEstimate & {
    readonly id: string;
    readonly name: string;
};
