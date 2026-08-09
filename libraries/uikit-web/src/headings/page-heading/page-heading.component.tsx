import type { ReactElement, ReactNode } from "react";

import { styles } from "./page-heading.styles.ts";

export type PageHeadingProps = {
    readonly children?: ReactNode;
};

export function PageHeading({ children }: PageHeadingProps): ReactElement {
    return <header className={styles.root}>{children}</header>;
}

export namespace PageHeading {
    export function Breadcrumbs({ children }: PageHeadingProps): ReactElement {
        return <div className={styles.breadcrumbs}>{children}</div>;
    }

    export function Content({ children }: PageHeadingProps): ReactElement {
        return <div className={styles.content}>{children}</div>;
    }

    export function Title({ children }: PageHeadingProps): ReactElement {
        return <h1 className={styles.title}>{children}</h1>;
    }

    export function Description({ children }: PageHeadingProps): ReactElement {
        return <p className={styles.description}>{children}</p>;
    }

    export function Meta({
        children,
        label,
    }: PageHeadingProps & { readonly label?: string }): ReactElement {
        return (
            <ul role="list" aria-label={label} className={styles.meta}>
                {children}
            </ul>
        );
    }

    export namespace Meta {
        export function Item({ children }: PageHeadingProps): ReactElement {
            return <li className={styles.metaItem}>{children}</li>;
        }
    }

    export function Actions({ children }: PageHeadingProps): ReactElement {
        return <div className={styles.actions}>{children}</div>;
    }

    export function Navigation({ children }: PageHeadingProps): ReactElement {
        return <div className={styles.navigation}>{children}</div>;
    }
}
