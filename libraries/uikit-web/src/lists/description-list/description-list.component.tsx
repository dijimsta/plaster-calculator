import type { ReactElement, ReactNode } from "react";

import { styles } from "./description-list.styles.ts";

export type DescriptionListItem = {
    readonly term: ReactNode;
    readonly details: ReactNode;
};

export type DescriptionListProps = {
    readonly items: readonly DescriptionListItem[];
};

export function DescriptionList({ items }: DescriptionListProps): ReactElement {
    return (
        <dl className={styles.root}>
            {items.map((item, index) => (
                <div key={index} className={styles.item}>
                    <dt className={styles.term}>{item.term}</dt>
                    <dd className={styles.details}>{item.details}</dd>
                </div>
            ))}
        </dl>
    );
}
