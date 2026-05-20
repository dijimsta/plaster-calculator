import { type PropsWithChildren } from "react";

import AppBar from "../../components/appbar.component.js";
import { AuthGuard } from "../../components/auth.guard.js";
import { ThemeInitializer } from "../../components/theme-initializer.js";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <AuthGuard>
            <ThemeInitializer />
            <AppBar />
            {children}
        </AuthGuard>
    );
}
