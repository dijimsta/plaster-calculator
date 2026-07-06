import clsx from "clsx";
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from "lucide-react";

import { iconColors, styles } from "./notification.styles.ts";

import type { NotificationIntent } from "./notification.styles.ts";
import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export interface NotificationProps extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "title"
> {
    readonly title: ReactNode;
    readonly description?: ReactNode;
    readonly intent?: NotificationIntent;
    readonly media?: ReactNode;
    readonly actions?: ReactNode;
    readonly onDismiss?: () => void;
    readonly dismissLabel?: string;
}

/** A compact toast-style message for non-interruptive feedback. */
export function Notification({
    title,
    description,
    intent = "neutral",
    media,
    actions,
    onDismiss,
    dismissLabel = "Dismiss notification",
    className,
    role = "status",
    ...props
}: NotificationProps): ReactElement {
    return (
        <div {...props} role={role} className={clsx(styles.root, className)}>
            <div className={styles.layout}>
                <div className={styles.iconWrapper}>
                    {media ?? <NotificationIcon intent={intent} />}
                </div>
                <div className={styles.content}>
                    <p className={styles.title}>{title}</p>
                    {description !== undefined && (
                        <div className={styles.description}>{description}</div>
                    )}
                    {actions !== undefined && (
                        <div className={styles.actions}>{actions}</div>
                    )}
                </div>
                {onDismiss !== undefined && (
                    <button
                        type="button"
                        aria-label={dismissLabel}
                        className={styles.dismissButton}
                        onClick={onDismiss}
                    >
                        <X aria-hidden="true" className={styles.dismissIcon} />
                    </button>
                )}
            </div>
        </div>
    );
}

function NotificationIcon({
    intent,
}: Readonly<{ intent: NotificationIntent }>): ReactElement {
    const className = clsx(styles.icon, iconColors[intent]);

    switch (intent) {
        case "success":
            return <CircleCheck aria-hidden="true" className={className} />;
        case "warn":
            return <TriangleAlert aria-hidden="true" className={className} />;
        case "error":
            return <CircleAlert aria-hidden="true" className={className} />;
        case "info":
        case "neutral":
            return <Info aria-hidden="true" className={className} />;
    }
}
