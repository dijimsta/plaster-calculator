import { type PropsWithChildren } from "react";
import "./globals.css";

export const metadata = {
    title: "Plaster Calculator",
    description:
        "A tool to help calculate the amount of plaster needed for a project.",
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
