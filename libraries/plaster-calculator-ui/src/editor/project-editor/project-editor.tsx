"use client";

import type { Point } from "@libraries/plaster-calculator-common";
import { useProjectsService } from "@libraries/plaster-calculator-web-core";
import type { Stage as KonvaStage } from "konva/lib/Stage.js";
import { useEffect, useRef, useState } from "react";

import { useEditorTranslation } from "../i18n/index.js";

import { ProjectEditorFullScreenView } from "./project-editor-fullscreen-view.js";
import { ProjectEditorView } from "./project-editor-view.js";
import type {
    OverlayMode,
    ProjectEditorProps,
    SnapGuide,
} from "./project-editor.types.js";
import { useEditorActions } from "./use-editor-actions.js";
import { useEditorDerivedState } from "./use-editor-derived-state.js";
import { useEditorFullScreen } from "./use-editor-full-screen.js";
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
    pagePickerPanel,
    onFullScreenChange,
    onDraftChange,
    validationIssues = [],
    initialTool,
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
    const fullScreenState = useEditorFullScreen();
    const viewport = useEditorViewport(
        canvasWrapRef,
        fullScreenState.fullScreen,
    );
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
        onFullScreenChange?.(fullScreenState.fullScreen);
    }, [fullScreenState.fullScreen, onFullScreenChange]);

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

    const appliedFullScreenFitRef = useRef(false);
    useEffect(() => {
        if (!fullScreenState.fullScreen) {
            // Reset so the *next* full-screen entry fits again, rather than
            // only ever fitting once for the lifetime of this editor.
            appliedFullScreenFitRef.current = false;
            return;
        }
        if (appliedFullScreenFitRef.current) return;
        // Entering full screen swaps in a brand-new canvas-wrap DOM node
        // (see `use-editor-viewport.ts`), and `viewport` only catches up to
        // that node's real size once its `ResizeObserver` effect has run
        // and measured it -- which can be a render or two after this
        // `fullScreen` flip, since `viewport` is React state updated
        // asynchronously by that effect. `canvasWrapRef.current` itself is
        // already the new node by this point (React attaches refs
        // synchronously during commit, strictly before this passive effect
        // runs), so comparing `viewport` against a *live* read of it
        // confirms `viewport` reflects this exact node before it's used to
        // compute a fit -- otherwise we'd silently fit against whatever the
        // previous (two-pane, or default-fallback) size was.
        const element = canvasWrapRef.current;
        if (
            !element ||
            viewport.width !== element.clientWidth ||
            viewport.height !== element.clientHeight
        ) {
            return;
        }
        appliedFullScreenFitRef.current = true;
        actions.fitToViewport();
        // Deliberately omits `actions` (a fresh object every render) from
        // the dependency array: this should only re-evaluate when
        // full-screen entry or the viewport measurement for that entry
        // changes, not on every unrelated render -- the guard above already
        // keeps it idempotent per entry.
    }, [fullScreenState.fullScreen, viewport.width, viewport.height]);

    const appliedInitialToolRef = useRef(false);
    useEffect(() => {
        if (appliedInitialToolRef.current) return;
        appliedInitialToolRef.current = true;
        if (initialTool === "scale") {
            actions.startReferenceMode();
        } else if (initialTool === "draw-room") {
            actions.startFreeShape();
        }
        // Deliberately runs once, keyed off nothing but mount: a deep link
        // should set the initial tool and then get out of the way, not
        // fight the user (or a page switch) for control afterward.
    }, []);

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
        drawerOpen: fullScreenState.drawerOpen,
        fullScreen: fullScreenState.fullScreen,
        isDrawingFreeShape,
        onCancelFreeShape: actions.cancelFreeShape,
        onClearSelection: selection.clearSelection,
        onCloseDrawer: fullScreenState.closeDrawer,
        onDeleteSelection: actions.deleteSelection,
        onEnterFullScreen: fullScreenState.enter,
        onExitFullScreen: fullScreenState.exit,
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

    const sharedViewProps = {
        actions,
        analyzing,
        addMenuOpen,
        canvasWrapRef,
        dirty,
        draftPointer,
        draftPoints,
        historyState,
        imageState,
        isDrawingFreeShape,
        isSettingReference,
        overlayMode,
        overlayState,
        page,
        persistence,
        projectCompanyPanel,
        salesStatusPanel,
        scrollDragRef,
        selection,
        snapGuide,
        stageRef,
        validation,
        derivedState,
        setAddMenuOpen,
        setDirty,
        setDraftPointer,
        setDraftPoints,
        setIsSettingReference,
        setOverlayMode,
        setSnapGuide,
        zoom,
        onAnalyze: () => void analyze(),
    };

    // Both views are pure presentational consumers of the exact same state
    // this container assembles above -- neither owns state of its own
    // (the full-screen view's own local UI state, e.g. drawer-open, comes
    // from `fullScreenState`, not from a hook it instantiates itself).
    return fullScreenState.fullScreen ? (
        <ProjectEditorFullScreenView
            {...sharedViewProps}
            fullScreenState={fullScreenState}
            pagePickerPanel={pagePickerPanel}
        />
    ) : (
        <ProjectEditorView
            {...sharedViewProps}
            fullScreen={fullScreenState.fullScreen}
            onToggleFullScreen={
                fullScreenState.fullScreen
                    ? fullScreenState.exit
                    : fullScreenState.enter
            }
        />
    );
}
