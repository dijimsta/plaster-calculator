export type AppLanguage = "en" | "zh";

export const supportedLanguages: readonly AppLanguage[] = ["en", "zh"];
export const fallbackLanguage: AppLanguage = "en";
export const languageCookieName = "plaster-language";
export const appMetadataByLanguage = Object.freeze({
    en: Object.freeze({
        title: "Plaster Calculator",
        description:
            "A tool to help calculate the amount of plaster needed for a project.",
    }),
    zh: Object.freeze({
        title: "石膏计算器",
        description: "帮助计算项目所需石膏用量的工具。",
    }),
});

export function resolveAppLanguage(language: string | undefined): AppLanguage {
    return (
        supportedLanguages.find((supported) => supported === language) ??
        fallbackLanguage
    );
}
