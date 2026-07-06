import clsx from "clsx";

import { styles } from "./backdrop.styles.ts";

import type { HTMLAttributes, ReactElement } from "react";

export type BackdropProps = HTMLAttributes<HTMLDivElement>;

/** A full-viewport scrim for visually separating overlaid content. */
export function Backdrop({ className, ...props }: BackdropProps): ReactElement {
    return (
        <div
            aria-hidden="true"
            className={clsx(styles.root, className)}
            {...props}
        />
    );
}
