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

/**
 * Owns the floorplan editor's full-screen mode: entering/exiting,
 * auto-entering below a narrow viewport width, and the session-scoped
 * "keep panels" opt-out. This is pure CSS/React state -- full screen fills
 * the editor's own content area via ordinary layout, not the browser
 * viewport, so there's no native Fullscreen API involved.
 */
export function useEditorFullScreen(): EditorFullScreenState {
    const [fullScreen, setFullScreen] = useState(false);
    const [autoEntered, setAutoEntered] = useState(false);
    const optedOutRef = useRef(hasKeptPanelsThisSession());

    const enterInternal = useCallback((auto: boolean) => {
        setFullScreen(true);
        setAutoEntered(auto);
    }, []);

    const enter = useCallback(() => enterInternal(false), [enterInternal]);

    const exit = useCallback(() => {
        setFullScreen(false);
        setAutoEntered(false);
    }, []);

    const keepPanels = useCallback(() => {
        optedOutRef.current = true;
        rememberKeepPanelsThisSession();
        exit();
    }, [exit]);

    useAutoEnterOnNarrowViewport(optedOutRef, enterInternal);

    return {
        fullScreen,
        autoEntered,
        enter,
        exit,
        keepPanels,
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
