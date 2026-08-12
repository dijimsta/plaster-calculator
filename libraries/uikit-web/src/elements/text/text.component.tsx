import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import {
    sizes,
    truncateStyle,
    variants,
    weights,
    type TextSize,
    type TextVariant,
    type TextWeight,
} from "./text.styles.ts";

export type { TextSize, TextVariant, TextWeight };

export type TextProps = {
    readonly size?: TextSize;
    readonly variant?: TextVariant;
    readonly weight?: TextWeight;
    readonly truncate?: boolean;
    readonly id?: string;
    readonly children?: ReactNode;
};

export function Text({
    size = "base",
    variant = "default",
    weight = "normal",
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
                weights[weight],
                truncate && truncateStyle,
            )}
        >
            {children}
        </span>
    );
}
