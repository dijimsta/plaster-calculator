export type LanguageCookie<Language extends string> = {
    read: () => Language;
    write: (language: Language) => void;
};

const defaultMaxAgeSeconds = 60 * 60 * 24 * 365;

export function createLanguageCookie<Language extends string>(
    cookieName: string,
    supportedLanguages: readonly Language[],
    fallbackLanguage: Language,
    maxAgeSeconds = defaultMaxAgeSeconds,
): LanguageCookie<Language> {
    function read(): Language {
        const value = document.cookie
            .split("; ")
            .find((item) => item.startsWith(`${cookieName}=`))
            ?.split("=")[1];

        return (
            supportedLanguages.find((language) => language === value) ??
            fallbackLanguage
        );
    }

    function write(language: Language): void {
        document.cookie = `${cookieName}=${language}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
    }

    return { read, write };
}
