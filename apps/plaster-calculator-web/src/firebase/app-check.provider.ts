"use client";

import { useAppCheck } from "./app-check.hooks.ts";

import type { PropsWithChildren } from "react";

export function AppCheckProvider({ children }: PropsWithChildren) {
    useAppCheck();
    return children;
}
