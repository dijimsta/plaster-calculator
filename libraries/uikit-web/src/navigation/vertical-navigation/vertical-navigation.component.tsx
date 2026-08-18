"use client";

import clsx from "clsx";
import { cloneElement } from "react";
import type { ReactElement, ReactNode } from "react";

import { RailNavigation } from "../rail-navigation/rail-navigation.component.tsx";
import {
    RailModeContext,
    useIsRailMode,
} from "../rail-navigation/rail-navigation.context.ts";

import { styles } from "./vertical-navigation.styles.ts";

export type VerticalNavigationProps = {
    readonly label?: string;
    readonly children?: ReactNode;
};

/**
 * Renders as a rail automatically below the `sm` breakpoint, or whenever an
 * ancestor `SidebarNavigation` has collapsed — both trees render unconditionally
 * (mirroring `Navbar.Navigation`'s desktop/mobile split) so switching between
 * them never causes a post-hydration remount.
 */
export function VerticalNavigation({
    label = "Navigation",
    children,
}: VerticalNavigationProps): ReactElement {
    const isAmbientRail = useIsRailMode();

    if (isAmbientRail) {
        return (
            <RailModeContext value={true}>
                <RailNavigation label={label}>{children}</RailNavigation>
            </RailModeContext>
        );
    }

    return (
        <>
            <RailModeContext value={false}>
                <nav
                    aria-label={label}
                    className={clsx(styles.navigation, styles.hiddenOnSmall)}
                >
                    {children}
                </nav>
            </RailModeContext>
            <RailModeContext value={true}>
                <div className={styles.railWrapperOnSmall}>
                    <RailNavigation label={label}>{children}</RailNavigation>
                </div>
            </RailModeContext>
        </>
    );
}

export namespace VerticalNavigation {
    export type SectionProps = {
        readonly title?: string;
        readonly children?: ReactNode;
    };

    export function Section({ title, children }: SectionProps): ReactElement {
        const isRail = useIsRailMode();

        if (isRail) {
            return (
                <RailNavigation.Section title={title}>
                    {children}
                </RailNavigation.Section>
            );
        }

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
    };

    export type ItemProps = {
        readonly accessory?: ReactNode;
        readonly children: ReactElement;
        readonly isCurrent?: boolean;
    };

    export function Item({
        accessory,
        isCurrent = false,
        children,
    }: ItemProps): ReactElement {
        const isRail = useIsRailMode();

        if (isRail) {
            return (
                <RailNavigation.Item
                    accessory={accessory}
                    isCurrent={isCurrent}
                >
                    {children}
                </RailNavigation.Item>
            );
        }

        const ownedLink = children as ReactElement<ItemLinkProps>;
        const link = cloneElement(
            ownedLink,
            {
                "aria-current": isCurrent ? "page" : undefined,
                "className": clsx(
                    styles.item,
                    isCurrent ? styles.currentItem : styles.defaultItem,
                ),
            },
            ownedLink.props.children,
            accessory !== undefined && (
                <span className={styles.accessory}>{accessory}</span>
            ),
        );

        return <li>{link}</li>;
    }
}
