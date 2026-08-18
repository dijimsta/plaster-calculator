import type {
    ReadinessCheckInput,
    ReadinessResult,
} from "../readiness-check.types.ts";

/**
 * `TEMPLATE_PRICED`/`TEMPLATE_UNIT_SET` only ever inspect the *enabled*
 * templates they're handed — on a team whose catalog has none enabled at
 * all, both vacuously pass (there is nothing to find unpriced or missing a
 * unit), so the gate would read "ready" for a project that can't actually
 * generate a quote: `build()` (`generate-quote.utils.ts`,
 * `plaster-calculator-web-core`) always returns `NO_ITEMS` with an empty
 * template. This check exists to catch exactly that gap before either of
 * those checks gets a chance to vacuously pass. Reports the whole project
 * as the one affected item (no specific template to point to — the problem
 * is the catalog's absence, not any one entry in it), matching
 * `COMPANY_CONTACT_DETAILS`'s "whole project" pattern.
 */
export const TEMPLATE_HAS_ENABLED_ITEMS_CHECK_ID = "TEMPLATE_HAS_ENABLED_ITEMS";

export function resolveTemplateHasEnabledItems(
    input: ReadinessCheckInput,
): ReadinessResult {
    const hasEnabledItem = (input.quoteItemTemplateConfigs ?? []).some(
        (config) => config.enabled,
    );
    return {
        checkId: TEMPLATE_HAS_ENABLED_ITEMS_CHECK_ID,
        isMet: hasEnabledItem,
        affectedItemCount: hasEnabledItem ? 0 : 1,
        affectedItems: hasEnabledItem ? [] : [{}],
    };
}
