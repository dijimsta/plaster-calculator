import type { ReactNode } from "react";

import type { NotificationIntent } from "../notification/index.ts";

export type NotifyOptions = {
    readonly title: ReactNode;
    readonly description?: ReactNode;
    readonly intent?: NotificationIntent;
    readonly media?: ReactNode;
    readonly actions?: ReactNode;
    readonly dismissLabel?: string;
    /** Milliseconds before the notification auto-dismisses. Omit to persist until dismissed. */
    readonly duration?: number;
};

export type ActiveNotification = NotifyOptions & {
    readonly id: string;
};

export type NotificationsManagerContextValue = {
    readonly notifications: readonly ActiveNotification[];
    notify(options: NotifyOptions): string;
    dismiss(id: string): void;
};
