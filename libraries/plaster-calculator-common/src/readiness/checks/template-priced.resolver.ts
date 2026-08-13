import type {
    ReadinessCheckInput,
    ReadinessResult,
} from "../readiness-check.types.ts";

/**
 * Check #5: every enabled quote item template must have
 * `unitPriceCents > 0`. Quantity-sourced items are priced per measured unit;
 * items without a quantity source are flat-fee lines with quantity `1` when
 * they are included by default or their keywords match. Disabled items are
 * excluded because generation does not receive them.
 */
export const TEMPLATE_PRICED_CHECK_ID = "TEMPLATE_PRICED";

export function resolveTemplatePriced(
    input: ReadinessCheckInput,
): ReadinessResult {
    const unpriced = (input.quoteItemTemplateConfigs ?? []).filter(
        (config) => config.enabled && config.unitPriceCents <= 0,
    );
    return {
        checkId: TEMPLATE_PRICED_CHECK_ID,
        isMet: unpriced.length === 0,
        affectedItemCount: unpriced.length,
        affectedItems: unpriced.map((config) => ({
            quoteItemTemplateId: config.quoteItemTemplateId,
            quoteItemTemplateLabel: config.label,
        })),
    };
}
