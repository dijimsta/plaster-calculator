import type {
    I18nNamespaceResources,
    I18nNamespaceTranslations,
} from "./i18n-namespace-translations.types.ts";

export function createI18nNamespaceTranslations<Namespace extends string>({
    namespace,
    resourcesByLanguage,
}: {
    readonly namespace: Namespace;
    readonly resourcesByLanguage: I18nNamespaceResources;
}): I18nNamespaceTranslations {
    return { namespace, resourcesByLanguage };
}
