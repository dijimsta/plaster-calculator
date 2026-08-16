import {
    BoardMaterialsHelper,
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

export class OverlayGeometryHelper {
    public static pointDistance(a: Point, b: Point): number {
        return Math.hypot(b[0] - a[0], b[1] - a[1]);
    }

    public static pointAt(points: Point[], index: number): Point {
        const point = points[index];
        if (!point) {
            throw new Error(`Missing polygon point at index ${index}.`);
        }
        return point;
    }

    public static pathLengthBetween(
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
            total += OverlayGeometryHelper.pointDistance(
                OverlayGeometryHelper.pointAt(points, index),
                OverlayGeometryHelper.pointAt(points, nextIndex),
            );
            index = nextIndex;
        }
        return total;
    }

    public static wallLengthByType(
        area: AreaPolygon,
    ): { type: string; lengthPx: number }[] {
        const totals = new Map<string, number>();
        OverlayGeometryHelper.wallEdgeLengths(area).forEach(
            ({ profile, boardType, lengthPx }) => {
                const type = BoardMaterialsHelper.wallMaterialLabel({
                    wallBoardProfile: profile,
                    wallBoardType: boardType,
                });
                totals.set(type, (totals.get(type) ?? 0) + lengthPx);
            },
        );
        return Array.from(totals.entries()).map(([type, lengthPx]) => ({
            type,
            lengthPx,
        }));
    }

    /**
     * Wall edge lengths grouped by `WallPlasterCategory` (`STANDARD` vs
     * `WET_AREA`) instead of by the full material label `wallLengthByType()`
     * groups by — the split `QuantityTakeoffCalculatorUtils` needs for the
     * `WALL_AREA` quantity source, without re-walking the polygon's edges a
     * second time.
     */
    public static wallLengthPxByCategory(
        area: AreaPolygon,
    ): { category: WallPlasterCategory; lengthPx: number }[] {
        const totals = new Map<WallPlasterCategory, number>();
        OverlayGeometryHelper.wallEdgeLengths(area).forEach(
            ({ boardType, lengthPx }) => {
                const category =
                    BoardMaterialsHelper.wallPlasterCategory(boardType);
                totals.set(category, (totals.get(category) ?? 0) + lengthPx);
            },
        );
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
    public static wallAreaM2ForArea(
        area: AreaPolygon,
        scaleMmPerPx: number,
        pageHeightMm: number | null,
    ): { category: WallPlasterCategory; areaM2: number }[] {
        const heightMm = OverlayGeometryHelper.effectiveFlatHeight(
            area,
            pageHeightMm,
        );
        if (heightMm == null) return [];
        const heightM = heightMm / 1000;
        return OverlayGeometryHelper.wallLengthPxByCategory(area).map(
            ({ category, lengthPx }) => ({
                category,
                areaM2: ((lengthPx * scaleMmPerPx) / 1000) * heightM,
            }),
        );
    }

    /**
     * Wall-board surface area in m² grouped by the editor's exact board type.
     * Flat walls use the resolved room/page height. Raked walls use a
     * trapezoid per edge, interpolating the ceiling height at both endpoints
     * between the configured low and high ceiling edges.
     */
    public static wallAreaM2ByBoardType(
        area: AreaPolygon,
        scaleMmPerPx: number,
        pageHeightMm: number | null,
    ): { boardType: WallBoardType; areaM2: number }[] {
        const flatHeightMm = OverlayGeometryHelper.effectiveFlatHeight(
            area,
            pageHeightMm,
        );
        const totals = new Map<WallBoardType, number>();
        OverlayGeometryHelper.wallEdgeLengths(area).forEach(
            ({ boardType, lengthPx, start, end }) => {
                const startHeightMm = OverlayGeometryHelper.wallHeightMmAt(
                    area,
                    start,
                    flatHeightMm,
                );
                const endHeightMm = OverlayGeometryHelper.wallHeightMmAt(
                    area,
                    end,
                    flatHeightMm,
                );
                if (startHeightMm == null || endHeightMm == null) return;
                const lengthM = (lengthPx * scaleMmPerPx) / 1000;
                const averageHeightM = (startHeightMm + endHeightMm) / 2 / 1000;
                totals.set(
                    boardType,
                    (totals.get(boardType) ?? 0) + lengthM * averageHeightM,
                );
            },
        );
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
    private static wallEdgeLengths(area: AreaPolygon): WallEdgeLength[] {
        if (area.isOutdoor) return [];
        if (area.points.length < 2) return [];
        return area.points.flatMap((point, index) => {
            const override = area.edgeOverrides?.[String(index)];
            if (override?.noPlaster) return [];
            const boardType = BoardMaterialsHelper.normalizeWallBoardType(
                override?.wallBoardType ?? area.wallBoardType,
                override?.wallPlasterType ?? area.wallPlasterType,
            );
            const profile = BoardMaterialsHelper.normalizeWallBoardProfile(
                override?.wallBoardProfile ?? area.wallBoardProfile,
            );
            const next = OverlayGeometryHelper.pointAt(
                area.points,
                (index + 1) % area.points.length,
            );
            const lengthPx = OverlayGeometryHelper.pointDistance(point, next);
            return [{ boardType, profile, lengthPx, start: point, end: next }];
        });
    }

    private static wallHeightMmAt(
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
        const lowMid = OverlayGeometryHelper.edgeMidpoint(
            area.points,
            raked.lowEdgeIndex,
        );
        const highMid = OverlayGeometryHelper.edgeMidpoint(
            area.points,
            raked.highEdgeIndex,
        );
        if (!lowMid || !highMid) return flatFallbackMm;
        const runX = highMid[0] - lowMid[0];
        const runY = highMid[1] - lowMid[1];
        const runSquared = runX * runX + runY * runY;
        if (runSquared <= 0) return flatFallbackMm;
        const position = OverlayGeometryHelper.clamp(
            ((point[0] - lowMid[0]) * runX + (point[1] - lowMid[1]) * runY) /
                runSquared,
            0,
            1,
        );
        return (
            raked.lowHeightMm +
            (raked.highHeightMm - raked.lowHeightMm) * position
        );
    }

    public static polygonArea(points: Point[]): number {
        if (points.length < 3) return 0;
        const sum = points.reduce((total, point, index) => {
            const next = OverlayGeometryHelper.pointAt(
                points,
                (index + 1) % points.length,
            );
            return total + point[0] * next[1] - next[0] * point[1];
        }, 0);
        return Math.abs(sum / 2);
    }

    public static ceilingAreaM2ForArea(
        area: AreaPolygon,
        scaleMmPerPx: number,
    ): number {
        const flatM2 = OverlayGeometryHelper.flatAreaM2(
            area.points,
            scaleMmPerPx,
        );
        const raked = area.ceilingMode === "raked" ? area.rakedCeiling : null;
        if (
            !raked ||
            raked.lowHeightMm == null ||
            raked.highHeightMm == null ||
            raked.lowEdgeIndex === raked.highEdgeIndex
        ) {
            return flatM2;
        }
        const lowMid = OverlayGeometryHelper.edgeMidpoint(
            area.points,
            raked.lowEdgeIndex,
        );
        const highMid = OverlayGeometryHelper.edgeMidpoint(
            area.points,
            raked.highEdgeIndex,
        );
        if (!lowMid || !highMid) return flatM2;
        const runM =
            (OverlayGeometryHelper.pointDistance(lowMid, highMid) *
                scaleMmPerPx) /
            1000;
        if (runM <= 0) return flatM2;
        const riseM = Math.abs(raked.highHeightMm - raked.lowHeightMm) / 1000;
        return flatM2 * Math.sqrt(1 + Math.pow(riseM / runM, 2));
    }

    public static edgeMidpoint(
        points: Point[],
        edgeIndex: number,
    ): Point | null {
        if (edgeIndex < 0 || edgeIndex >= points.length) return null;
        const a = OverlayGeometryHelper.pointAt(points, edgeIndex);
        const b = OverlayGeometryHelper.pointAt(
            points,
            (edgeIndex + 1) % points.length,
        );
        return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    }

    public static effectiveFlatHeight(
        area: AreaPolygon,
        pageHeightMm: number | null,
    ): number | null {
        return area.ceilingHeightMm ?? pageHeightMm ?? null;
    }

    public static clamp(value: number, min: number, max: number): number {
        return Math.min(max, Math.max(min, value));
    }

    /**
     * Floor area in m² for one area: the same flat-footprint math
     * `ceilingAreaM2ForArea()` uses before its raked-ceiling adjustment,
     * exposed directly. A floor is always flat — unlike a raked ceiling, it
     * never gains area from a rising roofline — so this intentionally
     * doesn't apply `ceilingAreaM2ForArea()`'s raked-ceiling slope factor.
     */
    public static floorAreaM2ForArea(
        area: AreaPolygon,
        scaleMmPerPx: number,
    ): number {
        return OverlayGeometryHelper.flatAreaM2(area.points, scaleMmPerPx);
    }

    /**
     * Total perimeter length in px for a closed polygon: every edge,
     * including the edge that closes the loop from the last point back to
     * the first. Modeled on `polygonArea()`'s reduce-over-edges shape.
     */
    public static perimeterLengthPx(points: Point[]): number {
        if (points.length < 2) return 0;
        return points.reduce((total, point, index) => {
            const next = OverlayGeometryHelper.pointAt(
                points,
                (index + 1) % points.length,
            );
            return total + OverlayGeometryHelper.pointDistance(point, next);
        }, 0);
    }

    /**
     * `perimeterLengthPx()` converted to metres via `scaleMmPerPx` — the
     * `CORNICE_LENGTH` quantity source measures the full perimeter of a
     * room with no `WallPlasterCategory` split (cove cornice is one product
     * regardless of the wall board behind it).
     */
    public static perimeterLengthMForArea(
        area: AreaPolygon,
        scaleMmPerPx: number,
    ): number {
        return (
            (OverlayGeometryHelper.perimeterLengthPx(area.points) *
                scaleMmPerPx) /
            1000
        );
    }

    /** Shoelace polygon area converted to m² via `scaleMmPerPx`, with no height/slope factor applied. */
    private static flatAreaM2(points: Point[], scaleMmPerPx: number): number {
        return (
            OverlayGeometryHelper.polygonArea(points) *
            Math.pow(scaleMmPerPx / 1000, 2)
        );
    }
}
