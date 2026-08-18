"use client";

import { useSettingsService } from "@libraries/plaster-calculator-web-core";
import { useEffect, useState } from "react";

/**
 * The signed-in user's quote follow-up window, in days, from reminder
 * settings. `null` while loading or if the settings lookup fails -- callers
 * fall back to generic auto-created copy in that case rather than blocking
 * the panel on it.
 */
export function useFollowUpWindowDays(): number | null {
    const settingsService = useSettingsService();
    const [windowDays, setWindowDays] = useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadWindowDays(): Promise<void> {
            try {
                const settings = await settingsService.getSettings();
                if (!cancelled) setWindowDays(settings.quoteFollowUpDays);
            } catch {
                // Best-effort only; the open state falls back to copy that
                // doesn't name a specific window.
            }
        }

        void loadWindowDays();
        return () => {
            cancelled = true;
        };
    }, [settingsService]);

    return windowDays;
}
