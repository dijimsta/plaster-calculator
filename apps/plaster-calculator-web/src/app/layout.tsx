import { type PropsWithChildren } from "react";

import "./globals.css";
import { AppCheckProvider } from "../firebase/app-check.provider.ts";

export const metadata = {
    title: "Plaster Calculator",
    description:
        "A tool to help calculate the amount of plaster needed for a project.",
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <AppCheckProvider>
            <html lang="en">
                <body
                    className="font-sans antialiased"
                    suppressHydrationWarning
                >
                    {children}
                </body>
            </html>
        </AppCheckProvider>
    );
}
