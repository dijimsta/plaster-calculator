"use client";

import { createContext } from "react";

import type { ProjectsService } from "./projects.service.ts";

export const ProjectsServiceContext = createContext<
    ProjectsService | undefined
>(undefined);
