import { LoaderCircle } from "lucide-react";
import type { ReactElement } from "react";

import { Backdrop } from "../backdrop/index.ts";

import { styles } from "./busy-overlay.styles.ts";

export type BusyOverlayProps = {
    readonly message: string;
};

/** A full-viewport busy indicator that blocks interaction while an operation is in progress. */
export function BusyOverlay({ message }: BusyOverlayProps): ReactElement {
    return (
        <div
            aria-busy="true"
            aria-live="polite"
            className={styles.root}
            role="status"
        >
            <Backdrop />
            <div className={styles.panel}>
                <LoaderCircle
                    aria-hidden="true"
                    className={styles.icon}
                    size={24}
                />
                <span className={styles.message}>{message}</span>
            </div>
        </div>
    );
}
