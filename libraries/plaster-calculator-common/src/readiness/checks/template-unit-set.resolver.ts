import type {
    ReadinessCheckInput,
    ReadinessResult,
} from "../readiness-check.types.ts";

/** Every enabled template needs a concrete unit before it can be quoted. */
export const TEMPLATE_UNIT_SET_CHECK_ID = "TEMPLATE_UNIT_SET";

export function resolveTemplateUnitSet(
    input: ReadinessCheckInput,
): ReadinessResult {
    const missingUnits = (input.quoteItemTemplateConfigs ?? []).filter(
        (config) => config.enabled && !config.unit?.trim(),
    );
    return {
        checkId: TEMPLATE_UNIT_SET_CHECK_ID,
        isMet: missingUnits.length === 0,
        affectedItemCount: missingUnits.length,
        affectedItems: missingUnits.map((config) => ({
            quoteItemTemplateId: config.quoteItemTemplateId,
            quoteItemTemplateLabel: config.label,
        })),
    };
}
