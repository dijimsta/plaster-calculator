import clsx from "clsx";

import styles from "./Button.module.css";

import type { ButtonHTMLAttributes, ReactElement } from "react";

export type ButtonVariant = "primary" | "secondary" | "soft";
export type ButtonIconPosition = "left" | "right";
export type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    readonly variant?: ButtonVariant;
    readonly icon?: ReactElement;
    readonly iconPosition?: ButtonIconPosition;
};

export function Button({
    variant = "primary",
    icon,
    iconPosition = "left",
    className,
    children,
    ...props
}: ButtonProps): ReactElement {
    return (
        <button
            className={clsx(styles["button"], styles[variant], className)}
            {...props}
        >
            {icon !== undefined && iconPosition === "left" && icon}
            {children}
            {icon !== undefined && iconPosition === "right" && icon}
        </button>
    );
}
