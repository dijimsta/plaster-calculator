"use client";

import { createContext } from "react";

import type { SettingsService } from "./settings.service.ts";

export const SettingsServiceContext = createContext<
    SettingsService | undefined
>(undefined);
