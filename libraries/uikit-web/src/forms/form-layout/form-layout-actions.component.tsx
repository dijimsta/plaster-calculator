import { actions } from "./form-layout-actions.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type FormLayoutActionsProps = {
    readonly children?: ReactNode;
};

/** A right-aligned row for form-level actions. */
export function FormLayoutActions({
    children,
}: FormLayoutActionsProps): ReactElement {
    return <div className={actions}>{children}</div>;
}
