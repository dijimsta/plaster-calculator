import styles from "./FullViewportHeightContainer.module.css";

import type { PropsWithChildren, ReactElement } from "react";

export function FullViewportHeightContainer({
    children,
}: PropsWithChildren): ReactElement {
    return <div className={styles["container"]}>{children}</div>;
}
