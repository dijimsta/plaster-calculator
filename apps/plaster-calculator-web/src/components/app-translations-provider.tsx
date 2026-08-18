"use client";

import {
    companiesTranslations,
    editorTranslations,
    projectsTranslations,
    questionnairesTranslations,
    quotesTranslations,
} from "@libraries/plaster-calculator-ui";
import { I18nProvider } from "@ui/internationalization";
import type { PropsWithChildren, ReactElement } from "react";

import { appTranslations } from "../i18n/index.ts";

import { languageCookie } from "./language-cookie.js";

export function AppTranslationsProvider({
    children,
}: PropsWithChildren): ReactElement {
    return (
        <I18nProvider
            translations={[
                appTranslations,
                companiesTranslations,
                editorTranslations,
                projectsTranslations,
                questionnairesTranslations,
                quotesTranslations,
            ]}
            languageCookie={languageCookie}
        >
            {children}
        </I18nProvider>
    );
}
