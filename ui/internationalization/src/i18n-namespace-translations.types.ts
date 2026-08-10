export type I18nNamespaceResources = Record<string, object>;

export type I18nNamespaceTranslations = {
    readonly namespace: string;
    readonly resourcesByLanguage: I18nNamespaceResources;
};
