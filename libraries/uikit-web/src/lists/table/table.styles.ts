export const styles = Object.freeze({
    container: "overflow-x-auto",
    borderedContainer:
        "rounded-lg border border-gray-200 shadow-sm dark:border-white/10",
    table: "min-w-full divide-y divide-gray-300 dark:divide-white/10",
    compactTable:
        "[&_td]:px-2 [&_td]:py-2 [&_td:first-child]:pl-3 [&_td:last-child]:pr-3 [&_th]:px-2 [&_th]:py-2 [&_th:first-child]:pl-3 [&_th:last-child]:pr-3",
    stripedTable:
        "[&_tbody>tr:nth-child(even)]:bg-gray-50 dark:[&_tbody>tr:nth-child(even)]:bg-white/5",
    head: "bg-white dark:bg-slate-900",
    body: "divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-slate-900",
    header: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900 first:pl-4 last:pr-4 sm:first:pl-6 sm:last:pr-6 dark:text-white",
    cell: "whitespace-nowrap px-3 py-4 text-sm text-gray-500 first:pl-4 last:pr-4 sm:first:pl-6 sm:last:pr-6 dark:text-gray-400",
});
