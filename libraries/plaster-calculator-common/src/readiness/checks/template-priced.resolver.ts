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
 *
 * `input.quoteItemTemplateConfigs` must be scoped to a single
 * `QuoteTemplate` — specifically whichever template will actually price
 * this quote, which may be a variation rather than the team's default
 * template. This resolver only reads `config.enabled`/`config.
 * unitPriceCents` off whatever it's handed; it has no opinion on which
 * `QuoteTemplate` those came from. In particular, `config.enabled` must
 * already be the default template's value (built with `QuoteItemInclusion
 * Utils.resolveInclusion()`), not a variation's own `QuoteItemTemplateConfig
 * .enabled` — that's what stops a variation with an unpriced included line
 * from passing this check just because its own `enabled` disagrees with the
 * default's.
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
