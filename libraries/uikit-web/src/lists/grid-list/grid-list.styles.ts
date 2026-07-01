export const DEFAULT_COLUMNS = 3;

export const DEFAULT_GAP = "md";

export const styles = Object.freeze({
    root: "grid",
    item: "col-span-1",
});

export type GridListColumnCount =
    typeof columns extends Record<infer K, string> ? K : never;

export const columns = Object.freeze({
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
});

export type GridListGap =
    typeof gaps extends Record<infer K, string> ? K : never;

export const gaps = Object.freeze({
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
});
