import { OverlayGeometryHelper } from "../../geometry/overlay-geometry.helper.ts";
import type {
    ReadinessCheckInput,
    ReadinessResult,
} from "../readiness-check.types.ts";
import { ReadinessCheckUtils } from "../readiness-check.utils.ts";

/**
 * Check #4: every room must resolve a ceiling height, from
 * `AreaPolygon.ceilingHeightMm ?? FloorplanPage.ceilingHeightMm` —
 * `OverlayGeometryHelper.effectiveFlatHeight()` already implements exactly
 * that fallback. WALL_AREA is the seeded, authoritative quantity source (the
 * product owner resolved PCPD-18 open question #1 in its favour over
 * per-lineal-metre pricing), so ceiling height genuinely drives wall area
 * and this check is load-bearing as literally specified — no raked-ceiling
 * special-casing.
 */
export const CEILING_HEIGHT_SET_CHECK_ID = "CEILING_HEIGHT_SET";

export function resolveCeilingHeightSet(
    input: ReadinessCheckInput,
): ReadinessResult {
    const unset = ReadinessCheckUtils.activeAreasAcrossPages(
        input.project,
    ).filter(
        ({ page, area }) =>
            OverlayGeometryHelper.effectiveFlatHeight(
                area,
                page.ceilingHeightMm,
            ) == null,
    );
    return {
        checkId: CEILING_HEIGHT_SET_CHECK_ID,
        isMet: unset.length === 0,
        affectedItemCount: unset.length,
        ...(unset[0]
            ? { pageId: unset[0].page.id, areaId: unset[0].area.id }
            : {}),
    };
}
