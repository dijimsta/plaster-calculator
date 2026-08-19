"use client";

import { useMemo, useState } from "react";
import type { PropsWithChildren, ReactElement } from "react";

import { FloorplanFullScreenContext } from "./floorplan-full-screen.context.js";

/**
 * Provides {@link FloorplanFullScreenContext}. Wrap the app layout's
 * `<Sidebar>` with this so a descendant page can call
 * `useSetFloorplanFullScreen` to collapse the sidebar into a rail while it
 * renders the floorplan editor full screen.
 */
export function FloorplanFullScreenProvider({
    children,
}: PropsWithChildren): ReactElement {
    const [floorplanFullScreen, setFloorplanFullScreen] = useState(false);
    const value = useMemo(
        () => ({ floorplanFullScreen, setFloorplanFullScreen }),
        [floorplanFullScreen],
    );

    return (
        <FloorplanFullScreenContext.Provider value={value}>
            {children}
        </FloorplanFullScreenContext.Provider>
    );
}
