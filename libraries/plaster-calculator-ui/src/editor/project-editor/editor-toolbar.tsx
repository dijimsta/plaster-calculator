import type { AreaPolygon } from "@libraries/plaster-calculator-common";
import { Box, Button } from "@libraries/uikit-web";
import type { ButtonSize } from "@libraries/uikit-web";
import { Loader2, Maximize2, Minimize2, Save, ScanLine } from "lucide-react";

import { useEditorTranslation } from "../i18n/index.js";

import { OverlayModeSelector } from "./overlay-mode-selector.js";
import { ui } from "./project-editor.styles.js";
import type { OverlayMode } from "./project-editor.types.js";
import { ToolbarCoreControls } from "./toolbar-core-controls.js";
import { ZoomControls } from "./zoom-controls.js";

export type EditorToolbarProps = {
    readonly addMenuOpen: boolean;
    readonly autoSaving: boolean;
    readonly dirty: boolean;
    readonly analyzing: boolean;
    readonly fullScreen?: boolean;
    readonly futureCount: number;
    readonly historyCount: number;
    readonly overlayMode: OverlayMode;
    readonly saving: boolean;
    readonly selectedArea: AreaPolygon | null;
    readonly selectedPointCount: number;
    readonly zoom: number;
    readonly onAddPoint: () => void;
    readonly onAnalyze: () => void;
    readonly onAddRectangle: () => void;
    readonly onChangeZoom: (zoom: number) => void;
    readonly onClearSelection: () => void;
    readonly onDeleteSelection: () => void;
    readonly onRedo: () => void;
    readonly onResetView: () => void;
    readonly onSave: () => void;
    readonly onSetAddMenuOpen: (open: boolean) => void;
    readonly onSetOverlayMode: (mode: OverlayMode) => void;
    readonly onSplitArea: () => void;
    readonly onStartFreeShape: () => void;
    readonly onStraightenSelectedPoints: () => void;
    readonly onToggleFullScreen?: () => void;
    readonly onUndo: () => void;
    readonly hasSelection: () => boolean;
};

export function EditorToolbar({
    addMenuOpen,
    autoSaving,
    dirty,
    analyzing,
    fullScreen = false,
    futureCount,
    historyCount,
    overlayMode,
    saving,
    selectedArea,
    selectedPointCount,
    zoom,
    onAddPoint,
    onAnalyze,
    onAddRectangle,
    onChangeZoom,
    onClearSelection,
    onDeleteSelection,
    onRedo,
    onResetView,
    onSave,
    onSetAddMenuOpen,
    onSetOverlayMode,
    onSplitArea,
    onStartFreeShape,
    onStraightenSelectedPoints,
    onToggleFullScreen,
    onUndo,
    hasSelection,
}: EditorToolbarProps) {
    const coreProps = {
        addMenuOpen,
        historyCount,
        futureCount,
        selectedArea,
        selectedPointCount,
        onAddPoint,
        onAddRectangle,
        onClearSelection,
        onDeleteSelection,
        onRedo,
        onSetAddMenuOpen,
        onSplitArea,
        onStartFreeShape,
        onStraightenSelectedPoints,
        onUndo,
        hasSelection,
    };

    if (fullScreen) {
        return (
            <div className={ui.toolbarScrollRow}>
                <fieldset className="contents" disabled={analyzing}>
                    <ToolbarCoreControls {...coreProps} size="large" />
                    <OverlayModeSelector
                        overlayMode={overlayMode}
                        size="md"
                        onSetOverlayMode={onSetOverlayMode}
                    />
                    <SaveButton
                        autoSaving={autoSaving}
                        dirty={dirty}
                        saving={saving}
                        size="large"
                        onSave={onSave}
                    />
                    <AnalyzeButton
                        analyzing={analyzing}
                        size="large"
                        onAnalyze={onAnalyze}
                    />
                </fieldset>
                <FullScreenToggleButton
                    fullScreen={fullScreen}
                    size="large"
                    onToggleFullScreen={onToggleFullScreen}
                />
            </div>
        );
    }

    return (
        <Box direction="row" wrap align="center" justify="between" gap="sm">
            {/* `className="contents"` is a functional CSS reset, not
                decoration: it neutralizes the native `<fieldset>`'s default
                block box so cascading `disabled={analyzing}` to every
                control below doesn't break this row's flex layout. UIKit
                has no "disable a group of children" primitive (`ButtonGroup`
                visually joins buttons but doesn't propagate `disabled`), so
                this stays a deliberately-kept gap. */}
            <fieldset className="contents" disabled={analyzing}>
                <Box direction="row" wrap gap="sm">
                    <ToolbarCoreControls {...coreProps} />
                </Box>
                <Box direction="row" wrap gap="sm">
                    <ZoomControls
                        zoom={zoom}
                        onChangeZoom={onChangeZoom}
                        onResetView={onResetView}
                    />
                    <OverlayModeSelector
                        overlayMode={overlayMode}
                        onSetOverlayMode={onSetOverlayMode}
                    />
                    <SaveButton
                        autoSaving={autoSaving}
                        dirty={dirty}
                        saving={saving}
                        onSave={onSave}
                    />
                    <FullScreenToggleButton
                        fullScreen={fullScreen}
                        onToggleFullScreen={onToggleFullScreen}
                    />
                </Box>
            </fieldset>
            <AnalyzeButton analyzing={analyzing} onAnalyze={onAnalyze} />
        </Box>
    );
}

