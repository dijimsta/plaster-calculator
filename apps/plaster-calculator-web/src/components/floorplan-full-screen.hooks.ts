"use client";

import { useContext, useEffect } from "react";

import { FloorplanFullScreenContext } from "./floorplan-full-screen.context.js";

/**
 * Marks the floorplan editor full screen for as long as the calling
 * component is mounted with `floorplanFullScreen: true`, and always resets
 * it to `false` on unmount -- so navigating away from a page that requested
 * full screen never leaves the sidebar stuck collapsed, even if the unmount
 * happens while still full screen.
 */
export function useSetFloorplanFullScreen(floorplanFullScreen: boolean): void {
    const { setFloorplanFullScreen } = useContext(FloorplanFullScreenContext);

    useEffect(() => {
        setFloorplanFullScreen(floorplanFullScreen);
        return () => setFloorplanFullScreen(false);
    }, [floorplanFullScreen, setFloorplanFullScreen]);
}

/** Reads whether the floorplan editor is currently full screen. */
export function useFloorplanFullScreen(): boolean {
    const { floorplanFullScreen } = useContext(FloorplanFullScreenContext);
    return floorplanFullScreen;
}
