export const sizes = Object.freeze({
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
});

export type ParagraphSize =
    typeof sizes extends Record<infer K, string> ? K : never;

export const variants = Object.freeze({
    default: "",
    muted: "text-slate-500 dark:text-slate-400",
});

export type ParagraphVariant =
    typeof variants extends Record<infer K, string> ? K : never;
