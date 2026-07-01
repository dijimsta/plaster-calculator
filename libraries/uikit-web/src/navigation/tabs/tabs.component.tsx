import clsx from "clsx";
import { cloneElement, createContext, useContext } from "react";

import {
    DEFAULT_VARIANT,
    styles,
    variants,
    type TabsVariant,
} from "./tabs.styles.ts";

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type TabsProps = HTMLAttributes<HTMLElement> & {
    /** Visual treatment applied to every tab. */
    readonly variant?: TabsVariant;
    /** Makes each tab share the available width equally. */
    readonly fullWidth?: boolean;
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
    className,
    children,
    "aria-label": ariaLabel = "Tabs",
    ...props
}: PropsWithChildren<TabsProps>): ReactElement {
    return (
        <TabsContext value={{ variant, fullWidth }}>
            <nav
                aria-label={ariaLabel}
                className={clsx(styles.root, className)}
                {...props}
            >
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
        readonly children: ReactElement<LinkProps>;
        /** Additional classes applied to the child link. */
        readonly className?: string;
    };

    export function Item({
        current = false,
        className,
        children,
    }: ItemProps): ReactElement {
        const context = useContext(TabsContext);
        const variant = variants[context.variant];
        const link = cloneElement(children, {
            "aria-current": current ? "page" : undefined,
            "className": clsx(
                variant.item,
                current ? variant.current : variant.default,
                context.fullWidth && styles.fullWidthItem,
                children.props.className,
                className,
            ),
        });

        return (
            <li className={clsx(context.fullWidth && styles.fullWidthListItem)}>
                {link}
            </li>
        );
    }
}
