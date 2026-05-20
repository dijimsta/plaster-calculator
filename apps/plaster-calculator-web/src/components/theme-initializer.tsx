"use client";

import { useEffect } from "react";

import { readThemeCookie, resolveThemeMode } from "./theme-cookie.js";

export function ThemeInitializer() {
    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const applyTheme = () => {
            const themeMode = readThemeCookie();
            document.documentElement.dataset["theme"] = resolveThemeMode(
                themeMode,
                media.matches,
            );
        };

        applyTheme();
        media.addEventListener("change", applyTheme);
        return () => media.removeEventListener("change", applyTheme);
    }, []);

    return null;
}
