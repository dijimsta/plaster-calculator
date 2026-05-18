import { Group, Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node.js";
import type { Point } from "../../types.js";
import { activeTheme, ui } from "../../lib/styles.js";
import { pointDistance } from "../../lib/editor/overlay-geometry.js";
import { snapToReferences } from "../../lib/editor/snap-guides.js";
import type { SnapGuide } from "./project-editor.types.js";
import { CanvasGuides } from "./canvas-guides.js";
import { CanvasWallEdges } from "./canvas-wall-edges.js";
import { CanvasAreaFills } from "./canvas-area-fills.js";
import { CanvasEdgeHandles } from "./canvas-edge-handles.js";
import { CanvasPointHandles } from "./canvas-point-handles.js";
import type { EditorCanvasProps } from "./editor-canvas.types.js";

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

    function snapDraftPoint(pointer: Point): { point: Point; guide: SnapGuide } {
        const anchor = draftPoints[draftPoints.length - 1];
        return anchor
            ? snapToReferences(pointer, [anchor], zoom)
            : { point: pointer, guide: null };
    }

    return (
        <div className={ui.canvasWrap} ref={canvasWrapRef}>
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
                        <CanvasAreaFills
                            commitFromSnapshot={commitFromSnapshot}
                            isDrawingFreeShape={isDrawingFreeShape}
                            isSettingReference={isSettingReference}
                            overlayMode={overlayMode}
                            overlayRef={overlayRef}
                            selectedAreaIds={selectedAreaIds}
                            visibleAreas={visibleAreas}
                            zoom={zoom}
                            selectArea={selectArea}
                            setDirty={setDirty}
                            setOverlay={setOverlay}
                        />
                        <CanvasWallEdges
                            overlayMode={overlayMode}
                            selectedAreaIds={selectedAreaIds}
                            selectedEdge={selectedEdge}
                            selectedPoint={selectedPoint}
                            selectedPointIndexes={selectedPointIndexes}
                            visibleAreas={visibleAreas}
                            zoom={zoom}
                        />
                        <CanvasEdgeHandles
                            commitFromSnapshot={commitFromSnapshot}
                            isDrawingFreeShape={isDrawingFreeShape}
                            isSettingReference={isSettingReference}
                            overlayRef={overlayRef}
                            visibleAreas={visibleAreas}
                            zoom={zoom}
                            selectEdge={selectEdge}
                            setDirty={setDirty}
                            setOverlay={setOverlay}
                        />
                        <CanvasPointHandles
                            commitFromSnapshot={commitFromSnapshot}
                            isDrawingFreeShape={isDrawingFreeShape}
                            isSettingReference={isSettingReference}
                            overlayRef={overlayRef}
                            selectedArea={selectedArea}
                            selectedAreaIds={selectedAreaIds}
                            selectedEdge={selectedEdge}
                            selectedPoint={selectedPoint}
                            selectedPointIndexes={selectedPointIndexes}
                            zoom={zoom}
                            selectPoint={selectPoint}
                            setDirty={setDirty}
                            setOverlay={setOverlay}
                            setSnapGuide={setSnapGuide}
                        />
                        <CanvasGuides
                            draftPointer={draftPointer}
                            draftPoints={draftPoints}
                            imageHeight={imageHeight}
                            imageWidth={imageWidth}
                            referencePoints={referencePoints}
                            snapGuide={snapGuide}
                            zoom={zoom}
                        />
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
}
