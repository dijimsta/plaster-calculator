export type BadgeSize =
    typeof sizes extends Record<infer K, string> ? K : never;

export const sizes = Object.freeze({
    sm: "px-2 py-1 text-xs font-medium",
    xs: "px-1.5 py-0.5 text-xs font-medium",
});

export type BadgeVariant =
    typeof variants extends Record<infer K, string> ? K : never;

export const variants = Object.freeze({
    "flat": "inline-flex items-center rounded-md",
    "flat-with-border": "inline-flex items-center rounded-md",
    "pill": "inline-flex items-center rounded-full",
    "pill-with-border": "inline-flex items-center rounded-full",
});

export const dotStyles = "h-1.5 w-1.5 mr-1.5";

export const removeButtonStyles = Object.freeze({
    button: "group relative -mr-1 ml-0.5 h-3.5 w-3.5 rounded-sm",
    icon: "h-3.5 w-3.5 fill-none",
    hitArea: "absolute -inset-1",
});
