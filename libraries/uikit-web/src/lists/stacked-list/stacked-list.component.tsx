import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import { styles } from "./stacked-list.styles.ts";

export type StackedListProps = {
    readonly bordered?: boolean;
    readonly density?: "compact" | "default";
    readonly children?: ReactNode;
};

export function StackedList({
    bordered = false,
    density = "default",
    children,
}: StackedListProps): ReactElement {
    return (
        <ul
            role="list"
            className={clsx(
                styles.root,
                bordered && styles.borderedRoot,
                density === "compact" && styles.compactRoot,
            )}
        >
            {children}
        </ul>
    );
}

export namespace StackedList {
    export function Item({
        children,
    }: Pick<StackedListProps, "children">): ReactElement {
        return <li className={styles.item}>{children}</li>;
    }
}
