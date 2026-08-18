import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import { styles } from "./card.styles.ts";

export type CardVariant = "default" | "subtle" | "dashed";
export type CardVisibility = keyof typeof styles.visibility;
export type CardOverflow = keyof typeof styles.overflow;

export type CardProps = {
    /**
     * Stable DOM id for the card's root element. Lets a consumer target
     * this specific card from outside React's props flow — e.g. a print
     * stylesheet isolating one card via an `#id` selector.
     */
    readonly id?: string;
    readonly variant?: CardVariant;
    readonly visibility?: CardVisibility;
    /**
     * Whether content may render past the card's rounded-corner bounds.
     * Defaults to "hidden". Set to "visible" when the card hosts an
     * absolutely positioned dropdown/popover that must escape it.
     */
    readonly overflow?: CardOverflow;
    /**
     * Highlights this card as the currently-selected option in a set of
     * cards -- e.g. one of several selectable template cards. Purely
     * visual; pair with `onClick` and, where the cards represent mutually
     * exclusive options, `aria-pressed` is set for you.
     */
    readonly selected?: boolean;
    /**
     * Makes the whole card an activation target: the root renders as a
     * `<button type="button">` instead of a `<div>`, with hover/focus
     * styling and keyboard support included. Omit for a purely
     * presentational card.
     */
    readonly onClick?: () => void;
    readonly children?: ReactNode;
};

export function Card({
    id,
    variant = "default",
    visibility = "visible",
    overflow = "hidden",
    selected = false,
    onClick,
    children,
}: CardProps): ReactElement {
    const className = clsx(
        styles.root,
        styles.variants[variant],
        styles.visibility[visibility],
        styles.overflow[overflow],
        onClick && styles.interactive,
        selected && styles.selected,
    );

    if (onClick) {
        return (
            <button
                id={id}
                type="button"
                aria-pressed={selected}
                className={className}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }

    return (
        <div id={id} className={className}>
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
