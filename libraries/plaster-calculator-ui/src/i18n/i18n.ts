import { createI18nInstance } from "@ui/internationalization";

import { en } from "./locales/en.ts";
import { zh } from "./locales/zh.ts";

export const QUESTIONNAIRES_NAMESPACE = "plasterCalculatorUiQuestionnaires";

export const questionnairesI18n = createI18nInstance(QUESTIONNAIRES_NAMESPACE, {
    en,
    zh,
});
