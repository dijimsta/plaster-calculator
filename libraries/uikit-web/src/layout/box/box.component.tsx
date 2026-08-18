import type { ReactElement, ReactNode } from "react";

import {
    boxClassName,
    type BoxAlign,
    type BoxBasis,
    type BoxDirection,
    type BoxGap,
    type BoxJustify,
    type BoxPadding,
} from "./box.styles.ts";

export type {
    BoxAlign,
    BoxBasis,
    BoxDirection,
    BoxGap,
    BoxJustify,
    BoxPadding,
};

export type BoxProps = {
    readonly direction?: BoxDirection;
    readonly align?: BoxAlign;
    readonly justify?: BoxJustify;
    readonly gap?: BoxGap;
    readonly padding?: BoxPadding;
    /** Shorthand for flex-1 + min-w-0. Use when this Box should grow to fill
     * its parent and its children may need to truncate. */
    readonly grow?: boolean;
    /**
     * Pins this Box to a fixed share of its flex parent's main axis (e.g.
     * "1/3") instead of sizing to content. Combine with a sibling `grow`
     * Box so the two divide a row unevenly -- the `grow` sibling absorbs
     * whatever space this one doesn't claim.
     */
    readonly basis?: BoxBasis;
    /** Allows flex items to wrap onto multiple lines. */
    readonly wrap?: boolean;
    /** Allows this Box to shrink and scroll vertically within its parent. */
    readonly scroll?: boolean;
    /** Announces the content as a polite status update. */
    readonly status?: boolean;
    readonly children?: ReactNode;
};

export function Box({
    direction = "row",
    align,
    justify,
    gap,
    padding,
    grow = false,
    basis,
    wrap = false,
    scroll = false,
    status = false,
    children,
}: BoxProps): ReactElement {
    return (
        <div
            {...statusProps(status)}
            className={boxClassName({
                align,
                basis,
                direction,
                gap,
                grow,
                justify,
                padding,
                scroll,
                wrap,
            })}
        >
            {children}
        </div>
    );
}

function statusProps(status: boolean): {
    readonly "aria-live"?: "polite";
    readonly "role"?: "status";
} {
    return status ? { "aria-live": "polite", "role": "status" } : {};
}
