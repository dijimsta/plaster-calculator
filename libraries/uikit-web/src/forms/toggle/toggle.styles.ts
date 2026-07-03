export const container = "relative inline-grid shrink-0 align-middle";

export const input =
    "peer absolute inset-0 z-10 m-0 cursor-pointer appearance-none rounded-full disabled:cursor-not-allowed";

export const track =
    "pointer-events-none absolute inset-0 rounded-full bg-gray-200 transition-colors peer-checked:bg-indigo-600 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-600 peer-focus-visible:ring-offset-2 peer-disabled:opacity-50 dark:bg-white/20 dark:peer-checked:bg-indigo-500 dark:peer-focus-visible:ring-indigo-500 dark:peer-focus-visible:ring-offset-gray-900";

export const thumb =
    "pointer-events-none relative rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform peer-disabled:opacity-75";

export const sizes = Object.freeze({
    sm: {
        container: "h-5 w-9",
        thumb: "m-0.5 size-4 peer-checked:translate-x-4",
    },
    md: {
        container: "h-6 w-11",
        thumb: "m-0.5 size-5 peer-checked:translate-x-5",
    },
});

export type ToggleSize = keyof typeof sizes;
