import clsx from "clsx";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";

import {
    DEFAULT_INTENT,
    bodyColors,
    containerColors,
    iconColors,
    styles,
    titleColors,
    type AlertIntent,
} from "./alert.styles.ts";

import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
    readonly intent?: AlertIntent;
    readonly title?: ReactNode;
};

export function Alert({
    intent = DEFAULT_INTENT,
    title,
    children,
    className,
    ...props
}: AlertProps): ReactElement {
    return (
        <div
            className={clsx(
                styles.container,
                containerColors[intent],
                className,
            )}
            {...props}
        >
            <div className={styles.inner}>
                <div className={styles.iconWrapper}>
                    <AlertIcon intent={intent} />
                </div>
                <div className={styles.contentWrapper}>
                    {title !== undefined && (
                        <h3 className={clsx(styles.title, titleColors[intent])}>
                            {title}
                        </h3>
                    )}
                    {children !== undefined && (
                        <div className={clsx(styles.body, bodyColors[intent])}>
                            <p>{children}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

type AlertIconProps = {
    readonly intent: AlertIntent;
};

function AlertIcon({ intent }: AlertIconProps): ReactElement {
    const className = clsx(styles.icon, iconColors[intent]);
    switch (intent) {
        case "success":
            return <CircleCheck aria-hidden="true" className={className} />;
        case "info":
        case "neutral":
            return <Info aria-hidden="true" className={className} />;
        case "error":
            return <CircleAlert aria-hidden="true" className={className} />;
        case "warn":
            return <TriangleAlert aria-hidden="true" className={className} />;
    }
}
