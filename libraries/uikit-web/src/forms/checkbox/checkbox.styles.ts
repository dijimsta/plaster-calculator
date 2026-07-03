export const container = "relative inline-grid shrink-0 align-middle";

export const input =
    "peer col-start-1 row-start-1 m-0 cursor-pointer appearance-none rounded-sm bg-white shadow-xs ring-1 ring-inset ring-gray-300 transition-colors checked:bg-indigo-600 checked:ring-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/5 dark:ring-white/10 dark:checked:bg-indigo-500 dark:checked:ring-indigo-500 dark:focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-gray-900";

export const checkmark =
    "pointer-events-none col-start-1 row-start-1 self-center justify-self-center fill-none stroke-white opacity-0 peer-checked:opacity-100 peer-disabled:opacity-50";

export const sizes = Object.freeze({
    sm: {
        input: "size-4",
        checkmark: "size-3",
    },
    md: {
        input: "size-5",
        checkmark: "size-4",
    },
});

export type CheckboxSize = keyof typeof sizes;
