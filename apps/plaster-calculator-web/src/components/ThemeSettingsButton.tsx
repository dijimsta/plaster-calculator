"use client";

import { useEffect, useState } from "react";
import { Settings, X } from "lucide-react";
import { cx, ui } from "../lib/styles.js";

type ThemeMode = "system" | "light" | "dark";

export default function ThemeSettingsButton() {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [themeMode, setThemeMode] = useState<ThemeMode>("system");

    useEffect(() => {
        const saved = window.localStorage.getItem(
            "plaster-theme",
        ) as ThemeMode | null;
        if (saved === "light" || saved === "dark" || saved === "system")
            setThemeMode(saved);
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const applyTheme = () => {
            const resolved =
                themeMode === "system"
                    ? media.matches
                        ? "dark"
                        : "light"
                    : themeMode;
            document.documentElement.dataset["theme"] = resolved;
            window.localStorage.setItem("plaster-theme", themeMode);
        };
        applyTheme();
        media.addEventListener("change", applyTheme);
        return () => media.removeEventListener("change", applyTheme);
    }, [themeMode]);

    return (
        <>
            <button
                className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                onClick={() => setSettingsOpen(true)}
                title="Settings"
            >
                <Settings size={18} />
            </button>

            {settingsOpen && (
                <div className={ui.modalBackdrop}>
                    <section className={cx(ui.modal, "max-w-[520px]")}>
                        <header className={ui.editorToolbar}>
                            <div>
                                <h2>Settings</h2>
                                <p className={ui.muted}>
                                    Choose the colour theme for this browser.
                                </p>
                            </div>
                            <button
                                className={cx(
                                    ui.button,
                                    ui.buttonDefault,
                                    ui.buttonIcon,
                                )}
                                onClick={() => setSettingsOpen(false)}
                                title="Close settings"
                            >
                                <X size={18} />
                            </button>
                        </header>
                        <div className={ui.field}>
                            <span className={ui.label}>Colour theme</span>
                            <div className={cx(ui.segmented, ui.segmentedWide)}>
                                {(
                                    ["system", "light", "dark"] as ThemeMode[]
                                ).map((mode) => (
                                    <button
                                        key={mode}
                                        className={cx(
                                            ui.segmentedButton,
                                            themeMode === mode &&
                                                ui.segmentedButtonActive,
                                        )}
                                        onClick={() => setThemeMode(mode)}
                                    >
                                        {mode === "system"
                                            ? "System"
                                            : mode === "light"
                                              ? "Light"
                                              : "Dark"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}
