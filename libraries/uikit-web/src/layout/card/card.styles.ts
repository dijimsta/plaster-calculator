export const styles = Object.freeze({
    root: "overflow-hidden rounded-lg ring-1",
    variants: Object.freeze({
        default:
            "bg-white p-6 shadow-sm ring-gray-900/5 dark:bg-slate-900 dark:ring-white/10",
        subtle: "bg-gray-50 p-4 ring-gray-200 dark:bg-white/5 dark:ring-white/10",
    }),
    header: "flex items-center justify-between",
    body: "mt-4 flex flex-col gap-3",
    title: "mb-2 text-base font-semibold text-gray-900 dark:text-white",
    buttonGroup: "mt-5 flex flex-col gap-2.5",
    footer: "mt-6 border-t border-gray-200 pt-4 text-sm leading-6 text-gray-500 dark:border-white/10 dark:text-gray-400 [&_a]:font-medium [&_a]:text-current [&_a]:underline [&_a:hover]:text-gray-700 dark:[&_a:hover]:text-gray-300",
});
