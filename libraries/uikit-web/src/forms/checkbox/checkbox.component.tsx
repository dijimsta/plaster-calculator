import clsx from "clsx";

import {
    checkmark,
    container,
    input,
    sizes,
    type CheckboxSize,
} from "./checkbox.styles.ts";
import {
    checkableInputProps,
    type CheckableControlProps,
} from "../form-control.types.ts";

import type { ReactElement } from "react";

export type { CheckboxSize };

export type CheckboxProps = {
    readonly size?: CheckboxSize;
} & CheckableControlProps;

/** An accessible checkbox for selecting one or more options. */
export function Checkbox({
    size = "md",
    ...controlProps
}: CheckboxProps): ReactElement {
    return (
        <span className={container}>
            <input
                type="checkbox"
                className={clsx(input, sizes[size].input)}
                {...checkableInputProps(controlProps)}
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