function SaveButton({
    autoSaving,
    dirty,
    saving,
    size = "medium",
    onSave,
}: Pick<EditorToolbarProps, "autoSaving" | "dirty" | "onSave" | "saving"> & {
    readonly size?: ButtonSize;
}) {
    return (
        <Button
            variant="primary"
            size={size}
            onClick={onSave}
            disabled={saving || autoSaving || !dirty}
        >
            <SaveButtonIcon autoSaving={autoSaving} saving={saving} />
            {saveButtonLabel(autoSaving, saving)}
        </Button>
    );
}

function SaveButtonIcon({
    autoSaving,
    saving,
}: Pick<EditorToolbarProps, "autoSaving" | "saving">) {
    // See the `analyzing` icon above: no UIKit spinner/loading treatment
    // exists yet, so this leaf icon keeps its own spin animation.
    return saving || autoSaving ? (
        <Loader2 className="animate-spin" size={18} />
    ) : (
        <Save size={18} />
    );
}

function saveButtonLabel(autoSaving: boolean, saving: boolean) {
    if (autoSaving) return "Auto Saving";
    return saving ? "Saving" : "Save";
}

function AnalyzeButton({
    analyzing,
    size = "medium",
    onAnalyze,
}: Pick<EditorToolbarProps, "analyzing" | "onAnalyze"> & {
    readonly size?: ButtonSize;
}) {
    return (
        <Button
            variant="secondary"
            size={size}
            onClick={onAnalyze}
            disabled={analyzing}
        >
            {/* `className="animate-spin"` on this leaf Lucide icon is a
                deliberately-kept gap: no UIKit component exposes a
                spinner/loading treatment (`Button` has no `loading` prop). */}
            {analyzing ? (
                <Loader2 className="animate-spin" size={18} />
            ) : (
                <ScanLine size={18} />
            )}
            {analyzing ? "Analyzing..." : "Analyze"}
        </Button>
    );
}

/**
 * Enters or exits full-screen mode. Present in both toolbar layouts so
 * two-pane users can reach full screen too; renders nothing when the
 * consumer doesn't wire `onToggleFullScreen` (the current two-pane call
 * site doesn't -- see `project-editor-view.tsx`'s zero-diff constraint).
 */
function FullScreenToggleButton({
    fullScreen,
    size = "medium",
    onToggleFullScreen,
}: {
    readonly fullScreen: boolean;
    readonly size?: ButtonSize;
    readonly onToggleFullScreen?: () => void;
}) {
    const { t } = useEditorTranslation();
    if (!onToggleFullScreen) return null;

    return (
        <Button
            variant="secondary"
            size={size}
            icon={
                fullScreen ? (
                    <Minimize2 size={18} aria-hidden="true" />
                ) : (
                    <Maximize2 size={18} aria-hidden="true" />
                )
            }
            onClick={onToggleFullScreen}
            label={
                fullScreen
                    ? t("editorToolbar.exitFullScreen")
                    : t("editorToolbar.enterFullScreen")
            }
        />
    );
}
