export type ThemeMode = "system" | "light" | "dark";

const themeCookieName = "plaster-theme";
const themeCookieMaxAgeSeconds = 60 * 60 * 24 * 365;

export function readThemeCookie(): ThemeMode {
    const value = document.cookie
        .split("; ")
        .find((item) => item.startsWith(`${themeCookieName}=`))
        ?.split("=")[1];

    return toThemeMode(value);
}

export function writeThemeCookie(themeMode: ThemeMode): void {
    document.cookie = `${themeCookieName}=${themeMode}; path=/; max-age=${themeCookieMaxAgeSeconds}; samesite=lax`;
}

export function resolveThemeMode(
    themeMode: ThemeMode,
    prefersDark: boolean,
): "light" | "dark" {
    if (themeMode === "system") {
        return prefersDark ? "dark" : "light";
    }

    return themeMode;
}

function toThemeMode(value: string | undefined): ThemeMode {
    if (value === "light" || value === "dark" || value === "system") {
        return value;
    }

    return "system";
}
