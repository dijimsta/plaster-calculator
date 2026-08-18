import type { AreaPolygon } from "../geometry/schemas/index.ts";
import type { FloorplanPage } from "../projects/schemas/index.ts";
import type { ProjectDetail } from "../projects/schemas/project-detail.schema.ts";

/** One non-deleted area, paired with the `FloorplanPage` it belongs to. */
export type ReadinessPageArea = {
    readonly page: FloorplanPage;
    readonly area: AreaPolygon;
};

/**
 * Shared helpers for the readiness check resolvers. `FloorplanPage.overlay`
 * is a JSON string (mirroring `parseOverlay()` in
 * `plaster-calculator-ui/src/editor/project-editor/overlay-serialization.ts`),
 * so every area-level check needs to parse it the same defensive way before
 * filtering out deleted areas.
 */

/** Every non-deleted area on `page`, parsed from its overlay JSON. */
export function activeAreasForPage(
    page: FloorplanPage,
): readonly AreaPolygon[] {
    return parseOverlayAreas(page.overlay).filter((area) => !area.deleted);
}

/** Every non-deleted area across all of `project`'s pages. */
export function activeAreasAcrossPages(
    project: ProjectDetail,
): readonly ReadinessPageArea[] {
    return project.pages.flatMap((page) =>
        activeAreasForPage(page).map((area) => ({
            page,
            area,
        })),
    );
}

/**
 * Parses a `FloorplanPage.overlay` JSON string into its areas. Returns
 * an empty array for `null`/malformed overlay JSON rather than throwing,
 * matching the behaviour of the UI's `parseOverlay()`.
 */
export function parseOverlayAreas(
    overlay: string | null,
): readonly AreaPolygon[] {
    if (!overlay) return [];
    try {
        const parsed: unknown = JSON.parse(overlay);
        const areas = (parsed as { areas?: unknown } | null)?.areas;
        return Array.isArray(areas) ? (areas as AreaPolygon[]) : [];
    } catch {
        return [];
    }
}
