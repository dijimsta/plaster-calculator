import { BoardMaterialsHelper } from "../../geometry/board-materials.helper.ts";
import type {
    ReadinessCheckInput,
    ReadinessResult,
} from "../readiness-check.types.ts";
import { ReadinessCheckUtils } from "../readiness-check.utils.ts";

/**
 * Check #7: a room whose wall type was assumed (defaulted, not set from
 * detection or the user) must be confirmed before quoting. `AreaPolygon`
 * already has a literal `source: "detected" | "manual"` field, so
 * `source === "detected"` is used exactly as specified — no guessed field
 * mapping needed there. "Wall type defaulted" reuses
 * `BoardMaterialsHelper.wallBoardTypeSource() === "defaulted"` from check #3
 * (WORK-127), and "no confirmation timestamp" is
 * `AreaPolygon.wallBoardTypeConfirmedAt == null` (WORK-126). Outdoor areas
 * are exempt, same as check #3, since they have no wall board type to
 * confirm.
 */
export const ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID =
    "ASSUMED_WALL_TYPES_CONFIRMED";

export function resolveAssumedWallTypesConfirmed(
    input: ReadinessCheckInput,
): ReadinessResult {
    const unconfirmed = ReadinessCheckUtils.activeAreasAcrossPages(
        input.project,
    ).filter(
        ({ area }) =>
            area.source === "detected" &&
            !area.isOutdoor &&
            area.wallBoardTypeConfirmedAt == null &&
            BoardMaterialsHelper.wallBoardTypeSource(
                area.wallBoardType,
                area.wallPlasterType,
            ) === "defaulted",
    );
    return {
        checkId: ASSUMED_WALL_TYPES_CONFIRMED_CHECK_ID,
        isMet: unconfirmed.length === 0,
        affectedItemCount: unconfirmed.length,
        ...(unconfirmed[0]
            ? { pageId: unconfirmed[0].page.id, areaId: unconfirmed[0].area.id }
            : {}),
    };
}
