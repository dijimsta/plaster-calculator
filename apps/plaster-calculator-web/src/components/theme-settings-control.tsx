"use client";

import { RadioGroup, RadioGroupOption } from "@libraries/uikit-web";
import { useEffect, useState } from "react";

import {
    readThemeCookie,
    resolveThemeMode,
    writeThemeCookie,
    type ThemeMode,
} from "./theme-cookie.js";

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
        <RadioGroup
            name="theme-mode"
            legend="Colour theme"
            variant="segmented"
            fullWidth
        >
            {themeModes.map((mode) => (
                <RadioGroupOption
                    key={mode}
                    value={mode}
                    label={getThemeLabel(mode)}
                    checked={themeMode === mode}
                    onChange={() => setThemeMode(mode)}
                />
            ))}
        </RadioGroup>
    );
}

function getThemeLabel(themeMode: ThemeMode): string {
    if (themeMode === "system") return "System";
    if (themeMode === "light") return "Light";
    return "Dark";
}
