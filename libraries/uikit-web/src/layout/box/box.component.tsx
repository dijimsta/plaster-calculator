import clsx from "clsx";

import {
    aligns,
    base,
    directions,
    gaps,
    growStyle,
    type BoxAlign,
    type BoxDirection,
    type BoxGap,
} from "./box.styles.ts";

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type { BoxAlign, BoxDirection, BoxGap };

export type BoxProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
    readonly direction?: BoxDirection;
    readonly align?: BoxAlign;
    readonly gap?: BoxGap;
    /** Shorthand for flex-1 + min-w-0. Use when this Box should grow to fill
     * its parent and its children may need to truncate. */
    readonly grow?: boolean;
};

export function Box({
    direction = "row",
    align,
    gap,
    grow = false,
    className,
    children,
    ...props
}: BoxProps): ReactElement {
    return (
        <div
            className={clsx(
                base,
                directions[direction],
                align !== undefined && aligns[align],
                gap !== undefined && gaps[gap],
                grow && growStyle,
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
