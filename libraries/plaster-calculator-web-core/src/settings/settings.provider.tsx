"use client";

import { useMemo } from "react";

import { SettingsServiceContext } from "./settings.context.ts";
import { SettingsService } from "./settings.service.ts";

import type { PropsWithChildren, ReactElement } from "react";

export interface SettingsServiceProviderProps extends PropsWithChildren {
    readonly settingsService?: SettingsService;
}

export function SettingsServiceProvider({
    children,
    settingsService,
}: SettingsServiceProviderProps): ReactElement {
    const value = useMemo(
        () => settingsService ?? new SettingsService(),
        [settingsService],
    );

    return (
        <SettingsServiceContext.Provider value={value}>
            {children}
        </SettingsServiceContext.Provider>
    );
}
