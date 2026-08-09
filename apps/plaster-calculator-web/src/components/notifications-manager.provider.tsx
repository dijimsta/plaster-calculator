"use client";

import { NotificationsProvider } from "@libraries/uikit-web";

import type { PropsWithChildren } from "react";

export function AppNotificationsProvider({ children }: PropsWithChildren) {
    return <NotificationsProvider>{children}</NotificationsProvider>;
}
