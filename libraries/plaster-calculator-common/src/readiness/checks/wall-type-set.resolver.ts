import { wallBoardTypeSource } from "../../geometry/board-materials.helper.ts";
import type {
    ReadinessCheckInput,
    ReadinessResult,
} from "../readiness-check.types.ts";
import { activeAreasAcrossPages } from "../readiness-check.utils.ts";

/**
 * Check #3: every non-outdoor room must have an explicitly set
 * `AreaPolygon.wallBoardType` — i.e. `wallBoardTypeSource()` reports
 * `"explicit"`, not a legacy-field mapping or a default. Outdoor areas are
 * exempt, mirroring the export validation in `plaster-calculator-ui`'s
 * `validatePageForExport()`, which never requires a wall board type for
 * them.
 */
export const WALL_TYPE_SET_CHECK_ID = "WALL_TYPE_SET";

export function resolveWallTypeSet(
    input: ReadinessCheckInput,
): ReadinessResult {
    const unset = activeAreasAcrossPages(input.project).filter(
        ({ area }) =>
            !area.isOutdoor &&
            wallBoardTypeSource(area.wallBoardType, area.wallPlasterType) !==
                "explicit",
    );
    return {
        checkId: WALL_TYPE_SET_CHECK_ID,
        isMet: unset.length === 0,
        affectedItemCount: unset.length,
        affectedItems: unset.map(({ page, area }) => ({
            pageId: page.id,
            pageNumber: page.pageNumber,
            areaId: area.id,
            areaLabel: area.label,
        })),
    };
}
