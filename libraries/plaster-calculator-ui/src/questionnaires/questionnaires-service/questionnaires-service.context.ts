import { createContext, useContext } from "react";

import type { IQuestionnairesService } from "@libraries/plaster-calculator-common";

export const QuestionnairesServiceContext = createContext<
    IQuestionnairesService | undefined
>(undefined);

export function useQuestionnairesService(): IQuestionnairesService {
    const service = useContext(QuestionnairesServiceContext);
    if (service) {
        return service;
    } else {
        throw new Error(
            "useQuestionnairesService must be used within a QuestionnairesServiceProvider.",
        );
    }
}
