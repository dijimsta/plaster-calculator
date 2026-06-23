import clsx from "clsx";

import { variants, type ButtonVariant } from "../button/button.styles.ts";

import type { AnchorHTMLAttributes, ReactElement } from "react";

export type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    readonly variant?: ButtonVariant;
};

export function ButtonLink({
    variant = "primary",
    className,
    children,
    ...props
}: ButtonLinkProps): ReactElement {
    return (
        <a
            className={clsx(
                "inline-flex",
                "items-center",
                "justify-center",
                "gap-2",
                "rounded-lg",
                "p-2.5",
                "text-sm",
                "font-medium",
                "leading-5",
                "cursor-pointer",
                "no-underline",
                "transition",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-indigo-600",
                variants[variant],
                className,
            )}
            {...props}
        >
            {children}
        </a>
    );
}
