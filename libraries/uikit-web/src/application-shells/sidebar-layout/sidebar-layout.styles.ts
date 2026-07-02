export const styles = {
    root: "flex h-dvh overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100",
    backdrop: "fixed inset-0 z-40 border-0 bg-slate-950/60 p-0 lg:hidden",
    sidebar:
        "fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-out dark:border-slate-800 dark:bg-slate-900 lg:static lg:translate-x-0",
    sidebarOpen: "translate-x-0",
    sidebarClosed: "-translate-x-full",
    closeButton:
        "absolute right-3 top-3 z-10 inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border-0 bg-white text-slate-500 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-700 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden [&>svg]:size-5",
    content: "flex min-w-0 flex-1 flex-col",
    mobileHeader:
        "flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900 lg:hidden",
    menuButton:
        "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white [&>svg]:size-5",
    main: "min-h-0 flex-1 overflow-y-auto",
} as const;
