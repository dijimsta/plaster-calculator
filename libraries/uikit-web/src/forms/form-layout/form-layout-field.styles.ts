export const fieldSpans = Object.freeze({
    "full": "sm:col-span-6",
    "half": "sm:col-span-3",
    "third": "sm:col-span-2",
    "two-thirds": "sm:col-span-4",
});

export type FormLayoutFieldSpan = keyof typeof fieldSpans;

export const fieldVariants = Object.freeze({
    "default": "min-w-0",
    "labels-left": "grid min-w-0 grid-cols-1 gap-y-2 sm:grid-cols-3 sm:gap-x-6",
});

export const fieldLabel =
    "block text-sm/6 font-medium text-gray-900 dark:text-white";
export const fieldContent = "min-w-0 sm:col-span-2";
export const fieldControlSpacing = "mt-2";
export const fieldDescription =
    "mt-2 text-sm/6 text-gray-600 dark:text-gray-400";
