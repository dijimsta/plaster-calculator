export const DEFAULT_INTENT = "neutral";

export const DEFAULT_VARIANT = "flat";

export type AlertVariant = "flat" | "flat-with-border" | "light-with-border";

export const styles = Object.freeze({
    container: "rounded-md p-4",
    accentContainer: "border-l-4 p-4",
    inner: "flex",
    iconWrapper: "shrink-0",
    contentWrapper: "ml-3 min-w-0 flex-1",
    title: "text-sm font-medium [&:not(:last-child)]:mb-2",
    body: "text-sm",
    icon: "size-5",
    dismissWrapper: "ml-auto pl-3",
    dismissInner: "-mx-1.5 -my-1.5",
    dismissButton:
        "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
    dismissButtonSrLabel: "sr-only",
});

export type AlertIntent =
    typeof containerColors extends Record<infer K, string> ? K : never;

export const containerColors = Object.freeze({
    neutral: "bg-gray-50 dark:bg-white/5",
    info: "bg-blue-50 dark:bg-blue-500/10",
    warn: "bg-yellow-50 dark:bg-yellow-500/10",
    error: "bg-red-50 dark:bg-red-500/10",
    success: "bg-green-50 dark:bg-green-500/10",
});

export const accentBorderColors = Object.freeze({
    neutral: "border-gray-400 dark:border-gray-500",
    info: "border-blue-400 dark:border-blue-500",
    warn: "border-yellow-400 dark:border-yellow-500",
    error: "border-red-400 dark:border-red-500",
    success: "border-green-400 dark:border-green-500",
});

export const iconColors = Object.freeze({
    neutral: "text-gray-400",
    info: "text-blue-400",
    warn: "text-yellow-400",
    error: "text-red-400",
    success: "text-green-400",
});

export const titleColors = Object.freeze({
    neutral: "text-gray-800 dark:text-gray-100",
    info: "text-blue-800 dark:text-blue-200",
    warn: "text-yellow-800 dark:text-yellow-200",
    error: "text-red-800 dark:text-red-200",
    success: "text-green-800 dark:text-green-200",
});

export const bodyColors = Object.freeze({
    neutral: "text-gray-700 dark:text-gray-300",
    info: "text-blue-700 dark:text-blue-300",
    warn: "text-yellow-700 dark:text-yellow-300",
    error: "text-red-700 dark:text-red-300",
    success: "text-green-700 dark:text-green-300",
});

export const dismissButtonColors = Object.freeze({
    neutral:
        "text-gray-500 hover:bg-gray-100 focus:ring-gray-600 focus:ring-offset-gray-50 dark:text-gray-400 dark:hover:bg-white/10 dark:focus:ring-gray-400 dark:focus:ring-offset-slate-900",
    info: "text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/20 dark:focus:ring-blue-400 dark:focus:ring-offset-slate-900",
    warn: "text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-500/20 dark:focus:ring-yellow-400 dark:focus:ring-offset-slate-900",
    error: "text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50 dark:text-red-400 dark:hover:bg-red-500/20 dark:focus:ring-red-400 dark:focus:ring-offset-slate-900",
    success:
        "text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50 dark:text-green-400 dark:hover:bg-green-500/20 dark:focus:ring-green-400 dark:focus:ring-offset-slate-900",
});

export const ringColors = Object.freeze({
    neutral: "inset-ring inset-ring-gray-300 dark:inset-ring-white/10",
    info: "inset-ring inset-ring-blue-300 dark:inset-ring-blue-500/30",
    warn: "inset-ring inset-ring-yellow-300 dark:inset-ring-yellow-500/30",
    error: "inset-ring inset-ring-red-300 dark:inset-ring-red-500/30",
    success: "inset-ring inset-ring-green-300 dark:inset-ring-green-500/30",
});
