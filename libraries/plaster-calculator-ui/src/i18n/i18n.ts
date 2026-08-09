import i18next from "i18next";
import type { i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./locales/en.ts";
import { zh } from "./locales/zh.ts";

export const QUESTIONNAIRES_NAMESPACE = "plasterCalculatorUiQuestionnaires";

export const questionnairesI18n: I18nInstance = i18next.createInstance();

void questionnairesI18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    ns: [QUESTIONNAIRES_NAMESPACE],
    defaultNS: QUESTIONNAIRES_NAMESPACE,
    resources: {
        en: {
            [QUESTIONNAIRES_NAMESPACE]: en,
        },
        zh: {
            [QUESTIONNAIRES_NAMESPACE]: zh,
        },
    },
    interpolation: {
        escapeValue: false,
    },
});
