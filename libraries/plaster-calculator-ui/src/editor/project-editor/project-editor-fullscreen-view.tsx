import type { Point } from "@libraries/plaster-calculator-common";
import { Box, Button, Paragraph, Text } from "@libraries/uikit-web";
import type { ReactNode } from "react";

import { useEditorTranslation } from "../i18n/index.js";

import { EditorCanvas } from "./editor-canvas.js";
import type { EditorCanvasProps } from "./editor-canvas.types.js";
import { EditorLegend } from "./editor-legend.js";
import { EditorToolbar } from "./editor-toolbar.js";
import { EditorZoomChip } from "./editor-zoom-chip.js";
import { FullScreenInspectorDrawer } from "./full-screen-inspector-drawer.js";
import { cx, ui } from "./project-editor.styles.js";
import type {
    OverlayMode,
    ProjectEditorProps,
    SnapGuide,
} from "./project-editor.types.js";
import { SelectionCard } from "./selection-card.js";
import type { useEditorActions } from "./use-editor-actions.js";
import type { useEditorDerivedState } from "./use-editor-derived-state.js";
import type { EditorFullScreenState } from "./use-editor-full-screen.js";
import type { useEditorHistory } from "./use-editor-history.js";
import type { useEditorImage } from "./use-editor-image.js";
import type { useEditorOverlay } from "./use-editor-overlay.js";
import type { useEditorPersistence } from "./use-editor-persistence.js";
import type { useEditorSelection } from "./use-editor-selection.js";
import type { useEditorValidation } from "./use-editor-validation.js";

type ProjectEditorFullScreenViewProps = {
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
    readonly projectCompanyPanel: ProjectEditorProps["projectCompanyPanel"];
    readonly salesStatusPanel: ProjectEditorProps["salesStatusPanel"];
    readonly pagePickerPanel: ProjectEditorProps["pagePickerPanel"];
    readonly scrollDragRef: EditorCanvasProps["scrollDragRef"];
    readonly selection: ReturnType<typeof useEditorSelection>;
    readonly snapGuide: SnapGuide;
    readonly stageRef: EditorCanvasProps["stageRef"];
    readonly validation: ReturnType<typeof useEditorValidation>;
    readonly derivedState: ReturnType<typeof useEditorDerivedState>;
    readonly fullScreenState: EditorFullScreenState;
    readonly setAddMenuOpen: (open: boolean) => void;
    readonly setDirty: (dirty: boolean) => void;
    readonly setDraftPointer: (point: Point | null) => void;
    readonly setDraftPoints: (updater: (points: Point[]) => Point[]) => void;
    readonly setIsSettingReference: (value: boolean) => void;
    readonly setOverlayMode: (mode: OverlayMode) => void;
    readonly setSnapGuide: (guide: SnapGuide) => void;
    readonly zoom: number;
    readonly onAnalyze: () => void;
};

/**
 * Full-bleed, full-screen composition of the same editor state
 * `project-editor.tsx` assembles for the two-pane `ProjectEditorView` --
 * this component owns no state of its own beyond what `fullScreenState`
 * (the `useEditorFullScreen` hook, instantiated once in the container)
 * already provides.
 */
export function ProjectEditorFullScreenView({
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
    pagePickerPanel,
    scrollDragRef,
    selection,
    snapGuide,
    stageRef,
    validation,
    derivedState,
    fullScreenState,
    setAddMenuOpen,
    setDirty,
    setDraftPointer,
    setDraftPoints,
    setIsSettingReference,
    setOverlayMode,
    setSnapGuide,
    zoom,
    onAnalyze,
}: ProjectEditorFullScreenViewProps) {
    const { drawerOpen, closeDrawer, openDrawer } = fullScreenState;
    const showSelectionCard = !drawerOpen && selection.hasSelection();

    return (
        <div className={ui.fullScreenShell}>
            <div className={ui.fullScreenToolbarArea}>
                <EditorToolbar
                    addMenuOpen={addMenuOpen}
                    autoSaving={persistence.autoSaving}
                    analyzing={analyzing}
                    dirty={dirty}
                    drawerOpen={drawerOpen}
                    fullScreen
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
                    onToggleDrawer={drawerOpen ? closeDrawer : openDrawer}
                    onToggleFullScreen={fullScreenState.exit}
                    onUndo={historyState.undo}
                    hasSelection={selection.hasSelection}
                />
                {fullScreenState.autoEntered && (
                    <FullScreenAutoEnterBanner
                        onKeepPanels={fullScreenState.keepPanels}
                    />
                )}
                {analyzing && (
                    <Paragraph textSize="sm" variant="muted" status>
                        Analysis is running. Editing is temporarily disabled.
                    </Paragraph>
                )}
            </div>
            <div
                inert={analyzing}
                className={cx(
                    ui.fullScreenCanvasArea,
                    drawerOpen && ui.fullScreenCanvasShifted,
                )}
            >
                <EditorCanvas
                    canvasWrapRef={canvasWrapRef}
                    commitFromSnapshot={historyState.commitFromSnapshot}
                    draftPointer={draftPointer}
                    draftPoints={draftPoints}
                    fullScreen
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
                <div className={ui.floatingChipRow}>
                    <div className={ui.bottomLeftChipStack}>
                        <EditorLegend
                            visibleAreas={derivedState.visibleAreas}
                            variant="chip"
                        />
                        {showSelectionCard && (
                            <SelectionCard
                                selectedArea={derivedState.selectedArea}
                                selectedEdge={selection.selectedEdge}
                                selectedEdgeArea={derivedState.selectedEdgeArea}
                                selectedPointIndexes={
                                    selection.selectedPointIndexes
                                }
                                metrics={derivedState.metrics}
                                scaleMmPerPx={overlayState.scaleMmPerPx}
                                onEditProperties={openDrawer}
                            />
                        )}
                    </div>
                    <div className={ui.zoomChipPosition}>
                        <EditorZoomChip
                            zoom={zoom}
                            size="large"
                            onChangeZoom={actions.changeZoom}
                            onResetView={actions.resetView}
                        />
                    </div>
                </div>
            </div>
            <FullScreenInspectorDrawer
                actions={actions}
                derivedState={derivedState}
                dirty={dirty}
                drawerOpen={drawerOpen}
                isSettingReference={isSettingReference}
                overlayState={overlayState}
                page={page}
                pagePickerPanel={pagePickerPanel}
                persistence={persistence}
                projectCompanyPanel={projectCompanyPanel}
                salesStatusPanel={salesStatusPanel}
                selection={selection}
                validation={validation}
                closeDrawer={closeDrawer}
                setDirty={setDirty}
                setIsSettingReference={setIsSettingReference}
            />
        </div>
    );
}

function FullScreenAutoEnterBanner({
    onKeepPanels,
}: {
    readonly onKeepPanels: () => void;
}): ReactNode {
    const { t } = useEditorTranslation();

    return (
        <Box direction="row" align="center" justify="between" gap="sm">
            <Text size="sm" variant="muted">
                {t("editorToolbar.fullScreenBanner.message")}
            </Text>
            <Button variant="secondary" size="small" onClick={onKeepPanels}>
                {t("editorToolbar.fullScreenBanner.keepPanels")}
            </Button>
        </Box>
    );
}
