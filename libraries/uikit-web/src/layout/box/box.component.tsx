import clsx from "clsx";

import {
    aligns,
    base,
    directions,
    gaps,
    growStyle,
    justifies,
    paddings,
    wrapStyle,
    type BoxAlign,
    type BoxDirection,
    type BoxGap,
    type BoxJustify,
    type BoxPadding,
} from "./box.styles.ts";

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type { BoxAlign, BoxDirection, BoxGap, BoxJustify, BoxPadding };

export type BoxProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
    readonly direction?: BoxDirection;
    readonly align?: BoxAlign;
    readonly justify?: BoxJustify;
    readonly gap?: BoxGap;
    readonly padding?: BoxPadding;
    /** Shorthand for flex-1 + min-w-0. Use when this Box should grow to fill
     * its parent and its children may need to truncate. */
    readonly grow?: boolean;
    /** Allows flex items to wrap onto multiple lines. */
    readonly wrap?: boolean;
};

export function Box({
    direction = "row",
    align,
    justify,
    gap,
    padding,
    grow = false,
    wrap = false,
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
                justify !== undefined && justifies[justify],
                gap !== undefined && gaps[gap],
                padding !== undefined && paddings[padding],
                grow && growStyle,
                wrap && wrapStyle,
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
