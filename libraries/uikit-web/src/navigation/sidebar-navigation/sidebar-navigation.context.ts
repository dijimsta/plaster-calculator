"use client";

import { createContext, useContext } from "react";

export type SidebarNavigationContextValue = {
    readonly isCollapsed: boolean;
    readonly toggleCollapsed: () => void;
};

export const SidebarNavigationContext = createContext<
    SidebarNavigationContextValue | undefined
>(undefined);

export function useSidebarNavigationContext(): SidebarNavigationContextValue {
    const context = useContext(SidebarNavigationContext);
    if (context) {
        return context;
    } else {
        throw new Error(
            "SidebarNavigation compound components must be used within SidebarNavigation.",
        );
    }
}
