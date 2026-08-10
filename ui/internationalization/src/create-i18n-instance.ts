import i18next from "i18next";
import type { i18n as I18nInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import type { I18nNamespaceTranslations } from "./i18n-namespace-translations.types.ts";

const FALLBACK_LANGUAGE = "en";

/** Builds a fresh i18next instance loaded with the given namespaces' translations. */
export function createAppI18nInstance(
    translations: readonly I18nNamespaceTranslations[],
): I18nInstance {
    const resources: Record<string, Record<string, object>> = {};

    for (const { namespace, resourcesByLanguage } of translations) {
        for (const [language, resource] of Object.entries(
            resourcesByLanguage,
        )) {
            resources[language] ??= {};
            resources[language][namespace] = resource;
        }
    }

    const instance = i18next.createInstance();

    void instance.use(initReactI18next).init({
        lng: FALLBACK_LANGUAGE,
        fallbackLng: FALLBACK_LANGUAGE,
        ns: translations.map((entry) => entry.namespace),
        resources,
        interpolation: {
            escapeValue: false,
        },
    });

    return instance;
}
