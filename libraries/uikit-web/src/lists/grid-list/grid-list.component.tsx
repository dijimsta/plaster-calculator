import clsx from "clsx";

import {
    DEFAULT_COLUMNS,
    DEFAULT_GAP,
    columns,
    gaps,
    styles,
    type GridListColumnCount,
    type GridListGap,
} from "./grid-list.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type GridListProps = {
    /** Maximum number of columns shown at large viewports. */
    readonly columns?: GridListColumnCount;
    /** Space between grid items. */
    readonly gap?: GridListGap;
    readonly children?: ReactNode;
};

export function GridList({
    columns: columnCount = DEFAULT_COLUMNS,
    gap = DEFAULT_GAP,
    children,
}: GridListProps): ReactElement {
    return (
        <ul
            role="list"
            className={clsx(styles.root, columns[columnCount], gaps[gap])}
        >
            {children}
        </ul>
    );
}

export namespace GridList {
    export function Item({
        children,
    }: {
        readonly children?: ReactNode;
    }): ReactElement {
        return <li className={styles.item}>{children}</li>;
    }
}
