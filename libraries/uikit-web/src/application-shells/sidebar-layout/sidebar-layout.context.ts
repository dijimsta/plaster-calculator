"use client";

import { createContext, useContext } from "react";

import type {
    SidebarLayoutAction,
    SidebarLayoutReducerState,
} from "./sidebar-layout.reducer.ts";
import type { Dispatch } from "react";

export interface SidebarLayoutContextValue {
    readonly dispatch: Dispatch<SidebarLayoutAction>;
    readonly state: SidebarLayoutReducerState;
}

export const SidebarLayoutContext = createContext<
    SidebarLayoutContextValue | undefined
>(undefined);

export function useSidebarLayoutContext(): SidebarLayoutContextValue {
    const context = useContext(SidebarLayoutContext);
    if (context) {
        return context;
    } else {
        throw new Error(
            "SidebarLayout compound components must be used within SidebarLayout.",
        );
    }
}
