import {
    CompaniesServiceProvider,
    NestedComponents,
    ProjectsServiceProvider,
    QuestionnairesServiceProvider,
    RemindersServiceProvider,
    SettingsServiceProvider,
    TeamsServiceProvider,
} from "@libraries/plaster-calculator-web-core";
import { NotificationsProvider } from "@libraries/uikit-web";
import { type Metadata } from "next";
import { cookies } from "next/headers.js";
import { type PropsWithChildren } from "react";

import "./globals.css";
import { AppTranslationsProvider } from "../components/app-translations-provider.js";
import { AppQueryClientProvider } from "../components/query-client.provider.js";
import { ThemeInitializer } from "../components/theme-initializer.js";
import { AppCheckProvider } from "../firebase/app-check.provider.ts";
import {
    appMetadataByLanguage,
    languageCookieName,
    resolveAppLanguage,
    type AppLanguage,
} from "../i18n/language.ts";

const icons: Metadata["icons"] = {
    icon: [
        { url: "/favicon.ico" },
        {
            url: "/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
        },
        {
            url: "/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
        },
        {
            url: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
        },
        {
            url: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
        },
    ],
    apple: [
        {
            url: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
        },
    ],
};

async function getRequestLanguage(): Promise<AppLanguage> {
    const cookieStore = await cookies();
    return resolveAppLanguage(cookieStore.get(languageCookieName)?.value);
}

export async function generateMetadata(): Promise<Metadata> {
    const language = await getRequestLanguage();

    return {
        ...appMetadataByLanguage[language],
        icons,
    };
}

export default async function RootLayout({ children }: PropsWithChildren) {
    const language = await getRequestLanguage();

    return (
        <html lang={language}>
            <body>
                <AppTranslationsProvider>
                    <NestedComponents
                        components={[
                            AppCheckProvider,
                            AppQueryClientProvider,
                            NotificationsProvider,
                            TeamsServiceProvider,
                            CompaniesServiceProvider,
                            ProjectsServiceProvider,
                            QuestionnairesServiceProvider,
                            RemindersServiceProvider,
                            SettingsServiceProvider,
                        ]}
                    >
                        <ThemeInitializer />
                        {children}
                    </NestedComponents>
                </AppTranslationsProvider>
            </body>
        </html>
    );
}
