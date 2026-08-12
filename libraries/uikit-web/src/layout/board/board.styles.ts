export const styles = Object.freeze({
    root: "flex items-start gap-4 overflow-x-auto pb-2",
    column: Object.freeze({
        root: "flex w-72 flex-shrink-0 flex-col gap-3 rounded-lg bg-gray-50 p-3 ring-1 ring-gray-900/5 dark:bg-white/5 dark:ring-white/10",
        dropActive: "ring-2 ring-indigo-500 ring-inset",
        header: "flex items-center justify-between gap-2 px-1",
        body: "flex max-h-[32rem] min-h-16 flex-col gap-2 overflow-y-auto",
        empty: "flex items-center justify-center rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-gray-400 dark:border-white/10 dark:text-gray-500",
    }),
    card: Object.freeze({
        root: "cursor-grab rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-900/5 transition hover:shadow-md active:cursor-grabbing dark:bg-slate-900 dark:ring-white/10",
        dragging: "opacity-40",
    }),
});
