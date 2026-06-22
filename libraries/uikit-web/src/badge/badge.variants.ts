export type BadgeVariant =
    typeof variants extends Record<infer K, string> ? K : never;

export const variants = Object.freeze({
    "default":
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
    "with-dot":
        "inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium",
});
