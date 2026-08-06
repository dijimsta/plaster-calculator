import clsx from "clsx";

import {
    fullWidthStyle,
    sizes,
    variants,
    type ButtonSize,
    type ButtonVariant,
} from "../button/button.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type ButtonLinkProps = {
    readonly variant?: ButtonVariant;
    readonly size?: ButtonSize;
    readonly fullWidth?: boolean;
    readonly label?: string;
    readonly href?: string;
    readonly children?: ReactNode;
};

export function ButtonLink({
    variant = "primary",
    size = "medium",
    fullWidth = false,
    label,
    href,
    children,
}: ButtonLinkProps): ReactElement {
    return (
        <a
            href={href}
            aria-label={label}
            className={clsx(
                "inline-flex",
                "items-center",
                "justify-center",
                "gap-2",
                "rounded-lg",
                "text-sm",
                "font-medium",
                "leading-5",
                "cursor-pointer",
                "no-underline",
                "transition",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-indigo-600",
                sizes[size],
                fullWidth && fullWidthStyle,
                variants[variant],
            )}
        >
            {children}
        </a>
    );
}
