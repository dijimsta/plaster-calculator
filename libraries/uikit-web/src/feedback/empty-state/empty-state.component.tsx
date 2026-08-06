import clsx from "clsx";

import { styles, type EmptyStateVariant } from "./empty-state.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type { EmptyStateVariant };

export type EmptyStateProps = {
    readonly icon?: ReactNode;
    readonly title: ReactNode;
    readonly description?: ReactNode;
    readonly actions?: ReactNode;
    readonly variant?: EmptyStateVariant;
};

/** Presents a helpful next step when a view has no content to display. */
export function EmptyState({
    icon,
    title,
    description,
    actions,
    variant = "simple",
}: EmptyStateProps): ReactElement {
    return (
        <div className={clsx(styles.base, styles.variants[variant])}>
            {icon !== undefined && (
                <div aria-hidden="true" className={styles.icon}>
                    {icon}
                </div>
            )}
            <h3 className={styles.title}>{title}</h3>
            {description !== undefined && (
                <div className={styles.description}>{description}</div>
            )}
            {actions !== undefined && (
                <div className={styles.actions}>{actions}</div>
            )}
        </div>
    );
}
