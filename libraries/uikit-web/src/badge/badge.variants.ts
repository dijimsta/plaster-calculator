export type BadgeVariant =
    typeof variants extends Record<infer K, string> ? K : never;

export const variants = Object.freeze({
    "flat":
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
    "flat-with-border":
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
    "pill":
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
    "pill-with-border":
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
});
