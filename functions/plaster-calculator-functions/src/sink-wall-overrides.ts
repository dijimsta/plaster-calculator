import type { AnalyzerPolygon, OverlayArea, Point } from "./types.js";

const MAX_SINK_WALL_DISTANCE_PX = 65;
const SINK_WALL_BOARD_TYPE = "9mm Villaboard";

export function applySinkWallOverrides(
    areas: OverlayArea[],
    icons: AnalyzerPolygon[],
): void {
    for (const icon of icons) {
        if (icon.label !== "Sink") continue;
        const center = polygonCenter(icon.polygon);
        if (!center) continue;
        const area = areas.find(
            (candidate) =>
                candidate.sourceRoomType !== "Bath" &&
                pointInPolygon(center, candidate.points),
        );
        if (!area) continue;
        const nearestEdge = findNearestEdge(center, area.points);
        if (
            !nearestEdge ||
            nearestEdge.distanceSquared > MAX_SINK_WALL_DISTANCE_PX ** 2
        )
            continue;
        area.edgeOverrides = {
            ...area.edgeOverrides,
            [String(nearestEdge.index)]: {
                ...area.edgeOverrides?.[String(nearestEdge.index)],
                wallBoardType: SINK_WALL_BOARD_TYPE,
            },
        };
    }
}

function polygonCenter(polygon: number[][] | undefined): Point | null {
    if (!polygon?.length) return null;
    const xs = polygon.map((point) => point[0]).filter(isNumber);
    const ys = polygon.map((point) => point[1]).filter(isNumber);
    if (xs.length !== polygon.length || ys.length !== polygon.length)
        return null;
    return [
        (Math.min(...xs) + Math.max(...xs)) / 2,
        (Math.min(...ys) + Math.max(...ys)) / 2,
    ];
}

function isNumber(value: number | undefined): value is number {
    return typeof value === "number";
}

function pointInPolygon(point: Point, polygon: Point[]): boolean {
    let inside = false;
    for (
        let index = 0, previous = polygon.length - 1;
        index < polygon.length;
        previous = index++
    ) {
        const currentPoint = polygon[index];
        const previousPoint = polygon[previous];
        if (!currentPoint || !previousPoint) continue;
        const crosses =
            currentPoint[1] > point[1] !== previousPoint[1] > point[1] &&
            point[0] <
                ((previousPoint[0] - currentPoint[0]) *
                    (point[1] - currentPoint[1])) /
                    (previousPoint[1] - currentPoint[1]) +
                    currentPoint[0];
        if (crosses) inside = !inside;
    }
    return inside;
}

function findNearestEdge(
    point: Point,
    polygon: Point[],
): { index: number; distanceSquared: number } | null {
    if (polygon.length < 2) return null;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (let index = 0; index < polygon.length; index += 1) {
        const start = polygon[index];
        const end = polygon[(index + 1) % polygon.length];
        if (!start || !end) continue;
        const distance = squaredDistanceToSegment(point, start, end);
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
        }
    }
    return { index: nearestIndex, distanceSquared: nearestDistance };
}

function squaredDistanceToSegment(
    point: Point,
    start: Point,
    end: Point,
): number {
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const lengthSquared = dx * dx + dy * dy;
    if (lengthSquared === 0) {
        return (point[0] - start[0]) ** 2 + (point[1] - start[1]) ** 2;
    }
    const projection = Math.max(
        0,
        Math.min(
            1,
            ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) /
                lengthSquared,
        ),
    );
    const closestX = start[0] + projection * dx;
    const closestY = start[1] + projection * dy;
    return (point[0] - closestX) ** 2 + (point[1] - closestY) ** 2;
}
