import { useEffect, useRef } from "react";

type KeyboardShortcutAction =
    | "cancel"
    | "clear"
    | "closeDrawer"
    | "delete"
    | "enterFullScreen"
    | "exitFullScreen"
    | "redo"
    | "undo";

type EditorKeyboardShortcutsOptions = {
    readonly isDrawingFreeShape: boolean;
    readonly disabled: boolean;
    /** Whether the full-screen inspector `Drawer` is open. Escape closes it first, ahead of exiting full screen. */
    readonly drawerOpen?: boolean;
    /** Whether the editor is currently in full-screen mode. Escape exits it, ahead of the cancel-draw/clear-selection fallback. */
    readonly fullScreen?: boolean;
    readonly onCancelFreeShape: () => void;
    readonly onClearSelection: () => void;
    readonly onCloseDrawer?: () => void;
    readonly onDeleteSelection: () => void;
    readonly onEnterFullScreen?: () => void;
    readonly onExitFullScreen?: () => void;
    readonly onRedo: () => void;
    readonly onUndo: () => void;
    readonly hasSelection: () => boolean;
};

export function useEditorKeyboardShortcuts(
    options: EditorKeyboardShortcutsOptions,
): void {
    const optionsRef = useRef(options);
    optionsRef.current = options;

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (optionsRef.current.disabled) return;
            if (isFormTarget(event.target)) return;

            const action = shortcutActionFor(event, optionsRef.current);
            if (!action) return;

            event.preventDefault();
            runShortcutAction(action, optionsRef.current);
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);
}

function runShortcutAction(
    action: KeyboardShortcutAction,
    options: EditorKeyboardShortcutsOptions,
): void {
    const actions: Record<KeyboardShortcutAction, (() => void) | undefined> = {
        cancel: options.onCancelFreeShape,
        clear: options.onClearSelection,
        closeDrawer: options.onCloseDrawer,
        delete: options.onDeleteSelection,
        enterFullScreen: options.onEnterFullScreen,
        exitFullScreen: options.onExitFullScreen,
        redo: options.onRedo,
        undo: options.onUndo,
    };
    actions[action]?.();
}

function isFormTarget(target: EventTarget | null): boolean {
    return (
        target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
    );
}

function shortcutActionFor(
    event: KeyboardEvent,
    options: EditorKeyboardShortcutsOptions,
): KeyboardShortcutAction | null {
    const key = event.key.toLowerCase();
    if (isUndoShortcut(event, key)) return "undo";
    if (isRedoShortcut(event, key)) return "redo";
    if (key === "delete" || key === "backspace") return "delete";
    if (key === "escape") return escapeActionFor(options);
    if (isEnterFullScreenShortcut(event, key, options)) {
        return "enterFullScreen";
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

/**
 * Escape's precedence, as the single source of truth for this compound
 * key: a closed drawer would otherwise leave the user unsure whether
 * Escape closed the drawer, exited full screen, or cleared a selection all
 * at once. `Drawer` itself deliberately has no internal Escape handling
 * (see its `modal` prop doc) so this stays the only listener.
 *
 * Deliberate order, in priority:
 *   1. Close the drawer, if open.
 *   2. Cancel an in-progress free-shape draw.
 *   3. Clear the current selection.
 *   4. Exit full screen.
 *   5. Otherwise, nothing.
 *
 * Steps 2-3 are exactly what Escape already does in the two-pane layout
 * (see `legacyEscapeAction`), and they intentionally run *before*
 * full-screen exit: full screen changes layout only, so it must not steal
 * Escape from an in-progress draw or a selection the two-pane layout would
 * have handled first. Exiting full screen is Escape's last resort, used
 * only once there is truly nothing else for it to do.
 */
function escapeActionFor(
    options: EditorKeyboardShortcutsOptions,
): KeyboardShortcutAction | null {
    if (options.drawerOpen) return "closeDrawer";

    const legacyAction = legacyEscapeAction(options);
    if (legacyAction) return legacyAction;

    if (options.fullScreen) return "exitFullScreen";
    return null;
}

/** Escape's behaviour in the two-pane layout: cancel a draw, else clear a selection, else do nothing. */
function legacyEscapeAction(
    options: EditorKeyboardShortcutsOptions,
): KeyboardShortcutAction | null {
    if (options.isDrawingFreeShape) return "cancel";
    return options.hasSelection() ? "clear" : null;
}

function isEnterFullScreenShortcut(
    event: KeyboardEvent,
    key: string,
    options: EditorKeyboardShortcutsOptions,
): boolean {
    return (
        key === "f" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        !options.fullScreen
    );
}
