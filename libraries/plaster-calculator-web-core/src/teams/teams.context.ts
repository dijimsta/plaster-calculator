"use client";

import { createContext } from "react";

import type { TeamsService } from "./teams.service.ts";

export const TeamsServiceContext = createContext<TeamsService | undefined>(
    undefined,
);
