"use client";

import type { Point } from "@libraries/plaster-calculator-common";
import { useProjectsService } from "@libraries/plaster-calculator-web-core";
import type { Stage as KonvaStage } from "konva/lib/Stage.js";
import { useEffect, useRef, useState } from "react";

import { useEditorTranslation } from "../i18n/index.js";

import { ProjectEditorView } from "./project-editor-view.js";
import type {
    OverlayMode,
    ProjectEditorProps,
    SnapGuide,
} from "./project-editor.types.js";
import { useEditorActions } from "./use-editor-actions.js";
import { useEditorDerivedState } from "./use-editor-derived-state.js";
import { useEditorHistory } from "./use-editor-history.js";
import { useEditorImage } from "./use-editor-image.js";
import { useEditorKeyboardShortcuts } from "./use-editor-keyboard-shortcuts.js";
import { useEditorOverlay } from "./use-editor-overlay.js";
import { useEditorPersistence } from "./use-editor-persistence.js";
import { useEditorSelection } from "./use-editor-selection.js";
import { useEditorValidation } from "./use-editor-validation.js";
import { useEditorViewport } from "./use-editor-viewport.js";

export function ProjectEditor({
    project,
    page,
    onSaved,
    onAnalyzingChange,
    projectCompanyPanel,
    salesStatusPanel,
    onDraftChange,
    validationIssues = [],
}: ProjectEditorProps) {
    const { t } = useEditorTranslation();
    const projectsService = useProjectsService();
    const imageState = useEditorImage(page.imageUrl);
    const [analysisRequested, setAnalysisRequested] = useState(false);
    const analyzing = analysisRequested || page.status === "PROCESSING";
    const [dirty, setDirty] = useState(false);
    const selection = useEditorSelection();
    const [overlayMode, setOverlayMode] = useState<OverlayMode>("both");
    const overlayState = useEditorOverlay({
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
    const derivedState = useEditorDerivedState({
        image: imageState.image,
        overlay: overlayState.overlay,
        scaleMmPerPx: overlayState.scaleMmPerPx,
        selectedAreaId: selection.selectedAreaId,
        selectedAreaIds: selection.selectedAreaIds,
        selectedEdge: selection.selectedEdge,
        zoom,
    });
    const persistence = useEditorPersistence({
        ceilingHeightMm: overlayState.ceilingHeightMm,
        dirty,
        disabled: analyzing,
        onSaved,
        overlay: overlayState.overlay,
        pageId: page.id,
        projectId: project.id,
        referenceLengthMm: overlayState.referenceLengthMm,
        referencePoints: overlayState.referencePoints,
        scaleMmPerPx: overlayState.scaleMmPerPx,
        setDirty,
    });
    const historyState = useEditorHistory({
        overlay: overlayState.overlay,
        setDirty,
        setOverlay: overlayState.setOverlay,
        setStatus: persistence.setStatus,
    });

    useEffect(() => {
        historyState.resetHistory();
        selection.setSelectedAreaId(null);
        selection.setSelectedAreaIds([]);
        selection.setSelectedEdge(null);
        selection.setSelectedPoint(null);
        selection.setSelectedPointIndexes([]);
        setSnapGuide(null);
        setDraftPointer(null);
    }, [page.id, page.updatedAt]);

    const actions = useEditorActions({
        canvasWrapRef,
        ceilingHeightMm: overlayState.ceilingHeightMm,
        commit: historyState.commit,
        imageHeight: derivedState.imageHeight,
        imageWidth: derivedState.imageWidth,
        overlay: overlayState.overlay,
        referenceLengthMm: overlayState.referenceLengthMm,
        referencePoints: overlayState.referencePoints,
        selectedArea: derivedState.selectedArea,
        selectedAreaIds: selection.selectedAreaIds,
        selectedAreas: derivedState.selectedAreas,
        selectedEdge: selection.selectedEdge,
        selectedPoint: selection.selectedPoint,
        selectedPointIndexes: selection.selectedPointIndexes,
        viewport,
        zoom,
        setAddMenuOpen,
        setDirty,
        setDraftPointer,
        setDraftPoints,
        setIsDrawingFreeShape,
        setIsSettingReference,
        setReferenceLengthMm: overlayState.setReferenceLengthMm,
        setReferencePoints: overlayState.setReferencePoints,
        setScaleMmPerPx: overlayState.setScaleMmPerPx,
        setSelectedAreaId: selection.setSelectedAreaId,
        setSelectedAreaIds: selection.setSelectedAreaIds,
        setSelectedEdge: selection.setSelectedEdge,
        setSelectedPoint: selection.setSelectedPoint,
        setSelectedPointIndexes: selection.setSelectedPointIndexes,
        setSnapGuide,
        setStatus: persistence.setStatus,
        setZoom,
    });
    const validation = useEditorValidation({
        ceilingHeightMm: overlayState.ceilingHeightMm,
        selectedEdge: selection.selectedEdge,
        setCeilingMode: actions.setCeilingMode,
        setRakedEdge: actions.setRakedEdge,
        setRakedHeight: actions.setRakedHeight,
        setSelectedAreaHeight: actions.setSelectedAreaHeight,
        validationIssues,
    });

    useEditorKeyboardShortcuts({
        disabled: analyzing,
        isDrawingFreeShape,
        onCancelFreeShape: actions.cancelFreeShape,
        onClearSelection: selection.clearSelection,
        onDeleteSelection: actions.deleteSelection,
        onRedo: historyState.redo,
        onUndo: historyState.undo,
        hasSelection: selection.hasSelection,
    });

    async function analyze(): Promise<void> {
        const hasPolygons = overlayState.overlay.areas.some(
            (area) => !area.deleted,
        );
        if (
            hasPolygons &&
            !window.confirm(t("projectEditor.confirmReanalyze"))
        ) {
            return;
        }

        setAnalysisRequested(true);
        onAnalyzingChange?.(true);
        persistence.setStatus(t("projectEditor.analyzingStatus"));
        try {
            await projectsService.analyzeFloorplanPage({
                projectId: project.id,
                pageId: page.id,
                scaleMmPerPx: overlayState.scaleMmPerPx,
                ceilingHeightMm: overlayState.ceilingHeightMm,
                referencePoints:
                    overlayState.referencePoints.length === 2
                        ? JSON.stringify(overlayState.referencePoints)
                        : null,
                referenceLengthMm: overlayState.referenceLengthMm
                    ? Number(overlayState.referenceLengthMm)
                    : null,
            });
            persistence.setStatus(t("projectEditor.analysisCompleteStatus"));
            await onSaved();
        } catch (error) {
            persistence.setStatus(
                error instanceof Error
                    ? error.message
                    : t("projectEditor.analysisFailedStatus"),
            );
        } finally {
            setAnalysisRequested(false);
            onAnalyzingChange?.(false);
        }
    }

    return (
        <ProjectEditorView
            actions={actions}
            analyzing={analyzing}
            addMenuOpen={addMenuOpen}
            canvasWrapRef={canvasWrapRef}
            dirty={dirty}
            draftPointer={draftPointer}
            draftPoints={draftPoints}
            historyState={historyState}
            imageState={imageState}
            isDrawingFreeShape={isDrawingFreeShape}
            isSettingReference={isSettingReference}
            overlayMode={overlayMode}
            overlayState={overlayState}
            page={page}
            persistence={persistence}
            projectCompanyPanel={projectCompanyPanel}
            salesStatusPanel={salesStatusPanel}
            scrollDragRef={scrollDragRef}
            selection={selection}
            snapGuide={snapGuide}
            stageRef={stageRef}
            validation={validation}
            derivedState={derivedState}
            setAddMenuOpen={setAddMenuOpen}
            setDirty={setDirty}
            setDraftPointer={setDraftPointer}
            setDraftPoints={setDraftPoints}
            setIsSettingReference={setIsSettingReference}
            setOverlayMode={setOverlayMode}
            setSnapGuide={setSnapGuide}
            zoom={zoom}
            onAnalyze={() => void analyze()}
        />
    );
}
