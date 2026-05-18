import {
    edgeOverridesAfterInsert,
    edgeOverridesAfterRemoveMany,
    rakedAfterPointRemoval,
    splitEdgeOverrides,
} from "../lib/editor/edge-overrides.js";
import {
    clamp,
    pathLengthBetween,
    pointAt,
} from "../lib/editor/overlay-geometry.js";

import type { AreaPolygon, Point } from "../types.js";
import type {
    EditorActionsOptions,
    UpdateArea,
} from "./use-editor-actions.types.js";

interface AreaActionsOptions extends Pick<
    EditorActionsOptions,
    | "canvasWrapRef"
    | "commit"
    | "imageHeight"
    | "imageWidth"
    | "overlay"
    | "selectedArea"
    | "selectedEdge"
    | "selectedPoint"
    | "selectedPointIndexes"
    | "viewport"
    | "zoom"
    | "setAddMenuOpen"
    | "setDraftPointer"
    | "setDraftPoints"
    | "setIsDrawingFreeShape"
    | "setSelectedAreaId"
    | "setSelectedAreaIds"
    | "setSelectedEdge"
    | "setSelectedPoint"
    | "setSelectedPointIndexes"
    | "setSnapGuide"
    | "setStatus"
> {
    readonly updateArea: UpdateArea;
}

