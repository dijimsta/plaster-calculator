import { Button, RadioGroup, RadioGroupOption } from "@libraries/uikit-web";
import {
    AlignHorizontalJustifyCenter,
    CopyPlus,
    Loader2,
    MousePointer2,
    Minus,
    Plus,
    Redo2,
    ScanLine,
    Save,
    Scissors,
    Square,
    Trash2,
    Undo2,
    ZoomIn,
} from "lucide-react";

import { ui } from "../../lib/styles.js";

import type { OverlayMode } from "./project-editor.types.js";
import type { AreaPolygon } from "@libraries/plaster-calculator-common";

interface EditorToolbarProps {
    readonly addMenuOpen: boolean;
    readonly autoSaving: boolean;
    readonly dirty: boolean;
    readonly analyzing: boolean;
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
    readonly onUndo: () => void;
    readonly hasSelection: () => boolean;
}

const OVERLAY_MODES: OverlayMode[] = ["walls", "ceilings", "both"];
const OVERLAY_MODE_LABELS: Record<OverlayMode, string> = {
    both: "Both",
    ceilings: "Ceilings",
    walls: "Walls",
};

export function EditorToolbar({
    addMenuOpen,
    autoSaving,
    dirty,
    analyzing,
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
    onUndo,
    hasSelection,
}: EditorToolbarProps) {
    return (
        <div className={ui.editorToolbar}>
            <fieldset className="contents" disabled={analyzing}>
                <div className={ui.buttonRow}>
                    <Button
                        variant="secondary"
                        icon={<Undo2 size={18} aria-hidden="true" />}
                        onClick={onUndo}
                        disabled={historyCount === 0}
                        aria-label="Undo"
                    />
                    <Button
                        variant="secondary"
                        icon={<Redo2 size={18} aria-hidden="true" />}
                        onClick={onRedo}
                        disabled={futureCount === 0}
                        aria-label="Redo"
                    />
                    <Button
                        variant="secondary"
                        icon={<MousePointer2 size={18} aria-hidden="true" />}
                        onClick={onClearSelection}
                        disabled={!hasSelection()}
                        aria-label="Deselect all"
                    />
                    <AddAreaControls
                        addMenuOpen={addMenuOpen}
                        onAddRectangle={onAddRectangle}
                        onSetAddMenuOpen={onSetAddMenuOpen}
                        onStartFreeShape={onStartFreeShape}
                    />
                    <Button
                        variant="secondary"
                        icon={<CopyPlus size={18} aria-hidden="true" />}
                        onClick={onAddPoint}
                        disabled={!selectedArea}
                        aria-label="Add point"
                    />
                    <Button
                        variant="secondary"
                        icon={
                            <AlignHorizontalJustifyCenter
                                size={18}
                                aria-hidden="true"
                            />
                        }
                        onClick={onStraightenSelectedPoints}
                        disabled={!selectedArea || selectedPointCount !== 2}
                        aria-label="Straighten between selected points"
                    />
                    <Button
                        variant="secondary"
                        icon={<Scissors size={18} aria-hidden="true" />}
                        onClick={onSplitArea}
                        disabled={!selectedArea || selectedPointCount !== 2}
                        aria-label="Split selected polygon"
                    />
                    <DeleteSelectionButton
                        selectedArea={selectedArea}
                        selectedPointCount={selectedPointCount}
                        onDeleteSelection={onDeleteSelection}
                    />
                </div>
                <div className={ui.buttonRow}>
                    <Button
                        variant="secondary"
                        icon={<Minus size={18} aria-hidden="true" />}
                        onClick={() => onChangeZoom(zoom - 0.15)}
                        aria-label="Zoom out"
                    />
                    <Button
                        variant="secondary"
                        onClick={onResetView}
                        title="Reset zoom"
                    >
                        <ZoomIn size={18} /> {Math.round(zoom * 100)}%
                    </Button>
                    <Button
                        variant="secondary"
                        icon={<Plus size={18} aria-hidden="true" />}
                        onClick={() => onChangeZoom(zoom + 0.15)}
                        aria-label="Zoom in"
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
                </div>
            </fieldset>
            <Button
                variant="secondary"
                onClick={onAnalyze}
                disabled={analyzing}
            >
                {analyzing ? (
                    <Loader2 className="animate-spin" size={18} />
                ) : (
                    <ScanLine size={18} />
                )}
                {analyzing ? "Analyzing..." : "Analyze"}
            </Button>
        </div>
    );
}

function AddAreaControls({
    addMenuOpen,
    onAddRectangle,
    onSetAddMenuOpen,
    onStartFreeShape,
}: Pick<
    EditorToolbarProps,
    "addMenuOpen" | "onAddRectangle" | "onSetAddMenuOpen" | "onStartFreeShape"
>) {
    return (
        <div className="relative">
            <Button
                variant="secondary"
                icon={<Plus size={18} aria-hidden="true" />}
                onClick={() => onSetAddMenuOpen(!addMenuOpen)}
                aria-label="Add area"
            />
            {addMenuOpen && (
                <div className={ui.popoverMenu}>
                    <Button variant="secondary" onClick={onAddRectangle}>
                        <Square size={16} /> Rectangle
                    </Button>
                    <Button variant="secondary" onClick={onStartFreeShape}>
                        <MousePointer2 size={16} /> Free shape
                    </Button>
                </div>
            )}
        </div>
    );
}

function DeleteSelectionButton({
    selectedArea,
    selectedPointCount,
    onDeleteSelection,
}: Pick<
    EditorToolbarProps,
    "onDeleteSelection" | "selectedArea" | "selectedPointCount"
>) {
    const label =
        selectedPointCount > 0
            ? "Delete selected points"
            : "Delete selected area";

    return (
        <Button
            variant="secondary"
            icon={<Trash2 size={18} aria-hidden="true" />}
            onClick={onDeleteSelection}
            disabled={!selectedArea}
            aria-label={label}
        />
    );
}

function OverlayModeSelector({
    overlayMode,
    onSetOverlayMode,
}: Pick<EditorToolbarProps, "overlayMode" | "onSetOverlayMode">) {
    return (
        <RadioGroup
            name="overlay-mode"
            legend="Overlay mode"
            variant="segmented"
            hideLegend
        >
            {OVERLAY_MODES.map((mode) => (
                <RadioGroupOption
                    key={mode}
                    value={mode}
                    label={OVERLAY_MODE_LABELS[mode]}
                    checked={overlayMode === mode}
                    onChange={() => onSetOverlayMode(mode)}
                />
            ))}
        </RadioGroup>
    );
}

function SaveButton({
    autoSaving,
    dirty,
    saving,
    onSave,
}: Pick<EditorToolbarProps, "autoSaving" | "dirty" | "onSave" | "saving">) {
    return (
        <Button
            variant="primary"
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
