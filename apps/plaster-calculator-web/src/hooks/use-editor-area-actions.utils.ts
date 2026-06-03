import {
    DEFAULT_CEILING_BOARD_TYPE,
    DEFAULT_WALL_BOARD_PROFILE,
    DEFAULT_WALL_BOARD_TYPE,
} from "../lib/editor/board-materials.js";
import { splitEdgeOverrides } from "../lib/editor/edge-overrides.js";
import { pathLengthBetween } from "../lib/editor/overlay-geometry.js";

import type { AreaPolygon, Point } from "../types.js";

interface ViewportCenterOptions {
    readonly element: HTMLDivElement | null;
    readonly imageHeight: number;
    readonly imageWidth: number;
    readonly viewport: { readonly width: number; readonly height: number };
    readonly zoom: number;
}

export function createManualArea(label: string, points: Point[]): AreaPolygon {
    return {
        id: crypto.randomUUID(),
        label,
        points,
        wallBoardProfile: DEFAULT_WALL_BOARD_PROFILE,
        wallBoardType: DEFAULT_WALL_BOARD_TYPE,
        ceilingPlasterType: DEFAULT_CEILING_BOARD_TYPE,
        isOutdoor: false,
        source: "manual",
        deleted: false,
    };
}

export function splitAreaPart(
    area: AreaPolygon,
    points: Point[],
    start: number,
    end: number,
    suffix: "A" | "B",
): AreaPolygon {
    return {
        ...area,
        id: crypto.randomUUID(),
        label: `${area.label} ${suffix}`,
        points,
        edgeOverrides: splitEdgeOverrides(
            area,
            start,
            end,
            suffix === "A" ? "first" : "second",
        ),
        source: "manual",
    };
}

export function pointsRemovedByStraighten(
    area: AreaPolygon,
    a: number,
    b: number,
): Set<number> {
    const forwardLength = pathLengthBetween(area.points, a, b, 1);
    const backwardLength = pathLengthBetween(area.points, b, a, 1);
    const removeForward = forwardLength <= backwardLength;
    const removed = new Set<number>();
    if (removeForward) {
        for (let i = a + 1; i < b; i += 1) removed.add(i);
    } else {
        for (let i = b + 1; i < area.points.length; i += 1) removed.add(i);
        for (let i = 0; i < a; i += 1) removed.add(i);
    }
    return removed;
}

export function viewportCenterInImage({
    element,
    imageHeight,
    imageWidth,
    viewport,
    zoom,
}: ViewportCenterOptions): Point {
    const scrollLeft = element?.scrollLeft ?? 0;
    const scrollTop = element?.scrollTop ?? 0;
    return [
        clamp((scrollLeft + viewport.width / 2) / zoom, 0, imageWidth),
        clamp((scrollTop + viewport.height / 2) / zoom, 0, imageHeight),
    ];
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}
