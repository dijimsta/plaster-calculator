import { useContext } from "react";

import { NotificationsManagerContext } from "./notifications-manager.context.ts";
import { styles } from "./notifications-viewport.styles.ts";
import { Notification } from "../notification/index.ts";

import type { ReactElement } from "react";

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
