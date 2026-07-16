import { BoardMaterialsHelper } from "./board-materials.helper.ts";

import type { AreaPolygon, EdgeOverride, Point } from "./schemas/index.ts";

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
        if (area.isOutdoor) return [];
        if (area.points.length < 2) return [];
        const totals = new Map<string, number>();
        area.points.forEach((point, index) => {
            const override = area.edgeOverrides?.[String(index)];
            if (override?.noPlaster) return;
            const type = OverlayGeometryHelper.effectiveWallMaterialLabel(
                area,
                override,
            );
            const next = OverlayGeometryHelper.pointAt(
                area.points,
                (index + 1) % area.points.length,
            );
            totals.set(
                type,
                (totals.get(type) ?? 0) +
                    OverlayGeometryHelper.pointDistance(point, next),
            );
        });
        return Array.from(totals.entries()).map(([type, lengthPx]) => ({
            type,
            lengthPx,
        }));
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
        const flatM2 =
            OverlayGeometryHelper.polygonArea(area.points) *
            Math.pow(scaleMmPerPx / 1000, 2);
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

    private static effectiveWallMaterialLabel(
        area: AreaPolygon,
        override: EdgeOverride | undefined,
    ) {
        return BoardMaterialsHelper.wallMaterialLabel({
            wallBoardProfile:
                override?.wallBoardProfile ?? area.wallBoardProfile,
            wallBoardType: override?.wallBoardType ?? area.wallBoardType,
            wallPlasterType: override?.wallPlasterType ?? area.wallPlasterType,
        });
    }
}
