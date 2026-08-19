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
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
> & {
    readonly size?: ButtonSize;
    /**
     * Renders the "Add area" popover through a `document.body` portal
     * instead of inline. The full-screen toolbar row scrolls horizontally
     * (`toolbarScrollRow`'s `overflow-x-auto`), which per the CSS Overflow
     * spec forces `overflow-y` to `auto` too, clipping an
     * absolutely-positioned popover to the row's own height -- see
     * `popoverMenuPortal` in `project-editor.styles.ts`. The two-pane
     * toolbar has no such scrolling ancestor, so it leaves this `false`
     * and keeps the original absolutely-positioned popover unchanged.
     */
    readonly portalPopover?: boolean;
};

/** Undo through delete-selection: the toolbar's core editing actions, shared by both toolbar layouts. */
export function ToolbarCoreControls({
    addMenuOpen,
    historyCount,
    futureCount,
    portalPopover = false,
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
                portalPopover={portalPopover}
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

type PopoverPosition = { readonly top: number; readonly left: number };

function AddAreaControls({
    addMenuOpen,
    portalPopover = false,
    size = "medium",
    onAddRectangle,
    onSetAddMenuOpen,
    onStartFreeShape,
}: Pick<
    EditorToolbarProps,
    "addMenuOpen" | "onAddRectangle" | "onSetAddMenuOpen" | "onStartFreeShape"
> & { readonly portalPopover?: boolean; readonly size?: ButtonSize }) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [portalPosition, setPortalPosition] =
        useState<PopoverPosition | null>(null);

    // Recomputed on open (and kept in sync on resize/scroll while open) from
    // the trigger's real position, rather than reusing `popoverMenu`'s
    // hard-coded `top-[46px]` offset -- see `portalPopover` above.
    useLayoutEffect(() => {
        if (!portalPopover || !addMenuOpen) {
            setPortalPosition(null);
            return;
        }
        const updatePosition = () => {
            const rect = triggerRef.current?.getBoundingClientRect();
            if (rect) setPortalPosition({ top: rect.bottom, left: rect.left });
        };
        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [portalPopover, addMenuOpen]);

    const menu = addMenuOpen && (
        <div
            className={portalPopover ? ui.popoverMenuPortal : ui.popoverMenu}
            style={
                portalPopover && portalPosition
                    ? { top: portalPosition.top, left: portalPosition.left }
                    : undefined
            }
        >
            <Button variant="secondary" onClick={onAddRectangle}>
                <Square size={16} /> Rectangle
            </Button>
            <Button variant="secondary" onClick={onStartFreeShape}>
                <MousePointer2 size={16} /> Free shape
            </Button>
        </div>
    );

    return (
        // `className="relative"` + `ui.popoverMenu` are a deliberately-kept
        // gap: an anchored, absolutely-positioned dropdown of buttons has no
        // UIKit equivalent -- `overlays/` only has full-screen/modal
        // components (`Backdrop`, `BusyOverlay`, `Drawer`, `ModalDialog`,
        // `Notification`), not a small inline popover/menu primitive.
        <div className="relative" ref={triggerRef}>
            <Button
                variant="secondary"
                size={size}
                icon={<Plus size={18} aria-hidden="true" />}
                onClick={() => onSetAddMenuOpen(!addMenuOpen)}
                label="Add area"
            />
            {portalPopover
                ? portalPosition && createPortal(menu, document.body)
                : menu}
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
