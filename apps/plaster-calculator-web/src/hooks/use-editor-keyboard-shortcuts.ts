import { useEffect } from "react";

type KeyboardShortcutAction = "cancel" | "clear" | "delete" | "redo" | "undo";

interface EditorKeyboardShortcutsOptions {
    readonly isDrawingFreeShape: boolean;
    readonly disabled: boolean;
    readonly onCancelFreeShape: () => void;
    readonly onClearSelection: () => void;
    readonly onDeleteSelection: () => void;
    readonly onRedo: () => void;
    readonly onUndo: () => void;
    readonly hasSelection: () => boolean;
}

export function useEditorKeyboardShortcuts({
    isDrawingFreeShape,
    disabled,
    onCancelFreeShape,
    onClearSelection,
    onDeleteSelection,
    onRedo,
    onUndo,
    hasSelection,
}: EditorKeyboardShortcutsOptions): void {
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (disabled) return;
            if (isFormTarget(event.target)) {
                return;
            }

            const action = shortcutActionFor(
                event,
                isDrawingFreeShape,
                hasSelection(),
            );
            if (!action) {
                return;
            }

            event.preventDefault();
            const actions: Record<KeyboardShortcutAction, () => void> = {
                cancel: onCancelFreeShape,
                clear: onClearSelection,
                delete: onDeleteSelection,
                redo: onRedo,
                undo: onUndo,
            };
            actions[action]();
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [
        isDrawingFreeShape,
        onCancelFreeShape,
        onClearSelection,
        onDeleteSelection,
        onRedo,
        onUndo,
        hasSelection,
        disabled,
    ]);
}

function isFormTarget(target: EventTarget | null): boolean {
    return (
        target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
    );
}

function shortcutActionFor(
    event: KeyboardEvent,
    isDrawingFreeShape: boolean,
    hasSelection: boolean,
): KeyboardShortcutAction | null {
    const key = event.key.toLowerCase();
    if (isUndoShortcut(event, key)) {
        return "undo";
    }
    if (isRedoShortcut(event, key)) {
        return "redo";
    }
    if (key === "delete" || key === "backspace") {
        return "delete";
    }
    if (key === "escape") {
        return escapeActionFor(isDrawingFreeShape, hasSelection);
    }

    return null;
}

function isUndoShortcut(event: KeyboardEvent, key: string): boolean {
    return (event.ctrlKey || event.metaKey) && key === "z" && !event.shiftKey;
}

function isRedoShortcut(event: KeyboardEvent, key: string): boolean {
    return (
        (event.ctrlKey || event.metaKey) &&
        (key === "y" || (event.shiftKey && key === "z"))
    );
}

function escapeActionFor(
    isDrawingFreeShape: boolean,
    hasSelection: boolean,
): KeyboardShortcutAction | null {
    if (isDrawingFreeShape) {
        return "cancel";
    }

    return hasSelection ? "clear" : null;
}
