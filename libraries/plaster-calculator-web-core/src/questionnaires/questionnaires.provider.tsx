"use client";

import { useMemo } from "react";

import { QuestionnairesServiceContext } from "./questionnaires.context.ts";
import { QuestionnairesService } from "./questionnaires.service.ts";

import type { PropsWithChildren, ReactElement } from "react";

export interface QuestionnairesServiceProviderProps extends PropsWithChildren {
    readonly questionnairesService?: QuestionnairesService;
}

export function QuestionnairesServiceProvider({
    children,
    questionnairesService,
}: QuestionnairesServiceProviderProps): ReactElement {
    const value = useMemo(
        () => questionnairesService ?? new QuestionnairesService(),
        [questionnairesService],
    );

    return (
        <QuestionnairesServiceContext.Provider value={value}>
            {children}
        </QuestionnairesServiceContext.Provider>
    );
}
