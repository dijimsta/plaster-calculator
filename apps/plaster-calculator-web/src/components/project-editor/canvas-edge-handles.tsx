import { OverlayGeometryHelper } from "@libraries/plaster-calculator-common";
import { useRef, type RefObject } from "react";
import { Line } from "react-konva";

import { cloneOverlay } from "../../lib/editor/overlay-serialization.js";

import type { DragState } from "./project-editor.types.js";
import type {
    AreaPolygon,
    Overlay,
    Point,
} from "@libraries/plaster-calculator-common";
import type { KonvaEventObject } from "konva/lib/Node.js";

interface CanvasEdgeHandlesProps {
    readonly commitFromSnapshot: (before: Overlay, next: Overlay) => void;
    readonly isDrawingFreeShape: boolean;
    readonly isSettingReference: boolean;
    readonly overlayRef: RefObject<Overlay>;
    readonly visibleAreas: AreaPolygon[];
    readonly zoom: number;
    readonly selectEdge: (areaId: string, edgeIndex: number) => void;
    readonly setDirty: (dirty: boolean) => void;
    readonly setOverlay: (overlay: Overlay) => void;
}

export function CanvasEdgeHandles({
    commitFromSnapshot,
    isDrawingFreeShape,
    isSettingReference,
    overlayRef,
    visibleAreas,
    zoom,
    selectEdge,
    setDirty,
    setOverlay,
}: CanvasEdgeHandlesProps) {
    const edgeDragRef = useRef<DragState | null>(null);

    return (
        <>
            {visibleAreas.map((area) =>
                area.points.map((point, index) => {
                    const nextIndex = (index + 1) % area.points.length;
                    const next = OverlayGeometryHelper.pointAt(
                        area.points,
                        nextIndex,
                    );
                    return (
                        <Line
                            key={`edge-hit-${area.id}-${index}`}
                            points={[point[0], point[1], next[0], next[1]]}
                            stroke="transparent"
                            strokeWidth={18 / zoom}
                            draggable={
                                !isSettingReference && !isDrawingFreeShape
                            }
                            onClick={(event) => {
                                if (isSettingReference || isDrawingFreeShape)
                                    return;
                                event.cancelBubble = true;
                                selectEdge(area.id, index);
                            }}
                            onMouseEnter={(event) => {
                                event.target
                                    .getStage()!
                                    .container().style.cursor = cursorForEdge(
                                    point,
                                    next,
                                );
                            }}
                            onMouseLeave={(event) => {
                                event.target
                                    .getStage()!
                                    .container().style.cursor =
                                    isSettingReference || isDrawingFreeShape
                                        ? "crosshair"
                                        : "grab";
                            }}
                            onDragStart={(event) => {
                                event.cancelBubble = true;
                                const pointer = clientPoint(event);
                                edgeDragRef.current = {
                                    before: cloneOverlay(overlayRef.current),
                                    startClientX: pointer.x,
                                    startClientY: pointer.y,
                                };
                            }}
                            onDragMove={(event) => {
                                event.cancelBubble = true;
                                const drag = edgeDragRef.current;
                                if (!drag) return;
                                const rawOffset = dragOffset(drag, event, zoom);
                                event.target.position({ x: 0, y: 0 });
                                const offset = constrainEdgeDrag(
                                    drag.before,
                                    area.id,
                                    index,
                                    rawOffset.dx,
                                    rawOffset.dy,
                                );
                                setOverlay(
                                    moveEdge(
                                        drag.before,
                                        area.id,
                                        index,
                                        nextIndex,
                                        offset,
                                    ),
                                );
                                setDirty(true);
                            }}
                            onDragEnd={(event) => {
                                event.cancelBubble = true;
                                const pointer = clientPoint(event);
                                const drag = edgeDragRef.current ?? {
                                    before: cloneOverlay(overlayRef.current),
                                    startClientX: pointer.x,
                                    startClientY: pointer.y,
                                };
                                const rawOffset = dragOffset(drag, event, zoom);
                                event.target.position({ x: 0, y: 0 });
                                const offset = constrainEdgeDrag(
                                    drag.before,
                                    area.id,
                                    index,
                                    rawOffset.dx,
                                    rawOffset.dy,
                                );
                                const nextOverlay = moveEdge(
                                    drag.before,
                                    area.id,
                                    index,
                                    nextIndex,
                                    offset,
                                );
                                edgeDragRef.current = null;
                                commitFromSnapshot(drag.before, nextOverlay);
                            }}
                        />
                    );
                }),
            )}
        </>
    );
}

function cursorForEdge(from: Point, to: Point): string {
    const angle = Math.abs(
        (Math.atan2(to[1] - from[1], to[0] - from[0]) * 180) / Math.PI,
    );
    const normalized = angle > 90 ? 180 - angle : angle;
    if (normalized < 22.5) return "ns-resize";
    if (normalized < 67.5)
        return (to[1] - from[1]) * (to[0] - from[0]) >= 0
            ? "nesw-resize"
            : "nwse-resize";
    return "ew-resize";
}

function constrainEdgeDrag(
    overlaySnapshot: Overlay,
    areaId: string,
    edgeIndex: number,
    dx: number,
    dy: number,
): { dx: number; dy: number } {
    const area = overlaySnapshot.areas.find((item) => item.id === areaId);
    if (!area || area.points.length < 2) return { dx, dy };
    const from = area.points[edgeIndex];
    const to = area.points[(edgeIndex + 1) % area.points.length];
    if (!from || !to) return { dx, dy };
    const angle = Math.abs(
        (Math.atan2(to[1] - from[1], to[0] - from[0]) * 180) / Math.PI,
    );
    const normalized = angle > 90 ? 180 - angle : angle;
    if (normalized < 22.5) return { dx: 0, dy };
    if (normalized > 67.5) return { dx, dy: 0 };
    return { dx, dy };
}

function moveEdge(
    overlay: Overlay,
    areaId: string,
    edgeIndex: number,
    nextIndex: number,
    offset: { dx: number; dy: number },
): Overlay {
    return {
        ...overlay,
        areas: overlay.areas.map((currentArea) =>
            currentArea.id === areaId
                ? {
                      ...currentArea,
                      points: currentArea.points.map((point, pointIndex) =>
                          pointIndex === edgeIndex || pointIndex === nextIndex
                              ? ([
                                    point[0] + offset.dx,
                                    point[1] + offset.dy,
                                ] as Point)
                              : point,
                      ),
                  }
                : currentArea,
        ),
    };
}

function clientPoint(event: KonvaEventObject<MouseEvent | TouchEvent>): {
    x: number;
    y: number;
} {
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
