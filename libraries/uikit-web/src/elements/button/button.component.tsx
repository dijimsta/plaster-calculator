import clsx from "clsx";

import {
    base,
    growStyle,
    sizes,
    variants,
    type ButtonSize,
    type ButtonVariant,
} from "./button.styles.ts";

import type { ButtonHTMLAttributes, ReactElement } from "react";

export type { ButtonSize };
export type ButtonIconPosition = "left" | "right";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    readonly variant?: ButtonVariant;
    readonly size?: ButtonSize;
    readonly icon?: ReactElement;
    readonly iconPosition?: ButtonIconPosition;
    /** Allows the button to grow to fill available space in a flex row. */
    readonly grow?: boolean;
};

export function Button({
    variant = "primary",
    size = "medium",
    icon,
    iconPosition = "left",
    grow = false,
    className,
    children,
    ...props
}: ButtonProps): ReactElement {
    return (
        <button
            className={clsx(
                base,
                variants[variant],
                variant === "link" ? "p-0" : sizes[size],
                grow && growStyle,
                className,
            )}
            {...props}
        >
            {iconPosition === "left" && icon}
            {children}
            {iconPosition === "right" && icon}
        </button>
    );
}
