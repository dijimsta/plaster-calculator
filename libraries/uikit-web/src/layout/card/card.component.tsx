import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import { styles } from "./card.styles.ts";

export type CardVariant = "default" | "subtle";

export type CardProps = {
    /**
     * Stable DOM id for the card's root element. Lets a consumer target
     * this specific card from outside React's props flow — e.g. a print
     * stylesheet isolating one card via an `#id` selector.
     */
    readonly id?: string;
    readonly variant?: CardVariant;
    readonly children?: ReactNode;
};

export function Card({
    id,
    variant = "default",
    children,
}: CardProps): ReactElement {
    return (
        <div id={id} className={clsx(styles.root, styles.variants[variant])}>
            {children}
        </div>
    );
}

export namespace Card {
    export function Header({
        children,
    }: Pick<CardProps, "children">): ReactElement {
        return <div className={styles.header}>{children}</div>;
    }

    export function Body({
        children,
    }: Pick<CardProps, "children">): ReactElement {
        return <div className={styles.body}>{children}</div>;
    }

    export function Title({
        children,
    }: Pick<CardProps, "children">): ReactElement {
        return <h2 className={styles.title}>{children}</h2>;
    }

    export function ButtonGroup({
        children,
    }: Pick<CardProps, "children">): ReactElement {
        return <div className={styles.buttonGroup}>{children}</div>;
    }

    export function Footer({
        children,
    }: Pick<CardProps, "children">): ReactElement {
        return <p className={styles.footer}>{children}</p>;
    }
}
