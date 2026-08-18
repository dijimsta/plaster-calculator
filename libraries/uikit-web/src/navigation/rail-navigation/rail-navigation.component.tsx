import clsx from "clsx";
import { Children, cloneElement } from "react";
import type { ReactElement, ReactNode } from "react";

import { styles } from "./rail-navigation.styles.ts";

export type RailNavigationProps = {
    readonly label?: string;
    readonly children?: ReactNode;
};

export function RailNavigation({
    label = "Navigation",
    children,
}: RailNavigationProps): ReactElement {
    return (
        <nav aria-label={label} className={styles.navigation}>
            {children}
        </nav>
    );
}

export namespace RailNavigation {
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
        readonly "title"?: string;
    };

    export type ItemProps = {
        readonly accessory?: ReactNode;
        readonly children: ReactElement;
        readonly isCurrent?: boolean;
    };

    /**
     * Item content must lead with an icon element — the icon stays visible,
     * everything after it (label text, and `accessory`) is preserved for
     * screen readers but visually hidden to fit the icon-only rail.
     */
    export function Item({
        accessory,
        isCurrent = false,
        children,
    }: ItemProps): ReactElement {
        const ownedLink = children as ReactElement<ItemLinkProps>;
        const [icon, ...rest] = Children.toArray(ownedLink.props.children);
        const labelContent =
            accessory === undefined ? rest : [...rest, accessory];
        const title =
            rest.length === 1 && typeof rest[0] === "string"
                ? rest[0]
                : undefined;
        const link = cloneElement(
            ownedLink,
            {
                "aria-current": isCurrent ? "page" : undefined,
                "className": clsx(
                    styles.item,
                    isCurrent ? styles.currentItem : styles.defaultItem,
                ),
                "title": title,
            },
            icon,
            labelContent.length > 0 && (
                <span className={styles.label}>{labelContent}</span>
            ),
        );

        return <li>{link}</li>;
    }
}
