"use client";

import type { MyTeamSummary } from "@libraries/plaster-calculator-common";
import { useContext, useEffect, useState } from "react";

import { TeamsServiceContext } from "./teams.context.ts";
import type { TeamsService } from "./teams.service.ts";

export function useTeamsService(): TeamsService {
    const context = useContext(TeamsServiceContext);
    if (context) {
        return context;
    } else {
        throw new Error(
            "useTeamsService must be used within a TeamsServiceProvider",
        );
    }
}

export function useMyTeamSummary(): MyTeamSummary | undefined {
    const teamsService = useTeamsService();
    const [summary, setSummary] = useState<MyTeamSummary>();

    useEffect(() => {
        let isActive = true;
        void teamsService
            .getMyTeamSummary()
            .then((nextSummary) => {
                if (isActive) setSummary(nextSummary);
            })
            .catch(() => {
                if (isActive) setSummary(undefined);
            });

        return () => {
            isActive = false;
        };
    }, [teamsService]);

    return summary;
}
