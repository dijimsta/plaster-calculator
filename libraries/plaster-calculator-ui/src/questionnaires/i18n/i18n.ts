import { createI18nNamespaceTranslations } from "@ui/internationalization";

import { en } from "./locales/en.ts";
import { zh } from "./locales/zh.ts";

export const QUESTIONNAIRES_NAMESPACE = "plasterCalculatorUiQuestionnaires";

export const questionnairesTranslations = createI18nNamespaceTranslations({
    namespace: QUESTIONNAIRES_NAMESPACE,
    resourcesByLanguage: { en, zh },
});
