import clsx from "clsx";

import { styles } from "./sidebar-navigation.styles.ts";

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type SidebarNavigationProps = PropsWithChildren<
    HTMLAttributes<HTMLDivElement>
>;

export type SidebarNavigationHeaderProps = PropsWithChildren<
    HTMLAttributes<HTMLDivElement>
>;

export type SidebarNavigationBodyProps = PropsWithChildren<
    HTMLAttributes<HTMLDivElement>
>;

export type SidebarNavigationFooterProps = PropsWithChildren<
    HTMLAttributes<HTMLElement>
>;

function SidebarNavigationRoot({
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

function SidebarNavigationHeader({
    className,
    children,
    ...props
}: SidebarNavigationHeaderProps): ReactElement {
    return (
        <div className={clsx(styles.header, className)} {...props}>
            {children}
        </div>
    );
}

function SidebarNavigationBody({
    className,
    children,
    ...props
}: SidebarNavigationBodyProps): ReactElement {
    return (
        <div className={clsx(styles.body, className)} {...props}>
            {children}
        </div>
    );
}

function SidebarNavigationFooter({
    className,
    children,
    ...props
}: SidebarNavigationFooterProps): ReactElement {
    return (
        <footer className={clsx(styles.footer, className)} {...props}>
            {children}
        </footer>
    );
}

export const SidebarNavigation = Object.assign(SidebarNavigationRoot, {
    Header: SidebarNavigationHeader,
    Body: SidebarNavigationBody,
    Footer: SidebarNavigationFooter,
});
