export const base =
    "inline-flex items-center justify-center rounded-lg shrink-0";

export const sizes = Object.freeze({
    sm: "size-8",
    md: "size-10",
});

export type IconTileSize =
    typeof sizes extends Record<infer K, string> ? K : never;

export const tones = Object.freeze({
    dark: "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
    indigo: "bg-indigo-600 text-white dark:bg-indigo-500",
    neutral:
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
});

export type IconTileTone =
    typeof tones extends Record<infer K, string> ? K : never;
