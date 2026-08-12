"use client";

import type { MyTeamSummary } from "@libraries/plaster-calculator-common";
import { useCallback, useMemo, useState } from "react";
import type { PropsWithChildren, ReactElement } from "react";

import { TeamsServiceContext } from "./teams.context.ts";
import { TeamsService } from "./teams.service.ts";

export interface TeamsServiceProviderProps extends PropsWithChildren {
    readonly teamsService?: TeamsService;
}

export function TeamsServiceProvider({
    children,
    teamsService,
}: TeamsServiceProviderProps): ReactElement {
    const value = useMemo(
        () => teamsService ?? new TeamsService(),
        [teamsService],
    );
    const [summary, setSummary] = useState<MyTeamSummary>();
    const refreshMyTeamSummary = useCallback(async () => {
        try {
            setSummary(await value.getMyTeamSummary());
        } catch {
            setSummary(undefined);
        }
    }, [value]);
    const contextValue = useMemo(
        () => ({ service: value, summary, refreshMyTeamSummary }),
        [refreshMyTeamSummary, summary, value],
    );

    return (
        <TeamsServiceContext.Provider value={contextValue}>
            {children}
        </TeamsServiceContext.Provider>
    );
}
