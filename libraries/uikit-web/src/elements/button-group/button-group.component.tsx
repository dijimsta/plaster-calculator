import clsx from "clsx";

import { root } from "./button-group.styles.ts";

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type ButtonGroupProps = PropsWithChildren<
    HTMLAttributes<HTMLDivElement>
>;

/** Visually joins related buttons into a single action group. */
export function ButtonGroup({
    className,
    children,
    role = "group",
    ...props
}: ButtonGroupProps): ReactElement {
    return (
        <div className={clsx(root, className)} role={role} {...props}>
            {children}
        </div>
    );
}
