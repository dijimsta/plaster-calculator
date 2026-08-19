"use client";

import { createContext } from "react";

/** Shape of {@link SidebarInertContext}'s value. */
export type SidebarInertContextValue = {
    readonly inert: boolean;
    readonly setInert: (inert: boolean) => void;
};

/**
 * Lets a descendant page (e.g. the project page hosting the full-screen
 * floorplan editor) tell the app layout's sidebar to become `inert` while
 * it visually covers it, even though the layout is an ancestor of that
 * page in the Next.js App Router tree and can't receive its state as a
 * prop. Defaults to "not inert" so anything rendered outside a provider
 * (e.g. Storybook) behaves as if no full-screen overlay is active.
 */
export const SidebarInertContext = createContext<SidebarInertContextValue>({
    inert: false,
    setInert: () => {
        // No-op default: only reachable outside SidebarInertProvider.
    },
});
