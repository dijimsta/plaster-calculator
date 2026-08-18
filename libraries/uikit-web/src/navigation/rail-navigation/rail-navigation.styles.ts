export const styles = {
    // Fills whatever width its container provides — the container (a standalone wrapper,
    // VerticalNavigation's small-window wrapper, or a collapsed SidebarNavigation) owns the
    // actual rail width, so this never fights an ancestor for the same dimension.
    navigation: "flex w-full shrink-0 flex-col items-center",
    section: "mt-4 flex w-full flex-col items-center first:mt-0",
    sectionTitle: "sr-only",
    list: "m-0 flex w-full list-none flex-col items-center gap-1 p-0",
    item: "relative flex size-12 items-center justify-center rounded-md no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600 [&>svg]:size-5 [&>svg]:shrink-0",
    // defaultItem/currentItem are mutually exclusive (never both applied at once) — Tailwind
    // sorts same-property utilities by scale/theme order in its output, not by source order, so
    // conditionally adding a class on top of an always-present same-property class is not a
    // reliable way to override it.
    defaultItem:
        "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white [&>svg]:text-slate-400 dark:[&>svg]:text-slate-500",
    currentItem:
        "bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 [&>svg]:text-indigo-600 dark:[&>svg]:text-indigo-400",
    label: "sr-only",
} as const;
