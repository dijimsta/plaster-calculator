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

import type {
    HTMLAttributes,
    LiHTMLAttributes,
    PropsWithChildren,
    ReactElement,
} from "react";

export type GridListProps = HTMLAttributes<HTMLUListElement> & {
    /** Maximum number of columns shown at large viewports. */
    readonly columns?: GridListColumnCount;
    /** Space between grid items. */
    readonly gap?: GridListGap;
};

export function GridList({
    columns: columnCount = DEFAULT_COLUMNS,
    gap = DEFAULT_GAP,
    className,
    children,
    role = "list",
    ...props
}: PropsWithChildren<GridListProps>): ReactElement {
    return (
        <ul
            role={role}
            className={clsx(
                styles.root,
                columns[columnCount],
                gaps[gap],
                className,
            )}
            {...props}
        >
            {children}
        </ul>
    );
}

export namespace GridList {
    export function Item({
        className,
        children,
        ...props
    }: PropsWithChildren<LiHTMLAttributes<HTMLLIElement>>): ReactElement {
        return (
            <li className={clsx(styles.item, className)} {...props}>
                {children}
            </li>
        );
    }
}
