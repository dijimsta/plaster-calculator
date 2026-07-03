export const base = [
    "block w-full rounded-md bg-white px-3 py-2",
    "text-base text-gray-900 sm:text-sm/6",
    "outline-1 -outline-offset-1 outline-gray-300",
    "placeholder:text-gray-400",
    "focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600",
    "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
    "dark:bg-white/5 dark:text-white dark:outline-white/10",
    "dark:placeholder:text-gray-500 dark:focus:outline-indigo-500",
    "dark:disabled:bg-white/10",
].join(" ");

export const resizes = Object.freeze({
    both: "resize",
    horizontal: "resize-x",
    none: "resize-none",
    vertical: "resize-y",
});

export type TextareaResize =
    typeof resizes extends Record<infer K, string> ? K : never;
