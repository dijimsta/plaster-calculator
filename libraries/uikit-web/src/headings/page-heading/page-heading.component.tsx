import clsx from "clsx";

import { styles } from "./page-heading.styles.ts";

import type {
    HTMLAttributes,
    LiHTMLAttributes,
    PropsWithChildren,
    ReactElement,
} from "react";

export type PageHeadingProps = PropsWithChildren<HTMLAttributes<HTMLElement>>;

export function PageHeading({
    className,
    children,
    ...props
}: PageHeadingProps): ReactElement {
    return (
        <header className={clsx(styles.root, className)} {...props}>
            {children}
        </header>
    );
}

export namespace PageHeading {
    export function Breadcrumbs({
        className,
        children,
        ...props
    }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>): ReactElement {
        return (
            <div className={clsx(styles.breadcrumbs, className)} {...props}>
                {children}
            </div>
        );
    }

    export function Content({
        className,
        children,
        ...props
    }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>): ReactElement {
        return (
            <div className={clsx(styles.content, className)} {...props}>
                {children}
            </div>
        );
    }

    export function Title({
        className,
        children,
        ...props
    }: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>): ReactElement {
        return (
            <h1 className={clsx(styles.title, className)} {...props}>
                {children}
            </h1>
        );
    }

    export function Description({
        className,
        children,
        ...props
    }: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>): ReactElement {
        return (
            <p className={clsx(styles.description, className)} {...props}>
                {children}
            </p>
        );
    }

    export function Meta({
        className,
        children,
        role = "list",
        ...props
    }: PropsWithChildren<HTMLAttributes<HTMLUListElement>>): ReactElement {
        return (
            <ul role={role} className={clsx(styles.meta, className)} {...props}>
                {children}
            </ul>
        );
    }

    export namespace Meta {
        export function Item({
            className,
            children,
            ...props
        }: PropsWithChildren<LiHTMLAttributes<HTMLLIElement>>): ReactElement {
            return (
                <li className={clsx(styles.metaItem, className)} {...props}>
                    {children}
                </li>
            );
        }
    }

    export function Actions({
        className,
        children,
        ...props
    }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>): ReactElement {
        return (
            <div className={clsx(styles.actions, className)} {...props}>
                {children}
            </div>
        );
    }
}
