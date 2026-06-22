import clsx from "clsx";

import { colors, type BadgeColor } from "./badge.colors.ts";
import { DEFAULT_COLOR, DEFAULT_VARIANT } from "./badge.constants.ts";
import { variants, type BadgeVariant } from "./badge.variants.ts";

import type { HTMLAttributes, ReactElement } from "react";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    readonly color?: BadgeColor;
    readonly variant?: BadgeVariant;
};

export function Badge({
    color = DEFAULT_COLOR,
    variant = DEFAULT_VARIANT,
    className,
    children,
    ...props
}: BadgeProps): ReactElement {
    return (
        <span
            className={clsx(variants[variant], colors[color], className)}
            {...props}
        >
            {children}
        </span>
    );
}
