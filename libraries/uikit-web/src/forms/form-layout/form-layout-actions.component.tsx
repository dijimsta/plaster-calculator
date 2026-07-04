import clsx from "clsx";

import { actions } from "./form-layout-actions.styles.ts";

import type { HTMLAttributes, ReactElement } from "react";

export type FormLayoutActionsProps = HTMLAttributes<HTMLDivElement>;

/** A right-aligned row for form-level actions. */
export function FormLayoutActions({
    className,
    children,
    ...props
}: FormLayoutActionsProps): ReactElement {
    return (
        <div className={clsx(actions, className)} {...props}>
            {children}
        </div>
    );
}
