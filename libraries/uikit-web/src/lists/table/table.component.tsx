import clsx from "clsx";

import { styles } from "./table.styles.ts";

import type {
    HTMLAttributes,
    PropsWithChildren,
    ReactElement,
    TableHTMLAttributes,
    TdHTMLAttributes,
    ThHTMLAttributes,
} from "react";

export type TableProps = PropsWithChildren<
    TableHTMLAttributes<HTMLTableElement>
> & {
    readonly bordered?: boolean;
    readonly compact?: boolean;
    readonly striped?: boolean;
};

export function Table({
    bordered = false,
    compact = false,
    striped = false,
    className,
    children,
    ...props
}: TableProps): ReactElement {
    return (
        <div
            className={clsx(
                styles.container,
                bordered && styles.borderedContainer,
            )}
        >
            <table
                className={clsx(
                    styles.table,
                    compact && styles.compactTable,
                    striped && styles.stripedTable,
                    className,
                )}
                {...props}
            >
                {children}
            </table>
        </div>
    );
}

export namespace Table {
    export type HeadProps = PropsWithChildren<
        HTMLAttributes<HTMLTableSectionElement>
    >;

    export function Head({
        className,
        children,
        ...props
    }: HeadProps): ReactElement {
        return (
            <thead className={clsx(styles.head, className)} {...props}>
                {children}
            </thead>
        );
    }

    export type BodyProps = PropsWithChildren<
        HTMLAttributes<HTMLTableSectionElement>
    >;

    export function Body({
        className,
        children,
        ...props
    }: BodyProps): ReactElement {
        return (
            <tbody className={clsx(styles.body, className)} {...props}>
                {children}
            </tbody>
        );
    }

    export type RowProps = PropsWithChildren<
        HTMLAttributes<HTMLTableRowElement>
    >;

    export function Row({
        className,
        children,
        ...props
    }: RowProps): ReactElement {
        return (
            <tr className={className} {...props}>
                {children}
            </tr>
        );
    }

    export type HeaderProps = PropsWithChildren<
        ThHTMLAttributes<HTMLTableCellElement>
    > & {
        /** Shrinks the column to the width of its content instead of stretching. */
        readonly fit?: boolean;
    };

    export function Header({
        scope = "col",
        fit = false,
        className,
        children,
        ...props
    }: HeaderProps): ReactElement {
        return (
            <th
                scope={scope}
                className={clsx(
                    styles.header,
                    fit && styles.fitWidth,
                    className,
                )}
                {...props}
            >
                {children}
            </th>
        );
    }

    export type CellProps = PropsWithChildren<
        TdHTMLAttributes<HTMLTableCellElement>
    > & {
        /** Shrinks the column to the width of its content instead of stretching. */
        readonly fit?: boolean;
    };

    export function Cell({
        fit = false,
        className,
        children,
        ...props
    }: CellProps): ReactElement {
        return (
            <td
                className={clsx(styles.cell, fit && styles.fitWidth, className)}
                {...props}
            >
                {children}
            </td>
        );
    }
}
