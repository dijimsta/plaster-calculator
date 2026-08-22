import {
    lineAmountCents,
    subtotalCents,
} from "@libraries/plaster-calculator-common";

import type { SupplierItemEstimate } from "../suppliers/suppliers.types.ts";

import type {
    MarginEstimateQuoteItem,
    QuoteLineMarginEstimate,
    QuoteMarginEstimateSummary,
    SupplierCoverage,
} from "./margin-estimate.types.ts";

/**
 * Pure margin-estimation helpers over a quote's lines and a supplier's
 * `SupplierItemEstimate`s (`../suppliers/suppliers.types.ts`, WORK-380).
 * Matching happens purely on `QuoteItem.sourceTemplateId` against
 * `SupplierItemEstimate.templateId` — there is no fuzzy or name-based
 * fallback, so a hand-added line (`sourceTemplateId: null`) or a line whose
 * template the supplier hasn't priced is always "uncovered," never silently
 * costed at `0`. See `QuoteLineMarginEstimate`/`QuoteMarginEstimateSummary`
 * (`margin-estimate.types.ts`) for why uncovered lines are excluded from
 * totals rather than zeroed.
 */

/**
 * Estimates `items`' margin against `estimates`, matching each item's
 * `sourceTemplateId` to a `SupplierItemEstimate.templateId`. Builds one
 * `estimatesByTemplateId` lookup up front so matching every line is O(1)
 * per item rather than an O(n) scan of `estimates` per item.
 */
export function estimateQuoteMargin(
    items: readonly MarginEstimateQuoteItem[],
    estimates: readonly SupplierItemEstimate[],
): QuoteMarginEstimateSummary {
    const estimatesByTemplateId = new Map(
        estimates.map((estimate) => [estimate.templateId, estimate]),
    );
    const lines = items.map((item) =>
        estimateLineMargin(item, estimatesByTemplateId),
    );

    const coveredLines = lines.filter((line) => line.lineCostCents !== null);
    const uncoveredLines = lines.filter((line) => line.lineCostCents === null);

    const sellCents = subtotalCents(
        coveredLines.map((line) =>
            lineAmountCents(line.quantity, line.unitPriceCents),
        ),
    );
    const costCents = subtotalCents(
        coveredLines.map((line) => line.lineCostCents ?? 0),
    );

    return {
        sellCents,
        costCents,
        marginCents: sellCents - costCents,
        marginRatio: marginRatioOf(sellCents, costCents),
        uncoveredLines,
    };
}

/**
 * Counts how many of `enabledTemplateIds` have a matching `templateId`
 * among `estimates`. `estimates` is reduced to a `Set` of its template ids
 * first, so a supplier with more than one row for the same template (should
 * not happen — `SupplierQuoteItemPrice`'s primary key is `(supplierId,
 * templateId)`) can never inflate the count past `totalTemplateCount`.
 */
export function computeSupplierCoverage(
    enabledTemplateIds: readonly string[],
    estimates: readonly SupplierItemEstimate[],
): SupplierCoverage {
    const estimatedTemplateIds = new Set(
        estimates.map((estimate) => estimate.templateId),
    );
    const pricedTemplateCount = enabledTemplateIds.filter((id) =>
        estimatedTemplateIds.has(id),
    ).length;

    return {
        pricedTemplateCount,
        totalTemplateCount: enabledTemplateIds.length,
    };
}

/**
 * Resolves one line's estimate: a `null` `sourceTemplateId` (a hand-added
 * item) never reaches `estimatesByTemplateId.get()` at all, so it can never
 * coincidentally match. A `sourceTemplateId` the supplier has not priced
 * misses the lookup the same way. Either case returns the all-`null`
 * "uncovered" shape rather than a `0`-cost line.
 */
function estimateLineMargin(
    item: MarginEstimateQuoteItem,
    estimatesByTemplateId: ReadonlyMap<string, SupplierItemEstimate>,
): QuoteLineMarginEstimate {
    const estimate =
        item.sourceTemplateId !== null
            ? estimatesByTemplateId.get(item.sourceTemplateId)
            : undefined;

    if (!estimate) {
        return {
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
            estimatedMaterialUnitPriceCents: null,
            lineCostCents: null,
            marginRatio: null,
        };
    }

    const sellCents = lineAmountCents(item.quantity, item.unitPriceCents);
    const lineCostCents = lineAmountCents(
        item.quantity,
        estimate.materialUnitPriceCents,
    );

    return {
        quantity: item.quantity,
        unitPriceCents: item.unitPriceCents,
        estimatedMaterialUnitPriceCents: estimate.materialUnitPriceCents,
        lineCostCents,
        marginRatio: marginRatioOf(sellCents, lineCostCents),
    };
}

/**
 * `(sellCents - costCents) / sellCents`, or `null` at `sellCents = 0`
 * rather than `NaN`/`Infinity` — shared by `estimateLineMargin()`'s
 * per-line ratio and `estimateQuoteMargin()`'s quote-wide one. Never
 * clamped: a `costCents` above `sellCents` returns a negative ratio.
 */
function marginRatioOf(sellCents: number, costCents: number): number | null {
    if (sellCents === 0) return null;
    return (sellCents - costCents) / sellCents;
}
