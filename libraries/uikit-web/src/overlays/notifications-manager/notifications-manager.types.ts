import type { NotificationIntent } from "../notification/index.ts";
import type { ReactNode } from "react";

export interface NotifyOptions {
    readonly title: ReactNode;
    readonly description?: ReactNode;
    readonly intent?: NotificationIntent;
    readonly media?: ReactNode;
    readonly actions?: ReactNode;
    readonly dismissLabel?: string;
    /** Milliseconds before the notification auto-dismisses. Omit to persist until dismissed. */
    readonly duration?: number;
}

export interface ActiveNotification extends NotifyOptions {
    readonly id: string;
}

export interface NotificationsManagerContextValue {
    readonly notifications: readonly ActiveNotification[];
    notify(options: NotifyOptions): string;
    dismiss(id: string): void;
}
