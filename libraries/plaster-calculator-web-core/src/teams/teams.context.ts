"use client";

import type { MyTeamSummary } from "@libraries/plaster-calculator-common";
import { createContext } from "react";

import type { TeamsService } from "./teams.service.ts";

export type TeamsServiceContextValue = Readonly<{
    service: TeamsService;
    summary: MyTeamSummary | undefined;
    refreshMyTeamSummary(): Promise<void>;
}>;

export const TeamsServiceContext = createContext<
    TeamsServiceContextValue | undefined
>(undefined);
