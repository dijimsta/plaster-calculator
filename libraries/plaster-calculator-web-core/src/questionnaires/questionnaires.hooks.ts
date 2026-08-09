"use client";

import { useContext } from "react";

import { QuestionnairesServiceContext } from "./questionnaires.context.ts";

import type { QuestionnairesService } from "./questionnaires.service.ts";

export function useQuestionnairesService(): QuestionnairesService {
    const context = useContext(QuestionnairesServiceContext);
    if (context) {
        return context;
    } else {
        throw new Error(
            "useQuestionnairesService must be used within a QuestionnairesServiceProvider",
        );
    }
}
