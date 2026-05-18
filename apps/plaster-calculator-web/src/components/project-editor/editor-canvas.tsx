import { useRef, type RefObject } from "react";
import { Circle, Group, Image as KonvaImage, Layer, Line, Rect, Stage } from "react-konva";
import type { Stage as KonvaStage } from "konva/lib/Stage.js";
import type { KonvaEventObject } from "konva/lib/Node.js";
import type { AreaPolygon, Overlay, Point } from "../../types.js";
import { activeTheme, ui } from "../../lib/styles.js";
import { colorFor } from "../../lib/editor/board-materials.js";
import { cloneOverlay } from "../../lib/editor/overlay-serialization.js";
import { pointAt, pointDistance } from "../../lib/editor/overlay-geometry.js";
import { snapToReferences } from "../../lib/editor/snap-guides.js";
import type { DragState, OverlayMode, SnapGuide } from "./project-editor.types.js";
import type { SelectedEdge } from "../../hooks/use-editor-selection.js";

const SELECTED_COLOR = activeTheme.editor.selected;
const SELECTED_POINT_COLOR = activeTheme.editor.selectedPoint;
const LOW_EDGE_COLOR = activeTheme.editor.lowEdge;
const HIGH_EDGE_COLOR = activeTheme.editor.highEdge;

interface EditorCanvasProps {
    readonly canvasWrapRef: RefObject<HTMLDivElement | null>;
    readonly commitFromSnapshot: (before: Overlay, next: Overlay) => void;
    readonly draftPointer: Point | null;
    readonly draftPoints: Point[];
    readonly image: HTMLImageElement | null;
    readonly imageError: string;
    readonly imageHeight: number;
    readonly imageWidth: number;
    readonly isDrawingFreeShape: boolean;
    readonly isSettingReference: boolean;
    readonly overlayMode: OverlayMode;
    readonly overlayRef: RefObject<Overlay>;
    readonly referencePoints: Point[];
    readonly scrollDragRef: RefObject<ScrollDragState | null>;
    readonly selectedArea: AreaPolygon | null;
    readonly selectedAreaIds: string[];
    readonly selectedEdge: SelectedEdge | null;
    readonly selectedPoint: number | null;
    readonly selectedPointIndexes: number[];
    readonly snapGuide: SnapGuide;
    readonly stageHeight: number;
    readonly stageRef: RefObject<KonvaStage | null>;
    readonly stageWidth: number;
    readonly visibleAreas: AreaPolygon[];
    readonly zoom: number;
    readonly finishFreeShape: (points: Point[]) => void;
    readonly selectArea: (areaId: string, additive: boolean) => void;
    readonly selectEdge: (areaId: string, edgeIndex: number) => void;
    readonly selectPoint: (index: number, additive: boolean) => void;
    readonly setDirty: (dirty: boolean) => void;
    readonly setDraftPointer: (point: Point | null) => void;
    readonly setDraftPoints: (updater: (points: Point[]) => Point[]) => void;
    readonly setIsSettingReference: (value: boolean) => void;
    readonly setOverlay: (overlay: Overlay) => void;
    readonly setReferencePoints: (points: Point[]) => void;
    readonly setSnapGuide: (guide: SnapGuide) => void;
}

interface ScrollDragState {
    x: number;
    y: number;
    scrollLeft: number;
    scrollTop: number;
    moved: boolean;
}

