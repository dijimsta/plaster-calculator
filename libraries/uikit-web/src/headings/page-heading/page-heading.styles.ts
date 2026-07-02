export const styles = Object.freeze({
    root: "grid gap-x-4 gap-y-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start",
    breadcrumbs: "min-w-0 sm:col-span-2",
    content: "min-w-0 flex-1",
    title: "text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white",
    description: "mt-2 text-sm text-gray-500 dark:text-gray-400",
    meta: "mt-2 flex flex-wrap gap-x-6 gap-y-2",
    metaItem:
        "flex items-center text-sm text-gray-500 dark:text-gray-400 [&_svg]:mr-1.5 [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-gray-400 dark:[&_svg]:text-gray-500",
    actions: "flex shrink-0 flex-wrap items-center gap-3",
});
