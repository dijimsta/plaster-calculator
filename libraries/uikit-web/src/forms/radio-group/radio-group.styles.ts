export const radioContainer = "relative inline-grid shrink-0 align-middle";

export const radioInput =
    "peer col-start-1 row-start-1 m-0 cursor-pointer appearance-none rounded-full border-0 border-solid border-transparent bg-white shadow-xs ring-1 ring-inset ring-gray-300 transition-colors checked:border-[0.3rem] checked:border-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/5 dark:ring-white/10 dark:checked:border-indigo-500 dark:focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-gray-900";

export const radioSizes = Object.freeze({
    sm: "size-4",
    md: "size-5",
});

export type RadioSize = keyof typeof radioSizes;

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

export const card =
    "relative flex h-full cursor-pointer select-none items-start rounded-lg border border-gray-300 bg-white p-4 pr-10 text-left text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-transparent transition-colors [-webkit-tap-highlight-color:transparent] hover:bg-gray-50 peer-checked:border-indigo-600 peer-checked:ring-indigo-600 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-600 peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:peer-checked:border-indigo-500 dark:peer-checked:ring-indigo-500 dark:peer-focus-visible:ring-indigo-500 dark:peer-focus-visible:ring-offset-gray-900";

export const cardIndicator =
    "pointer-events-none absolute right-4 top-4 size-4 rounded-full border border-gray-300 bg-white peer-checked:border-[0.3rem] peer-checked:border-indigo-600 peer-disabled:opacity-50 dark:border-white/20 dark:bg-white/5 dark:peer-checked:border-indigo-500";

export const smallCard =
    "relative flex cursor-pointer select-none items-center justify-center rounded-lg bg-white px-4 py-3 text-center text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 transition-colors [-webkit-tap-highlight-color:transparent] hover:ring-gray-400 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:ring-indigo-600 peer-checked:hover:bg-indigo-700 peer-checked:hover:ring-indigo-700 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-600 peer-focus-visible:ring-offset-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:hover:ring-white/20 dark:peer-checked:bg-indigo-500 dark:peer-checked:ring-indigo-500 dark:peer-checked:hover:bg-indigo-400 dark:peer-checked:hover:ring-indigo-400 dark:peer-focus-visible:ring-indigo-500 dark:peer-focus-visible:ring-offset-gray-900";

export const segmentedOption =
    "relative flex cursor-pointer select-none items-center justify-center rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-500 transition-colors [-webkit-tap-highlight-color:transparent] hover:text-gray-700 peer-checked:bg-white peer-checked:text-gray-700 peer-checked:shadow-sm peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 dark:text-gray-400 dark:hover:text-gray-200 dark:peer-checked:bg-white/10 dark:peer-checked:text-white";

export const panelOption =
    "relative flex cursor-pointer select-none gap-3 p-4 ring-1 ring-inset ring-transparent transition-colors [-webkit-tap-highlight-color:transparent] first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 has-[:checked]:z-10 has-[:checked]:bg-indigo-50 has-[:checked]:ring-indigo-600 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 dark:hover:bg-white/5 dark:has-[:checked]:bg-indigo-500/10 dark:has-[:checked]:ring-indigo-500";

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

export const defaultOption = "flex gap-3 group-disabled/radio-group:opacity-50";
export const defaultOptionAlignment = Object.freeze({
    default: "items-center",
    described: "items-start",
});
export const disabledOption = "opacity-50";
export const describedRadio = "mt-0.5";
export const optionText = "min-w-0 text-sm/6";
export const optionLabel = "block font-medium text-gray-900 dark:text-white";
export const optionLabelCursor = Object.freeze({
    default: "cursor-pointer group-disabled/radio-group:cursor-not-allowed",
    disabled: "cursor-not-allowed",
});
export const optionDescription = "text-gray-500 dark:text-gray-400";

export const panelOptionLayout = Object.freeze({
    default: "items-center",
    table: "grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] items-center",
});
export const panelListContent = "min-w-0 text-sm/6";
export const panelListLabel = "block font-medium text-gray-900 dark:text-white";
export const panelListDescription = "block text-gray-500 dark:text-gray-400";
export const panelLabel =
    "min-w-0 text-sm/6 font-medium text-gray-900 dark:text-white";
export const panelDescription =
    "min-w-0 text-sm/6 text-gray-500 dark:text-gray-400";
export const panelDescriptionRight = "ml-auto text-right";

export const cardWrapper = "relative";
export const cardInput = "peer sr-only";
export const cardLabel = "block";
export const cardDescription =
    "mt-1 block font-normal text-gray-500 dark:text-gray-400";
