import type { ReactElement, ReactNode } from "react";

import { actionsClassName } from "./form-layout-actions.styles.ts";

export type FormLayoutActionsProps = {
    /** Draws a separator above the form actions. */
    readonly divided?: boolean;
    readonly children?: ReactNode;
};

/** A right-aligned row for form-level actions. */
export function FormLayoutActions({
    divided = true,
    children,
}: FormLayoutActionsProps): ReactElement {
    return <div className={actionsClassName(divided)}>{children}</div>;
}
