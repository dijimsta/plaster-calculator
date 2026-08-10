import { useTranslation } from "react-i18next";
import type { UseTranslationResponse } from "react-i18next";

import { QUESTIONNAIRES_NAMESPACE } from "./i18n.ts";

export function useQuestionnairesTranslation(): UseTranslationResponse<
    typeof QUESTIONNAIRES_NAMESPACE,
    undefined
> {
    return useTranslation(QUESTIONNAIRES_NAMESPACE);
}
