import { wallBoardTypeForCeiling } from "../geometry/board-materials.helper.ts";
import {
    ceilingAreaM2ForArea,
    floorAreaM2ForArea,
    perimeterLengthMForArea,
    wallAreaM2ByBoardType,
    wallAreaM2ForArea,
    wallLengthPxByCategory,
} from "../geometry/overlay-geometry.helper.ts";
import type { AreaPolygon, Overlay } from "../geometry/schemas/index.ts";

import type {
    QuantitySourceDefinition,
    QuantityTakeoffResult,
} from "./quantity-takeoff.types.ts";

/**
 * Turns one floorplan page's overlay into a quantity per `QuantitySource`.
 * Pure functions, no I/O — every function takes an already-parsed `Overlay`
 * (see `parseOverlayAreas()` in `readiness-check.utils.ts` for how a caller
 * turns `FloorplanPage.overlay`'s JSON string into one) plus the page's
 * `scaleMmPerPx`/`ceilingHeightMm`, and returns numbers.
 *
 * All quantity sources exclude `deleted` areas (`computeQuantities()`
 * filters them once, up front, the same way `activeAreasForPage()` in
 * `readiness-check.utils.ts` does for the readiness gate). Beyond that,
 * `isOutdoor` is handled per source rather than uniformly:
 * - `WALL_AREA` excludes outdoor areas, because `wallAreaM2ForArea()` is
 *   built on `wallLengthByType()`, which already excludes them (outdoor
 *   areas have no wall board type to measure).
 * - `CEILING_AREA` and `CORNICE_LENGTH` do NOT exclude outdoor areas: no
 *   existing readiness check excludes outdoor areas from anything other
 *   than wall-board-type requirements (see `wall-type-set.resolver.ts`,
 *   `assumed-wall-types-confirmed.resolver.ts`), and an outdoor room (e.g.
 *   an alfresco) still has a ceiling and a perimeter to quote.
 * - `FLOOR_AREA`/`WET_AREA` excludes outdoor areas by construction rather
 *   than by an explicit check: "wet area" is derived from wall board type
 *   (there is no room-level wet-area flag), and an outdoor area has none.
 * - `DOOR_COUNT` always returns `0` — see the `DOOR_COUNT` case below.
 */
export function computeQuantities(
    overlay: Overlay,
    scaleMmPerPx: number,
    pageHeightMm: number | null,
    quantitySources: readonly QuantitySourceDefinition[],
): QuantityTakeoffResult[] {
    const areas = overlay.areas.filter((area) => !area.deleted);
    return quantitySources.map((source) => ({
        quantitySourceId: source.id,
        measurementSource: source.measurementSource,
        measurementPlasterType: source.measurementPlasterType,
        quantity: quantityFor(source, areas, scaleMmPerPx, pageHeightMm),
    }));
}

function quantityFor(
    source: QuantitySourceDefinition,
    areas: readonly AreaPolygon[],
    scaleMmPerPx: number,
    pageHeightMm: number | null,
): number {
    switch (source.measurementSource) {
        case "PLASTERBOARD_AREA":
            return plasterboardAreaQuantity(
                areas,
                scaleMmPerPx,
                pageHeightMm,
                source.measurementPlasterType,
            );
        case "WALL_AREA":
            return wallAreaQuantity(
                areas,
                scaleMmPerPx,
                pageHeightMm,
                source.measurementPlasterType,
            );
        case "CEILING_AREA":
            return ceilingAreaQuantity(areas, scaleMmPerPx);
        case "CORNICE_LENGTH":
            return corniceLengthQuantity(areas, scaleMmPerPx);
        case "FLOOR_AREA":
            return floorAreaQuantity(areas, scaleMmPerPx);
        case "DOOR_COUNT":
            // BLOCKER (WORK-141): `AreaPolygon`/`OverlaySchema` have no
            // field distinguishing a door opening from a room (no
            // `type`/`category` field — only `label`/`sourceRoomType`,
            // neither of which is populated with a door marker anywhere
            // in the codebase today). Schema changes are out of scope
            // for this package-only ticket, so this returns 0 — the
            // honest answer given no door data exists yet — rather than
            // inventing a new `AreaPolygon` field.
            return 0;
        default:
            // An unrecognised `measurementSource` (a `QuantitySource`
            // seeded after this calculator was written, or a typo)
            // quotes as zero rather than throwing.
            return 0;
    }
}

/**
 * Total sheet area for one exact editor wall-board type. Wall faces are
 * measured from edge length × ceiling height; ceiling surfaces are added
 * to the board type selected by `wallBoardTypeForCeiling()`.
 */
function plasterboardAreaQuantity(
    areas: readonly AreaPolygon[],
    scaleMmPerPx: number,
    pageHeightMm: number | null,
    measurementPlasterType: string | null,
): number {
    if (measurementPlasterType == null) return 0;
    return areas.reduce((total, area) => {
        const wallArea =
            wallAreaM2ByBoardType(area, scaleMmPerPx, pageHeightMm).find(
                ({ boardType }) => boardType === measurementPlasterType,
            )?.areaM2 ?? 0;
        const ceilingArea =
            wallBoardTypeForCeiling(area.ceilingPlasterType) ===
            measurementPlasterType
                ? ceilingAreaM2ForArea(area, scaleMmPerPx)
                : 0;
        return total + wallArea + ceilingArea;
    }, 0);
}

/**
 * Sums `wallAreaM2ForArea()`'s per-category area across every area,
 * keeping only the category matching this source's `measurementPlasterType`
 * (`"STANDARD"` or `"WET_AREA"`).
 */
function wallAreaQuantity(
    areas: readonly AreaPolygon[],
    scaleMmPerPx: number,
    pageHeightMm: number | null,
    measurementPlasterType: string | null,
): number {
    return areas.reduce((total, area) => {
        const matching = wallAreaM2ForArea(
            area,
            scaleMmPerPx,
            pageHeightMm,
        ).find(({ category }) => category === measurementPlasterType);
        return total + (matching?.areaM2 ?? 0);
    }, 0);
}

function ceilingAreaQuantity(
    areas: readonly AreaPolygon[],
    scaleMmPerPx: number,
): number {
    return areas.reduce(
        (total, area) => total + ceilingAreaM2ForArea(area, scaleMmPerPx),
        0,
    );
}

function corniceLengthQuantity(
    areas: readonly AreaPolygon[],
    scaleMmPerPx: number,
): number {
    return areas.reduce(
        (total, area) => total + perimeterLengthMForArea(area, scaleMmPerPx),
        0,
    );
}

/**
 * A room counts as a wet-area room when at least one of its wall edges
 * resolves to the `WET_AREA` `WallPlasterCategory` — the closest
 * existing signal to a room-level "is this a wet area" flag, since
 * `AreaPolygon` has no such flag of its own.
 */
function floorAreaQuantity(
    areas: readonly AreaPolygon[],
    scaleMmPerPx: number,
): number {
    return areas.reduce((total, area) => {
        const isWetAreaRoom = wallLengthPxByCategory(area).some(
            ({ category, lengthPx }) => category === "WET_AREA" && lengthPx > 0,
        );
        if (!isWetAreaRoom) return total;
        return total + floorAreaM2ForArea(area, scaleMmPerPx);
    }, 0);
}
