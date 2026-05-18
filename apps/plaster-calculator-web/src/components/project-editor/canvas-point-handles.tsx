import { useRef } from "react";
import { Circle } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node.js";
import type { AreaPolygon, Overlay, Point } from "../../types.js";
import { activeTheme } from "../../lib/styles.js";
import { cloneOverlay } from "../../lib/editor/overlay-serialization.js";
import { pointAt } from "../../lib/editor/overlay-geometry.js";
import { snapToReferences } from "../../lib/editor/snap-guides.js";
import type { DragState, SnapGuide } from "./project-editor.types.js";
import type { SelectedEdge } from "../../hooks/use-editor-selection.js";
import type { CanvasPointHandlesProps } from "./canvas-point-handles.types.js";

const SELECTED_COLOR = activeTheme.editor.selected;
const SELECTED_POINT_COLOR = activeTheme.editor.selectedPoint;

export function CanvasPointHandles({
    commitFromSnapshot,
    isDrawingFreeShape,
    isSettingReference,
    overlayRef,
    selectedArea,
    selectedAreaIds,
    selectedEdge,
    selectedPoint,
    selectedPointIndexes,
    zoom,
    selectPoint,
    setDirty,
    setOverlay,
    setSnapGuide,
}: CanvasPointHandlesProps) {
    const pointDragRef = useRef<DragState | null>(null);

    return (
        <>
            {selectedArea?.points.map((point, index) => (
                <Circle
                    key={`${selectedArea.id}-${index}`}
                    x={point[0]}
                    y={point[1]}
                    radius={
                        (selectedEdge?.areaId === selectedArea.id &&
                        (selectedEdge.edgeIndex === index ||
                            (selectedEdge.edgeIndex + 1) %
                                selectedArea.points.length ===
                                index)
                            ? 9
                            : 7) / zoom
                    }
                    fill={pointFill({
                        index,
                        selectedArea,
                        selectedAreaIds,
                        selectedEdge,
                        selectedPoint,
                        selectedPointIndexes,
                    })}
                    stroke="white"
                    strokeWidth={
                        (selectedEdge?.areaId === selectedArea.id &&
                        (selectedEdge.edgeIndex === index ||
                            (selectedEdge.edgeIndex + 1) %
                                selectedArea.points.length ===
                                index)
                            ? 3
                            : 2) / zoom
                    }
                    draggable={!isSettingReference && !isDrawingFreeShape}
                    onClick={(event) => {
                        if (isSettingReference || isDrawingFreeShape) return;
                        event.cancelBubble = true;
                        selectPoint(
                            index,
                            event.evt.ctrlKey || event.evt.metaKey,
                        );
                    }}
                    onDragStart={(event) => {
                        event.cancelBubble = true;
                        const pointer = clientPoint(event);
                        pointDragRef.current = {
                            before: cloneOverlay(overlayRef.current),
                            startClientX: pointer.x,
                            startClientY: pointer.y,
                        };
                    }}
                    onDragMove={(event) => {
                        event.cancelBubble = true;
                        const drag = pointDragRef.current;
                        if (!drag) return;
                        const snapped = movedPointFromDrag(
                            drag,
                            selectedArea,
                            index,
                            event,
                            zoom,
                        );
                        const nextPoint = snapped.point;
                        event.target.position({
                            x: nextPoint[0],
                            y: nextPoint[1],
                        });
                        setSnapGuide(snapped.guide);
                        setOverlay(movePoint(drag.before, selectedArea.id, index, nextPoint));
                        setDirty(true);
                    }}
                    onDragEnd={(event) => {
                        event.cancelBubble = true;
                        const pointer = clientPoint(event);
                        const drag = pointDragRef.current ?? {
                            before: cloneOverlay(overlayRef.current),
                            startClientX: pointer.x,
                            startClientY: pointer.y,
                        };
                        const snapped = movedPointFromDrag(
                            drag,
                            selectedArea,
                            index,
                            event,
                            zoom,
                        );
                        const nextPoint = snapped.point;
                        event.target.position({
                            x: nextPoint[0],
                            y: nextPoint[1],
                        });
                        const next = movePoint(
                            drag.before,
                            selectedArea.id,
                            index,
                            nextPoint,
                        );
                        pointDragRef.current = null;
                        commitFromSnapshot(drag.before, next);
                        setSnapGuide(null);
                    }}
                />
            ))}
        </>
    );
}

