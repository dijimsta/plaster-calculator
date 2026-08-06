import { root } from "./button-group.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type ButtonGroupProps = {
    readonly label?: string;
    readonly children?: ReactNode;
};

/** Visually joins related buttons into a single action group. */
export function ButtonGroup({
    children,
    label,
}: ButtonGroupProps): ReactElement {
    return (
        <div className={root} role="group" aria-label={label}>
            {children}
        </div>
    );
}
