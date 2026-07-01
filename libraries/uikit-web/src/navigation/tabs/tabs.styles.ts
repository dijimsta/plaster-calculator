export const DEFAULT_VARIANT = "underline";

export type TabsVariant = keyof typeof variants;

export const styles = Object.freeze({
    root: "overflow-x-auto",
    list: "flex items-center",
    listWidth: "min-w-max",
    fullWidthList: "min-w-full",
    fullWidthListItem: "flex flex-1",
    fullWidthItem: "flex-1 justify-center",
});

export const variants = Object.freeze({
    "underline": Object.freeze({
        list: "gap-x-8 border-b border-gray-200 dark:border-white/10",
        item: "-mb-px inline-flex items-center gap-x-2 border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap transition-colors focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        current:
            "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400",
        default:
            "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200",
    }),
    "pills": Object.freeze({
        list: "gap-x-2",
        item: "inline-flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        current: "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-white",
        default:
            "text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200",
    }),
    "pills-on-gray": Object.freeze({
        list: "gap-x-1 rounded-lg bg-gray-100 p-1 dark:bg-white/5",
        item: "inline-flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        current:
            "bg-white text-gray-700 shadow-sm dark:bg-white/10 dark:text-white",
        default:
            "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
    }),
});
