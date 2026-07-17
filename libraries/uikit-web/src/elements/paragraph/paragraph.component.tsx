import clsx from "clsx";

import {
    sizes,
    variants,
    type ParagraphSize,
    type ParagraphVariant,
} from "./paragraph.styles.ts";

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type { ParagraphSize, ParagraphVariant };

export type ParagraphProps = PropsWithChildren<
    HTMLAttributes<HTMLParagraphElement>
> & {
    readonly textSize?: ParagraphSize;
    readonly variant?: ParagraphVariant;
};

export function Paragraph({
    textSize = "base",
    variant = "default",
    className,
    children,
    ...props
}: ParagraphProps): ReactElement {
    return (
        <p
            className={clsx(sizes[textSize], variants[variant], className)}
            {...props}
        >
            {children}
        </p>
    );
}
