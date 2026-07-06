export type MultiStepStatus = "complete" | "current" | "upcoming";

export const styles = Object.freeze({
    root: "w-full",
    list: "flex items-start",
    item: "relative flex flex-1 flex-col items-center text-center",
    connector:
        "absolute top-4 right-1/2 left-1/2 h-0.5 w-full -translate-y-1/2",
    connectorComplete: "bg-indigo-600 dark:bg-indigo-500",
    connectorUpcoming: "bg-gray-200 dark:bg-white/10",
    button: "group relative z-10 flex max-w-40 flex-col items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 disabled:cursor-default",
    marker: "flex size-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
    markerStates: Object.freeze({
        complete:
            "border-indigo-600 bg-indigo-600 text-white group-enabled:group-hover:bg-indigo-700 dark:border-indigo-500 dark:bg-indigo-500 dark:group-enabled:group-hover:bg-indigo-400",
        current:
            "border-indigo-600 bg-white text-indigo-600 dark:border-indigo-400 dark:bg-gray-900 dark:text-indigo-400",
        upcoming:
            "border-gray-300 bg-white text-gray-500 group-enabled:group-hover:border-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-400",
    }) satisfies Readonly<Record<MultiStepStatus, string>>,
    checkIcon: "size-4",
    content: "mt-3 hidden sm:block",
    name: "block text-sm font-medium",
    nameStates: Object.freeze({
        complete: "text-gray-900 dark:text-gray-100",
        current: "text-indigo-600 dark:text-indigo-400",
        upcoming: "text-gray-500 dark:text-gray-400",
    }) satisfies Readonly<Record<MultiStepStatus, string>>,
    description: "mt-1 block text-sm text-gray-500 dark:text-gray-400",
});
