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

export function VerticalNavigation({
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

export namespace VerticalNavigation {
    export type SectionProps = PropsWithChildren<
        HTMLAttributes<HTMLDivElement> & {
            readonly title?: string;
        }
    >;

    export function Section({
        title,
        className,
        children,
        ...props
    }: SectionProps): ReactElement {
        return (
            <div className={clsx(styles.section, className)} {...props}>
                {title !== undefined && (
                    <h2 className={styles.sectionTitle}>{title}</h2>
                )}
                <ul className={styles.list}>{children}</ul>
            </div>
        );
    }

    export type ItemProps = Omit<HTMLAttributes<HTMLLIElement>, "children"> & {
        readonly accessory?: ReactNode;
        readonly children: ReactElement<
            AnchorHTMLAttributes<HTMLAnchorElement>
        >;
        readonly isCurrent?: boolean;
    };

    export function Item({
        accessory,
        isCurrent = false,
        className,
        children,
        ...props
    }: ItemProps): ReactElement {
        const link = cloneElement(
            children,
            {
                "aria-current": isCurrent
                    ? "page"
                    : children.props["aria-current"],
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
}
