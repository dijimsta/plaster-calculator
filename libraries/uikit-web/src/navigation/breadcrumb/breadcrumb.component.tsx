import clsx from "clsx";
import { ChevronRight } from "lucide-react";

import { styles } from "./breadcrumb.styles.ts";

import type {
    AnchorHTMLAttributes,
    HTMLAttributes,
    PropsWithChildren,
    ReactElement,
} from "react";

export type BreadcrumbProps = HTMLAttributes<HTMLElement>;

export function Breadcrumb({
    className,
    children,
    "aria-label": ariaLabel = "Breadcrumb",
    ...props
}: PropsWithChildren<BreadcrumbProps>): ReactElement {
    return (
        <nav aria-label={ariaLabel} className={className} {...props}>
            <ol role="list" className={clsx(styles.list)}>
                {children}
            </ol>
        </nav>
    );
}

export namespace Breadcrumb {
    export type LinkItemProps = Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        "aria-current" | "href"
    > & {
        readonly current?: false;
        readonly href: string;
    };

    export type CurrentItemProps = Omit<
        HTMLAttributes<HTMLSpanElement>,
        "aria-current"
    > & {
        readonly current: true;
        readonly href?: never;
    };

    export type ItemProps = LinkItemProps | CurrentItemProps;

    export function Item(props: PropsWithChildren<ItemProps>): ReactElement {
        if (props.current) {
            return <CurrentItem {...props} />;
        } else {
            return <LinkItem {...props} />;
        }
    }

    function CurrentItem({
        current,
        className,
        children,
        ...props
    }: PropsWithChildren<CurrentItemProps>): ReactElement {
        return (
            <li className={clsx(styles.item)}>
                <ChevronRight
                    aria-hidden="true"
                    className={clsx(styles.separator)}
                />
                <span
                    aria-current={current ? "page" : undefined}
                    className={clsx(styles.current, className)}
                    {...props}
                >
                    {children}
                </span>
            </li>
        );
    }

    function LinkItem({
        className,
        children,
        ...props
    }: PropsWithChildren<LinkItemProps>): ReactElement {
        return (
            <li className={clsx(styles.item)}>
                <ChevronRight
                    aria-hidden="true"
                    className={clsx(styles.separator)}
                />
                <a className={clsx(styles.link, className)} {...props}>
                    {children}
                </a>
            </li>
        );
    }
}
