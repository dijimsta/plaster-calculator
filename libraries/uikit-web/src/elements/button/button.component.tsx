import clsx from "clsx";

import {
    base,
    growStyle,
    variants,
    type ButtonVariant,
} from "./button.styles.ts";

import type { ButtonHTMLAttributes, ReactElement } from "react";

export type ButtonIconPosition = "left" | "right";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    readonly variant?: ButtonVariant;
    readonly icon?: ReactElement;
    readonly iconPosition?: ButtonIconPosition;
    /** Allows the button to grow to fill available space in a flex row. */
    readonly grow?: boolean;
};

export function Button({
    variant = "primary",
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
                grow && growStyle,
                className,
            )}
            {...props}
        >
            {icon !== undefined && iconPosition === "left" && icon}
            {children}
            {icon !== undefined && iconPosition === "right" && icon}
        </button>
    );
}
