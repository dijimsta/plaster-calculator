import { EditorCanvas } from "./editor-canvas.js";
import { EditorSidebar } from "./editor-sidebar.js";
import { EditorToolbar } from "./editor-toolbar.js";
import { ui } from "../../lib/styles.js";

import type { EditorCanvasProps } from "./editor-canvas.types.js";
import type {
    OverlayMode,
    ProjectEditorProps,
    SnapGuide,
} from "./project-editor.types.js";
import type { useEditorActions } from "../../hooks/use-editor-actions.js";
import type { useEditorDerivedState } from "../../hooks/use-editor-derived-state.js";
import type { useEditorHistory } from "../../hooks/use-editor-history.js";
import type { useEditorImage } from "../../hooks/use-editor-image.js";
import type { useEditorOverlay } from "../../hooks/use-editor-overlay.js";
import type { useEditorPersistence } from "../../hooks/use-editor-persistence.js";
import type { useEditorSelection } from "../../hooks/use-editor-selection.js";
import type { useEditorValidation } from "../../hooks/use-editor-validation.js";
import type { Point } from "@libraries/plaster-calculator-common";

interface ProjectEditorViewProps {
    readonly actions: ReturnType<typeof useEditorActions>;
    readonly analyzing: boolean;
    readonly addMenuOpen: boolean;
    readonly canvasWrapRef: EditorCanvasProps["canvasWrapRef"];
    readonly dirty: boolean;
    readonly draftPointer: Point | null;
    readonly draftPoints: Point[];
    readonly historyState: ReturnType<typeof useEditorHistory>;
    readonly imageState: ReturnType<typeof useEditorImage>;
    readonly isDrawingFreeShape: boolean;
    readonly isSettingReference: boolean;
    readonly overlayMode: OverlayMode;
    readonly overlayState: ReturnType<typeof useEditorOverlay>;
    readonly page: ProjectEditorProps["page"];
    readonly persistence: ReturnType<typeof useEditorPersistence>;
    readonly projectAccountPanel: ProjectEditorProps["projectAccountPanel"];
    readonly salesStatusPanel: ProjectEditorProps["salesStatusPanel"];
    readonly scrollDragRef: EditorCanvasProps["scrollDragRef"];
    readonly selection: ReturnType<typeof useEditorSelection>;
    readonly snapGuide: SnapGuide;
    readonly stageRef: EditorCanvasProps["stageRef"];
    readonly validation: ReturnType<typeof useEditorValidation>;
    readonly derivedState: ReturnType<typeof useEditorDerivedState>;
    readonly setAddMenuOpen: (open: boolean) => void;
    readonly setDirty: (dirty: boolean) => void;
    readonly setDraftPointer: (point: Point | null) => void;
    readonly setDraftPoints: (updater: (points: Point[]) => Point[]) => void;
    readonly setIsSettingReference: (value: boolean) => void;
    readonly setOverlayMode: (mode: OverlayMode) => void;
    readonly setSnapGuide: (guide: SnapGuide) => void;
    readonly zoom: number;
    readonly onAnalyze: () => void;
}

