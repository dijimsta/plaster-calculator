"use client";

import type { PropsWithChildren } from "react";

import { useAppCheck } from "./app-check.hooks.ts";

export function AppCheckProvider({ children }: PropsWithChildren) {
    const appCheck = useAppCheck();
    return appCheck ? children : null;
}
