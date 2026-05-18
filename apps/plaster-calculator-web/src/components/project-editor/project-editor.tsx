"use client";

import { useEffect, useRef, useState } from "react";
import type { Stage as KonvaStage } from "konva/lib/Stage.js";
import type { Point } from "../../types.js";
import { ui } from "../../lib/styles.js";
import { useEditorImage } from "../../hooks/use-editor-image.js";
import { useEditorKeyboardShortcuts } from "../../hooks/use-editor-keyboard-shortcuts.js";
import { useEditorViewport } from "../../hooks/use-editor-viewport.js";
import { useEditorHistory } from "../../hooks/use-editor-history.js";
import { useEditorSelection } from "../../hooks/use-editor-selection.js";
import { useEditorOverlay } from "../../hooks/use-editor-overlay.js";
import { useEditorActions } from "../../hooks/use-editor-actions.js";
import { useEditorDerivedState } from "../../hooks/use-editor-derived-state.js";
import { useEditorPersistence } from "../../hooks/use-editor-persistence.js";
import { useEditorValidation } from "../../hooks/use-editor-validation.js";
import type {
    OverlayMode,
    ProjectEditorProps,
    SnapGuide,
} from "./project-editor.types.js";
import { EditorToolbar } from "./editor-toolbar.js";
import { EditorSidebar } from "./editor-sidebar.js";
import { EditorCanvas } from "./editor-canvas.js";

