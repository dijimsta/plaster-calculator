"use client";

import { useContext, useEffect } from "react";

import { SidebarInertContext } from "./sidebar-inert.context.js";

/**
 * Marks the app sidebar inert for as long as the calling component is
 * mounted with `inert: true`, and always restores it to interactive on
 * unmount -- so navigating away from a page that requested `inert` never
 * leaves the sidebar stuck non-interactive, even if the unmount happens
 * while still full screen.
 */
export function useSetSidebarInert(inert: boolean): void {
    const { setInert } = useContext(SidebarInertContext);

    useEffect(() => {
        setInert(inert);
        return () => setInert(false);
    }, [inert, setInert]);
}

/** Reads whether the app sidebar is currently marked inert. */
export function useSidebarInert(): boolean {
    const { inert } = useContext(SidebarInertContext);
    return inert;
}
