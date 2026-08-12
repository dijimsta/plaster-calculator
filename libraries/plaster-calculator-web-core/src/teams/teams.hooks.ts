"use client";

import type { MyTeamSummary } from "@libraries/plaster-calculator-common";
import { useContext, useEffect } from "react";

import { TeamsServiceContext } from "./teams.context.ts";
import type { TeamsService } from "./teams.service.ts";

export function useTeamsService(): TeamsService {
    return useTeamsContext().service;
}

export function useMyTeamSummary(): MyTeamSummary | undefined {
    const { refreshMyTeamSummary, summary } = useTeamsContext();

    useEffect(() => {
        void refreshMyTeamSummary();
    }, [refreshMyTeamSummary]);

    return summary;
}

export function useRefreshMyTeamSummary(): () => Promise<void> {
    return useTeamsContext().refreshMyTeamSummary;
}

function useTeamsContext() {
    const context = useContext(TeamsServiceContext);
    if (context) return context;

    throw new Error("Team hooks must be used within a TeamsServiceProvider");
}
