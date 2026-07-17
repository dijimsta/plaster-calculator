export const DEFAULT_COLUMNS = 3;
export const DEFAULT_TREND_DIRECTION = "neutral";
export const DEFAULT_VARIANT = "simple";

export const styles = Object.freeze({
    root: "grid",
    itemBody: "min-w-0",
    itemContent: "flex min-w-0 items-start justify-between gap-4",
    icon: "inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300 [&_svg]:size-5",
    label: "truncate text-sm font-medium text-gray-500 dark:text-gray-400",
    value: "mt-1 truncate text-3xl font-semibold tracking-normal text-gray-900 dark:text-white",
    description: "mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400",
    trend: "mt-4 inline-flex items-center gap-1.5 text-sm font-medium",
    trendIcon: "size-4 shrink-0",
});

export const variants = Object.freeze({
    "cards": "gap-5",
    "shared-borders":
        "overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5 dark:bg-slate-900 dark:ring-white/10",
    "simple": "gap-5",
});

export type StatsVariant =
    typeof variants extends Record<infer K, string> ? K : never;

export const itemVariants = Object.freeze({
    "cards":
        "overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm ring-1 ring-gray-900/5 dark:bg-slate-900 dark:ring-white/10 sm:p-6",
    "shared-borders": "min-w-0 px-4 py-5 sm:p-6",
    "simple": "min-w-0",
});

export const columns = Object.freeze({
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
});

export type StatsColumnCount =
    typeof columns extends Record<infer K, string> ? K : never;

export const sharedBorderColumns = Object.freeze({
    1: "",
    2: "sm:[&>*+*]:border-l",
    3: "lg:[&>*+*]:border-l",
    4: "lg:[&>*+*]:border-l",
});

export const sharedBorderItemStyle =
    "border-gray-200 dark:border-white/10 [&+*]:border-t sm:[&+*]:border-t-0";

export const trendDirections = Object.freeze({
    down: "text-red-600 dark:text-red-400",
    neutral: "text-gray-600 dark:text-gray-400",
    up: "text-green-600 dark:text-green-400",
});

export type StatsTrendDirection =
    typeof trendDirections extends Record<infer K, string> ? K : never;
