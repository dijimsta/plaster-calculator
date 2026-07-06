export const base =
    "inline-flex items-center justify-center gap-2 border-0 text-sm font-medium leading-5 cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed";

export const growStyle = "flex-1";

export type ButtonVariant =
    typeof variants extends Record<infer K, string> ? K : never;

export const variants = Object.freeze({
    primary:
        "p-2.5 rounded-lg bg-indigo-600 text-white enabled:hover:bg-indigo-700",
    danger: "p-2.5 rounded-lg bg-red-600 text-white enabled:hover:bg-red-700 focus-visible:ring-red-600",
    dangerSoft:
        "p-2.5 rounded-lg bg-red-50 text-red-700 ring-1 ring-inset ring-red-200 enabled:hover:bg-red-100 focus-visible:ring-red-600 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/20 dark:enabled:hover:bg-red-500/20",
    secondary:
        "p-2.5 rounded-lg bg-white text-gray-900 font-semibold ring-1 ring-inset ring-gray-200 shadow-xs enabled:hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:enabled:hover:bg-white/10",
    soft: "p-2.5 rounded-lg bg-indigo-50 text-indigo-600 enabled:hover:bg-indigo-100",
    ghost: "p-2.5 rounded-lg bg-transparent text-slate-900 dark:text-slate-100 font-semibold hover:underline underline-offset-2",
    link: "p-0 rounded-none text-indigo-600 underline underline-offset-2 enabled:hover:text-indigo-800 dark:text-indigo-400 dark:enabled:hover:text-indigo-300",
});
