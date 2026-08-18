export const base = "flex";

export const directions = Object.freeze({
    row: "flex-row",
    column: "flex-col",
});

export type BoxDirection =
    typeof directions extends Record<infer K, string> ? K : never;

export const aligns = Object.freeze({
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
});

export type BoxAlign =
    typeof aligns extends Record<infer K, string> ? K : never;

export const justifies = Object.freeze({
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
});

export type BoxJustify =
    typeof justifies extends Record<infer K, string> ? K : never;

export const gaps = Object.freeze({
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
});

export type BoxGap = typeof gaps extends Record<infer K, string> ? K : never;

export const paddings = Object.freeze({
    none: "",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
});

export type BoxPadding =
    typeof paddings extends Record<infer K, string> ? K : never;

export const growStyle = "flex-1 min-w-0";
export const wrapStyle = "flex-wrap";
export const scrollStyle = "min-h-0 overflow-y-auto";

export const bases = Object.freeze({
    "1/3": "basis-1/3",
    "2/5": "basis-2/5",
    "1/2": "basis-1/2",
    "2/3": "basis-2/3",
});

export type BoxBasis = keyof typeof bases;

export type BoxClassNameOptions = {
    readonly align?: BoxAlign;
    readonly basis?: BoxBasis;
    readonly direction: BoxDirection;
    readonly gap?: BoxGap;
    readonly grow: boolean;
    readonly justify?: BoxJustify;
    readonly padding?: BoxPadding;
    readonly scroll: boolean;
    readonly wrap: boolean;
};

export function boxClassName({
    align,
    basis,
    direction,
    gap,
    grow,
    justify,
    padding,
    scroll,
    wrap,
}: BoxClassNameOptions): string {
    return clsx(
        base,
        directions[direction],
        align !== undefined && aligns[align],
        justify !== undefined && justifies[justify],
        gap !== undefined && gaps[gap],
        padding !== undefined && paddings[padding],
        grow && growStyle,
        basis !== undefined && bases[basis],
        wrap && wrapStyle,
        scroll && scrollStyle,
    );
}
import clsx from "clsx";
