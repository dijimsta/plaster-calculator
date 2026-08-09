"use client";

import { useContext } from "react";

import { SettingsServiceContext } from "./settings.context.ts";
import type { SettingsService } from "./settings.service.ts";

export function useSettingsService(): SettingsService {
    const context = useContext(SettingsServiceContext);
    if (context) {
        return context;
    } else {
        throw new Error(
            "useSettingsService must be used within a SettingsServiceProvider",
        );
    }
}
