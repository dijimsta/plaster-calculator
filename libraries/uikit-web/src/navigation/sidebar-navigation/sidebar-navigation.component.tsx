import { styles } from "./sidebar-navigation.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type SidebarNavigationProps = {
    readonly children?: ReactNode;
};

export function SidebarNavigation({
    children,
}: SidebarNavigationProps): ReactElement {
    return <div className={styles.root}>{children}</div>;
}

export namespace SidebarNavigation {
    export type HeaderProps = SidebarNavigationProps;

    export function Header({ children }: HeaderProps): ReactElement {
        return <div className={styles.header}>{children}</div>;
    }

    export type BodyProps = SidebarNavigationProps;

    export function Body({ children }: BodyProps): ReactElement {
        return <div className={styles.body}>{children}</div>;
    }

    export type FooterProps = SidebarNavigationProps;

    export function Footer({ children }: FooterProps): ReactElement {
        return <footer className={styles.footer}>{children}</footer>;
    }
}
