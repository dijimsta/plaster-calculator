import clsx from "clsx";
import { cloneElement } from "react";

import { styles } from "./vertical-navigation.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type VerticalNavigationProps = {
    readonly label?: string;
    readonly children?: ReactNode;
};

export function VerticalNavigation({
    label = "Navigation",
    children,
}: VerticalNavigationProps): ReactElement {
    return (
        <nav aria-label={label} className={styles.navigation}>
            {children}
        </nav>
    );
}

export namespace VerticalNavigation {
    export type SectionProps = {
        readonly title?: string;
        readonly children?: ReactNode;
    };

    export function Section({ title, children }: SectionProps): ReactElement {
        return (
            <div className={styles.section}>
                {title !== undefined && (
                    <h2 className={styles.sectionTitle}>{title}</h2>
                )}
                <ul className={styles.list}>{children}</ul>
            </div>
        );
    }

    type ItemLinkProps = {
        readonly "aria-current"?: "page";
        readonly "className"?: string;
        readonly "children"?: ReactNode;
    };

    export type ItemProps = {
        readonly accessory?: ReactNode;
        readonly children: ReactElement;
        readonly isCurrent?: boolean;
    };

    export function Item({
        accessory,
        isCurrent = false,
        children,
    }: ItemProps): ReactElement {
        const ownedLink = children as ReactElement<ItemLinkProps>;
        const link = cloneElement(
            ownedLink,
            {
                "aria-current": isCurrent ? "page" : undefined,
                "className": clsx(styles.item, isCurrent && styles.currentItem),
            },
            ownedLink.props.children,
            accessory !== undefined && (
                <span className={styles.accessory}>{accessory}</span>
            ),
        );

        return <li>{link}</li>;
    }
}
