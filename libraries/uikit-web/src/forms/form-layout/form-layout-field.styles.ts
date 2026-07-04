export const fieldSpans = Object.freeze({
    "full": "sm:col-span-6",
    "half": "sm:col-span-3",
    "third": "sm:col-span-2",
    "two-thirds": "sm:col-span-4",
});

export type FormLayoutFieldSpan = keyof typeof fieldSpans;

export const fieldVariants = Object.freeze({
    "default": "relative min-w-0",
    "labels-left": "grid min-w-0 grid-cols-1 gap-y-2 sm:grid-cols-3 sm:gap-x-6",
});

export const fieldLabel =
    "block text-sm/6 font-medium text-gray-900 dark:text-white";

export const fieldLabelPlacements = Object.freeze({
    above: "",
    inset: "absolute top-1 left-3 z-30 text-xs/5",
    overlapping:
        "absolute top-0 left-2 z-30 bg-white px-1 text-xs/4 dark:bg-gray-900",
});

export type FormLayoutFieldLabelPlacement = keyof typeof fieldLabelPlacements;

export const fieldContent = "min-w-0 sm:col-span-2";
export const fieldControlPlacements = Object.freeze({
    above: "mt-2",
    inset: "[&_input]:pt-5 [&_input]:pb-1.5",
    overlapping: "pt-2",
});
export const fieldDescription =
    "mt-2 text-sm/6 text-gray-600 dark:text-gray-400";
