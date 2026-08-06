import clsx from "clsx";
import { ChevronRight } from "lucide-react";

import { styles } from "./breadcrumb.styles.ts";

import type { MouseEventHandler, ReactElement, ReactNode } from "react";

export type BreadcrumbProps = {
    readonly label?: string;
    readonly children?: ReactNode;
};

export function Breadcrumb({
    children,
    label = "Breadcrumb",
}: BreadcrumbProps): ReactElement {
    return (
        <nav aria-label={label}>
            <ol role="list" className={clsx(styles.list)}>
                {children}
            </ol>
        </nav>
    );
}

export namespace Breadcrumb {
    type SharedItemProps = {
        readonly label?: string;
        readonly children?: ReactNode;
    };

    export type LinkItemProps = SharedItemProps & {
        readonly current?: false;
        readonly href: string;
        readonly onClick?: MouseEventHandler<HTMLAnchorElement>;
    };

    export type CurrentItemProps = SharedItemProps & {
        readonly current: true;
        readonly href?: never;
    };

    export type ItemProps = LinkItemProps | CurrentItemProps;

    export function Item(props: ItemProps): ReactElement {
        if (props.current) {
            return <CurrentItem {...props} />;
        } else {
            return <LinkItem {...props} />;
        }
    }

    function CurrentItem({
        current,
        label,
        children,
    }: CurrentItemProps): ReactElement {
        return (
            <li className={clsx(styles.item)}>
                <ChevronRight
                    aria-hidden="true"
                    className={clsx(styles.separator)}
                />
                <span
                    aria-current={current ? "page" : undefined}
                    aria-label={label}
                    className={styles.current}
                >
                    {children}
                </span>
            </li>
        );
    }

    function LinkItem({
        href,
        onClick,
        label,
        children,
    }: LinkItemProps): ReactElement {
        return (
            <li className={clsx(styles.item)}>
                <ChevronRight
                    aria-hidden="true"
                    className={clsx(styles.separator)}
                />
                <a
                    href={href}
                    onClick={onClick}
                    aria-label={label}
                    className={styles.link}
                >
                    {children}
                </a>
            </li>
        );
    }
}
