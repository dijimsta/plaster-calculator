import clsx from "clsx";

import {
    sizes,
    variants,
    type TextSize,
    type TextVariant,
} from "./text.styles.ts";

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type { TextSize, TextVariant };

export type TextProps = PropsWithChildren<HTMLAttributes<HTMLSpanElement>> & {
    readonly size?: TextSize;
    readonly variant?: TextVariant;
};

export function Text({
    size = "base",
    variant = "default",
    className,
    children,
    ...props
}: TextProps): ReactElement {
    return (
        <span
            className={clsx(sizes[size], variants[variant], className)}
            {...props}
        >
            {children}
        </span>
    );
}
