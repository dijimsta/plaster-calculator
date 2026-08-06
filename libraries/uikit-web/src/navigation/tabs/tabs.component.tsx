import clsx from "clsx";
import { cloneElement, createContext, useContext } from "react";

import {
    DEFAULT_VARIANT,
    styles,
    variants,
    type TabsVariant,
} from "./tabs.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type TabsProps = {
    /** Visual treatment applied to every tab. */
    readonly variant?: TabsVariant;
    /** Makes each tab share the available width equally. */
    readonly fullWidth?: boolean;
    readonly label?: string;
    readonly children?: ReactNode;
};

type TabsContextValue = {
    readonly variant: TabsVariant;
    readonly fullWidth: boolean;
};

const TabsContext = createContext<TabsContextValue>({
    variant: DEFAULT_VARIANT,
    fullWidth: false,
});

export function Tabs({
    variant = DEFAULT_VARIANT,
    fullWidth = false,
    children,
    label = "Tabs",
}: TabsProps): ReactElement {
    return (
        <TabsContext value={{ variant, fullWidth }}>
            <nav aria-label={label} className={styles.root}>
                <ul
                    role="list"
                    className={clsx(
                        styles.list,
                        variants[variant].list,
                        fullWidth ? styles.fullWidthList : styles.listWidth,
                    )}
                >
                    {children}
                </ul>
            </nav>
        </TabsContext>
    );
}

export namespace Tabs {
    type LinkProps = {
        readonly "aria-current"?: "page";
        readonly "className"?: string;
    };

    export type ItemProps = {
        /** Marks the child link as the current page. */
        readonly current?: boolean;
        /** A single link element, such as an anchor or Next.js Link. */
        readonly children: ReactElement;
    };

    export function Item({
        current = false,
        children,
    }: ItemProps): ReactElement {
        const context = useContext(TabsContext);
        const variant = variants[context.variant];
        const link = cloneElement(children as ReactElement<LinkProps>, {
            "aria-current": current ? "page" : undefined,
            "className": clsx(
                variant.item,
                current ? variant.current : variant.default,
                context.fullWidth && styles.fullWidthItem,
            ),
        });

        return (
            <li className={clsx(context.fullWidth && styles.fullWidthListItem)}>
                {link}
            </li>
        );
    }
}
