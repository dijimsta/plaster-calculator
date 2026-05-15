import { type PropsWithChildren } from "react";

export const metadata = {
    title: 'Plaster Calculator',
    description: 'A tool to help calculate the amount of plaster needed for a project.',
}

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
