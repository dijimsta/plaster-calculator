"use client";

import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useId, useReducer, useRef } from "react";

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

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type SidebarLayoutProps = PropsWithChildren<
    HTMLAttributes<HTMLDivElement>
>;

export type SidebarLayoutSidebarProps = PropsWithChildren<
    HTMLAttributes<HTMLElement>
>;

export type SidebarLayoutMainProps = PropsWithChildren<
    HTMLAttributes<HTMLElement>
>;

export function SidebarLayout({
    className,
    children,
    ...props
}: SidebarLayoutProps): ReactElement {
    const sidebarId = useId();
    const [state, dispatch] = useReducer(
        sidebarLayoutReducer,
        sidebarId,
        createInitialSidebarLayoutState,
    );

    useDesktopSidebarEffect(dispatch);

    return (
        <SidebarLayoutContext value={{ state, dispatch }}>
            <div className={clsx(styles.root, className)} {...props}>
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
        "aria-label": ariaLabel = "Application navigation",
        className,
        children,
        ...props
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
                {...props}
                id={context.state.sidebarId}
                ref={sidebarRef}
                aria-label={ariaLabel}
                inert={
                    (!context.state.isDesktop &&
                        !context.state.isSidebarOpen) ||
                    undefined
                }
                className={clsx(
                    styles.sidebar,
                    context.state.isSidebarOpen
                        ? styles.sidebarOpen
                        : styles.sidebarClosed,
                    className,
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

    export function Main({
        className,
        children,
        ...props
    }: SidebarLayoutMainProps): ReactElement {
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
                <main className={clsx(styles.main, className)} {...props}>
                    {children}
                </main>
            </div>
        );
    }
}
