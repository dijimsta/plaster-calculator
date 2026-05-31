import styles from "./Card.module.css";

import type { PropsWithChildren, ReactElement } from "react";

export function Card({ children }: PropsWithChildren): ReactElement {
    return <div className={styles["card"]}>{children}</div>;
}

export namespace Card {
    export function Title({ children }: PropsWithChildren): ReactElement {
        return <h1 className={styles["cardTitle"]}>{children}</h1>;
    }

    export function ButtonGroup({ children }: PropsWithChildren): ReactElement {
        return <div className={styles["cardButtonGroup"]}>{children}</div>;
    }

    export function Footer({ children }: PropsWithChildren): ReactElement {
        return <p className={styles["cardFooter"]}>{children}</p>;
    }
}