export function EditorCanvas({
    canvasWrapRef,
    commitFromSnapshot,
    draftPointer,
    draftPoints,
    image,
    imageError,
    imageHeight,
    imageWidth,
    isDrawingFreeShape,
    isSettingReference,
    overlayMode,
    overlayRef,
    referencePoints,
    scrollDragRef,
    selectedArea,
    selectedAreaIds,
    selectedEdge,
    selectedPoint,
    selectedPointIndexes,
    snapGuide,
    stageHeight,
    stageRef,
    stageWidth,
    visibleAreas,
    zoom,
    finishFreeShape,
    selectArea,
    selectEdge,
    selectPoint,
    setDirty,
    setDraftPointer,
    setDraftPoints,
    setIsSettingReference,
    setOverlay,
    setReferencePoints,
    setSnapGuide,
}: EditorCanvasProps) {
    const pointDragRef = useRef<DragState | null>(null);
    const polygonDragRef = useRef<DragState | null>(null);
    const edgeDragRef = useRef<DragState | null>(null);

    function onStageClick() {
        if (scrollDragRef.current?.moved) return;
        if (isDrawingFreeShape) {
            const pointer = imagePointer();
            if (!pointer) return;
            const snapped = snapDraftPoint(pointer);
            if (
                draftPoints.length >= 3 &&
                draftPoints[0] &&
                pointDistance(pointer, draftPoints[0]) <= 14 / zoom
            ) {
                finishFreeShape(draftPoints);
            } else {
                setDraftPoints((points) => [...points, snapped.point]);
                setDraftPointer(null);
                setSnapGuide(null);
            }
            return;
        }
        if (!isSettingReference) return;
        const pointer = imagePointer();
        if (!pointer) return;
        if (referencePoints.length === 0) {
            setReferencePoints([pointer]);
        } else {
            const firstReferencePoint = referencePoints[0];
            if (!firstReferencePoint) return;
            setReferencePoints([firstReferencePoint, pointer]);
            setIsSettingReference(false);
        }
    }

    function imagePointer(): Point | null {
        if (!stageRef.current) return null;
        const pointer = stageRef.current.getPointerPosition();
        if (!pointer) return null;
        return [pointer.x / zoom, pointer.y / zoom];
    }

    function startScrollDrag(event: KonvaEventObject<MouseEvent>) {
        if (
            isSettingReference ||
            isDrawingFreeShape ||
            event.target !== event.target.getStage()
        )
            return;
        const element = canvasWrapRef.current;
        if (!element) return;
        scrollDragRef.current = {
            x: event.evt.clientX,
            y: event.evt.clientY,
            scrollLeft: element.scrollLeft,
            scrollTop: element.scrollTop,
            moved: false,
        };
        event.target.getStage()!.container().style.cursor = "grabbing";
    }

    function moveScrollDrag(event: KonvaEventObject<MouseEvent>) {
        if (isDrawingFreeShape) {
            const pointer = imagePointer();
            if (pointer) {
                const snapped = snapDraftPoint(pointer);
                setDraftPointer(snapped.point);
                setSnapGuide(snapped.guide);
            }
        }
        const drag = scrollDragRef.current;
        const element = canvasWrapRef.current;
        if (!drag || !element) return;
        const dx = event.evt.clientX - drag.x;
        const dy = event.evt.clientY - drag.y;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) drag.moved = true;
        element.scrollLeft = drag.scrollLeft - dx;
        element.scrollTop = drag.scrollTop - dy;
    }

    function endScrollDrag(event: KonvaEventObject<MouseEvent>) {
        if (!scrollDragRef.current) return;
        event.target.getStage()!.container().style.cursor =
            isSettingReference || isDrawingFreeShape ? "crosshair" : "grab";
        window.setTimeout(() => {
            scrollDragRef.current = null;
        }, 0);
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
    ): { dx: number; dy: number } {
        const pointer = clientPoint(event);
        return {
            dx: (pointer.x - drag.startClientX) / zoom,
            dy: (pointer.y - drag.startClientY) / zoom,
        };
    }

    function movedPointFromDrag(
        drag: DragState,
        area: AreaPolygon,
        pointIndex: number,
        event: KonvaEventObject<MouseEvent | TouchEvent>,
    ): { point: Point; guide: SnapGuide } {
        const offset = dragOffset(drag, event);
        const snapshotArea =
            drag.before.areas.find((item) => item.id === area.id) ?? area;
        const originalPoint =
            snapshotArea.points[pointIndex] ?? pointAt(area.points, pointIndex);
        const pointerPoint: Point = [
            originalPoint[0] + offset.dx,
            originalPoint[1] + offset.dy,
        ];
        return snapDraggedPoint(snapshotArea, pointIndex, pointerPoint);
    }

    function snapDraftPoint(pointer: Point): { point: Point; guide: SnapGuide } {
        const anchor = draftPoints[draftPoints.length - 1];
        return anchor
            ? snapToReferences(pointer, [anchor], zoom)
            : { point: pointer, guide: null };
    }

    function snapDraggedPoint(
        area: AreaPolygon,
        pointIndex: number,
        pointer: Point,
    ): { point: Point; guide: SnapGuide } {
        const previous = pointAt(
            area.points,
            (pointIndex - 1 + area.points.length) % area.points.length,
        );
        const next = pointAt(
            area.points,
            (pointIndex + 1) % area.points.length,
        );
        return snapToReferences(pointer, [previous, next], zoom);
    }

    return (                <div className={ui.canvasWrap} ref={canvasWrapRef}>
                    {imageError && <p className={ui.error}>{imageError}</p>}
                    <Stage
                        width={stageWidth}
                        height={stageHeight}
                        ref={stageRef}
                        onClick={onStageClick}
                        onMouseEnter={(event) => {
                            event.target.getStage()!.container().style.cursor =
                                isSettingReference || isDrawingFreeShape
                                    ? "crosshair"
                                    : "grab";
                        }}
                        onMouseDown={startScrollDrag}
                        onMouseMove={moveScrollDrag}
                        onMouseUp={endScrollDrag}
                        onMouseLeave={endScrollDrag}
                    >
                        <Layer>
                            <Group scaleX={zoom} scaleY={zoom}>
                                <Rect
                                    width={imageWidth}
                                    height={imageHeight}
                                    fill={activeTheme.editor.stageBg}
                                    listening={false}
                                />
                                {image && (
                                    <KonvaImage
                                        image={image}
                                        width={imageWidth}
                                        height={imageHeight}
                                        listening={false}
                                    />
                                )}
                                {visibleAreas.map((area) => {
                                    const active = selectedAreaIds.includes(
                                        area.id,
                                    );
                                    return (
                                        <Line
                                            key={area.id}
                                            x={0}
                                            y={0}
                                            points={area.points.flat()}
                                            closed
                                            draggable={
                                                !isSettingReference &&
                                                !isDrawingFreeShape
                                            }
                                            fill={
                                                overlayMode === "walls"
                                                    ? "transparent"
                                                    : colorFor(
                                                          area.ceilingPlasterType,
                                                      ).fill
                                            }
                                            stroke="transparent"
                                            opacity={active ? 1 : 0.86}
                                            strokeWidth={0}
                                            onClick={(event) => {
                                                if (
                                                    isSettingReference ||
                                                    isDrawingFreeShape
                                                )
                                                    return;
                                                event.cancelBubble = true;
                                                selectArea(
                                                    area.id,
                                                    event.evt.ctrlKey ||
                                                        event.evt.metaKey,
                                                );
                                            }}
                                            onDragStart={(event) => {
                                                event.cancelBubble = true;
                                                const pointer =
                                                    clientPoint(event);
                                                polygonDragRef.current = {
                                                    before: cloneOverlay(
                                                        overlayRef.current,
                                                    ),
                                                    startClientX: pointer.x,
                                                    startClientY: pointer.y,
                                                };
                                            }}
                                            onDragMove={(event) => {
                                                event.cancelBubble = true;
                                                const drag =
                                                    polygonDragRef.current;
                                                if (!drag) return;
                                                const offset = dragOffset(
                                                    drag,
                                                    event,
                                                );
                                                event.target.position({
                                                    x: 0,
                                                    y: 0,
                                                });
                                                setOverlay({
                                                    ...drag.before,
                                                    areas: drag.before.areas.map(
                                                        (currentArea) =>
                                                            currentArea.id ===
                                                            area.id
                                                                ? {
                                                                      ...currentArea,
                                                                      points: currentArea.points.map(
                                                                          ([
                                                                              x,
                                                                              y,
                                                                          ]) =>
                                                                              [
                                                                                  x +
                                                                                      offset.dx,
                                                                                  y +
                                                                                      offset.dy,
                                                                              ] as Point,
                                                                      ),
                                                                  }
                                                                : currentArea,
                                                    ),
                                                });
                                                setDirty(true);
                                            }}
                                            onDragEnd={(event) => {
                                                event.cancelBubble = true;
                                                const pointer =
                                                    clientPoint(event);
                                                const drag =
                                                    polygonDragRef.current ?? {
                                                        before: cloneOverlay(
                                                            overlayRef.current,
                                                        ),
                                                        startClientX: pointer.x,
                                                        startClientY: pointer.y,
                                                    };
                                                const offset = dragOffset(
                                                    drag,
                                                    event,
                                                );
                                                event.target.position({
                                                    x: 0,
                                                    y: 0,
                                                });
                                                const next = {
                                                    ...drag.before,
                                                    areas: drag.before.areas.map(
                                                        (currentArea) =>
                                                            currentArea.id ===
                                                            area.id
                                                                ? {
                                                                      ...currentArea,
                                                                      points: currentArea.points.map(
                                                                          ([
                                                                              x,
                                                                              y,
                                                                          ]) =>
                                                                              [
                                                                                  x +
                                                                                      offset.dx,
                                                                                  y +
                                                                                      offset.dy,
                                                                              ] as Point,
                                                                      ),
                                                                  }
                                                                : currentArea,
                                                    ),
                                                };
                                                polygonDragRef.current = null;
                                                commitFromSnapshot(
                                                    drag.before,
                                                    next,
                                                );
                                            }}
                                        />
                                    );
                                })}
                                {visibleAreas.map((area) =>
                                    area.points.map((point, index) => {
                                        const nextIndex =
                                            (index + 1) % area.points.length;
                                        const next = pointAt(
                                            area.points,
                                            nextIndex,
                                        );
                                        const override =
                                            area.edgeOverrides?.[String(index)];
                                        const edgeSelected =
                                            selectedEdge?.areaId === area.id &&
                                            selectedEdge.edgeIndex === index;
                                        const areaSelected =
                                            selectedAreaIds.includes(area.id) &&
                                            selectedPoint == null &&
                                            selectedPointIndexes.length === 0;
                                        const selectedStroke =
                                            edgeSelected ||
                                            (!selectedEdge && areaSelected);
                                        const noPlaster = !!override?.noPlaster;
                                        const wallType =
                                            override?.wallPlasterType ??
                                            area.wallPlasterType;
                                        const lowRakedEdge =
                                            area.ceilingMode === "raked" &&
                                            area.rakedCeiling?.lowEdgeIndex ===
                                                index;
                                        const highRakedEdge =
                                            area.ceilingMode === "raked" &&
                                            area.rakedCeiling?.highEdgeIndex ===
                                                index;
                                        const edgeColor = lowRakedEdge
                                            ? LOW_EDGE_COLOR
                                            : highRakedEdge
                                              ? HIGH_EDGE_COLOR
                                              : noPlaster
                                                ? activeTheme.editor.noPlaster
                                                : colorFor(wallType).edge;
                                        return (
                                            <Line
                                                key={`edge-visible-${area.id}-${index}`}
                                                points={[
                                                    point[0],
                                                    point[1],
                                                    next[0],
                                                    next[1],
                                                ]}
                                                stroke={
                                                    overlayMode ===
                                                        "ceilings" ||
                                                    area.isOutdoor
                                                        ? "transparent"
                                                        : selectedStroke
                                                          ? SELECTED_COLOR
                                                          : edgeColor
                                                }
                                                strokeWidth={
                                                    (selectedStroke ||
                                                    lowRakedEdge ||
                                                    highRakedEdge
                                                        ? 6
                                                        : override
                                                          ? 4
                                                          : 3) / zoom
                                                }
                                                dash={
                                                    noPlaster
                                                        ? [10 / zoom, 7 / zoom]
                                                        : undefined
                                                }
                                                opacity={noPlaster ? 0.7 : 1}
                                                listening={false}
                                            />
                                        );
                                    }),
                                )}
                                {visibleAreas.map((area) =>
                                    area.points.map((point, index) => {
                                        const nextIndex =
                                            (index + 1) % area.points.length;
                                        const next = pointAt(
                                            area.points,
                                            nextIndex,
                                        );
                                        return (
                                            <Line
                                                key={`edge-hit-${area.id}-${index}`}
                                                points={[
                                                    point[0],
                                                    point[1],
                                                    next[0],
                                                    next[1],
                                                ]}
                                                stroke="transparent"
                                                strokeWidth={18 / zoom}
                                                draggable={
                                                    !isSettingReference &&
                                                    !isDrawingFreeShape
                                                }
                                                onClick={(event) => {
                                                    if (
                                                        isSettingReference ||
                                                        isDrawingFreeShape
                                                    )
                                                        return;
                                                    event.cancelBubble = true;
                                                    selectEdge(area.id, index);
                                                }}
                                                onMouseEnter={(event) => {
                                                    event.target
                                                        .getStage()!
                                                        .container().style.cursor =
                                                        cursorForEdge(
                                                            point,
                                                            next,
                                                        );
                                                }}
                                                onMouseLeave={(event) => {
                                                    event.target
                                                        .getStage()!
                                                        .container().style.cursor =
                                                        isSettingReference ||
                                                        isDrawingFreeShape
                                                            ? "crosshair"
                                                            : "grab";
                                                }}
                                                onDragStart={(event) => {
                                                    event.cancelBubble = true;
                                                    const pointer =
                                                        clientPoint(event);
                                                    edgeDragRef.current = {
                                                        before: cloneOverlay(
                                                            overlayRef.current,
                                                        ),
                                                        startClientX: pointer.x,
                                                        startClientY: pointer.y,
                                                    };
                                                }}
                                                onDragMove={(event) => {
                                                    event.cancelBubble = true;
                                                    const drag =
                                                        edgeDragRef.current;
                                                    if (!drag) return;
                                                    const rawOffset =
                                                        dragOffset(drag, event);
                                                    event.target.position({
                                                        x: 0,
                                                        y: 0,
                                                    });
                                                    const offset =
                                                        constrainEdgeDrag(
                                                            drag.before,
                                                            area.id,
                                                            index,
                                                            rawOffset.dx,
                                                            rawOffset.dy,
                                                        );
                                                    setOverlay({
                                                        ...drag.before,
                                                        areas: drag.before.areas.map(
                                                            (currentArea) =>
                                                                currentArea.id ===
                                                                area.id
                                                                    ? {
                                                                          ...currentArea,
                                                                          points: currentArea.points.map(
                                                                              (
                                                                                  p,
                                                                                  pointIndex,
                                                                              ) =>
                                                                                  pointIndex ===
                                                                                      index ||
                                                                                  pointIndex ===
                                                                                      nextIndex
                                                                                      ? ([
                                                                                            p[0] +
                                                                                                offset.dx,
                                                                                            p[1] +
                                                                                                offset.dy,
                                                                                        ] as Point)
                                                                                      : p,
                                                                          ),
                                                                      }
                                                                    : currentArea,
                                                        ),
                                                    });
                                                    setDirty(true);
                                                }}
                                                onDragEnd={(event) => {
                                                    event.cancelBubble = true;
                                                    const pointer =
                                                        clientPoint(event);
                                                    const drag =
                                                        edgeDragRef.current ?? {
                                                            before: cloneOverlay(
                                                                overlayRef.current,
                                                            ),
                                                            startClientX:
                                                                pointer.x,
                                                            startClientY:
                                                                pointer.y,
                                                        };
                                                    const rawOffset =
                                                        dragOffset(drag, event);
                                                    event.target.position({
                                                        x: 0,
                                                        y: 0,
                                                    });
                                                    const offset =
                                                        constrainEdgeDrag(
                                                            drag.before,
                                                            area.id,
                                                            index,
                                                            rawOffset.dx,
                                                            rawOffset.dy,
                                                        );
                                                    const nextOverlay = {
                                                        ...drag.before,
                                                        areas: drag.before.areas.map(
                                                            (currentArea) =>
                                                                currentArea.id ===
                                                                area.id
                                                                    ? {
                                                                          ...currentArea,
                                                                          points: currentArea.points.map(
                                                                              (
                                                                                  p,
                                                                                  pointIndex,
                                                                              ) =>
                                                                                  pointIndex ===
                                                                                      index ||
                                                                                  pointIndex ===
                                                                                      nextIndex
                                                                                      ? ([
                                                                                            p[0] +
                                                                                                offset.dx,
                                                                                            p[1] +
                                                                                                offset.dy,
                                                                                        ] as Point)
                                                                                      : p,
                                                                          ),
                                                                      }
                                                                    : currentArea,
                                                        ),
                                                    };
                                                    edgeDragRef.current = null;
                                                    commitFromSnapshot(
                                                        drag.before,
                                                        nextOverlay,
                                                    );
                                                }}
                                            />
                                        );
                                    }),
                                )}
                                {selectedArea?.points.map((point, index) => (
                                    <Circle
                                        key={`${selectedArea.id}-${index}`}
                                        x={point[0]}
                                        y={point[1]}
                                        radius={
                                            (selectedEdge?.areaId ===
                                                selectedArea.id &&
                                            (selectedEdge.edgeIndex === index ||
                                                (selectedEdge.edgeIndex + 1) %
                                                    selectedArea.points
                                                        .length ===
                                                    index)
                                                ? 9
                                                : 7) / zoom
                                        }
                                        fill={
                                            selectedPointIndexes.includes(index)
                                                ? SELECTED_POINT_COLOR
                                                : (selectedEdge?.areaId ===
                                                        selectedArea.id &&
                                                        (selectedEdge.edgeIndex ===
                                                            index ||
                                                            (selectedEdge.edgeIndex +
                                                                1) %
                                                                selectedArea
                                                                    .points
                                                                    .length ===
                                                                index)) ||
                                                    (!selectedEdge &&
                                                        selectedAreaIds.includes(
                                                            selectedArea.id,
                                                        ) &&
                                                        selectedPoint == null &&
                                                        selectedPointIndexes.length ===
                                                            0)
                                                  ? SELECTED_COLOR
                                                  : activeTheme.editor.point
                                        }
                                        stroke="white"
                                        strokeWidth={
                                            (selectedEdge?.areaId ===
                                                selectedArea.id &&
                                            (selectedEdge.edgeIndex === index ||
                                                (selectedEdge.edgeIndex + 1) %
                                                    selectedArea.points
                                                        .length ===
                                                    index)
                                                ? 3
                                                : 2) / zoom
                                        }
                                        draggable={
                                            !isSettingReference &&
                                            !isDrawingFreeShape
                                        }
                                        onClick={(event) => {
                                            if (
                                                isSettingReference ||
                                                isDrawingFreeShape
                                            )
                                                return;
                                            event.cancelBubble = true;
                                            selectPoint(
                                                index,
                                                event.evt.ctrlKey ||
                                                    event.evt.metaKey,
                                            );
                                        }}
                                        onDragStart={(event) => {
                                            event.cancelBubble = true;
                                            const pointer = clientPoint(event);
                                            pointDragRef.current = {
                                                before: cloneOverlay(
                                                    overlayRef.current,
                                                ),
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
                                            );
                                            const nextPoint = snapped.point;
                                            event.target.position({
                                                x: nextPoint[0],
                                                y: nextPoint[1],
                                            });
                                            setSnapGuide(snapped.guide);
                                            setOverlay({
                                                ...drag.before,
                                                areas: drag.before.areas.map(
                                                    (area) =>
                                                        area.id ===
                                                        selectedArea.id
                                                            ? {
                                                                  ...area,
                                                                  points: area.points.map(
                                                                      (p, i) =>
                                                                          i ===
                                                                          index
                                                                              ? nextPoint
                                                                              : p,
                                                                  ),
                                                              }
                                                            : area,
                                                ),
                                            });
                                            setDirty(true);
                                        }}
                                        onDragEnd={(event) => {
                                            event.cancelBubble = true;
                                            const pointer = clientPoint(event);
                                            const drag =
                                                pointDragRef.current ?? {
                                                    before: cloneOverlay(
                                                        overlayRef.current,
                                                    ),
                                                    startClientX: pointer.x,
                                                    startClientY: pointer.y,
                                                };
                                            const snapped = movedPointFromDrag(
                                                drag,
                                                selectedArea,
                                                index,
                                                event,
                                            );
                                            const nextPoint = snapped.point;
                                            event.target.position({
                                                x: nextPoint[0],
                                                y: nextPoint[1],
                                            });
                                            const next = {
                                                ...drag.before,
                                                areas: drag.before.areas.map(
                                                    (area) =>
                                                        area.id ===
                                                        selectedArea.id
                                                            ? {
                                                                  ...area,
                                                                  points: area.points.map(
                                                                      (p, i) =>
                                                                          i ===
                                                                          index
                                                                              ? nextPoint
                                                                              : p,
                                                                  ),
                                                              }
                                                            : area,
                                                ),
                                            };
                                            pointDragRef.current = null;
                                            commitFromSnapshot(
                                                drag.before,
                                                next,
                                            );
                                            setSnapGuide(null);
                                        }}
                                    />
                                ))}
                                {snapGuide?.x != null && (
                                    <Line
                                        points={[
                                            snapGuide.x,
                                            0,
                                            snapGuide.x,
                                            imageHeight,
                                        ]}
                                        stroke={activeTheme.editor.draft}
                                        strokeWidth={2 / zoom}
                                        dash={[8 / zoom, 6 / zoom]}
                                        listening={false}
                                    />
                                )}
                                {snapGuide?.y != null && (
                                    <Line
                                        points={[
                                            0,
                                            snapGuide.y,
                                            imageWidth,
                                            snapGuide.y,
                                        ]}
                                        stroke={activeTheme.editor.draft}
                                        strokeWidth={2 / zoom}
                                        dash={[8 / zoom, 6 / zoom]}
                                        listening={false}
                                    />
                                )}
                                {referencePoints.map((point, index) => (
                                    <Circle
                                        key={`ref-${index}`}
                                        x={point[0]}
                                        y={point[1]}
                                        radius={8 / zoom}
                                        fill={activeTheme.editor.draft}
                                        stroke="white"
                                        strokeWidth={2 / zoom}
                                    />
                                ))}
                                {referencePoints.length === 2 && (
                                    <Line
                                        points={referencePoints.flat()}
                                        stroke={activeTheme.editor.draft}
                                        strokeWidth={3 / zoom}
                                        dash={[8 / zoom, 6 / zoom]}
                                    />
                                )}
                                {draftPoints.length > 0 && (
                                    <>
                                        <Line
                                            points={(draftPointer
                                                ? [...draftPoints, draftPointer]
                                                : draftPoints
                                            ).flat()}
                                            stroke={activeTheme.editor.draft}
                                            strokeWidth={3 / zoom}
                                            dash={[8 / zoom, 6 / zoom]}
                                        />
                                        {draftPoints.map((point, index) => (
                                            <Circle
                                                key={`draft-${index}`}
                                                x={point[0]}
                                                y={point[1]}
                                                radius={
                                                    (index === 0 ? 9 : 6) / zoom
                                                }
                                                fill={
                                                    index === 0
                                                        ? SELECTED_COLOR
                                                        : activeTheme.editor
                                                              .draft
                                                }
                                                stroke="white"
                                                strokeWidth={2 / zoom}
                                                listening={false}
                                            />
                                        ))}
                                    </>
                                )}
                            </Group>
                        </Layer>
                    </Stage>
                </div>    );
}
