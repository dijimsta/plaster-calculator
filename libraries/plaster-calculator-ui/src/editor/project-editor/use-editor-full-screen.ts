import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Global (not per-project) session flag: once a user dismisses an
 * auto-entered full-screen session via "Keep panels", auto-enter stays off
 * for the rest of this browser tab, even across further resizes or page
 * switches. `sessionStorage`, not `localStorage` — this is explicitly a
 * per-session preference, not a persisted one.
 */
const KEEP_PANELS_SESSION_KEY = "pc-editor-fullscreen-keep-panels";

/** Same narrow-viewport threshold the two-pane shell's collapsed layout used to own. */
const AUTO_ENTER_MAX_WIDTH_QUERY = "(max-width: 980px)";

export type EditorFullScreenState = {
    readonly fullScreen: boolean;
    /** Whether the *current* full-screen session was entered automatically vs. manually. */
    readonly autoEntered: boolean;
    readonly enter: () => void;
    readonly exit: () => void;
    /** Opts out of auto-enter for the rest of this session, then exits. */
    readonly keepPanels: () => void;
    /**
     * Whether the full-screen inspector `Drawer` is open. Owned here,
     * rather than as local state in the full-screen view, so the single
     * `useEditorKeyboardShortcuts` call in `project-editor.tsx` -- which
     * needs this value for Escape's close-drawer-first precedence -- can
     * read it without lifting it into that container's own state.
     */
    readonly drawerOpen: boolean;
    readonly openDrawer: () => void;
    readonly closeDrawer: () => void;
};

function hasKeptPanelsThisSession(): boolean {
    try {
        return sessionStorage.getItem(KEEP_PANELS_SESSION_KEY) === "true";
    } catch {
        return false;
    }
}

function rememberKeepPanelsThisSession(): void {
    try {
        sessionStorage.setItem(KEEP_PANELS_SESSION_KEY, "true");
    } catch {
        // Best-effort session preference (private browsing, storage quota,
        // etc.) -- losing it just means auto-enter might fire again later.
    }
}

/** Requests the browser's native Fullscreen API for the whole page, best-effort. */
function requestNativeFullScreen(): void {
    const root = document.documentElement;
    if (!document.fullscreenEnabled || !root.requestFullscreen) return;
    root.requestFullscreen().catch(() => {
        // Swallow: browsers reject programmatic fullscreen without a user
        // gesture (e.g. our own resize-triggered auto-enter), and this
        // hook's `fullScreen` state -- not the native Fullscreen API --
        // is what actually drives the app's full-bleed layout. Native
        // fullscreen is a best-effort enhancement, never a requirement.
    });
}

/** Exits the browser's native Fullscreen API, best-effort. */
function exitNativeFullScreen(): void {
    if (!document.fullscreenElement || !document.exitFullscreen) return;
    document.exitFullscreen().catch(() => {
        // Swallow for the same reason as requestNativeFullScreen above.
    });
}

/**
 * Owns the floorplan editor's full-screen mode: entering/exiting, the
 * native Fullscreen API best-effort call, auto-entering below a narrow
 * viewport width, and the session-scoped "keep panels" opt-out. The
 * editor's own full-bleed layout switch is driven entirely by `fullScreen`
 * here, independent of whether the native Fullscreen API actually engages
 * (many browsers block it without a user gesture).
 */
export function useEditorFullScreen(): EditorFullScreenState {
    const [fullScreen, setFullScreen] = useState(false);
    const [autoEntered, setAutoEntered] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const optedOutRef = useRef(hasKeptPanelsThisSession());

    const enterInternal = useCallback((auto: boolean) => {
        setFullScreen(true);
        setAutoEntered(auto);
        requestNativeFullScreen();
    }, []);

    const enter = useCallback(() => enterInternal(false), [enterInternal]);

    /** Resets this hook's own state to "not full screen", without touching the native Fullscreen API. */
    const exitInternal = useCallback(() => {
        setFullScreen(false);
        setAutoEntered(false);
        setDrawerOpen(false);
    }, []);

    const exit = useCallback(() => {
        exitInternal();
        exitNativeFullScreen();
    }, [exitInternal]);

    const keepPanels = useCallback(() => {
        optedOutRef.current = true;
        rememberKeepPanelsThisSession();
        exit();
    }, [exit]);

    const openDrawer = useCallback(() => setDrawerOpen(true), []);
    const closeDrawer = useCallback(() => setDrawerOpen(false), []);

    useAutoEnterOnNarrowViewport(optedOutRef, enterInternal);
    useSyncWithNativeFullScreenExit(exitInternal);

    return {
        fullScreen,
        autoEntered,
        enter,
        exit,
        keepPanels,
        drawerOpen,
        openDrawer,
        closeDrawer,
    };
}

/** Auto-enters full screen whenever the viewport is (or becomes) narrower than the threshold, unless opted out. */
function useAutoEnterOnNarrowViewport(
    optedOutRef: { readonly current: boolean },
    enterInternal: (auto: boolean) => void,
): void {
    useEffect(() => {
        const mediaQuery = window.matchMedia(AUTO_ENTER_MAX_WIDTH_QUERY);

        function evaluate(matches: boolean) {
            if (!matches || optedOutRef.current) return;
            enterInternal(true);
        }

        evaluate(mediaQuery.matches);
        function onChange(event: MediaQueryListEvent) {
            evaluate(event.matches);
        }

        mediaQuery.addEventListener("change", onChange);
        return () => mediaQuery.removeEventListener("change", onChange);
    }, [optedOutRef, enterInternal]);
}

/**
 * Keeps this hook's `fullScreen` state in sync with the browser's actual
 * native fullscreen state. The app can call `document.exitFullscreen()`
 * itself (via `exit()`), but the browser can also leave native fullscreen
 * through routes the app doesn't control -- F11, an OS fullscreen-exit
 * gesture, or browser chrome -- and without this listener the hook's state
 * would stay `true` while the browser is no longer actually fullscreen.
 *
 * This only ever syncs *from* the browser's state to React state via
 * `exitInternal`, never calls `document.exitFullscreen()` itself, so it
 * can't create a loop with `exit()`'s own native-exit call: `exitInternal`
 * is idempotent, so re-entering "not full screen" here when `exit()` just
 * triggered the same transition is a no-op.
 */
function useSyncWithNativeFullScreenExit(exitInternal: () => void): void {
    useEffect(() => {
        function onFullScreenChange() {
            if (!document.fullscreenElement) {
                exitInternal();
            }
        }

        document.addEventListener("fullscreenchange", onFullScreenChange);
        return () =>
            document.removeEventListener(
                "fullscreenchange",
                onFullScreenChange,
            );
    }, [exitInternal]);
}
