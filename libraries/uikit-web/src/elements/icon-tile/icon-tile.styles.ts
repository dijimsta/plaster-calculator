export const base = "inline-flex items-center justify-center shrink-0";

export const sizes = Object.freeze({
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
});

export type IconTileSize =
    typeof sizes extends Record<infer K, string> ? K : never;

export const shapes = Object.freeze({
    square: "rounded-lg",
    circle: "rounded-full",
});

export type IconTileShape =
    typeof shapes extends Record<infer K, string> ? K : never;

export const tones = Object.freeze({
    dark: "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
    indigo: "bg-indigo-600 text-white dark:bg-indigo-500",
    indigoSoft:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300",
    neutral:
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    successSoft:
        "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400",
});

export type IconTileTone =
    typeof tones extends Record<infer K, string> ? K : never;
