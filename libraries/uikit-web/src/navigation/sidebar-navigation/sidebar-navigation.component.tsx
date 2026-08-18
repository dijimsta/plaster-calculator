"use client";

import clsx from "clsx";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import type { ReactElement, ReactNode } from "react";

import { RailModeContext } from "../rail-navigation/rail-navigation.context.ts";

import {
    SidebarNavigationContext,
    useSidebarNavigationContext,
} from "./sidebar-navigation.context.ts";
import { styles } from "./sidebar-navigation.styles.ts";

export type SidebarNavigationProps = {
    readonly collapsed?: boolean;
    readonly defaultCollapsed?: boolean;
    readonly onCollapsedChange?: (collapsed: boolean) => void;
    readonly children?: ReactNode;
};

export function SidebarNavigation({
    collapsed,
    defaultCollapsed = false,
    onCollapsedChange,
    children,
}: SidebarNavigationProps): ReactElement {
    const [internalCollapsed, setInternalCollapsed] =
        useState(defaultCollapsed);
    const isControlled = collapsed !== undefined;
    const isCollapsed = isControlled ? collapsed : internalCollapsed;

    function toggleCollapsed(): void {
        const nextCollapsed = !isCollapsed;

        if (!isControlled) {
            setInternalCollapsed(nextCollapsed);
        }

        onCollapsedChange?.(nextCollapsed);
    }

    return (
        <SidebarNavigationContext value={{ isCollapsed, toggleCollapsed }}>
            <RailModeContext value={isCollapsed}>
                <div
                    className={clsx(
                        styles.root,
                        isCollapsed
                            ? styles.collapsedRoot
                            : styles.expandedRoot,
                    )}
                >
                    {children}
                </div>
            </RailModeContext>
        </SidebarNavigationContext>
    );
}

export namespace SidebarNavigation {
    export type HeaderProps = {
        readonly children?: ReactNode;
    };

    export function Header({ children }: HeaderProps): ReactElement {
        const { isCollapsed } = useSidebarNavigationContext();

        return (
            <div
                className={clsx(
                    styles.header,
                    isCollapsed
                        ? styles.headerCollapsed
                        : styles.headerExpanded,
                )}
            >
                {children}
            </div>
        );
    }

    export type BodyProps = HeaderProps;

    export function Body({ children }: BodyProps): ReactElement {
        const { isCollapsed } = useSidebarNavigationContext();

        return (
            <div
                className={clsx(
                    styles.body,
                    isCollapsed ? styles.bodyCollapsed : styles.bodyExpanded,
                )}
            >
                {children}
            </div>
        );
    }

    export type FooterProps = HeaderProps;

    export function Footer({ children }: FooterProps): ReactElement {
        const { isCollapsed } = useSidebarNavigationContext();

        return (
            <footer
                className={clsx(
                    styles.footer,
                    isCollapsed
                        ? styles.footerCollapsed
                        : styles.footerExpanded,
                )}
            >
                {children}
            </footer>
        );
    }

    /**
     * Toggles the ambient collapsed state read by `SidebarNavigation` and any
     * nested `VerticalNavigation`. Place it in `Header` or `Footer` wherever
     * it fits the surrounding composition.
     */
    export function CollapseButton(): ReactElement {
        const { isCollapsed, toggleCollapsed } = useSidebarNavigationContext();

        return (
            <button
                type="button"
                aria-pressed={isCollapsed}
                aria-label={
                    isCollapsed ? "Expand navigation" : "Collapse navigation"
                }
                className={styles.collapseButton}
                onClick={toggleCollapsed}
            >
                {isCollapsed ? (
                    <PanelLeftOpen aria-hidden="true" />
                ) : (
                    <PanelLeftClose aria-hidden="true" />
                )}
            </button>
        );
    }
}
