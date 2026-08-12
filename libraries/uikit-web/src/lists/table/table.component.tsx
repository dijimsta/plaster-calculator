import clsx from "clsx";
import type { KeyboardEvent, ReactElement, ReactNode } from "react";

import { cellAligns, styles, type TableCellAlign } from "./table.styles.ts";

export type { TableCellAlign };

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

    export type RowProps = HeadProps & {
        /**
         * When provided, the whole row becomes an activation target (click
         * or Enter/Space while focused) in addition to any interactive
         * elements nested inside it — e.g. a table of records that opens a
         * detail view on row click but still has its own per-cell action
         * buttons.
         */
        readonly onClick?: () => void;
    };

    export function Row({ onClick, children }: RowProps): ReactElement {
        const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }
            event.preventDefault();
            onClick?.();
        };

        return (
            <tr
                tabIndex={onClick ? 0 : undefined}
                className={clsx(onClick && styles.interactiveRow)}
                onClick={onClick}
                onKeyDown={onClick ? handleKeyDown : undefined}
            >
                {children}
            </tr>
        );
    }

    export type HeaderProps = HeadProps & {
        /** Shrinks the column to the width of its content instead of stretching. */
        readonly fit?: boolean;
        /** Text alignment within the header cell. Defaults to `"start"`. */
        readonly align?: TableCellAlign;
        readonly scope?: "col" | "colgroup" | "row" | "rowgroup";
        readonly colSpan?: number;
        readonly rowSpan?: number;
    };

    export function Header({
        scope = "col",
        fit = false,
        align,
        colSpan,
        rowSpan,
        children,
    }: HeaderProps): ReactElement {
        return (
            <th
                scope={scope}
                colSpan={colSpan}
                rowSpan={rowSpan}
                className={clsx(
                    styles.header,
                    fit && styles.fitWidth,
                    align !== undefined && cellAligns[align],
                )}
            >
                {children}
            </th>
        );
    }

    export type CellProps = HeadProps & {
        /** Shrinks the column to the width of its content instead of stretching. */
        readonly fit?: boolean;
        /** Text alignment within the cell. Defaults to `"start"`. */
        readonly align?: TableCellAlign;
        readonly colSpan?: number;
        readonly rowSpan?: number;
    };

    export function Cell({
        fit = false,
        align,
        colSpan,
        rowSpan,
        children,
    }: CellProps): ReactElement {
        return (
            <td
                colSpan={colSpan}
                rowSpan={rowSpan}
                className={clsx(
                    styles.cell,
                    fit && styles.fitWidth,
                    align !== undefined && cellAligns[align],
                )}
            >
                {children}
            </td>
        );
    }
}
