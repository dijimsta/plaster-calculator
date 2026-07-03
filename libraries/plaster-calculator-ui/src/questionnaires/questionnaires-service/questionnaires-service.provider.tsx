import { QuestionnairesServiceContext } from "./questionnaires-service.context.ts";

import type { QuestionnairesService } from "@libraries/plaster-calculator-common";
import type { ReactElement, ReactNode } from "react";

export interface QuestionnairesServiceProviderProps {
    readonly service: QuestionnairesService;
    readonly children: ReactNode;
}

export function QuestionnairesServiceProvider({
    service,
    children,
}: QuestionnairesServiceProviderProps): ReactElement {
    return (
        <QuestionnairesServiceContext.Provider value={service}>
            {children}
        </QuestionnairesServiceContext.Provider>
    );
}