export function ProjectEditor({
    project,
    page,
    onSaved,
    onDraftChange,
    validationIssues = [],
}: ProjectEditorProps) {
    const { image, imageError } = useEditorImage(page.imageUrl);
    const [dirty, setDirty] = useState(false);
    const {
        selectedAreaId,
        selectedAreaIds,
        selectedEdge,
        selectedPoint,
        selectedPointIndexes,
        clearSelection,
        hasSelection,
        selectArea,
        selectEdge,
        selectPoint,
        setSelectedAreaId,
        setSelectedAreaIds,
        setSelectedEdge,
        setSelectedPoint,
        setSelectedPointIndexes,
    } = useEditorSelection();
    const [overlayMode, setOverlayMode] = useState<OverlayMode>("both");
    const {
        ceilingHeightMm,
        overlay,
        overlayRef,
        referenceLengthMm,
        referencePoints,
        scaleMmPerPx,
        setCeilingHeightMm,
        setOverlay,
        setReferenceLengthMm,
        setReferencePoints,
        setScaleMmPerPx,
    } = useEditorOverlay({
        onDraftChange,
        page,
        setDirty,
    });
    const [isSettingReference, setIsSettingReference] = useState(false);
    const [addMenuOpen, setAddMenuOpen] = useState(false);
    const [isDrawingFreeShape, setIsDrawingFreeShape] = useState(false);
    const [draftPoints, setDraftPoints] = useState<Point[]>([]);
    const [draftPointer, setDraftPointer] = useState<Point | null>(null);
    const [snapGuide, setSnapGuide] = useState<SnapGuide>(null);
    const [zoom, setZoom] = useState(1);
    const stageRef = useRef<KonvaStage>(null);
    const canvasWrapRef = useRef<HTMLDivElement | null>(null);
    const scrollDragRef = useRef<{
        x: number;
        y: number;
        scrollLeft: number;
        scrollTop: number;
        moved: boolean;
    } | null>(null);
    const viewport = useEditorViewport(canvasWrapRef);
    const {
        imageHeight,
        imageWidth,
        metrics,
        selectedArea,
        selectedAreas,
        selectedEdgeArea,
        selectedEdgeOverride,
        stageHeight,
        stageWidth,
        summary,
        visibleAreas,
    } = useEditorDerivedState({
        image,
        overlay,
        scaleMmPerPx,
        selectedAreaId,
        selectedAreaIds,
        selectedEdge,
        zoom,
    });
    const {
        autoSaving,
        saving,
        status,
        applyHeightToAllPages,
        applyScaleToAllPages,
        save,
        setStatus,
    } = useEditorPersistence({
        ceilingHeightMm,
        dirty,
        onSaved,
        overlay,
        pageId: page.id,
        projectId: project.id,
        referenceLengthMm,
        referencePoints,
        scaleMmPerPx,
        setDirty,
    });
    const {
        future,
        history,
        commit,
        commitFromSnapshot,
        redo,
        resetHistory,
        undo,
    } = useEditorHistory({
        overlay,
        setDirty,
        setOverlay,
        setStatus,
    });
    useEffect(() => {
        resetHistory();
        setSelectedAreaId(null);
        setSelectedAreaIds([]);
        setSelectedEdge(null);
        setSelectedPoint(null);
        setSelectedPointIndexes([]);
        setSnapGuide(null);
        setDraftPointer(null);
    }, [page.id]);

    const {
        addPoint,
        addRectangle,
        applyScale,
        cancelFreeShape,
        changeZoom,
        clearSelectedEdgeOverride,
        commonMaterialValue,
        deleteSelection,
        finishFreeShape,
        resetView,
        setCeilingMode,
        setMaterial,
        setRakedEdge,
        setRakedHeight,
        setSelectedAreaHeight,
        setSelectedEdgeMaterial,
        setSelectedEdgeNoPlaster,
        splitArea,
        startFreeShape,
        startReferenceMode,
        straightenSelectedPoints,
        toggleOutdoor,
        updateArea,
    } = useEditorActions({
        canvasWrapRef,
        ceilingHeightMm,
        commit,
        imageHeight,
        imageWidth,
        overlay,
        referenceLengthMm,
        referencePoints,
        selectedArea,
        selectedAreaIds,
        selectedAreas,
        selectedEdge,
        selectedPoint,
        selectedPointIndexes,
        viewport,
        zoom,
        setAddMenuOpen,
        setDirty,
        setDraftPointer,
        setDraftPoints,
        setIsDrawingFreeShape,
        setIsSettingReference,
        setReferenceLengthMm,
        setReferencePoints,
        setScaleMmPerPx,
        setSelectedAreaId,
        setSelectedAreaIds,
        setSelectedEdge,
        setSelectedPoint,
        setSelectedPointIndexes,
        setSnapGuide,
        setStatus,
        setZoom,
    });

    const {
        areaIssue,
        fieldError,
        hasPageHeightIssue,
        pageIssue,
        renderCeilingControls,
    } = useEditorValidation({
        ceilingHeightMm,
        selectedEdge,
        setCeilingMode,
        setRakedEdge,
        setRakedHeight,
        setSelectedAreaHeight,
        validationIssues,
    });

    useEditorKeyboardShortcuts({
        isDrawingFreeShape,
        onCancelFreeShape: cancelFreeShape,
        onClearSelection: clearSelection,
        onDeleteSelection: deleteSelection,
        onRedo: redo,
        onUndo: undo,
        hasSelection,
    });

    return (
        <section className={ui.editorShell}>
            <div className={ui.panel}>
                <EditorToolbar
                    addMenuOpen={addMenuOpen}
                    autoSaving={autoSaving}
                    dirty={dirty}
                    futureCount={future.length}
                    historyCount={history.length}
                    overlayMode={overlayMode}
                    saving={saving}
                    selectedArea={selectedArea}
                    selectedPointCount={selectedPointIndexes.length}
                    zoom={zoom}
                    onAddPoint={addPoint}
                    onAddRectangle={addRectangle}
                    onChangeZoom={changeZoom}
                    onClearSelection={clearSelection}
                    onDeleteSelection={deleteSelection}
                    onRedo={redo}
                    onResetView={resetView}
                    onSave={() => void save()}
                    onSetAddMenuOpen={setAddMenuOpen}
                    onSetOverlayMode={setOverlayMode}
                    onSplitArea={splitArea}
                    onStartFreeShape={startFreeShape}
                    onStraightenSelectedPoints={straightenSelectedPoints}
                    onUndo={undo}
                    hasSelection={hasSelection}
                />
                <EditorCanvas
                    canvasWrapRef={canvasWrapRef}
                    commitFromSnapshot={commitFromSnapshot}
                    draftPointer={draftPointer}
                    draftPoints={draftPoints}
                    image={image}
                    imageError={imageError}
                    imageHeight={imageHeight}
                    imageWidth={imageWidth}
                    isDrawingFreeShape={isDrawingFreeShape}
                    isSettingReference={isSettingReference}
                    overlayMode={overlayMode}
                    overlayRef={overlayRef}
                    referencePoints={referencePoints}
                    scrollDragRef={scrollDragRef}
                    selectedArea={selectedArea}
                    selectedAreaIds={selectedAreaIds}
                    selectedEdge={selectedEdge}
                    selectedPoint={selectedPoint}
                    selectedPointIndexes={selectedPointIndexes}
                    snapGuide={snapGuide}
                    stageHeight={stageHeight}
                    stageRef={stageRef}
                    stageWidth={stageWidth}
                    visibleAreas={visibleAreas}
                    zoom={zoom}
                    finishFreeShape={finishFreeShape}
                    selectArea={selectArea}
                    selectEdge={selectEdge}
                    selectPoint={selectPoint}
                    setDirty={setDirty}
                    setDraftPointer={setDraftPointer}
                    setDraftPoints={setDraftPoints}
                    setIsSettingReference={setIsSettingReference}
                    setOverlay={setOverlay}
                    setReferencePoints={setReferencePoints}
                    setSnapGuide={setSnapGuide}
                />
            </div>

            <EditorSidebar
                page={page}
                status={status}
                dirty={dirty}
                ceilingHeightMm={ceilingHeightMm}
                scaleMmPerPx={scaleMmPerPx}
                referencePoints={referencePoints}
                referenceLengthMm={referenceLengthMm}
                isSettingReference={isSettingReference}
                summary={summary}
                visibleAreas={visibleAreas}
                selectedAreaIds={selectedAreaIds}
                selectedArea={selectedArea}
                selectedEdgeArea={selectedEdgeArea}
                selectedEdge={selectedEdge}
                selectedEdgeOverride={selectedEdgeOverride}
                selectedPointIndexes={selectedPointIndexes}
                metrics={metrics}
                areaIssue={areaIssue}
                applyHeightToAllPages={applyHeightToAllPages}
                applyScale={applyScale}
                applyScaleToAllPages={applyScaleToAllPages}
                clearSelectedEdgeOverride={clearSelectedEdgeOverride}
                commonMaterialValue={commonMaterialValue}
                fieldError={fieldError}
                hasPageHeightIssue={hasPageHeightIssue}
                pageIssue={pageIssue}
                renderCeilingControls={renderCeilingControls}
                selectArea={selectArea}
                setCeilingHeightMm={setCeilingHeightMm}
                setDirty={setDirty}
                setIsSettingReference={setIsSettingReference}
                setMaterial={setMaterial}
                setReferenceLengthMm={setReferenceLengthMm}
                setReferencePoints={setReferencePoints}
                setSelectedEdgeMaterial={setSelectedEdgeMaterial}
                setSelectedEdgeNoPlaster={setSelectedEdgeNoPlaster}
                startReferenceMode={startReferenceMode}
                toggleOutdoor={toggleOutdoor}
                updateArea={updateArea}
            />
        </section>
    );
}
