import { useContext } from "react";
import type { ReactElement } from "react";

import { Notification } from "../notification/index.ts";

import { NotificationsManagerContext } from "./notifications-manager.context.ts";
import { styles } from "./notifications-viewport.styles.ts";

export function NotificationsViewport(): ReactElement | null {
    const context = useContext(NotificationsManagerContext);

    if (context === null || context.notifications.length === 0) {
        return null;
    }

    return (
        <div className={styles.root}>
            {context.notifications.map(
                ({
                    id,
                    title,
                    description,
                    intent,
                    media,
                    actions,
                    dismissLabel,
                }) => (
                    <Notification
                        key={id}
                        title={title}
                        description={description}
                        intent={intent}
                        media={media}
                        actions={actions}
                        dismissLabel={dismissLabel}
                        onDismiss={() => context.dismiss(id)}
                    />
                ),
            )}
        </div>
    );
}
