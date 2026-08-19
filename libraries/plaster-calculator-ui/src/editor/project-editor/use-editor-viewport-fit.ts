import { useEffect, useRef, type RefObject } from "react";

import type { ViewportSize } from "./use-editor-actions.types.js";

type EditorViewportFitOptions = {
    readonly canvasWrapRef: RefObject<HTMLDivElement | null>;
    readonly fitToViewport: () => void;
    readonly fullScreen: boolean;
    readonly hasImageSize: boolean;
    readonly pageId: string;
    readonly viewport: ViewportSize;
};

/**
 * Applies `fitToViewport()` automatically at the moments the editor should
 * start at a fitted zoom rather than whatever zoom was last set: full-screen
 * entry, the two-pane layout's initial mount, and switching pages while
 * staying in two-pane. All three share one "wait for a freshly-measured
 * viewport" guard, since each can follow a canvas-wrap DOM node swap (see
 * `use-editor-viewport.ts`) that leaves `viewport` state stale for a render
 * or two -- and one "wait for a known image size" guard (`hasImageSize`,
 * see `use-editor-derived-state.ts`), since the floorplan image loads
 * asynchronously and `fitToViewport()` would otherwise compute a "correct"
 * fit against the placeholder 1200x900 size, then never revisit it once the
 * real (usually much larger, differently-shaped) image size arrives -- the
 * ref-tracked "already applied" guards below are one-shot per entry/page, so
 * a fit computed against the wrong size sticks.
 */
export function useEditorViewportFit({
    canvasWrapRef,
    fitToViewport,
    fullScreen,
    hasImageSize,
    pageId,
    viewport,
}: EditorViewportFitOptions): void {
    const appliedFullScreenFitRef = useRef(false);
    useEffect(() => {
        if (!fullScreen) {
            // Reset so the *next* full-screen entry fits again, rather than
            // only ever fitting once for the lifetime of this editor.
            appliedFullScreenFitRef.current = false;
            return;
        }
        if (appliedFullScreenFitRef.current) return;
        if (!hasImageSize) return;
        // Entering full screen swaps in a brand-new canvas-wrap DOM node
        // (see `use-editor-viewport.ts`), and `viewport` only catches up to
        // that node's real size once its `ResizeObserver` effect has run
        // and measured it -- which can be a render or two after this
        // `fullScreen` flip, since `viewport` is React state updated
        // asynchronously by that effect. `canvasWrapRef.current` itself is
        // already the new node by this point (React attaches refs
        // synchronously during commit, strictly before this passive effect
        // runs), so comparing `viewport` against a *live* read of it
        // confirms `viewport` reflects this exact node before it's used to
        // compute a fit -- otherwise we'd silently fit against whatever the
        // previous (two-pane, or default-fallback) size was.
        const element = canvasWrapRef.current;
        if (
            !element ||
            viewport.width !== element.clientWidth ||
            viewport.height !== element.clientHeight
        ) {
            return;
        }
        appliedFullScreenFitRef.current = true;
        fitToViewport();
        // Deliberately omits `fitToViewport` (a fresh function every
        // render) from the dependency array: this should only re-evaluate
        // when full-screen entry, the viewport measurement for that entry,
        // or the image-size readiness changes, not on every unrelated
        // render -- the guard above already keeps it idempotent per entry.
    }, [fullScreen, hasImageSize, viewport.width, viewport.height]);

    // The two-pane layout's own zoom-to-fit: applies on first mount and on
    // every page switch while staying in two-pane, mirroring full screen's
    // fit-on-entry above but keyed on `pageId` instead of a fullScreen
    // transition. Tracks the last page id already fit (rather than a
    // one-shot boolean) so switching *back* to an earlier page re-fits it
    // too, and deliberately reuses the same live-DOM viewport guard as the
    // full-screen effect: on first mount the canvas-wrap node is brand new
    // and `viewport` state hasn't caught up to its real measured size yet,
    // and the same is true immediately after returning from full screen
    // (which swaps the canvas-wrap node again, see `use-editor-viewport.ts`)
    // for a page this ref hasn't seen fit for. Keyed on `pageId` alone, not
    // any "updated at" timestamp -- an autosave of the current page must
    // not yank the user's zoom/scroll out from under them the way an
    // actual page switch should. Also reuses the `hasImageSize` guard: on
    // mount (and right after a page switch), the floorplan `<img>` hasn't
    // loaded yet, well before the viewport guard above is satisfied, so
    // without this guard the fit would apply immediately against the
    // placeholder image size and never revisit it once the real image
    // loads a moment later.
    const appliedTwoPaneFitPageIdRef = useRef<string | null>(null);
    useEffect(() => {
        if (fullScreen) return;
        if (appliedTwoPaneFitPageIdRef.current === pageId) return;
        if (!hasImageSize) return;
        const element = canvasWrapRef.current;
        if (
            !element ||
            viewport.width !== element.clientWidth ||
            viewport.height !== element.clientHeight
        ) {
            return;
        }
        appliedTwoPaneFitPageIdRef.current = pageId;
        fitToViewport();
        // Deliberately omits `fitToViewport` for the same reason as the
        // full-screen effect above.
    }, [pageId, fullScreen, hasImageSize, viewport.width, viewport.height]);
}
