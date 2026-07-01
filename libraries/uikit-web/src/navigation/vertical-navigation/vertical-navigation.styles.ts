export const styles = {
    navigation: "w-full",
    section: "mt-6 first:mt-0",
    sectionTitle:
        "mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400",
    list: "m-0 list-none space-y-1 p-0",
    item: "flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-semibold leading-6 text-slate-700 no-underline transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-slate-400 dark:[&>svg]:text-slate-500",
    currentItem:
        "bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 [&>svg]:text-indigo-600 dark:[&>svg]:text-indigo-400",
    accessory: "ml-auto flex shrink-0 items-center gap-1.5",
} as const;
