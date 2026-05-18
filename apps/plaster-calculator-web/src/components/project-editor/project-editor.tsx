"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Stage as KonvaStage } from "konva/lib/Stage.js";
import type {
    AreaPolygon,
    Point,
} from "../../types.js";
import {
    applyCeilingHeightToProject,
    applyScaleToProject,
    savePageOverlay,
} from "../../lib/api.js";
import type { ValidationIssue } from "../../lib/validation.js";
import { ui } from "../../lib/styles.js";
import {
    ceilingAreaM2ForArea,
    wallLengthByType,
} from "../../lib/editor/overlay-geometry.js";
import { useEditorAutosave } from "../../hooks/use-editor-autosave.js";
import { useEditorImage } from "../../hooks/use-editor-image.js";
import { useEditorKeyboardShortcuts } from "../../hooks/use-editor-keyboard-shortcuts.js";
import { useEditorViewport } from "../../hooks/use-editor-viewport.js";
import { useEditorHistory } from "../../hooks/use-editor-history.js";
import { useEditorSelection } from "../../hooks/use-editor-selection.js";
import { useEditorOverlay } from "../../hooks/use-editor-overlay.js";
import { useEditorActions } from "../../hooks/use-editor-actions.js";
import type {
    OverlayMode,
    ProjectEditorProps,
    SnapGuide,
} from "./project-editor.types.js";
import { EditorToolbar } from "./editor-toolbar.js";
import { EditorSidebar } from "./editor-sidebar.js";
import { CeilingControls } from "./ceiling-controls.js";
import { ValidationMessage } from "./validation-message.js";
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
    const [saving, setSaving] = useState(false);
    const [autoSaving, setAutoSaving] = useState(false);
    const [status, setStatus] = useState("");
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

    const selectedArea =
        overlay.areas.find(
            (area) => area.id === selectedAreaId && !area.deleted,
        ) ?? null;
    const visibleAreas = overlay.areas.filter((area) => !area.deleted);
    const selectedAreas = visibleAreas.filter((area) =>
        selectedAreaIds.includes(area.id),
    );
    const selectedEdgeArea =
        visibleAreas.find((area) => area.id === selectedEdge?.areaId) ?? null;
    const selectedEdgeOverride =
        selectedEdgeArea && selectedEdge
            ? selectedEdgeArea.edgeOverrides?.[String(selectedEdge.edgeIndex)]
            : null;
    const imageWidth =
        image?.naturalWidth ?? overlay.imageSizePx?.width ?? 1200;
    const imageHeight =
        image?.naturalHeight ?? overlay.imageSizePx?.height ?? 900;
    const stageWidth = imageWidth * zoom;
    const stageHeight = imageHeight * zoom;
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



    const metrics = useMemo(() => {
        if (!selectedArea || !scaleMmPerPx) return null;
        const wallLengthM =
            (wallLengthByType(selectedArea).reduce(
                (total, item) => total + item.lengthPx,
                0,
            ) *
                scaleMmPerPx) /
            1000;
        const ceilingAreaM2 = ceilingAreaM2ForArea(selectedArea, scaleMmPerPx);
        return { wallLengthM, ceilingAreaM2 };
    }, [selectedArea, scaleMmPerPx]);

    const summary = useMemo(() => {
        if (!scaleMmPerPx) return null;
        const wallTotals = new Map<string, number>();
        const ceilingTotals = new Map<string, number>();
        visibleAreas.forEach((area) => {
            wallLengthByType(area).forEach((item) => {
                wallTotals.set(
                    item.type,
                    (wallTotals.get(item.type) ?? 0) +
                        (item.lengthPx * scaleMmPerPx) / 1000,
                );
            });
            const ceilingAreaM2 = ceilingAreaM2ForArea(area, scaleMmPerPx);
            ceilingTotals.set(
                area.ceilingPlasterType,
                (ceilingTotals.get(area.ceilingPlasterType) ?? 0) +
                    ceilingAreaM2,
            );
        });
        return {
            wallTotals: Array.from(wallTotals.entries()).filter(
                ([, total]) => total > 0,
            ),
            ceilingTotals: Array.from(ceilingTotals.entries()).filter(
                ([, total]) => total > 0,
            ),
        };
    }, [visibleAreas, scaleMmPerPx]);

    async function save(refresh = true, automatic = false) {
        if (automatic) {
            setAutoSaving(true);
        } else {
            setSaving(true);
        }
        try {
            await savePageOverlay(project.id, page.id, {
                overlay,
                scaleMmPerPx,
                ceilingHeightMm,
                referencePoints:
                    referencePoints.length === 2 ? referencePoints : null,
                referenceLengthMm: referenceLengthMm
                    ? Number(referenceLengthMm)
                    : null,
            });
            setDirty(false);
            setStatus(`Saved ${new Date().toLocaleTimeString()}`);
            if (refresh) onSaved();
        } catch (error) {
            setStatus(error instanceof Error ? error.message : "Save failed");
        } finally {
            if (automatic) {
                setAutoSaving(false);
            } else {
                setSaving(false);
            }
        }
    }

    async function applyHeightToAllPages() {
        try {
            if (dirty) await save(false);
            await applyCeilingHeightToProject(project.id, ceilingHeightMm);
            setStatus("Ceiling height applied to all pages");
            onSaved();
        } catch (error) {
            setStatus(
                error instanceof Error
                    ? error.message
                    : "Unable to apply ceiling height",
            );
        }
    }

    async function applyScaleToAllPages() {
        if (!scaleMmPerPx || scaleMmPerPx <= 0) {
            setStatus("Set a reference before applying scale to all pages");
            return;
        }
        try {
            if (dirty) await save(false);
            await applyScaleToProject(project.id, scaleMmPerPx);
            setStatus("Scale applied to all pages");
            onSaved();
        } catch (error) {
            setStatus(
                error instanceof Error
                    ? error.message
                    : "Unable to apply scale",
            );
        }
    }

    function pageIssue(field: ValidationIssue["field"]) {
        return (
            validationIssues.find(
                (issue) => !issue.areaId && issue.field === field,
            )?.message ?? ""
        );
    }

    function areaIssue(areaId: string, field: ValidationIssue["field"]) {
        return (
            validationIssues.find(
                (issue) => issue.areaId === areaId && issue.field === field,
            )?.message ?? ""
        );
    }

    function hasPageHeightIssue() {
        return validationIssues.some(
            (issue) => issue.field === "ceilingHeightMm",
        );
    }

    function fieldError(message: string) {
        return <ValidationMessage message={message} />;
    }

    function renderCeilingControls(area: AreaPolygon) {
        return (
            <CeilingControls
                area={area}
                ceilingHeightMm={ceilingHeightMm}
                selectedEdge={selectedEdge}
                areaIssue={areaIssue}
                setCeilingMode={setCeilingMode}
                setRakedEdge={setRakedEdge}
                setRakedHeight={setRakedHeight}
                setSelectedAreaHeight={setSelectedAreaHeight}
            />
        );
    }
    useEditorAutosave({
        autoSaving,
        ceilingHeightMm,
        dirty,
        overlay,
        saving,
        scaleMmPerPx,
        save,
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
