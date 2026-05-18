import { ui } from "../../lib/styles.js";

import type { ReactNode } from "react";

export function ValidationMessage({
    message,
}: {
    readonly message: string;
}): ReactNode {
    return message ? <span className={ui.fieldError}>{message}</span> : null;
}
