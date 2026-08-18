export const styles = Object.freeze({
    root: "rounded-lg",
    variants: Object.freeze({
        default:
            "bg-white p-6 shadow-sm ring-1 ring-gray-900/5 dark:bg-slate-900 dark:ring-white/10",
        subtle: "bg-gray-50 p-4 ring-1 ring-gray-200 dark:bg-white/5 dark:ring-white/10",
        dashed: "border-2 border-dashed border-gray-300 bg-transparent p-6 hover:border-gray-400 dark:border-white/15 dark:hover:border-white/25",
    }),
    interactive:
        "block w-full cursor-pointer text-left transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 dark:hover:bg-white/5 dark:focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-gray-900",
    // A distinct `outline` (rather than another `ring`) so this layers
    // cleanly on top of a variant's own `ring-1` without either fighting the
    // other for the same CSS property.
    selected:
        "outline outline-2 outline-offset-2 outline-gray-900 dark:outline-white",
    visibility: Object.freeze({
        "visible": "",
        "print-only": "hidden print:block",
    }),
    overflow: Object.freeze({
        hidden: "overflow-hidden",
        // Lets content that must escape the card's bounds -- an absolutely
        // positioned dropdown/popover field, for example -- render without
        // being clipped by the rounded corners.
        visible: "overflow-visible",
    }),
    header: "flex items-center justify-between",
    body: "mt-4 flex flex-col gap-3",
    title: "mb-2 text-base font-semibold text-gray-900 dark:text-white",
    buttonGroup: "mt-5 flex flex-col gap-2.5",
    footer: "mt-6 border-t border-gray-200 pt-4 text-sm leading-6 text-gray-500 dark:border-white/10 dark:text-gray-400 [&_a]:font-medium [&_a]:text-current [&_a]:underline [&_a:hover]:text-gray-700 dark:[&_a:hover]:text-gray-300",
});
