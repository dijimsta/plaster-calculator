import { type PropsWithChildren } from "react";

import { AuthGuard } from "../../components/auth.guard.js";
import Sidebar from "../../components/sidebar.component.js";
import { UserInitializedGuard } from "../../components/user-initialized.guard.js";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <AuthGuard>
            <UserInitializedGuard>
                <Sidebar>{children}</Sidebar>
            </UserInitializedGuard>
        </AuthGuard>
    );
}
