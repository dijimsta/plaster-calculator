import { Button } from "@libraries/uikit-web";
import type { ButtonSize } from "@libraries/uikit-web";
import {
    AlignHorizontalJustifyCenter,
    CopyPlus,
    MousePointer2,
    Plus,
    Redo2,
    Scissors,
    Square,
    Trash2,
    Undo2,
} from "lucide-react";

import { useEditorTranslation } from "../i18n/index.js";

import type { EditorToolbarProps } from "./editor-toolbar.js";
import { ui } from "./project-editor.styles.js";

export type ToolbarCoreControlsProps = Pick<
    EditorToolbarProps,
    | "addMenuOpen"
    | "historyCount"
    | "futureCount"
    | "selectedArea"
    | "selectedPointCount"
    | "onAddPoint"
    | "onAddRectangle"
    | "onClearSelection"
    | "onDeleteSelection"
    | "onRedo"
    | "onSetAddMenuOpen"
    | "onSplitArea"
    | "onStartFreeShape"
    | "onStraightenSelectedPoints"
    | "onUndo"
    | "hasSelection"
> & { readonly size?: ButtonSize };

/** Undo through delete-selection: the toolbar's core editing actions, shared by both toolbar layouts. */
export function ToolbarCoreControls({
    addMenuOpen,
    historyCount,
    futureCount,
    selectedArea,
    selectedPointCount,
    size = "medium",
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
}: ToolbarCoreControlsProps) {
    const { t } = useEditorTranslation();

    return (
        <>
            <Button
                variant="secondary"
                size={size}
                icon={<Undo2 size={18} aria-hidden="true" />}
                onClick={onUndo}
                disabled={historyCount === 0}
                label={t("editorToolbar.undo")}
            />
            <Button
                variant="secondary"
                size={size}
                icon={<Redo2 size={18} aria-hidden="true" />}
                onClick={onRedo}
                disabled={futureCount === 0}
                label={t("editorToolbar.redo")}
            />
            <Button
                variant="secondary"
                size={size}
                icon={<MousePointer2 size={18} aria-hidden="true" />}
                onClick={onClearSelection}
                disabled={!hasSelection()}
                label={t("editorToolbar.deselectAll")}
            />
            <AddAreaControls
                addMenuOpen={addMenuOpen}
                size={size}
                onAddRectangle={onAddRectangle}
                onSetAddMenuOpen={onSetAddMenuOpen}
                onStartFreeShape={onStartFreeShape}
            />
            <Button
                variant="secondary"
                size={size}
                icon={<CopyPlus size={18} aria-hidden="true" />}
                onClick={onAddPoint}
                disabled={!selectedArea}
                label={t("editorToolbar.addPoint")}
            />
            <Button
                variant="secondary"
                size={size}
                icon={
                    <AlignHorizontalJustifyCenter
                        size={18}
                        aria-hidden="true"
                    />
                }
                onClick={onStraightenSelectedPoints}
                disabled={!selectedArea || selectedPointCount !== 2}
                label={t("editorToolbar.straightenSelectedPoints")}
            />
            <Button
                variant="secondary"
                size={size}
                icon={<Scissors size={18} aria-hidden="true" />}
                onClick={onSplitArea}
                disabled={!selectedArea || selectedPointCount !== 2}
                label="Split selected polygon"
            />
            <DeleteSelectionButton
                selectedArea={selectedArea}
                selectedPointCount={selectedPointCount}
                size={size}
                onDeleteSelection={onDeleteSelection}
            />
        </>
    );
}

function AddAreaControls({
    addMenuOpen,
    size = "medium",
    onAddRectangle,
    onSetAddMenuOpen,
    onStartFreeShape,
}: Pick<
    EditorToolbarProps,
    "addMenuOpen" | "onAddRectangle" | "onSetAddMenuOpen" | "onStartFreeShape"
> & { readonly size?: ButtonSize }) {
    return (
        // `className="relative"` + `ui.popoverMenu` are a deliberately-kept
        // gap: an anchored, absolutely-positioned dropdown of buttons has no
        // UIKit equivalent -- `overlays/` only has full-screen/modal
        // components (`Backdrop`, `BusyOverlay`, `Drawer`, `ModalDialog`,
        // `Notification`), not a small inline popover/menu primitive.
        <div className="relative">
            <Button
                variant="secondary"
                size={size}
                icon={<Plus size={18} aria-hidden="true" />}
                onClick={() => onSetAddMenuOpen(!addMenuOpen)}
                label="Add area"
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
    size = "medium",
    onDeleteSelection,
}: Pick<
    EditorToolbarProps,
    "onDeleteSelection" | "selectedArea" | "selectedPointCount"
> & { readonly size?: ButtonSize }) {
    const label =
        selectedPointCount > 0
            ? "Delete selected points"
            : "Delete selected area";

    return (
        <Button
            variant="secondary"
            size={size}
            icon={<Trash2 size={18} aria-hidden="true" />}
            onClick={onDeleteSelection}
            disabled={!selectedArea}
            label={label}
        />
    );
}
