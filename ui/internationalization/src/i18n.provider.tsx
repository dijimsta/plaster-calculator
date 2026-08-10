"use client";

import type { i18n as I18nInstance } from "i18next";
import { useEffect, useMemo } from "react";
import type { PropsWithChildren, ReactElement } from "react";
import { I18nextProvider } from "react-i18next";

import { createAppI18nInstance } from "./create-i18n-instance.ts";
import type { LanguageCookie } from "./create-language-cookie.ts";
import type { I18nNamespaceTranslations } from "./i18n-namespace-translations.types.ts";

export interface I18nProviderProps extends PropsWithChildren {
    readonly translations?: readonly I18nNamespaceTranslations[];
    readonly i18n?: I18nInstance;
    readonly languageCookie?: Pick<LanguageCookie<string>, "read">;
}

export function I18nProvider({
    children,
    translations = [],
    i18n,
    languageCookie,
}: I18nProviderProps): ReactElement {
    const instance = useMemo(
        () => i18n ?? createAppI18nInstance(translations),
        [i18n, translations],
    );

    useEffect(() => {
        if (!languageCookie) return;

        void instance.changeLanguage(languageCookie.read());
    }, [instance, languageCookie]);

    return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
