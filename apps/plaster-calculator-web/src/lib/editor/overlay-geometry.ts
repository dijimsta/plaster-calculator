import type { AreaPolygon, Point } from "../../types.js";

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
    if (area.isOutdoor) return [];
    if (area.points.length < 2) return [];
    const totals = new Map<string, number>();
    area.points.forEach((point, index) => {
        const override = area.edgeOverrides?.[String(index)];
        if (override?.noPlaster) return;
        const type = override?.wallPlasterType ?? area.wallPlasterType;
        const next = pointAt(area.points, (index + 1) % area.points.length);
        totals.set(type, (totals.get(type) ?? 0) + pointDistance(point, next));
    });
    return Array.from(totals.entries()).map(([type, lengthPx]) => ({
        type,
        lengthPx,
    }));
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
    const flatM2 = polygonArea(area.points) * Math.pow(scaleMmPerPx / 1000, 2);
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
