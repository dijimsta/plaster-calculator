import clsx from "clsx";

export const root = clsx("grid", "grid-cols-1");

export const selectBase = clsx(
    "col-start-1",
    "row-start-1",
    "w-full",
    "appearance-none",
    "rounded-md",
    "bg-white",
    "py-2",
    "pr-8",
    "pl-3",
    "text-base",
    "text-gray-900",
    "outline-1",
    "-outline-offset-1",
    "outline-gray-300",
    "focus:outline-2",
    "focus:-outline-offset-2",
    "focus:outline-indigo-600",
    "*:text-gray-900",
    "sm:text-sm/6",
    "dark:bg-white/5",
    "dark:text-white",
    "dark:outline-white/10",
    "dark:*:text-gray-400",
    "dark:focus:outline-indigo-500",
    "disabled:cursor-not-allowed",
    "disabled:bg-gray-100",
    "disabled:text-gray-400",
    "dark:disabled:bg-white/10",
);

export const selectInvalid = clsx(
    "outline-red-300",
    "focus:outline-red-600",
    "dark:outline-red-500/50",
    "dark:focus:outline-red-500",
);

export const chevron = clsx(
    "pointer-events-none",
    "col-start-1",
    "row-start-1",
    "mr-2",
    "size-5",
    "self-center",
    "justify-self-end",
    "text-gray-500",
    "sm:size-4",
    "dark:text-gray-400",
);

export function selectClassName(invalid: boolean): string {
    return clsx(selectBase, invalid && selectInvalid);
}
