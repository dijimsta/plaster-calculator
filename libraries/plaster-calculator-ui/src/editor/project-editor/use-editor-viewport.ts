import { useEffect, useState, type RefObject } from "react";

type ViewportSize = {
    readonly width: number;
    readonly height: number;
};

export function useEditorViewport(
    canvasWrapRef: RefObject<HTMLDivElement | null>,
    /**
     * Any value that changes exactly when the DOM node behind
     * `canvasWrapRef` is swapped for a different one. A `useRef` object is
     * referentially stable across renders, so a `useEffect` keyed only on
     * `canvasWrapRef` itself only ever runs once, on first mount -- it
     * never notices a later swap, e.g. full-screen mode unmounting the
     * two-pane canvas div (and its DOM node) and mounting a brand-new
     * full-screen one in its place, with `canvasWrapRef.current`
     * reassigned to the new node. `project-editor.tsx` is the only
     * component that ever causes such a swap (the `fullScreen`-gated
     * conditional render between `ProjectEditorView` and
     * `ProjectEditorFullScreenView`), so it passes its own
     * `fullScreenState.fullScreen` here as that signal.
     */
    remountSignal: unknown,
): ViewportSize {
    const [viewport, setViewport] = useState<ViewportSize>({
        width: 1200,
        height: 760,
    });

    useEffect(() => {
        const element = canvasWrapRef.current;
        if (!element) return;
        const update = () =>
            setViewport({
                width: element.clientWidth,
                height: element.clientHeight,
            });
        update();
        const observer = new ResizeObserver(update);
        observer.observe(element);
        return () => observer.disconnect();
    }, [canvasWrapRef, remountSignal]);

    return viewport;
}
