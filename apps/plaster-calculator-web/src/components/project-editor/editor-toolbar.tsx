import {
    AlignHorizontalJustifyCenter,
    CopyPlus,
    Loader2,
    MousePointer2,
    Minus,
    Plus,
    Redo2,
    Save,
    Scissors,
    Square,
    Trash2,
    Undo2,
    ZoomIn,
} from "lucide-react";

import { cx, ui } from "../../lib/styles.js";

import type { OverlayMode } from "./project-editor.types.js";
import type { AreaPolygon } from "../../types.js";

interface EditorToolbarProps {
    readonly addMenuOpen: boolean;
    readonly autoSaving: boolean;
    readonly dirty: boolean;
    readonly futureCount: number;
    readonly historyCount: number;
    readonly overlayMode: OverlayMode;
    readonly saving: boolean;
    readonly selectedArea: AreaPolygon | null;
    readonly selectedPointCount: number;
    readonly zoom: number;
    readonly onAddPoint: () => void;
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
    readonly onUndo: () => void;
    readonly hasSelection: () => boolean;
}

const OVERLAY_MODES: OverlayMode[] = ["walls", "ceilings", "both"];

export function EditorToolbar({
    addMenuOpen,
    autoSaving,
    dirty,
    futureCount,
    historyCount,
    overlayMode,
    saving,
    selectedArea,
    selectedPointCount,
    zoom,
    onAddPoint,
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
    onUndo,
    hasSelection,
}: EditorToolbarProps) {
    return (
        <div className={ui.editorToolbar}>
            <div className={ui.buttonRow}>
                <button
                    className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                    onClick={onUndo}
                    disabled={historyCount === 0}
                    title="Undo"
                >
                    <Undo2 size={18} />
                </button>
                <button
                    className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                    onClick={onRedo}
                    disabled={futureCount === 0}
                    title="Redo"
                >
                    <Redo2 size={18} />
                </button>
                <button
                    className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                    onClick={onClearSelection}
                    disabled={!hasSelection()}
                    title="Deselect all"
                >
                    <MousePointer2 size={18} />
                </button>
                <div className="relative">
                    <button
                        className={cx(
                            ui.button,
                            ui.buttonDefault,
                            ui.buttonIcon,
                        )}
                        onClick={() => onSetAddMenuOpen(!addMenuOpen)}
                        title="Add area"
                    >
                        <Plus size={18} />
                    </button>
                    {addMenuOpen && (
                        <div className={ui.popoverMenu}>
                            <button
                                className={cx(ui.button, ui.buttonDefault)}
                                onClick={onAddRectangle}
                            >
                                <Square size={16} /> Rectangle
                            </button>
                            <button
                                className={cx(ui.button, ui.buttonDefault)}
                                onClick={onStartFreeShape}
                            >
                                <MousePointer2 size={16} /> Free shape
                            </button>
                        </div>
                    )}
                </div>
                <button
                    className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                    onClick={onAddPoint}
                    disabled={!selectedArea}
                    title="Add point"
                >
                    <CopyPlus size={18} />
                </button>
                <button
                    className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                    onClick={onStraightenSelectedPoints}
                    disabled={!selectedArea || selectedPointCount !== 2}
                    title="Straighten between selected points"
                >
                    <AlignHorizontalJustifyCenter size={18} />
                </button>
                <button
                    className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                    onClick={onSplitArea}
                    disabled={!selectedArea || selectedPointCount !== 2}
                    title="Split selected polygon"
                >
                    <Scissors size={18} />
                </button>
                <button
                    className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                    onClick={onDeleteSelection}
                    disabled={!selectedArea}
                    title={
                        selectedPointCount > 0
                            ? "Delete selected points"
                            : "Delete selected area"
                    }
                >
                    <Trash2 size={18} />
                </button>
            </div>
            <div className={ui.buttonRow}>
                <button
                    className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                    onClick={() => onChangeZoom(zoom - 0.15)}
                    title="Zoom out"
                >
                    <Minus size={18} />
                </button>
                <button
                    className={cx(ui.button, ui.buttonDefault)}
                    onClick={onResetView}
                    title="Reset zoom"
                >
                    <ZoomIn size={18} /> {Math.round(zoom * 100)}%
                </button>
                <button
                    className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                    onClick={() => onChangeZoom(zoom + 0.15)}
                    title="Zoom in"
                >
                    <Plus size={18} />
                </button>
                <div className={ui.segmented}>
                    {OVERLAY_MODES.map((mode) => (
                        <button
                            key={mode}
                            className={cx(
                                ui.segmentedButton,
                                overlayMode === mode &&
                                    ui.segmentedButtonActive,
                            )}
                            onClick={() => onSetOverlayMode(mode)}
                        >
                            {mode === "walls"
                                ? "Walls"
                                : mode === "ceilings"
                                  ? "Ceilings"
                                  : "Both"}
                        </button>
                    ))}
                </div>
                <button
                    className={cx(ui.button, ui.buttonPrimary)}
                    onClick={onSave}
                    disabled={saving || autoSaving || !dirty}
                >
                    {saving || autoSaving ? (
                        <Loader2 className="animate-spin" size={18} />
                    ) : (
                        <Save size={18} />
                    )}
                    {autoSaving ? "Auto Saving" : saving ? "Saving" : "Save"}
                </button>
            </div>
        </div>
    );
}
