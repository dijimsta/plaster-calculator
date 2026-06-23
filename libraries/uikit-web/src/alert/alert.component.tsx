import clsx from "clsx";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";

import {
    DEFAULT_INTENT,
    DEFAULT_VARIANT,
    accentBorderColors,
    bodyColors,
    containerColors,
    iconColors,
    ringColors,
    styles,
    titleColors,
    type AlertIntent,
    type AlertVariant,
} from "./alert.styles.ts";

import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
    readonly intent?: AlertIntent;
    readonly variant?: AlertVariant;
    readonly accent?: boolean;
    readonly title?: ReactNode;
};

export function Alert({
    intent = DEFAULT_INTENT,
    variant = DEFAULT_VARIANT,
    accent = false,
    title,
    children,
    className,
    ...props
}: AlertProps): ReactElement {
    return (
        <div
            className={containerClass(intent, variant, accent, className)}
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

function containerClass(
    intent: AlertIntent,
    variant: AlertVariant,
    accent: boolean,
    className?: string,
): string {
    const isLight = variant === "light-with-border";
    const hasBorder =
        variant === "flat-with-border" || variant === "light-with-border";
    return clsx(
        accent ? styles.accentContainer : styles.container,
        !isLight && containerColors[intent],
        isLight && "bg-white",
        hasBorder && ringColors[intent],
        accent && accentBorderColors[intent],
        className,
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
