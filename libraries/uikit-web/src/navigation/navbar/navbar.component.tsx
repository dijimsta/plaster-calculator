import clsx from "clsx";
import { Menu, X } from "lucide-react";
import {
    cloneElement,
    createContext,
    useContext,
    useId,
    useState,
} from "react";

import {
    DEFAULT_TONE,
    styles,
    tones,
    type NavbarTone,
} from "./navbar.styles.ts";

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type { NavbarTone };

export type NavbarProps = PropsWithChildren<
    HTMLAttributes<HTMLElement> & {
        /** Color treatment for the navbar and its navigation items. */
        readonly tone?: NavbarTone;
    }
>;

type NavbarContextValue = {
    readonly tone: NavbarTone;
    readonly isMenuOpen: boolean;
    readonly menuId: string;
    readonly toggleMenu: () => void;
};

type NavigationContextValue = {
    readonly layout: "desktop" | "mobile";
};

const NavbarContext = createContext<NavbarContextValue>({
    tone: DEFAULT_TONE,
    isMenuOpen: false,
    menuId: "",
    toggleMenu: () => {},
});

const NavigationContext = createContext<NavigationContextValue>({
    layout: "desktop",
});

/**
 * Responsive application navbar with composable brand, navigation, and
 * actions regions. Owns the row layout and the mobile disclosure toggle
 * internally, so consumers only ever place content, not structure.
 */
export function Navbar({
    tone = DEFAULT_TONE,
    className,
    children,
    ...props
}: NavbarProps): ReactElement {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuId = useId();

    return (
        <NavbarContext
            value={{
                tone,
                isMenuOpen,
                menuId,
                toggleMenu: () => {
                    setIsMenuOpen((open) => !open);
                },
            }}
        >
            <header
                className={clsx(styles.root, tones[tone].root, className)}
                {...props}
            >
                <div className={styles.inner}>
                    <MenuToggle />
                    {children}
                </div>
            </header>
        </NavbarContext>
    );
}

function MenuToggle(): ReactElement {
    const { tone, isMenuOpen, menuId, toggleMenu } = useContext(NavbarContext);

    return (
        <button
            type="button"
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            className={clsx(styles.toggle, tones[tone].toggle)}
            onClick={toggleMenu}
        >
            {isMenuOpen ? (
                <X aria-hidden="true" />
            ) : (
                <Menu aria-hidden="true" />
            )}
        </button>
    );
}

export namespace Navbar {
    export type BrandProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

    export function Brand({
        className,
        children,
        ...props
    }: BrandProps): ReactElement {
        return (
            <div className={clsx(styles.brand, className)} {...props}>
                {children}
            </div>
        );
    }

    /**
     * Renders the navigation items once and presents them as both the
     * desktop link row and the mobile disclosure panel, so consumers never
     * author the item list twice.
     */
    export type NavigationProps = PropsWithChildren<
        HTMLAttributes<HTMLElement>
    >;

    export function Navigation({
        className,
        children,
        "aria-label": ariaLabel = "Primary",
        ...props
    }: NavigationProps): ReactElement {
        const { isMenuOpen, menuId, tone } = useContext(NavbarContext);

        return (
            <>
                <NavigationContext value={{ layout: "desktop" }}>
                    <nav
                        aria-label={ariaLabel}
                        className={clsx(styles.desktopNavigation, className)}
                        {...props}
                    >
                        <ul role="list" className={styles.desktopList}>
                            {children}
                        </ul>
                    </nav>
                </NavigationContext>
                <NavigationContext value={{ layout: "mobile" }}>
                    <nav
                        id={menuId}
                        aria-label={ariaLabel}
                        className={clsx(
                            styles.mobilePanel,
                            tones[tone].mobilePanel,
                            !isMenuOpen && styles.mobilePanelClosed,
                            className,
                        )}
                    >
                        <ul role="list" className={styles.mobileList}>
                            {children}
                        </ul>
                    </nav>
                </NavigationContext>
            </>
        );
    }

    type ItemLinkProps = {
        readonly "aria-current"?: "page";
        readonly "className"?: string;
    };

    export type ItemProps = {
        /** Marks the child link as the current page. */
        readonly current?: boolean;
        /** A single link element, such as an anchor or Next.js Link. */
        readonly children: ReactElement<ItemLinkProps>;
        /** Additional classes applied to the child link. */
        readonly className?: string;
    };

    export function Item({
        current = false,
        className,
        children,
    }: ItemProps): ReactElement {
        const { tone } = useContext(NavbarContext);
        const { layout } = useContext(NavigationContext);
        const toneStyles = tones[tone];
        const link = cloneElement(children, {
            "aria-current": current ? "page" : undefined,
            "className": clsx(
                styles.item,
                current ? toneStyles.itemCurrent : toneStyles.itemDefault,
                layout === "mobile" && styles.mobileItem,
                children.props.className,
                className,
            ),
        });

        return <li>{link}</li>;
    }

    export type ActionsProps = PropsWithChildren<
        HTMLAttributes<HTMLDivElement>
    >;

    export function Actions({
        className,
        children,
        ...props
    }: ActionsProps): ReactElement {
        return (
            <div className={clsx(styles.actions, className)} {...props}>
                {children}
            </div>
        );
    }
}
