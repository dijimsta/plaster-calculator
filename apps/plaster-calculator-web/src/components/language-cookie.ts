import { createLanguageCookie } from "@ui/internationalization";

export type AppLanguage = "en" | "zh";

export const supportedLanguages: readonly AppLanguage[] = ["en", "zh"];

export const languageCookie = createLanguageCookie<AppLanguage>(
    "plaster-language",
    supportedLanguages,
    "en",
);

export const { read: readLanguageCookie, write: writeLanguageCookie } =
    languageCookie;
