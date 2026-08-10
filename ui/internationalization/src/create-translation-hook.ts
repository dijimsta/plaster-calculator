import type { FlatNamespace, i18n as I18nInstance } from "i18next";
import { useTranslation } from "react-i18next";
import type { UseTranslationResponse } from "react-i18next";

export function createTranslationHook<Namespace extends FlatNamespace>(
    namespace: Namespace,
    instance: I18nInstance,
): () => UseTranslationResponse<Namespace, undefined> {
    return function useNamespaceTranslation() {
        return useTranslation(namespace, { i18n: instance });
    };
}
