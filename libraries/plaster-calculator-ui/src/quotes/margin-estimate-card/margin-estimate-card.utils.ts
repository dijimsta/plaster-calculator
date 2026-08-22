import type { StatsItem } from "@libraries/uikit-web";
import { centsToAudDisplayText } from "@libraries/utilities";

import type { useQuotesTranslation } from "../i18n/index.ts";

import type {
    MarginEstimateCardLine,
    MarginEstimateCardSummary,
} from "./margin-estimate-card.types.ts";

type QuotesTFunction = ReturnType<typeof useQuotesTranslation>["t"];

/**
 * A line has no estimate from the selected supplier when its cost is
 * unresolved. Checks `lineCostCents` specifically rather than
 * `marginRatio`: per `QuoteLineMarginEstimate`'s doc comment, `marginRatio`
 * can *also* be `null` for a *covered* zero-sell line, so it alone can't
 * distinguish "uncovered" from "covered but unmeasurable."
 */
export function isUncoveredLine(line: MarginEstimateCardLine): boolean {
    return line.lineCostCents === null;
}

/**
 * `marginRatio` (e.g. `0.321`) as display text (e.g. `"32.1%"`), signed for
 * a negative ratio (e.g. `-0.05` -> `"-5.0%"`) rather than clamped --
 * mirrors `describeRatePercentDelta`'s `.toFixed(1)` precision
 * (`../quote-template-variation-editor/quote-template-variation-editor.utils.ts`).
 */
export function marginRatioDisplayText(marginRatio: number): string {
    return `${(marginRatio * 100).toFixed(1)}%`;
}

/** Cents as AUD text, or the "No estimate" copy when `cents` is `null`. */
export function centsCellText(
    cents: number | null,
    t: QuotesTFunction,
): string {
    return cents === null
        ? t("marginEstimateCard.noEstimate")
        : centsToAudDisplayText(cents);
}

/**
 * A line's margin ratio as percent text, or "No estimate" when `null` --
 * checked independently from `isUncoveredLine`, since a covered zero-sell
 * line has a cost but no measurable ratio (see `isUncoveredLine`'s doc
 * comment above).
 */
export function marginRatioCellText(
    marginRatio: number | null,
    t: QuotesTFunction,
): string {
    return marginRatio === null
        ? t("marginEstimateCard.noEstimate")
        : marginRatioDisplayText(marginRatio);
}

/**
 * `success` for a positive margin, `warning` at or below zero, `default`
 * when not yet measurable. Returns the literal union directly rather than
 * `StatsItem["valueTone"]`'s own `StatsValueTone` type -- `uikit-web`
 * defines that type on `Stats` (`stats.component.tsx`) but doesn't thread
 * it through `data-display/stats/index.ts` or the package barrel, so it
 * isn't reachable from this package. This return type is a subset of, and
 * structurally assignable to, `StatsValueTone`.
 */
export function marginValueTone(
    marginRatio: number | null,
): "default" | "success" | "warning" {
    if (marginRatio === null) return "default";
    return marginRatio > 0 ? "success" : "warning";
}

/**
 * The card's three headline `Stats` items -- sell, estimated cost, and
 * estimated margin (amount + percentage) -- built from `estimateQuoteMargin()`'s
 * summary fields (`MarginEstimateCardSummary`, above).
 */
export function marginEstimateSummaryStats(
    summary: MarginEstimateCardSummary,
    t: QuotesTFunction,
): readonly StatsItem[] {
    return [
        {
            id: "sell",
            label: t("marginEstimateCard.sellLabel"),
            value: centsToAudDisplayText(summary.sellCents),
        },
        {
            id: "cost",
            label: t("marginEstimateCard.estimatedCostLabel"),
            value: centsToAudDisplayText(summary.costCents),
        },
        {
            id: "margin",
            label: t("marginEstimateCard.estimatedMarginLabel"),
            value: centsToAudDisplayText(summary.marginCents),
            description:
                summary.marginRatio === null
                    ? t("marginEstimateCard.noMarginData")
                    : t("marginEstimateCard.marginPercentDescription", {
                          percent: marginRatioDisplayText(summary.marginRatio),
                      }),
            valueTone: marginValueTone(summary.marginRatio),
        },
    ];
}
