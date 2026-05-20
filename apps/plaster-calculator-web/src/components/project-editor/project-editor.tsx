"use client";

import { useEffect, useRef, useState } from "react";

import { ProjectEditorView } from "./project-editor-view.js";
import { useEditorActions } from "../../hooks/use-editor-actions.js";
import { useEditorDerivedState } from "../../hooks/use-editor-derived-state.js";
import { useEditorHistory } from "../../hooks/use-editor-history.js";
import { useEditorImage } from "../../hooks/use-editor-image.js";
import { useEditorKeyboardShortcuts } from "../../hooks/use-editor-keyboard-shortcuts.js";
import { useEditorOverlay } from "../../hooks/use-editor-overlay.js";
import { useEditorPersistence } from "../../hooks/use-editor-persistence.js";
import { useEditorSelection } from "../../hooks/use-editor-selection.js";
import { useEditorValidation } from "../../hooks/use-editor-validation.js";
import { useEditorViewport } from "../../hooks/use-editor-viewport.js";

import type {
    OverlayMode,
    ProjectEditorProps,
    SnapGuide,
} from "./project-editor.types.js";
import type { Point } from "../../types.js";
import type { Stage as KonvaStage } from "konva/lib/Stage.js";

export function ProjectEditor({
    project,
    page,
    onSaved,
    projectAccountPanel,
    onDraftChange,
    validationIssues = [],
}: ProjectEditorProps) {
    const imageState = useEditorImage(page.imageUrl);
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
    }, [page.id]);

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
        isDrawingFreeShape,
        onCancelFreeShape: actions.cancelFreeShape,
        onClearSelection: selection.clearSelection,
        onDeleteSelection: actions.deleteSelection,
        onRedo: historyState.redo,
        onUndo: historyState.undo,
        hasSelection: selection.hasSelection,
    });

    return (
        <ProjectEditorView
            actions={actions}
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
            projectAccountPanel={projectAccountPanel}
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
        />
    );
}
