import { createLanguageCookie } from "@ui/internationalization";

import {
    fallbackLanguage,
    languageCookieName,
    supportedLanguages,
    type AppLanguage,
} from "../i18n/language.ts";

export { supportedLanguages, type AppLanguage } from "../i18n/language.ts";

export const languageCookie = createLanguageCookie<AppLanguage>(
    languageCookieName,
    supportedLanguages,
    fallbackLanguage,
);

export const { read: readLanguageCookie, write: writeLanguageCookie } =
    languageCookie;
