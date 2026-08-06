import { styles } from "./card.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type CardProps = {
    readonly children?: ReactNode;
};

export function Card({ children }: CardProps): ReactElement {
    return <div className={styles.root}>{children}</div>;
}

export namespace Card {
    export function Header({ children }: CardProps): ReactElement {
        return <div className={styles.header}>{children}</div>;
    }

    export function Body({ children }: CardProps): ReactElement {
        return <div className={styles.body}>{children}</div>;
    }

    export function Title({ children }: CardProps): ReactElement {
        return <h2 className={styles.title}>{children}</h2>;
    }

    export function ButtonGroup({ children }: CardProps): ReactElement {
        return <div className={styles.buttonGroup}>{children}</div>;
    }

    export function Footer({ children }: CardProps): ReactElement {
        return <p className={styles.footer}>{children}</p>;
    }
}
