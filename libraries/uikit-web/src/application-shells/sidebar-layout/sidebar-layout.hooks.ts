import { useEffect } from "react";

import { useSidebarLayoutContext } from "./sidebar-layout.context.ts";

import type { SidebarLayoutAction } from "./sidebar-layout.reducer.ts";
import type { Dispatch, RefObject } from "react";

const focusableSelector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
].join(",");

export interface MobileSidebarEffectOptions {
    readonly closeButtonRef: RefObject<HTMLButtonElement | null>;
    readonly previousFocusRef: RefObject<HTMLElement | null>;
    readonly sidebarRef: RefObject<HTMLElement | null>;
}

export function useMobileSidebarEffect({
    closeButtonRef,
    previousFocusRef,
    sidebarRef,
}: MobileSidebarEffectOptions): void {
    const { dispatch, state } = useSidebarLayoutContext();

    useEffect(() => {
        if (!state.isSidebarOpen) return;

        previousFocusRef.current = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeButtonRef.current?.focus();

        function handleKeyDown(event: KeyboardEvent): void {
            if (event.key === "Escape") {
                dispatch({ type: "closeSidebar" });
            } else if (event.key === "Tab" && sidebarRef.current !== null) {
                trapFocus(event, sidebarRef.current);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
            previousFocusRef.current?.focus();
        };
    }, [
        closeButtonRef,
        dispatch,
        previousFocusRef,
        sidebarRef,
        state.isSidebarOpen,
    ]);
}

export function useDesktopSidebarEffect(
    dispatch: Dispatch<SidebarLayoutAction>,
): void {
    useEffect(() => {
        const desktopQuery = window.matchMedia("(min-width: 1024px)");

        dispatch({
            type: "setDesktop",
            isDesktop: desktopQuery.matches,
        });

        function handleDesktopChange(event: MediaQueryListEvent): void {
            dispatch({ type: "setDesktop", isDesktop: event.matches });
        }

        desktopQuery.addEventListener("change", handleDesktopChange);
        return () =>
            desktopQuery.removeEventListener("change", handleDesktopChange);
    }, [dispatch]);
}

function trapFocus(event: KeyboardEvent, container: HTMLElement): void {
    const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector),
    );
    const firstElement = focusableElements.at(0);
    const lastElement = focusableElements.at(-1);

    if (firstElement === undefined || lastElement === undefined) {
        event.preventDefault();
    } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
}
