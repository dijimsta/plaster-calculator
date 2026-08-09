import type { ReactElement, ReactNode } from "react";

import { actions } from "./form-layout-actions.styles.ts";

export type FormLayoutActionsProps = {
    readonly children?: ReactNode;
};

/** A right-aligned row for form-level actions. */
export function FormLayoutActions({
    children,
}: FormLayoutActionsProps): ReactElement {
    return <div className={actions}>{children}</div>;
}
