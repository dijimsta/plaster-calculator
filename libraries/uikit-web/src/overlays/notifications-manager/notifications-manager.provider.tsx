import { useCallback, useEffect, useRef, useState } from "react";

import { NotificationsManagerContext } from "./notifications-manager.context.ts";
import { NotificationsViewport } from "./notifications-viewport.component.tsx";

import type {
    ActiveNotification,
    NotifyOptions,
} from "./notifications-manager.types.ts";
import type { PropsWithChildren, ReactElement } from "react";

export function NotificationsProvider({
    children,
}: PropsWithChildren): ReactElement {
    const [notifications, setNotifications] = useState<
        readonly ActiveNotification[]
    >([]);
    const timeoutsRef = useRef(
        new Map<string, ReturnType<typeof setTimeout>>(),
    );

    const dismiss = useCallback((id: string) => {
        const timeout = timeoutsRef.current.get(id);

        if (timeout !== undefined) {
            clearTimeout(timeout);
            timeoutsRef.current.delete(id);
        }

        setNotifications((current) =>
            current.filter((notification) => notification.id !== id),
        );
    }, []);

    const notify = useCallback(
        (options: NotifyOptions): string => {
            const id = crypto.randomUUID();

            setNotifications((current) => [...current, { ...options, id }]);

            if (options.duration !== undefined) {
                timeoutsRef.current.set(
                    id,
                    setTimeout(() => dismiss(id), options.duration),
                );
            }

            return id;
        },
        [dismiss],
    );

    useEffect(() => {
        const timeouts = timeoutsRef.current;
        return () => {
            timeouts.forEach((timeout) => clearTimeout(timeout));
            timeouts.clear();
        };
    }, []);

    return (
        <NotificationsManagerContext.Provider
            value={{ notifications, notify, dismiss }}
        >
            {children}
            <NotificationsViewport />
        </NotificationsManagerContext.Provider>
    );
}
