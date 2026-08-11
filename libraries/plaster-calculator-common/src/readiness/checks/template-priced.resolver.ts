import type {
    ReadinessCheckInput,
    ReadinessResult,
} from "../readiness-check.types.ts";

/**
 * Check #5: every enabled quote item template whose `quantitySourceId` is
 * produced must have `unitPriceCents > 0`. This package doesn't model which
 * quantity sources the calculator actually implements (e.g. `WALL_AREA`), so
 * "produced" is read as: the template is wired to an automatic quantity
 * source at all (`quantitySourceId != null`), as opposed to a purely
 * manual/custom line item with no automatic quantity. Disabled items and
 * items with no quantity source are excluded — nothing here would compute a
 * quantity for them, so an unset price can't block quoting.
 */
export const TEMPLATE_PRICED_CHECK_ID = "TEMPLATE_PRICED";

export function resolveTemplatePriced(
    input: ReadinessCheckInput,
): ReadinessResult {
    const unpriced = (input.quoteItemTemplateConfigs ?? []).filter(
        (config) =>
            config.enabled &&
            config.quantitySourceId != null &&
            config.unitPriceCents <= 0,
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
