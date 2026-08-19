"use client";

import { createContext } from "react";

/** Shape of {@link FloorplanFullScreenContext}'s value. */
export type FloorplanFullScreenContextValue = {
    readonly floorplanFullScreen: boolean;
    readonly setFloorplanFullScreen: (floorplanFullScreen: boolean) => void;
};

/**
 * Lets a descendant page (e.g. the project page hosting the full-screen
 * floorplan editor) tell the app layout's sidebar to collapse into an
 * icon-only rail while the editor is full screen, even though the layout is
 * an ancestor of that page in the Next.js App Router tree and can't receive
 * its state as a prop. Defaults to `false` so anything rendered outside a
 * provider (e.g. Storybook) behaves as if no full-screen editor is active.
 */
export const FloorplanFullScreenContext =
    createContext<FloorplanFullScreenContextValue>({
        floorplanFullScreen: false,
        setFloorplanFullScreen: () => {
            // No-op default: only reachable outside FloorplanFullScreenProvider.
        },
    });
