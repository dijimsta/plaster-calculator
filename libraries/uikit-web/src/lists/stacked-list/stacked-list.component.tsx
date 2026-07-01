import clsx from "clsx";

import { styles } from "./stacked-list.styles.ts";

import type {
    HTMLAttributes,
    LiHTMLAttributes,
    PropsWithChildren,
    ReactElement,
} from "react";

export type StackedListProps = HTMLAttributes<HTMLUListElement>;

export function StackedList({
    className,
    children,
    role = "list",
    ...props
}: PropsWithChildren<StackedListProps>): ReactElement {
    return (
        <ul role={role} className={clsx(styles.root, className)} {...props}>
            {children}
        </ul>
    );
}

export namespace StackedList {
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
