import clsx from "clsx";

import { styles } from "./sidebar-navigation.styles.ts";

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type SidebarNavigationProps = PropsWithChildren<
    HTMLAttributes<HTMLDivElement>
>;

export function SidebarNavigation({
    className,
    children,
    ...props
}: SidebarNavigationProps): ReactElement {
    return (
        <div className={clsx(styles.root, className)} {...props}>
            {children}
        </div>
    );
}

export namespace SidebarNavigation {
    export type HeaderProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

    export function Header({
        className,
        children,
        ...props
    }: HeaderProps): ReactElement {
        return (
            <div className={clsx(styles.header, className)} {...props}>
                {children}
            </div>
        );
    }

    export type BodyProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

    export function Body({
        className,
        children,
        ...props
    }: BodyProps): ReactElement {
        return (
            <div className={clsx(styles.body, className)} {...props}>
                {children}
            </div>
        );
    }

    export type FooterProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

    export function Footer({
        className,
        children,
        ...props
    }: FooterProps): ReactElement {
        return (
            <footer className={clsx(styles.footer, className)} {...props}>
                {children}
            </footer>
        );
    }
}
