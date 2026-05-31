import styles from "./Divider.module.css";

import type { PropsWithChildren, ReactElement } from "react";

export function Divider({ children }: PropsWithChildren): ReactElement {
    return (
        <div className={styles["divider"]}>
            <div className={styles["line"]} />
            <span className={styles["label"]}>{children}</span>
            <div className={styles["line"]} />
        </div>
    );
}