export function ProjectEditorView({
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
    projectAccountPanel,
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
    onAnalyze,
}: ProjectEditorViewProps) {
    return (
        <section className={ui.editorShell}>
            <div className={ui.editorLeftPanel}>
                <EditorToolbar
                    addMenuOpen={addMenuOpen}
                    autoSaving={persistence.autoSaving}
                    analyzing={analyzing}
                    dirty={dirty}
                    futureCount={historyState.future.length}
                    historyCount={historyState.history.length}
                    overlayMode={overlayMode}
                    saving={persistence.saving}
                    selectedArea={derivedState.selectedArea}
                    selectedPointCount={selection.selectedPointIndexes.length}
                    zoom={zoom}
                    onAddPoint={actions.addPoint}
                    onAnalyze={onAnalyze}
                    onAddRectangle={actions.addRectangle}
                    onChangeZoom={actions.changeZoom}
                    onClearSelection={selection.clearSelection}
                    onDeleteSelection={actions.deleteSelection}
                    onRedo={historyState.redo}
                    onResetView={actions.resetView}
                    onSave={() => void persistence.save()}
                    onSetAddMenuOpen={setAddMenuOpen}
                    onSetOverlayMode={setOverlayMode}
                    onSplitArea={actions.splitArea}
                    onStartFreeShape={actions.startFreeShape}
                    onStraightenSelectedPoints={
                        actions.straightenSelectedPoints
                    }
                    onUndo={historyState.undo}
                    hasSelection={selection.hasSelection}
                />
                {analyzing && (
                    <p className={ui.muted} role="status">
                        Analysis is running. Editing is temporarily disabled.
                    </p>
                )}
                <div inert={analyzing} className={ui.editorCanvasContainer}>
                    <EditorCanvas
                        canvasWrapRef={canvasWrapRef}
                        commitFromSnapshot={historyState.commitFromSnapshot}
                        draftPointer={draftPointer}
                        draftPoints={draftPoints}
                        image={imageState.image}
                        imageError={imageState.imageError}
                        imageHeight={derivedState.imageHeight}
                        imageWidth={derivedState.imageWidth}
                        isDrawingFreeShape={isDrawingFreeShape}
                        isSettingReference={isSettingReference}
                        overlayMode={overlayMode}
                        overlayRef={overlayState.overlayRef}
                        referencePoints={overlayState.referencePoints}
                        scrollDragRef={scrollDragRef}
                        selectedArea={derivedState.selectedArea}
                        selectedAreaIds={selection.selectedAreaIds}
                        selectedEdge={selection.selectedEdge}
                        selectedPoint={selection.selectedPoint}
                        selectedPointIndexes={selection.selectedPointIndexes}
                        snapGuide={snapGuide}
                        stageHeight={derivedState.stageHeight}
                        stageRef={stageRef}
                        stageWidth={derivedState.stageWidth}
                        visibleAreas={derivedState.visibleAreas}
                        zoom={zoom}
                        finishFreeShape={actions.finishFreeShape}
                        selectArea={selection.selectArea}
                        selectEdge={selection.selectEdge}
                        selectPoint={selection.selectPoint}
                        setDirty={setDirty}
                        setDraftPointer={setDraftPointer}
                        setDraftPoints={setDraftPoints}
                        setIsSettingReference={setIsSettingReference}
                        setOverlay={overlayState.setOverlay}
                        setReferencePoints={overlayState.setReferencePoints}
                        setSnapGuide={setSnapGuide}
                    />
                </div>
            </div>

            <div inert={analyzing}>
                <EditorSidebar
                    page={page}
                    status={persistence.status}
                    dirty={dirty}
                    ceilingHeightMm={overlayState.ceilingHeightMm}
                    scaleMmPerPx={overlayState.scaleMmPerPx}
                    referencePoints={overlayState.referencePoints}
                    referenceLengthMm={overlayState.referenceLengthMm}
                    isSettingReference={isSettingReference}
                    summary={derivedState.summary}
                    visibleAreas={derivedState.visibleAreas}
                    selectedAreaIds={selection.selectedAreaIds}
                    selectedArea={derivedState.selectedArea}
                    selectedEdgeArea={derivedState.selectedEdgeArea}
                    selectedEdge={selection.selectedEdge}
                    selectedEdgeOverride={derivedState.selectedEdgeOverride}
                    selectedPointIndexes={selection.selectedPointIndexes}
                    metrics={derivedState.metrics}
                    projectAccountPanel={projectAccountPanel}
                    salesStatusPanel={salesStatusPanel}
                    areaIssue={validation.areaIssue}
                    applyHeightToAllPages={persistence.applyHeightToAllPages}
                    applyScale={actions.applyScale}
                    applyScaleToAllPages={persistence.applyScaleToAllPages}
                    clearSelectedEdgeOverride={
                        actions.clearSelectedEdgeOverride
                    }
                    commonMaterialValue={actions.commonMaterialValue}
                    fieldError={validation.fieldError}
                    hasPageHeightIssue={validation.hasPageHeightIssue}
                    pageIssue={validation.pageIssue}
                    renderCeilingControls={validation.renderCeilingControls}
                    selectArea={selection.selectArea}
                    setCeilingHeightMm={overlayState.setCeilingHeightMm}
                    setDirty={setDirty}
                    setIsSettingReference={setIsSettingReference}
                    setMaterial={actions.setMaterial}
                    setReferenceLengthMm={overlayState.setReferenceLengthMm}
                    setReferencePoints={overlayState.setReferencePoints}
                    setSelectedEdgeMaterial={actions.setSelectedEdgeMaterial}
                    setSelectedEdgeNoPlaster={actions.setSelectedEdgeNoPlaster}
                    startReferenceMode={actions.startReferenceMode}
                    toggleOutdoor={actions.toggleOutdoor}
                    updateArea={actions.updateArea}
                />
            </div>
        </section>
    );
}
