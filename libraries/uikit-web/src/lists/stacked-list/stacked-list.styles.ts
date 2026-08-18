export const styles = Object.freeze({
    root: "divide-y divide-gray-100",
    item: "py-5",
    borderedRoot: "border-y border-gray-200",
    compactRoot: "[&>li]:py-3",
    // Each item as its own separated, hoverable card instead of one
    // divided block -- e.g. a "recent items" list linking out per row.
    cardsRoot: "flex flex-col gap-2",
    cardItem:
        "rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5",
});