export function useEditorAreaActions(options: AreaActionsOptions) {
    const {
        canvasWrapRef,
        commit,
        imageHeight,
        imageWidth,
        overlay,
        selectedArea,
        selectedEdge,
        selectedPoint,
        selectedPointIndexes,
        viewport,
        zoom,
        setAddMenuOpen,
        setDraftPointer,
        setDraftPoints,
        setIsDrawingFreeShape,
        setSelectedAreaId,
        setSelectedAreaIds,
        setSelectedEdge,
        setSelectedPoint,
        setSelectedPointIndexes,
        setSnapGuide,
        setStatus,
        updateArea,
    } = options;

    function addRectangle() {
        const center = viewportCenterInImage();
        const width = 220;
        const height = 160;
        const x = clamp(
            Math.round(center[0] - width / 2),
            0,
            Math.max(0, imageWidth - width),
        );
        const y = clamp(
            Math.round(center[1] - height / 2),
            0,
            Math.max(0, imageHeight - height),
        );
        const area = createManualArea(`Area ${visibleAreaCount() + 1}`, [
            [x, y],
            [x + width, y],
            [x + width, y + height],
            [x, y + height],
        ]);
        commit({ ...overlay, areas: [...overlay.areas, area] });
        selectOnlyArea(area.id);
        setAddMenuOpen(false);
    }

    function startFreeShape() {
        setDraftPoints([]);
        setDraftPointer(null);
        setSnapGuide(null);
        setIsDrawingFreeShape(true);
        setAddMenuOpen(false);
        setStatus(
            "Click points for a free shape. Click the first point to finish.",
        );
    }

    function finishFreeShape(points: Point[]) {
        if (points.length < 3) return;
        const area = createManualArea(`Area ${visibleAreaCount() + 1}`, points);
        commit({ ...overlay, areas: [...overlay.areas, area] });
        selectOnlyArea(area.id);
        setDraftPoints([]);
        setDraftPointer(null);
        setSnapGuide(null);
        setIsDrawingFreeShape(false);
    }

    function cancelFreeShape() {
        setDraftPoints([]);
        setDraftPointer(null);
        setSnapGuide(null);
        setIsDrawingFreeShape(false);
        setStatus("Free shape cancelled");
    }

    function addPoint() {
        if (!selectedArea || selectedArea.points.length < 2) return;
        const anchorIndex =
            selectedEdge?.areaId === selectedArea.id
                ? selectedEdge.edgeIndex
                : (selectedPoint ?? 0);
        const nextIndex = (anchorIndex + 1) % selectedArea.points.length;
        const a = pointAt(selectedArea.points, anchorIndex);
        const b = pointAt(selectedArea.points, nextIndex);
        const point: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        updateArea(selectedArea.id, (area) => ({
            ...area,
            points: [
                ...area.points.slice(0, anchorIndex + 1),
                point,
                ...area.points.slice(anchorIndex + 1),
            ],
            edgeOverrides: edgeOverridesAfterInsert(
                area.edgeOverrides,
                anchorIndex,
            ),
        }));
        setSelectedPoint(anchorIndex + 1);
        setSelectedPointIndexes([anchorIndex + 1]);
        setSelectedEdge(null);
    }

    function deleteSelection() {
        if (selectedArea && selectedPointIndexes.length > 0) {
            removeSelectedPoints();
            return;
        }
        deleteArea();
    }

    function splitArea() {
        if (!selectedArea || selectedPointIndexes.length !== 2) {
            setStatus("Select two points with Ctrl-click before splitting");
            return;
        }
        const sorted = [...selectedPointIndexes].sort((a, b) => a - b);
        const start = sorted[0];
        const end = sorted[1];
        if (start == null || end == null) return;
        const firstPoints = selectedArea.points.slice(start, end + 1);
        const secondPoints = [
            ...selectedArea.points.slice(end),
            ...selectedArea.points.slice(0, start + 1),
        ];
        if (firstPoints.length < 3 || secondPoints.length < 3) {
            setStatus("Choose two non-adjacent points to split");
            return;
        }
        const first = splitAreaPart(selectedArea, firstPoints, start, end, "A");
        const second = splitAreaPart(
            selectedArea,
            secondPoints,
            start,
            end,
            "B",
        );
        commit({
            ...overlay,
            areas: overlay.areas
                .map((area) =>
                    area.id === selectedArea.id
                        ? { ...area, deleted: true }
                        : area,
                )
                .concat(first, second),
        });
        selectOnlyArea(first.id);
        clearPointAndEdgeSelection();
    }

    function straightenSelectedPoints() {
        if (!selectedArea || selectedPointIndexes.length !== 2) {
            setStatus("Select two points before straightening");
            return;
        }
        const sorted = [...selectedPointIndexes].sort(
            (left, right) => left - right,
        );
        const a = sorted[0];
        const b = sorted[1];
        if (a == null || b == null) return;
        const removed = pointsRemovedByStraighten(selectedArea, a, b);
        if (removed.size === 0) {
            setStatus("The selected points are already connected");
            return;
        }
        if (selectedArea.points.length - removed.size < 3) {
            setStatus("Straighten would leave fewer than 3 points");
            return;
        }
        updateArea(selectedArea.id, (area) => ({
            ...area,
            points: area.points.filter((_, index) => !removed.has(index)),
            edgeOverrides: edgeOverridesAfterRemoveMany(
                area.edgeOverrides,
                removed,
                area.points.length,
            ),
            rakedCeiling: rakedAfterPointRemoval(area, removed),
        }));
        clearPointAndEdgeSelection();
    }

    return {
        addPoint,
        addRectangle,
        cancelFreeShape,
        deleteSelection,
        finishFreeShape,
        splitArea,
        startFreeShape,
        straightenSelectedPoints,
    };

    function removeSelectedPoints() {
        if (!selectedArea || selectedPointIndexes.length === 0) return;
        const removed = Array.from(new Set(selectedPointIndexes)).sort(
            (a, b) => a - b,
        );
        if (selectedArea.points.length - removed.length < 3) {
            setStatus("A polygon needs at least 3 points");
            return;
        }
        const removedSet = new Set(removed);
        updateArea(selectedArea.id, (area) => ({
            ...area,
            points: area.points.filter((_, index) => !removedSet.has(index)),
            edgeOverrides: edgeOverridesAfterRemoveMany(
                area.edgeOverrides,
                removedSet,
                area.points.length,
            ),
            rakedCeiling: rakedAfterPointRemoval(area, removedSet),
        }));
        clearPointAndEdgeSelection();
    }

    function deleteArea() {
        if (!selectedArea) return;
        updateArea(selectedArea.id, (area) => ({ ...area, deleted: true }));
        setSelectedAreaId(null);
        setSelectedAreaIds([]);
        setSelectedEdge(null);
    }

    function viewportCenterInImage(): Point {
        const element = canvasWrapRef.current;
        const scrollLeft = element?.scrollLeft ?? 0;
        const scrollTop = element?.scrollTop ?? 0;
        return [
            clamp((scrollLeft + viewport.width / 2) / zoom, 0, imageWidth),
            clamp((scrollTop + viewport.height / 2) / zoom, 0, imageHeight),
        ];
    }

    function createManualArea(label: string, points: Point[]): AreaPolygon {
        return {
            id: crypto.randomUUID(),
            label,
            points,
            wallPlasterType: "Recessed Edge",
            ceilingPlasterType: "Recessed Edge",
            isOutdoor: false,
            source: "manual",
            deleted: false,
        };
    }

    function splitAreaPart(
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

    function pointsRemovedByStraighten(
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

    function selectOnlyArea(areaId: string) {
        setSelectedAreaId(areaId);
        setSelectedAreaIds([areaId]);
    }

    function clearPointAndEdgeSelection() {
        setSelectedPoint(null);
        setSelectedPointIndexes([]);
        setSelectedEdge(null);
    }

    function visibleAreaCount() {
        return overlay.areas.filter((area) => !area.deleted).length;
    }
}
