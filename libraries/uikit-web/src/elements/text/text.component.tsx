import clsx from "clsx";

import {
    sizes,
    truncateStyle,
    variants,
    type TextSize,
    type TextVariant,
} from "./text.styles.ts";

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type { TextSize, TextVariant };

export type TextProps = PropsWithChildren<HTMLAttributes<HTMLSpanElement>> & {
    readonly size?: TextSize;
    readonly variant?: TextVariant;
    readonly truncate?: boolean;
};

export function Text({
    size = "base",
    variant = "default",
    truncate = false,
    className,
    children,
    ...props
}: TextProps): ReactElement {
    return (
        <span
            className={clsx(
                sizes[size],
                variants[variant],
                truncate && truncateStyle,
                className,
            )}
            {...props}
        >
            {children}
        </span>
    );
}
