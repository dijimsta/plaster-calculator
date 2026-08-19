"use client";

import { useMemo, useState } from "react";
import type { PropsWithChildren, ReactElement } from "react";

import { SidebarInertContext } from "./sidebar-inert.context.js";

/**
 * Provides {@link SidebarInertContext}. Wrap the app layout's `<Sidebar>`
 * with this so a descendant page can call `useSetSidebarInert` to make the
 * sidebar inert while it renders a full-screen overlay on top of it.
 */
export function SidebarInertProvider({
    children,
}: PropsWithChildren): ReactElement {
    const [inert, setInert] = useState(false);
    const value = useMemo(() => ({ inert, setInert }), [inert]);

    return (
        <SidebarInertContext.Provider value={value}>
            {children}
        </SidebarInertContext.Provider>
    );
}
