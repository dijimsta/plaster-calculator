import { type PropsWithChildren } from "react";

import { AuthGuard } from "../../components/auth.guard.js";
import Sidebar from "../../components/sidebar.component.js";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <AuthGuard>
            <Sidebar>{children}</Sidebar>
        </AuthGuard>
    );
}
