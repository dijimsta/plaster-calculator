"use client";

import clsx from "clsx";
import { useId } from "react";

import type { InputHTMLAttributes, ReactElement, ReactNode } from "react";

export type InputProps = {
    readonly leadingIcon?: ReactNode;
    readonly id?: string;
    readonly className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">;

export function Input({
    leadingIcon,
    id: externalId,
    className,
    ...props
}: InputProps): ReactElement {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    return (
        <div
            className={clsx(leadingIcon !== undefined && "relative", className)}
        >
            {leadingIcon !== undefined && (
                <div
                    className={clsx(
                        "pointer-events-none",
                        "absolute",
                        "inset-y-0",
                        "left-0",
                        "flex",
                        "items-center",
                        "pl-3",
                    )}
                >
                    {leadingIcon}
                </div>
            )}
            <input
                id={id}
                className={clsx(
                    "block",
                    "w-full",
                    "rounded-md",
                    "bg-white",
                    "py-2",
                    leadingIcon !== undefined ? "pl-9" : "pl-3",
                    "pr-3",
                    "text-base",
                    "text-gray-900",
                    "outline-1",
                    "-outline-offset-1",
                    "outline-gray-300",
                    "placeholder:text-gray-400",
                    "focus:outline-2",
                    "focus:-outline-offset-2",
                    "focus:outline-indigo-600",
                    "disabled:cursor-not-allowed",
                    "disabled:bg-gray-100",
                    "disabled:text-gray-400",
                    "sm:text-sm/6",
                    "dark:bg-white/5",
                    "dark:text-white",
                    "dark:outline-white/10",
                    "dark:placeholder:text-gray-500",
                    "dark:focus:outline-indigo-500",
                    "dark:disabled:bg-white/10",
                )}
                {...props}
            />
        </div>
    );
}
