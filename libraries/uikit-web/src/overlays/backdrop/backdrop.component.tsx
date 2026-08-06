import { styles } from "./backdrop.styles.ts";

import type { MouseEventHandler, ReactElement } from "react";

export type BackdropProps = {
    readonly onClick?: MouseEventHandler<HTMLDivElement>;
};

/** A full-viewport scrim for visually separating overlaid content. */
export function Backdrop({ onClick }: BackdropProps): ReactElement {
    return <div aria-hidden="true" onClick={onClick} className={styles.root} />;
}
