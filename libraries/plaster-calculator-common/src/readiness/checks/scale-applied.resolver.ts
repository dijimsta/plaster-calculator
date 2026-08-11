import type {
    ReadinessCheckInput,
    ReadinessResult,
} from "../readiness-check.types.ts";

/** Check #1: `FloorplanPage.scaleMmPerPx` must be set, per page. */
export const SCALE_APPLIED_CHECK_ID = "SCALE_APPLIED";

export function resolveScaleApplied(
    input: ReadinessCheckInput,
): ReadinessResult {
    const unscaledPages = input.project.pages.filter(
        (page) => page.scaleMmPerPx == null,
    );
    return {
        checkId: SCALE_APPLIED_CHECK_ID,
        isMet: unscaledPages.length === 0,
        affectedItemCount: unscaledPages.length,
        affectedItems: unscaledPages.map((page) => ({
            pageId: page.id,
            pageNumber: page.pageNumber,
        })),
    };
}
