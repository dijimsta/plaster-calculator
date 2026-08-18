export const styles = {
    // expandedRoot/collapsedRoot (and every other expanded/collapsed pair below) are mutually
    // exclusive — see rail-navigation.styles.ts for why an add-on-top conditional class can't
    // reliably override a same-property class that's always present.
    root: "flex h-full min-h-0 flex-col overflow-hidden bg-white text-slate-900 transition-[width] duration-200 ease-out dark:bg-slate-900 dark:text-slate-100",
    expandedRoot: "w-64",
    collapsedRoot: "w-16",
    header: "shrink-0 overflow-hidden py-5",
    headerExpanded: "px-4",
    headerCollapsed: "px-2",
    body: "min-h-0 flex-1 overflow-hidden overflow-y-auto pb-4",
    bodyExpanded: "px-3",
    bodyCollapsed: "px-1",
    footer: "grid shrink-0 gap-2 overflow-hidden border-t border-slate-200 py-3 dark:border-slate-800 [&>button]:w-full",
    footerExpanded: "px-3",
    footerCollapsed: "px-1",
    collapseButton:
        "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white [&>svg]:size-5",
} as const;
