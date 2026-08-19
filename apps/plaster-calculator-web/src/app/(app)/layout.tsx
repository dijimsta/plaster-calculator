import { type PropsWithChildren } from "react";

import { AuthGuard } from "../../components/auth.guard.js";
import { FloorplanFullScreenProvider } from "../../components/floorplan-full-screen.provider.js";
import Sidebar from "../../components/sidebar.component.js";
import { UserInitializedGuard } from "../../components/user-initialized.guard.js";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <AuthGuard>
            <UserInitializedGuard>
                <FloorplanFullScreenProvider>
                    <Sidebar>{children}</Sidebar>
                </FloorplanFullScreenProvider>
            </UserInitializedGuard>
        </AuthGuard>
    );
}
