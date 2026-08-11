import type { ReactNode } from "react";

import { ui } from "./project-editor.styles.js";

export function ValidationMessage({
    message,
}: {
    readonly message: string;
}): ReactNode {
    return message ? <span className={ui.fieldError}>{message}</span> : null;
}
