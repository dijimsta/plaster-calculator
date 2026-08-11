import type {
    ReadinessCheckInput,
    ReadinessResult,
} from "../readiness-check.types.ts";
import { ReadinessCheckUtils } from "../readiness-check.utils.ts";

/**
 * Check #2: each page's `overlay.areas` must have at least one area with
 * `deleted: false`.
 */
export const ROOMS_MEASURED_CHECK_ID = "ROOMS_MEASURED";

export function resolveRoomsMeasured(
    input: ReadinessCheckInput,
): ReadinessResult {
    const unmeasuredPages = input.project.pages.filter(
        (page) => ReadinessCheckUtils.activeAreasForPage(page).length === 0,
    );
    return {
        checkId: ROOMS_MEASURED_CHECK_ID,
        isMet: unmeasuredPages.length === 0,
        affectedItemCount: unmeasuredPages.length,
        ...(unmeasuredPages[0] ? { pageId: unmeasuredPages[0].id } : {}),
    };
}