function pointFill({
    index,
    selectedArea,
    selectedAreaIds,
    selectedEdge,
    selectedPoint,
    selectedPointIndexes,
}: {
    readonly index: number;
    readonly selectedArea: AreaPolygon;
    readonly selectedAreaIds: string[];
    readonly selectedEdge: SelectedEdge | null;
    readonly selectedPoint: number | null;
    readonly selectedPointIndexes: number[];
}): string {
    if (selectedPointIndexes.includes(index)) return SELECTED_POINT_COLOR;
    const isSelectedEdgePoint =
        selectedEdge?.areaId === selectedArea.id &&
        (selectedEdge.edgeIndex === index ||
            (selectedEdge.edgeIndex + 1) % selectedArea.points.length === index);
    const isSelectedAreaPoint =
        !selectedEdge &&
        selectedAreaIds.includes(selectedArea.id) &&
        selectedPoint == null &&
        selectedPointIndexes.length === 0;
    if (isSelectedEdgePoint || isSelectedAreaPoint) return SELECTED_COLOR;
    return activeTheme.editor.point;
}

function movePoint(
    overlay: Overlay,
    areaId: string,
    pointIndex: number,
    nextPoint: Point,
): Overlay {
    return {
        ...overlay,
        areas: overlay.areas.map((area) =>
            area.id === areaId
                ? {
                      ...area,
                      points: area.points.map((point, index) =>
                          index === pointIndex ? nextPoint : point,
                      ),
                  }
                : area,
        ),
    };
}

function movedPointFromDrag(
    drag: DragState,
    area: AreaPolygon,
    pointIndex: number,
    event: KonvaEventObject<MouseEvent | TouchEvent>,
    zoom: number,
): { point: Point; guide: SnapGuide } {
    const offset = dragOffset(drag, event, zoom);
    const snapshotArea =
        drag.before.areas.find((item) => item.id === area.id) ?? area;
    const originalPoint =
        snapshotArea.points[pointIndex] ?? pointAt(area.points, pointIndex);
    const pointerPoint: Point = [
        originalPoint[0] + offset.dx,
        originalPoint[1] + offset.dy,
    ];
    return snapDraggedPoint(snapshotArea, pointIndex, pointerPoint, zoom);
}

function snapDraggedPoint(
    area: AreaPolygon,
    pointIndex: number,
    pointer: Point,
    zoom: number,
): { point: Point; guide: SnapGuide } {
    const previous = pointAt(
        area.points,
        (pointIndex - 1 + area.points.length) % area.points.length,
    );
    const next = pointAt(area.points, (pointIndex + 1) % area.points.length);
    return snapToReferences(pointer, [previous, next], zoom);
}

function clientPoint(
    event: KonvaEventObject<MouseEvent | TouchEvent>,
): { x: number; y: number } {
    const evt = event.evt;
    if ("touches" in evt) {
        const touch = evt.touches[0] ?? evt.changedTouches[0];
        return { x: touch?.clientX ?? 0, y: touch?.clientY ?? 0 };
    }
    return { x: evt.clientX, y: evt.clientY };
}

function dragOffset(
    drag: DragState,
    event: KonvaEventObject<MouseEvent | TouchEvent>,
    zoom: number,
): { dx: number; dy: number } {
    const pointer = clientPoint(event);
    return {
        dx: (pointer.x - drag.startClientX) / zoom,
        dy: (pointer.y - drag.startClientY) / zoom,
    };
}
