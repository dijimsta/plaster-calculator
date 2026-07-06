export type EmptyStateVariant = "simple" | "dashed";

export const styles = Object.freeze({
    base: "text-center",
    variants: Object.freeze({
        simple: "py-12",
        dashed: "rounded-lg border-2 border-dashed border-gray-300 px-6 py-12 dark:border-white/10",
    }) satisfies Readonly<Record<EmptyStateVariant, string>>,
    icon: "mx-auto flex size-12 items-center justify-center text-gray-400 dark:text-gray-500 [&>svg]:size-12 [&>svg]:stroke-1",
    title: "mt-2 text-sm font-semibold text-gray-900 dark:text-white",
    description: "mt-1 text-sm text-gray-500 dark:text-gray-400",
    actions: "mt-6 flex items-center justify-center gap-3",
});
