"use client";

import { useMemo } from "react";

import { TeamsServiceContext } from "./teams.context.ts";
import { TeamsService } from "./teams.service.ts";

import type { PropsWithChildren, ReactElement } from "react";

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

    return (
        <TeamsServiceContext.Provider value={value}>
            {children}
        </TeamsServiceContext.Provider>
    );
}
