import { type PropsWithChildren } from "react";

import AppBar from "../../components/appbar.component.js";
import { AuthGuard } from "../../components/auth.guard.js";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <AuthGuard>
            <AppBar />
            {children}
        </AuthGuard>
    );
}
