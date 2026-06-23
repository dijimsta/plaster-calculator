"use client";

import clsx from "clsx";
import { useId } from "react";

import type { ReactElement, SelectHTMLAttributes } from "react";

export type SelectMenuOption = {
    readonly value: string;
    readonly label: string;
};

export type SelectMenuProps = {
    readonly options: readonly SelectMenuOption[];
    readonly id?: string;
    readonly className?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "className">;

export function SelectMenu({
    options,
    id: externalId,
    className,
    ...props
}: SelectMenuProps): ReactElement {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    return (
        <div className={clsx("grid", "grid-cols-1", className)}>
            <select
                id={id}
                className={clsx(
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
                )}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                className={clsx(
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
                )}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                />
            </svg>
        </div>
    );
}
