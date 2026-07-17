export const groupVariants = Object.freeze({
    "default": "grid gap-4",
    "inline": "flex flex-wrap gap-x-6 gap-y-4",
    "cards": "grid gap-3 sm:grid-cols-3",
    "small-cards": "grid grid-cols-2 gap-3 sm:grid-cols-4",
    "segmented": "gap-x-1 rounded-lg bg-gray-100 p-1 dark:bg-white/5",
    "list": "overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-gray-900/5 [&>*+*]:border-t [&>*+*]:border-gray-200 dark:bg-white/5 dark:ring-white/10 dark:[&>*+*]:border-white/10",
    "list-right":
        "overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-gray-900/5 [&>*+*]:border-t [&>*+*]:border-gray-200 dark:bg-white/5 dark:ring-white/10 dark:[&>*+*]:border-white/10",
    "table":
        "overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-white/10 dark:bg-white/5 [&>*+*]:border-t [&>*+*]:border-gray-200 dark:[&>*+*]:border-white/10",
});

export type RadioGroupVariant = keyof typeof groupVariants;

export const segmentedDisplay = Object.freeze({
    default: "inline-flex",
    fullWidth: "flex w-full",
});

export const groupFieldset = "group/radio-group min-w-0";
export const groupLegend =
    "text-sm/6 font-semibold text-gray-900 dark:text-white";
export const groupLegendHidden = "sr-only";
export const groupDescription =
    "mt-1 text-sm/6 text-gray-500 dark:text-gray-400";
export const groupContentSpacing = Object.freeze({
    default: "mt-4",
    described: "mt-5",
    hiddenLegend: "mt-0",
});

export function legendClassName(hideLegend: boolean): string {
    return hideLegend ? groupLegendHidden : groupLegend;
}

export function groupContentSpacingClassName(
    hideLegend: boolean,
    hasDescription: boolean,
): string {
    if (hideLegend) return groupContentSpacing.hiddenLegend;
    return hasDescription
        ? groupContentSpacing.described
        : groupContentSpacing.default;
}

export function segmentedDisplayClassName(
    variant: RadioGroupVariant,
    fullWidth: boolean,
): string | false {
    if (variant !== "segmented") return false;
    return fullWidth ? segmentedDisplay.fullWidth : segmentedDisplay.default;
}
