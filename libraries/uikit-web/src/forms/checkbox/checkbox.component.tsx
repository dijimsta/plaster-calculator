import clsx from "clsx";

import {
    checkmark,
    container,
    input,
    sizes,
    type CheckboxSize,
} from "./checkbox.styles.ts";

import type { InputHTMLAttributes, ReactElement } from "react";

export type { CheckboxSize };

export type CheckboxProps = {
    readonly size?: CheckboxSize;
    readonly className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size" | "type">;

/** An accessible checkbox for selecting one or more options. */
export function Checkbox({
    size = "md",
    className,
    ...props
}: CheckboxProps): ReactElement {
    return (
        <span className={clsx(container, className)}>
            <input
                type="checkbox"
                className={clsx(input, sizes[size].input)}
                {...props}
            />
            <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className={clsx(checkmark, sizes[size].checkmark)}
            >
                <path
                    d="m4 8 2.5 2.5L12 5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </span>
    );
}
