import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import { styles } from "./stacked-list.styles.ts";

export type StackedListVariant = "divided" | "cards";

export type StackedListProps = {
    /**
     * "divided" (default) renders one bordered block with a divider line
     * between items. "cards" renders each item as its own separated,
     * hoverable card -- use it for rows that link out individually.
     */
    readonly variant?: StackedListVariant;
    readonly bordered?: boolean;
    readonly density?: "compact" | "default";
    readonly children?: ReactNode;
};

export type StackedListItemProps = Pick<StackedListProps, "variant"> &
    Pick<StackedListProps, "children">;

export function StackedList({
    variant = "divided",
    bordered = false,
    density = "default",
    children,
}: StackedListProps): ReactElement {
    return (
        <ul
            role="list"
            className={clsx(
                variant === "cards" ? styles.cardsRoot : styles.root,
                variant === "divided" && bordered && styles.borderedRoot,
                variant === "divided" &&
                    density === "compact" &&
                    styles.compactRoot,
            )}
        >
            {children}
        </ul>
    );
}

export namespace StackedList {
    export function Item({
        variant = "divided",
        children,
    }: StackedListItemProps): ReactElement {
        return (
            <li className={variant === "cards" ? styles.cardItem : styles.item}>
                {children}
            </li>
        );
    }
}
