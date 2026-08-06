import clsx from "clsx";

import { styles } from "./table.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type TableProps = {
    readonly bordered?: boolean;
    readonly compact?: boolean;
    readonly striped?: boolean;
    readonly label?: string;
    readonly children?: ReactNode;
};

export function Table({
    bordered = false,
    compact = false,
    striped = false,
    label,
    children,
}: TableProps): ReactElement {
    return (
        <div
            className={clsx(
                styles.container,
                bordered && styles.borderedContainer,
            )}
        >
            <table
                aria-label={label}
                className={clsx(
                    styles.table,
                    compact && styles.compactTable,
                    striped && styles.stripedTable,
                )}
            >
                {children}
            </table>
        </div>
    );
}

export namespace Table {
    export type HeadProps = {
        readonly children?: ReactNode;
    };

    export function Head({ children }: HeadProps): ReactElement {
        return <thead className={styles.head}>{children}</thead>;
    }

    export type BodyProps = HeadProps;

    export function Body({ children }: BodyProps): ReactElement {
        return <tbody className={styles.body}>{children}</tbody>;
    }

    export type RowProps = HeadProps;

    export function Row({ children }: RowProps): ReactElement {
        return <tr>{children}</tr>;
    }

    export type HeaderProps = HeadProps & {
        /** Shrinks the column to the width of its content instead of stretching. */
        readonly fit?: boolean;
        readonly scope?: "col" | "colgroup" | "row" | "rowgroup";
        readonly colSpan?: number;
        readonly rowSpan?: number;
    };

    export function Header({
        scope = "col",
        fit = false,
        colSpan,
        rowSpan,
        children,
    }: HeaderProps): ReactElement {
        return (
            <th
                scope={scope}
                colSpan={colSpan}
                rowSpan={rowSpan}
                className={clsx(styles.header, fit && styles.fitWidth)}
            >
                {children}
            </th>
        );
    }

    export type CellProps = HeadProps & {
        /** Shrinks the column to the width of its content instead of stretching. */
        readonly fit?: boolean;
        readonly colSpan?: number;
        readonly rowSpan?: number;
    };

    export function Cell({
        fit = false,
        colSpan,
        rowSpan,
        children,
    }: CellProps): ReactElement {
        return (
            <td
                colSpan={colSpan}
                rowSpan={rowSpan}
                className={clsx(styles.cell, fit && styles.fitWidth)}
            >
                {children}
            </td>
        );
    }
}
