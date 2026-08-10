import i18next from "i18next";
import type { i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";

export type I18nNamespaceResources = Record<string, object>;

export function createI18nInstance<Namespace extends string>(
    namespace: Namespace,
    resourcesByLanguage: I18nNamespaceResources,
    fallbackLanguage = "en",
): I18nInstance {
    const instance = i18next.createInstance();

    void instance.use(initReactI18next).init({
        lng: fallbackLanguage,
        fallbackLng: fallbackLanguage,
        ns: [namespace],
        defaultNS: namespace,
        resources: Object.fromEntries(
            Object.entries(resourcesByLanguage).map(([language, resource]) => [
                language,
                { [namespace]: resource },
            ]),
        ),
        interpolation: {
            escapeValue: false,
        },
    });

    return instance;
}
