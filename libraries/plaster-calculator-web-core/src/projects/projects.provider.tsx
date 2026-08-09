"use client";

import { useMemo } from "react";
import type { PropsWithChildren, ReactElement } from "react";

import { ProjectsServiceContext } from "./projects.context.ts";
import { ProjectsService } from "./projects.service.ts";

export interface ProjectsServiceProviderProps extends PropsWithChildren {
    readonly projectsService?: ProjectsService;
}

export function ProjectsServiceProvider({
    children,
    projectsService,
}: ProjectsServiceProviderProps): ReactElement {
    const value = useMemo(
        () => projectsService ?? new ProjectsService(),
        [projectsService],
    );

    return (
        <ProjectsServiceContext.Provider value={value}>
            {children}
        </ProjectsServiceContext.Provider>
    );
}
