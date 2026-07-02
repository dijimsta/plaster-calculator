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
