import { useEffect } from "react";

interface EditorKeyboardShortcutsOptions {
    readonly isDrawingFreeShape: boolean;
    readonly onCancelFreeShape: () => void;
    readonly onClearSelection: () => void;
    readonly onDeleteSelection: () => void;
    readonly onRedo: () => void;
    readonly onUndo: () => void;
    readonly hasSelection: () => boolean;
}

export function useEditorKeyboardShortcuts({
    isDrawingFreeShape,
    onCancelFreeShape,
    onClearSelection,
    onDeleteSelection,
    onRedo,
    onUndo,
    hasSelection,
}: EditorKeyboardShortcutsOptions): void {
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            const target = event.target as HTMLElement | null;
            if (
                target &&
                ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
            )
                return;
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "z"
            ) {
                event.preventDefault();
                onUndo();
                return;
            }
            if (
                (event.ctrlKey || event.metaKey) &&
                (event.key.toLowerCase() === "y" ||
                    (event.shiftKey && event.key.toLowerCase() === "z"))
            ) {
                event.preventDefault();
                onRedo();
                return;
            }
            if (event.key === "Delete" || event.key === "Backspace") {
                event.preventDefault();
                onDeleteSelection();
                return;
            }
            if (event.key === "Escape" && isDrawingFreeShape) {
                event.preventDefault();
                onCancelFreeShape();
                return;
            }
            if (event.key === "Escape" && hasSelection()) {
                event.preventDefault();
                onClearSelection();
            }
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
    ]);
}
