import {
    normalizeWallBoardProfile,
    normalizeWallBoardType,
    wallMaterialLabel,
    wallPlasterCategory,
    type WallPlasterCategory,
} from "./board-materials.helper.ts";
import type { WallBoardProfile, WallBoardType } from "./geometry.constants.ts";
import type { AreaPolygon, Point } from "./schemas/index.ts";

/** One wall edge's resolved board type and pixel length, before grouping. */
type WallEdgeLength = {
    readonly boardType: WallBoardType;
    readonly profile: WallBoardProfile;
    readonly lengthPx: number;
    readonly start: Point;
    readonly end: Point;
};

export function pointDistance(a: Point, b: Point): number {
    return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

export function pointAt(points: Point[], index: number): Point {
    const point = points[index];
    if (!point) {
        throw new Error(`Missing polygon point at index ${index}.`);
    }
    return point;
}

export function pathLengthBetween(
    points: Point[],
    start: number,
    end: number,
    step: 1 | -1,
): number {
    if (points.length < 2) return 0;
    let total = 0;
    let index = start;
    while (index !== end) {
        const nextIndex = (index + step + points.length) % points.length;
        total += pointDistance(
            pointAt(points, index),
            pointAt(points, nextIndex),
        );
        index = nextIndex;
    }
    return total;
}

export function wallLengthByType(
    area: AreaPolygon,
): { type: string; lengthPx: number }[] {
    const totals = new Map<string, number>();
    wallEdgeLengths(area).forEach(({ profile, boardType, lengthPx }) => {
        const type = wallMaterialLabel({
            wallBoardProfile: profile,
            wallBoardType: boardType,
        });
        totals.set(type, (totals.get(type) ?? 0) + lengthPx);
    });
    return Array.from(totals.entries()).map(([type, lengthPx]) => ({
        type,
        lengthPx,
    }));
}

/**
 * Wall edge lengths grouped by `WallPlasterCategory` (`STANDARD` vs
 * `WET_AREA`) instead of by the full material label `wallLengthByType()`
 * groups by — the split `computeQuantities()` needs for the `WALL_AREA`
 * quantity source, without re-walking the polygon's edges a second time.
 */
export function wallLengthPxByCategory(
    area: AreaPolygon,
): { category: WallPlasterCategory; lengthPx: number }[] {
    const totals = new Map<WallPlasterCategory, number>();
    wallEdgeLengths(area).forEach(({ boardType, lengthPx }) => {
        const category = wallPlasterCategory(boardType);
        totals.set(category, (totals.get(category) ?? 0) + lengthPx);
    });
    return Array.from(totals.entries()).map(([category, lengthPx]) => ({
        category,
        lengthPx,
    }));
}

/**
 * Wall area in m², by `WallPlasterCategory`, for one area: each
 * category's total edge length (`wallLengthPxByCategory()`) converted to
 * metres and multiplied by `effectiveFlatHeight()`. Modeled on
 * `ceilingAreaM2ForArea()` for the px-to-m² conversion, so callers never
 * need to repeat the `scaleMmPerPx` arithmetic themselves. Returns `[]`
 * when the area's height is unknown (no `ceilingHeightMm` and no
 * `pageHeightMm` fallback) rather than guessing a height.
 */
export function wallAreaM2ForArea(
    area: AreaPolygon,
    scaleMmPerPx: number,
    pageHeightMm: number | null,
): { category: WallPlasterCategory; areaM2: number }[] {
    const heightMm = effectiveFlatHeight(area, pageHeightMm);
    if (heightMm == null) return [];
    const heightM = heightMm / 1000;
    return wallLengthPxByCategory(area).map(({ category, lengthPx }) => ({
        category,
        areaM2: ((lengthPx * scaleMmPerPx) / 1000) * heightM,
    }));
}

/**
 * Wall-board surface area in m² grouped by the editor's exact board type.
 * Flat walls use the resolved room/page height. Raked walls use a
 * trapezoid per edge, interpolating the ceiling height at both endpoints
 * between the configured low and high ceiling edges.
 */
export function wallAreaM2ByBoardType(
    area: AreaPolygon,
    scaleMmPerPx: number,
    pageHeightMm: number | null,
): { boardType: WallBoardType; areaM2: number }[] {
    const flatHeightMm = effectiveFlatHeight(area, pageHeightMm);
    const totals = new Map<WallBoardType, number>();
    wallEdgeLengths(area).forEach(({ boardType, lengthPx, start, end }) => {
        const startHeightMm = wallHeightMmAt(area, start, flatHeightMm);
        const endHeightMm = wallHeightMmAt(area, end, flatHeightMm);
        if (startHeightMm == null || endHeightMm == null) return;
        const lengthM = (lengthPx * scaleMmPerPx) / 1000;
        const averageHeightM = (startHeightMm + endHeightMm) / 2 / 1000;
        totals.set(
            boardType,
            (totals.get(boardType) ?? 0) + lengthM * averageHeightM,
        );
    });
    return Array.from(totals.entries()).map(([boardType, areaM2]) => ({
        boardType,
        areaM2,
    }));
}

/**
 * Every wall edge's resolved board type/profile and pixel length, for
 * one area — the shared per-edge walk that both `wallLengthByType()` and
 * `wallLengthPxByCategory()` group differently. Outdoor areas have no
 * plastered walls (matching the existing `wallLengthByType()` contract
 * exercised by its "returns nothing for outdoor areas" test), and edges
 * flagged `noPlaster` are skipped the same way.
 */
function wallEdgeLengths(area: AreaPolygon): WallEdgeLength[] {
    if (area.isOutdoor) return [];
    if (area.points.length < 2) return [];
    return area.points.flatMap((point, index) => {
        const override = area.edgeOverrides?.[String(index)];
        if (override?.noPlaster) return [];
        const boardType = normalizeWallBoardType(
            override?.wallBoardType ?? area.wallBoardType,
            override?.wallPlasterType ?? area.wallPlasterType,
        );
        const profile = normalizeWallBoardProfile(
            override?.wallBoardProfile ?? area.wallBoardProfile,
        );
        const next = pointAt(area.points, (index + 1) % area.points.length);
        const lengthPx = pointDistance(point, next);
        return [{ boardType, profile, lengthPx, start: point, end: next }];
    });
}

function wallHeightMmAt(
    area: AreaPolygon,
    point: Point,
    flatFallbackMm: number | null,
): number | null {
    const raked = area.ceilingMode === "raked" ? area.rakedCeiling : null;
    if (
        !raked ||
        raked.lowHeightMm == null ||
        raked.highHeightMm == null ||
        raked.lowEdgeIndex === raked.highEdgeIndex
    ) {
        return flatFallbackMm;
    }
    const lowMid = edgeMidpoint(area.points, raked.lowEdgeIndex);
    const highMid = edgeMidpoint(area.points, raked.highEdgeIndex);
    if (!lowMid || !highMid) return flatFallbackMm;
    const runX = highMid[0] - lowMid[0];
    const runY = highMid[1] - lowMid[1];
    const runSquared = runX * runX + runY * runY;
    if (runSquared <= 0) return flatFallbackMm;
    const position = clamp(
        ((point[0] - lowMid[0]) * runX + (point[1] - lowMid[1]) * runY) /
            runSquared,
        0,
        1,
    );
    return (
        raked.lowHeightMm + (raked.highHeightMm - raked.lowHeightMm) * position
    );
}

/**
 * Pixel length of one polygon edge, from `points[edgeIndex]` to the next
 * point (wrapping to the first point after the last edge) — the same
 * point-to-point walk `wallEdgeLengths()` uses internally, exposed
 * directly so a caller that only has an area and an edge index (e.g. the
 * floorplan editor's selection UI) doesn't need to re-derive the
 * wrap-around index math itself. Unlike `wallEdgeLengths()`, this doesn't
 * resolve board type or skip outdoor/`noPlaster` edges — it's a purely
 * geometric length, valid for any edge index regardless of plaster status.
 */
export function edgeLengthPx(area: AreaPolygon, edgeIndex: number): number {
    const start = pointAt(area.points, edgeIndex);
    const end = pointAt(area.points, (edgeIndex + 1) % area.points.length);
    return pointDistance(start, end);
}

export function polygonArea(points: Point[]): number {
    if (points.length < 3) return 0;
    const sum = points.reduce((total, point, index) => {
        const next = pointAt(points, (index + 1) % points.length);
        return total + point[0] * next[1] - next[0] * point[1];
    }, 0);
    return Math.abs(sum / 2);
}

export function ceilingAreaM2ForArea(
    area: AreaPolygon,
    scaleMmPerPx: number,
): number {
    const flatM2 = flatAreaM2(area.points, scaleMmPerPx);
    const raked = area.ceilingMode === "raked" ? area.rakedCeiling : null;
    if (
        !raked ||
        raked.lowHeightMm == null ||
        raked.highHeightMm == null ||
        raked.lowEdgeIndex === raked.highEdgeIndex
    ) {
        return flatM2;
    }
    const lowMid = edgeMidpoint(area.points, raked.lowEdgeIndex);
    const highMid = edgeMidpoint(area.points, raked.highEdgeIndex);
    if (!lowMid || !highMid) return flatM2;
    const runM = (pointDistance(lowMid, highMid) * scaleMmPerPx) / 1000;
    if (runM <= 0) return flatM2;
    const riseM = Math.abs(raked.highHeightMm - raked.lowHeightMm) / 1000;
    return flatM2 * Math.sqrt(1 + Math.pow(riseM / runM, 2));
}

export function edgeMidpoint(points: Point[], edgeIndex: number): Point | null {
    if (edgeIndex < 0 || edgeIndex >= points.length) return null;
    const a = pointAt(points, edgeIndex);
    const b = pointAt(points, (edgeIndex + 1) % points.length);
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

export function effectiveFlatHeight(
    area: AreaPolygon,
    pageHeightMm: number | null,
): number | null {
    return area.ceilingHeightMm ?? pageHeightMm ?? null;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

/**
 * Floor area in m² for one area: the same flat-footprint math
 * `ceilingAreaM2ForArea()` uses before its raked-ceiling adjustment,
 * exposed directly. A floor is always flat — unlike a raked ceiling, it
 * never gains area from a rising roofline — so this intentionally
 * doesn't apply `ceilingAreaM2ForArea()`'s raked-ceiling slope factor.
 */
export function floorAreaM2ForArea(
    area: AreaPolygon,
    scaleMmPerPx: number,
): number {
    return flatAreaM2(area.points, scaleMmPerPx);
}

/**
 * Total perimeter length in px for a closed polygon: every edge,
 * including the edge that closes the loop from the last point back to
 * the first. Modeled on `polygonArea()`'s reduce-over-edges shape.
 */
export function perimeterLengthPx(points: Point[]): number {
    if (points.length < 2) return 0;
    return points.reduce((total, point, index) => {
        const next = pointAt(points, (index + 1) % points.length);
        return total + pointDistance(point, next);
    }, 0);
}

/**
 * `perimeterLengthPx()` converted to metres via `scaleMmPerPx` — the
 * `CORNICE_LENGTH` quantity source measures the full perimeter of a
 * room with no `WallPlasterCategory` split (cove cornice is one product
 * regardless of the wall board behind it).
 */
export function perimeterLengthMForArea(
    area: AreaPolygon,
    scaleMmPerPx: number,
): number {
    return (perimeterLengthPx(area.points) * scaleMmPerPx) / 1000;
}

/** Shoelace polygon area converted to m² via `scaleMmPerPx`, with no height/slope factor applied. */
function flatAreaM2(points: Point[], scaleMmPerPx: number): number {
    return polygonArea(points) * Math.pow(scaleMmPerPx / 1000, 2);
}
