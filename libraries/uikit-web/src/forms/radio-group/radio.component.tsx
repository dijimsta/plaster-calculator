import clsx from "clsx";

import {
    radioContainer,
    radioInput,
    radioSizes,
    type RadioSize,
} from "./radio-group.styles.ts";

import type { InputHTMLAttributes, ReactElement } from "react";

export type RadioProps = {
    readonly size?: RadioSize;
    readonly className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size" | "type">;

/** An accessible radio control for selecting one option from a group. */
export function Radio({
    size = "md",
    className,
    ...props
}: RadioProps): ReactElement {
    return (
        <span className={clsx(radioContainer, className)}>
            <input
                type="radio"
                className={clsx(radioInput, radioSizes[size])}
                {...props}
            />
        </span>
    );
}
