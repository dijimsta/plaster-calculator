"use client";

import { useContext } from "react";

import { ProjectsServiceContext } from "./projects.context.ts";

import type { ProjectsService } from "./projects.service.ts";

export function useProjectsService(): ProjectsService {
    const context = useContext(ProjectsServiceContext);
    if (context) {
        return context;
    } else {
        throw new Error(
            "useProjectsService must be used within a ProjectsServiceProvider",
        );
    }
}
