"use client";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useId, useReducer, useRef } from "react";
import type { ReactElement, ReactNode } from "react";

import {
    SidebarLayoutContext,
    useSidebarLayoutContext,
} from "./sidebar-layout.context.ts";
import {
    useDesktopSidebarEffect,
    useMobileSidebarEffect,
} from "./sidebar-layout.hooks.ts";
import {
    createInitialSidebarLayoutState,
    sidebarLayoutReducer,
} from "./sidebar-layout.reducer.ts";
import { styles } from "./sidebar-layout.styles.ts";

export type SidebarLayoutProps = {
    readonly children?: ReactNode;
};

export type SidebarLayoutSidebarProps = SidebarLayoutProps & {
    readonly label?: string;
    /**
     * Forces the sidebar `inert` (non-interactive and untabbable)
     * regardless of the mobile/desktop open state -- e.g. while a
     * full-screen overlay elsewhere in the app visually covers it.
     */
    readonly inert?: boolean;
};

export type SidebarLayoutMainProps = SidebarLayoutProps;

export function SidebarLayout({ children }: SidebarLayoutProps): ReactElement {
    const sidebarId = useId();
    const [state, dispatch] = useReducer(
        sidebarLayoutReducer,
        sidebarId,
        createInitialSidebarLayoutState,
    );

    useDesktopSidebarEffect(dispatch);

    return (
        <SidebarLayoutContext value={{ state, dispatch }}>
            <div className={styles.root}>
                {state.isSidebarOpen && (
                    <button
                        type="button"
                        tabIndex={-1}
                        aria-label="Close navigation"
                        className={styles.backdrop}
                        onClick={() => dispatch({ type: "closeSidebar" })}
                    />
                )}
                {children}
            </div>
        </SidebarLayoutContext>
    );
}

export namespace SidebarLayout {
    export function Sidebar({
        label = "Application navigation",
        inert = false,
        children,
    }: SidebarLayoutSidebarProps): ReactElement {
        const context = useSidebarLayoutContext();
        const sidebarRef = useRef<HTMLElement>(null);
        const closeButtonRef = useRef<HTMLButtonElement>(null);
        const previousFocusRef = useRef<HTMLElement | null>(null);

        useMobileSidebarEffect({
            closeButtonRef,
            previousFocusRef,
            sidebarRef,
        });

        return (
            <aside
                id={context.state.sidebarId}
                ref={sidebarRef}
                aria-label={label}
                inert={
                    inert ||
                    (!context.state.isDesktop &&
                        !context.state.isSidebarOpen) ||
                    undefined
                }
                className={clsx(
                    styles.sidebar,
                    context.state.isSidebarOpen
                        ? styles.sidebarOpen
                        : styles.sidebarClosed,
                )}
            >
                <button
                    ref={closeButtonRef}
                    type="button"
                    aria-label="Close navigation"
                    className={styles.closeButton}
                    onClick={() => context.dispatch({ type: "closeSidebar" })}
                >
                    <X aria-hidden="true" />
                </button>
                {children}
            </aside>
        );
    }

    export function Main({ children }: SidebarLayoutMainProps): ReactElement {
        const context = useSidebarLayoutContext();

        return (
            <div
                className={styles.content}
                inert={
                    (!context.state.isDesktop && context.state.isSidebarOpen) ||
                    undefined
                }
            >
                <header className={styles.mobileHeader}>
                    <button
                        type="button"
                        aria-controls={context.state.sidebarId}
                        aria-expanded={context.state.isSidebarOpen}
                        aria-label="Open navigation"
                        className={styles.menuButton}
                        onClick={() =>
                            context.dispatch({ type: "openSidebar" })
                        }
                    >
                        <Menu aria-hidden="true" />
                    </button>
                </header>
                <main className={styles.main}>{children}</main>
            </div>
        );
    }
}
