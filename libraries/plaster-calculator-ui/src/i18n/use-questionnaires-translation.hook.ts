import { createTranslationHook } from "@ui/internationalization";

import { QUESTIONNAIRES_NAMESPACE, questionnairesI18n } from "./i18n.ts";

export const useQuestionnairesTranslation = createTranslationHook(
    QUESTIONNAIRES_NAMESPACE,
    questionnairesI18n,
);
