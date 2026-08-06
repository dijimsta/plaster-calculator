import clsx from "clsx";

import {
    sizes,
    truncateStyle,
    variants,
    type TextSize,
    type TextVariant,
} from "./text.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type { TextSize, TextVariant };

export type TextProps = {
    readonly size?: TextSize;
    readonly variant?: TextVariant;
    readonly truncate?: boolean;
    readonly id?: string;
    readonly children?: ReactNode;
};

export function Text({
    size = "base",
    variant = "default",
    truncate = false,
    id,
    children,
}: TextProps): ReactElement {
    return (
        <span
            id={id}
            className={clsx(
                sizes[size],
                variants[variant],
                truncate && truncateStyle,
            )}
        >
            {children}
        </span>
    );
}
