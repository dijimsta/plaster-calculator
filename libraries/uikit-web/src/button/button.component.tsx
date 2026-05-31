import clsx from "clsx";

import { variants, type ButtonVariant } from "./button.variants.ts";

import type { ButtonHTMLAttributes, ReactElement } from "react";

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
            className={clsx(
                "inline-flex",
                "items-center",
                "justify-center",
                "gap-2",
                "border-0",
                "rounded-lg",
                "p-2.5",
                "text-sm",
                "font-medium",
                "leading-5",
                "cursor-pointer",
                "transition",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-indigo-600",
                "disabled:opacity-50",
                "disabled:cursor-not-allowed",
                variants[variant],
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
