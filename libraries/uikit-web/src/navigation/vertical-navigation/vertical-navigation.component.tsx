import clsx from "clsx";
import { cloneElement } from "react";

import { styles } from "./vertical-navigation.styles.ts";

import type {
    AnchorHTMLAttributes,
    HTMLAttributes,
    PropsWithChildren,
    ReactElement,
    ReactNode,
} from "react";

export type VerticalNavigationProps = PropsWithChildren<
    HTMLAttributes<HTMLElement>
>;

export type VerticalNavigationSectionProps = PropsWithChildren<
    HTMLAttributes<HTMLDivElement> & {
        readonly title?: string;
    }
>;

export type VerticalNavigationItemProps = Omit<
    HTMLAttributes<HTMLLIElement>,
    "children"
> & {
    readonly accessory?: ReactNode;
    readonly children: ReactElement<AnchorHTMLAttributes<HTMLAnchorElement>>;
    readonly isCurrent?: boolean;
};

function VerticalNavigationRoot({
    className,
    children,
    ...props
}: VerticalNavigationProps): ReactElement {
    return (
        <nav className={clsx(styles.navigation, className)} {...props}>
            {children}
        </nav>
    );
}

function VerticalNavigationSection({
    title,
    className,
    children,
    ...props
}: VerticalNavigationSectionProps): ReactElement {
    return (
        <div className={clsx(styles.section, className)} {...props}>
            {title !== undefined && (
                <h2 className={styles.sectionTitle}>{title}</h2>
            )}
            <ul className={styles.list}>{children}</ul>
        </div>
    );
}

function VerticalNavigationItem({
    accessory,
    isCurrent = false,
    className,
    children,
    ...props
}: VerticalNavigationItemProps): ReactElement {
    const link = cloneElement(
        children,
        {
            "aria-current": isCurrent ? "page" : children.props["aria-current"],
            "className": clsx(
                children.props.className,
                styles.item,
                isCurrent && styles.currentItem,
            ),
        },
        children.props.children,
        accessory !== undefined && (
            <span className={styles.accessory}>{accessory}</span>
        ),
    );

    return (
        <li className={className} {...props}>
            {link}
        </li>
    );
}

export const VerticalNavigation = Object.assign(VerticalNavigationRoot, {
    Section: VerticalNavigationSection,
    Item: VerticalNavigationItem,
});
