"use client";

import { useEffect, useState } from "react";

import {
    readThemeCookie,
    resolveThemeMode,
    writeThemeCookie,
    type ThemeMode,
} from "./theme-cookie.js";
import { cx, ui } from "../lib/styles.js";

const themeModes: readonly ThemeMode[] = ["system", "light", "dark"];

export function ThemeSettingsControl() {
    const [themeMode, setThemeMode] = useState<ThemeMode>("system");
    const [themeLoaded, setThemeLoaded] = useState(false);

    useEffect(() => {
        setThemeMode(readThemeCookie());
        setThemeLoaded(true);
    }, []);

    useEffect(() => {
        if (!themeLoaded) return;

        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const applyTheme = () => {
            document.documentElement.dataset["theme"] = resolveThemeMode(
                themeMode,
                media.matches,
            );
            writeThemeCookie(themeMode);
        };

        applyTheme();
        media.addEventListener("change", applyTheme);
        return () => media.removeEventListener("change", applyTheme);
    }, [themeLoaded, themeMode]);

    return (
        <div className={ui.field}>
            <span className={ui.label}>Colour theme</span>
            <div className={cx(ui.segmented, ui.segmentedWide)}>
                {themeModes.map((mode) => (
                    <button
                        key={mode}
                        className={cx(
                            ui.segmentedButton,
                            themeMode === mode && ui.segmentedButtonActive,
                        )}
                        onClick={() => setThemeMode(mode)}
                    >
                        {getThemeLabel(mode)}
                    </button>
                ))}
            </div>
        </div>
    );
}

function getThemeLabel(themeMode: ThemeMode): string {
    if (themeMode === "system") return "System";
    if (themeMode === "light") return "Light";
    return "Dark";
}
