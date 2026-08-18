"use client";

import { createContext, useContext } from "react";

export const RailModeContext = createContext(false);

export function useIsRailMode(): boolean {
    return useContext(RailModeContext);
}
