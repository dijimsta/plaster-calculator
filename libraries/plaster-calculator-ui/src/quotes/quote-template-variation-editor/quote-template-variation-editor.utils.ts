import { centsToAudDisplayText } from "@libraries/utilities";

import type { QuoteTemplateItem } from "../quote-template-panel/quote-template-panel.types.ts";

import type { QuoteTemplateVariationFormValues } from "./quote-template-variation-editor.types.ts";

export type RateDeltaKind = "increase" | "decrease" | "same";

export type RateDelta = {
    readonly kind: RateDeltaKind;
    /** Formatted absolute AUD text (e.g. `"$12.00"`), empty when `kind` is `"same"`. */
    readonly amountDisplayText: string;
};

/**
 * Builds a variation's prices-only form values from its own merged item
 * list (`defaultItems` + `customItems`, in that order -- the same order
 * `use-quote-template-list.hook.ts`'s `createVariation` uses to copy the
 * default into a new variation, so the editor always shows items in the
 * default's order) plus the default template's own current price per
 * item, read once here for the per-row rate delta rather than looked up
 * again on every keystroke.
 */
export function buildFormValues(
    items: readonly QuoteTemplateItem[],
    defaultPriceByItemTemplateId: ReadonlyMap<string, number>,
): QuoteTemplateVariationFormValues {
    return {
        items: items.map((item) => ({
            itemTemplateId: item.itemTemplateId,
            scope: item.scope,
            name: item.name,
            unit: item.unit ?? "",
            hasKeywords: item.hasKeywords,
            keywords: item.keywords,
            // Falls back to this variation's own current price (a
            // zero delta) rather than 0 outright -- if the default
            // somehow has no config for this item yet, a large false
            // "+$X.XX vs default" delta would be actively misleading,
            // and 0 isn't a real default price either.
            defaultUnitPriceCents:
                defaultPriceByItemTemplateId.get(item.itemTemplateId) ??
                item.unitPriceCents,
            unitPriceCents: item.unitPriceCents,
        })),
    };
}

/**
 * `deltaCents = variationPriceCents - defaultPriceCents`, so a
 * negotiated line reads as a negotiated line without opening the
 * default (WORK-195's "what success looks like").
 */
export function describeRateDelta(deltaCents: number): RateDelta {
    if (deltaCents === 0) {
        return { kind: "same", amountDisplayText: "" };
    }
    return {
        kind: deltaCents > 0 ? "increase" : "decrease",
        amountDisplayText: centsToAudDisplayText(Math.abs(deltaCents)),
    };
}

export type RatePercentDelta = {
    readonly kind: RateDeltaKind;
    /** Formatted absolute percent text (e.g. `"8.1%"`), empty when `kind` is `"same"`. */
    readonly percentDisplayText: string;
};

/**
 * The percent counterpart of `describeRateDelta`, for
 * `QuoteTemplateCard`'s summary line ("−8.1% vs default") rather than a
 * dollar amount. `undefined` when there's no default price to compare
 * against (a zero or missing `defaultPriceCents`), since a percent of
 * nothing isn't a meaningful delta.
 */
export function describeRatePercentDelta(
    deltaCents: number,
    defaultPriceCents: number,
): RatePercentDelta | undefined {
    if (defaultPriceCents === 0) {
        return undefined;
    }
    if (deltaCents === 0) {
        return { kind: "same", percentDisplayText: "" };
    }
    const percent = (Math.abs(deltaCents) / defaultPriceCents) * 100;
    return {
        kind: deltaCents > 0 ? "increase" : "decrease",
        percentDisplayText: `${percent.toFixed(1)}%`,
    };
}
