import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import {
    sizes,
    truncateStyle,
    uppercaseStyle,
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
    /** Renders the text as an uppercase, letter-spaced caption -- e.g. a field label styled as an eyebrow. */
    readonly uppercase?: boolean;
    readonly id?: string;
    readonly children?: ReactNode;
};

export function Text({
    size = "base",
    variant = "default",
    weight = "normal",
    truncate = false,
    uppercase = false,
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
                uppercase && uppercaseStyle,
            )}
        >
            {children}
        </span>
    );
}
