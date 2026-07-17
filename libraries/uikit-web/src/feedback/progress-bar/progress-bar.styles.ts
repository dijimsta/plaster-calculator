export type ProgressBarSize = "sm" | "md";

export const DEFAULT_TONE = "default";

export const styles = Object.freeze({
    root: "w-full",
    header: "mb-2 flex items-center justify-between gap-4 text-sm font-medium text-gray-700 dark:text-gray-300",
    value: "tabular-nums text-gray-500 dark:text-gray-400",
    track: "overflow-hidden rounded-full bg-gray-200 dark:bg-white/10",
    sizes: Object.freeze({
        sm: "h-2",
        md: "h-3",
    }) satisfies Readonly<Record<ProgressBarSize, string>>,
    indicator: "h-full rounded-full transition-[width] duration-300 ease-out",
});

export const indicatorTones = Object.freeze({
    default: "bg-indigo-600 dark:bg-indigo-500",
    info: "bg-blue-600 dark:bg-blue-500",
    success: "bg-green-600 dark:bg-green-500",
});

export type ProgressBarTone =
    typeof indicatorTones extends Record<infer K, string> ? K : never;
