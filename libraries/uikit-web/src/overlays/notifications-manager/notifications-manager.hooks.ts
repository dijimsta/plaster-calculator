import { useContext } from "react";

import { NotificationsManagerContext } from "./notifications-manager.context.ts";

import type { NotificationsManagerContextValue } from "./notifications-manager.types.ts";

export function useNotificationsManager(): Pick<
    NotificationsManagerContextValue,
    "notify" | "dismiss"
> {
    const context = useContext(NotificationsManagerContext);

    if (context === null) {
        throw new Error(
            "useNotificationsManager must be used within a NotificationsProvider",
        );
    }

    return { notify: context.notify, dismiss: context.dismiss };
}
