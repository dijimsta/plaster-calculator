"use client";

import { createContext } from "react";

import type { QuestionnairesService } from "./questionnaires.service.ts";

export const QuestionnairesServiceContext = createContext<
    QuestionnairesService | undefined
>(undefined);
