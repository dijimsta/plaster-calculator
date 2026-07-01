import clsx from "clsx";

import { styles } from "./card.styles.ts";

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({
    className,
    children,
    ...props
}: PropsWithChildren<CardProps>): ReactElement {
    return (
        <div className={clsx(styles.root, className)} {...props}>
            {children}
        </div>
    );
}

export namespace Card {
    export function Header({
        className,
        children,
        ...props
    }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>): ReactElement {
        return (
            <div className={clsx(styles.header, className)} {...props}>
                {children}
            </div>
        );
    }

    export function Body({
        className,
        children,
        ...props
    }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>): ReactElement {
        return (
            <div className={clsx(styles.body, className)} {...props}>
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
            <h2 className={clsx(styles.title, className)} {...props}>
                {children}
            </h2>
        );
    }

    export function ButtonGroup({
        className,
        children,
        ...props
    }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>): ReactElement {
        return (
            <div className={clsx(styles.buttonGroup, className)} {...props}>
                {children}
            </div>
        );
    }

    export function Footer({
        className,
        children,
        ...props
    }: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>): ReactElement {
        return (
            <p className={clsx(styles.footer, className)} {...props}>
                {children}
            </p>
        );
    }
}
