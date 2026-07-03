import { createContext, useContext } from "react";

import type { QuestionnairesService } from "@libraries/plaster-calculator-common";

export const QuestionnairesServiceContext = createContext<
    QuestionnairesService | undefined
>(undefined);

export function useQuestionnairesService(): QuestionnairesService {
    const service = useContext(QuestionnairesServiceContext);
    if (service) {
        return service;
    } else {
        throw new Error(
            "useQuestionnairesService must be used within a QuestionnairesServiceProvider.",
        );
    }
}
