import clsx from "clsx";

import {
    container,
    input,
    sizes,
    thumb,
    track,
    type ToggleSize,
} from "./toggle.styles.ts";

import type { InputHTMLAttributes, ReactElement } from "react";

export type { ToggleSize };

export type ToggleProps = {
    readonly size?: ToggleSize;
    readonly className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size" | "type">;

/** An accessible checkbox styled as an on/off switch. */
export function Toggle({
    size = "md",
    className,
    ...props
}: ToggleProps): ReactElement {
    return (
        <span className={clsx(container, sizes[size].container, className)}>
            <input type="checkbox" role="switch" className={input} {...props} />
            <span aria-hidden="true" className={track} />
            <span
                aria-hidden="true"
                className={clsx(thumb, sizes[size].thumb)}
            />
        </span>
    );
}
