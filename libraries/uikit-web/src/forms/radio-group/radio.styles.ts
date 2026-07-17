export const radioContainer = "relative inline-grid shrink-0 align-middle";

export const radioInput =
    "peer col-start-1 row-start-1 m-0 cursor-pointer appearance-none rounded-full border-0 border-solid border-transparent bg-white shadow-xs ring-1 ring-inset ring-gray-300 transition-colors checked:border-[0.3rem] checked:border-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/5 dark:ring-white/10 dark:checked:border-indigo-500 dark:focus-visible:ring-indigo-500 dark:focus-visible:ring-offset-gray-900";

export const radioSizes = Object.freeze({
    sm: "size-4",
    md: "size-5",
});

export type RadioSize = keyof typeof radioSizes;
