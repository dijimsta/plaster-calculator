import { useRef, type RefObject } from "react";
import { Line } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node.js";
import type { AreaPolygon, Overlay, Point } from "../../types.js";
import { colorFor } from "../../lib/editor/board-materials.js";
import { cloneOverlay } from "../../lib/editor/overlay-serialization.js";
import type { DragState, OverlayMode } from "./project-editor.types.js";

interface CanvasAreaFillsProps {
    readonly commitFromSnapshot: (before: Overlay, next: Overlay) => void;
    readonly isDrawingFreeShape: boolean;
    readonly isSettingReference: boolean;
    readonly overlayMode: OverlayMode;
    readonly overlayRef: RefObject<Overlay>;
    readonly selectedAreaIds: string[];
    readonly visibleAreas: AreaPolygon[];
    readonly zoom: number;
    readonly selectArea: (areaId: string, additive: boolean) => void;
    readonly setDirty: (dirty: boolean) => void;
    readonly setOverlay: (overlay: Overlay) => void;
}

export function CanvasAreaFills({
    commitFromSnapshot,
    isDrawingFreeShape,
    isSettingReference,
    overlayMode,
    overlayRef,
    selectedAreaIds,
    visibleAreas,
    zoom,
    selectArea,
    setDirty,
    setOverlay,
}: CanvasAreaFillsProps) {
    const polygonDragRef = useRef<DragState | null>(null);

    return (
        <>
            {visibleAreas.map((area) => {
                const active = selectedAreaIds.includes(area.id);
                return (
                    <Line
                        key={area.id}
                        x={0}
                        y={0}
                        points={area.points.flat()}
                        closed
                        draggable={!isSettingReference && !isDrawingFreeShape}
                        fill={
                            overlayMode === "walls"
                                ? "transparent"
                                : colorFor(area.ceilingPlasterType).fill
                        }
                        stroke="transparent"
                        opacity={active ? 1 : 0.86}
                        strokeWidth={0}
                        onClick={(event) => {
                            if (isSettingReference || isDrawingFreeShape)
                                return;
                            event.cancelBubble = true;
                            selectArea(
                                area.id,
                                event.evt.ctrlKey || event.evt.metaKey,
                            );
                        }}
                        onDragStart={(event) => {
                            event.cancelBubble = true;
                            const pointer = clientPoint(event);
                            polygonDragRef.current = {
                                before: cloneOverlay(overlayRef.current),
                                startClientX: pointer.x,
                                startClientY: pointer.y,
                            };
                        }}
                        onDragMove={(event) => {
                            event.cancelBubble = true;
                            const drag = polygonDragRef.current;
                            if (!drag) return;
                            const offset = dragOffset(drag, event, zoom);
                            event.target.position({ x: 0, y: 0 });
                            setOverlay(moveArea(drag.before, area.id, offset));
                            setDirty(true);
                        }}
                        onDragEnd={(event) => {
                            event.cancelBubble = true;
                            const pointer = clientPoint(event);
                            const drag = polygonDragRef.current ?? {
                                before: cloneOverlay(overlayRef.current),
                                startClientX: pointer.x,
                                startClientY: pointer.y,
                            };
                            const offset = dragOffset(drag, event, zoom);
                            event.target.position({ x: 0, y: 0 });
                            const next = moveArea(drag.before, area.id, offset);
                            polygonDragRef.current = null;
                            commitFromSnapshot(drag.before, next);
                        }}
                    />
                );
            })}
        </>
    );
}

function moveArea(
    overlay: Overlay,
    areaId: string,
    offset: { dx: number; dy: number },
): Overlay {
    return {
        ...overlay,
        areas: overlay.areas.map((currentArea) =>
            currentArea.id === areaId
                ? {
                      ...currentArea,
                      points: currentArea.points.map(
                          ([x, y]) => [x + offset.dx, y + offset.dy] as Point,
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
