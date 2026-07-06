import { type Metadata } from "next";
import { type PropsWithChildren } from "react";

import "./globals.css";
import { AppNotificationsProvider } from "../components/notifications-manager.provider.js";
import { AppQueryClientProvider } from "../components/query-client.provider.js";
import { ThemeInitializer } from "../components/theme-initializer.js";
import { AppCheckProvider } from "../firebase/app-check.provider.ts";

export const metadata: Metadata = {
    title: "Plaster Calculator",
    description:
        "A tool to help calculate the amount of plaster needed for a project.",
    icons: {
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
    },
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body>
                <AppCheckProvider>
                    <AppQueryClientProvider>
                        <AppNotificationsProvider>
                            <ThemeInitializer />
                            {children}
                        </AppNotificationsProvider>
                    </AppQueryClientProvider>
                </AppCheckProvider>
            </body>
        </html>
    );
}
