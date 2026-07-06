export const styles = Object.freeze({
    root: "flex items-center justify-between",
    mobileActions: "flex flex-1 justify-between gap-x-3 sm:hidden",
    desktopPagination:
        "hidden sm:flex sm:flex-1 sm:items-center sm:justify-center",
    list: "isolate inline-flex -space-x-px rounded-md shadow-xs",
    button: "relative inline-flex min-w-10 items-center justify-center px-3 py-2 text-sm font-semibold transition-colors focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50",
    pageButton:
        "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-gray-100 dark:ring-white/10 dark:hover:bg-white/5",
    currentPage:
        "z-10 bg-indigo-600 text-white focus-visible:outline-indigo-600 dark:bg-indigo-500",
    previousButton: "rounded-l-md",
    nextButton: "rounded-r-md",
    mobileButton:
        "inline-flex items-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/5 dark:text-gray-100 dark:ring-white/10 dark:hover:bg-white/10",
    icon: "size-5",
    ellipsis:
        "relative inline-flex min-w-10 items-center justify-center px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 dark:text-gray-300 dark:ring-white/10",
});
