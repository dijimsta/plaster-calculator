import clsx from "clsx";

import { styles } from "./description-list.styles.ts";

import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export type DescriptionListItem = {
    readonly term: ReactNode;
    readonly details: ReactNode;
};

export type DescriptionListProps = Omit<
    HTMLAttributes<HTMLDListElement>,
    "children"
> & {
    readonly items: readonly DescriptionListItem[];
};

export function DescriptionList({
    items,
    className,
    ...props
}: DescriptionListProps): ReactElement {
    return (
        <dl className={clsx(styles.root, className)} {...props}>
            {items.map((item, index) => (
                <div key={index} className={styles.item}>
                    <dt className={styles.term}>{item.term}</dt>
                    <dd className={styles.details}>{item.details}</dd>
                </div>
            ))}
        </dl>
    );
}
