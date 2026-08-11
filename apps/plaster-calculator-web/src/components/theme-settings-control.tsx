"use client";

import { RadioGroup, RadioGroupOption } from "@libraries/uikit-web";
import { useEffect, useState } from "react";

import { useAppTranslation } from "../i18n/index.ts";

import {
    readThemeCookie,
    resolveThemeMode,
    writeThemeCookie,
    type ThemeMode,
} from "./theme-cookie.js";

const themeModes: readonly ThemeMode[] = ["system", "light", "dark"];

export function ThemeSettingsControl() {
    const { t } = useAppTranslation();
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

    const themeModeLabels: Record<ThemeMode, string> = {
        system: t("themeSettingsControl.modeLabels.system"),
        light: t("themeSettingsControl.modeLabels.light"),
        dark: t("themeSettingsControl.modeLabels.dark"),
    };

    return (
        <RadioGroup
            name="theme-mode"
            legend={t("themeSettingsControl.legend")}
            variant="segmented"
            fullWidth
        >
            {themeModes.map((mode) => (
                <RadioGroupOption
                    key={mode}
                    value={mode}
                    label={themeModeLabels[mode]}
                    checked={themeMode === mode}
                    onChange={() => setThemeMode(mode)}
                />
            ))}
        </RadioGroup>
    );
}
