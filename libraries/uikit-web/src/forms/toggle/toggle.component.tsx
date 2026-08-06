import clsx from "clsx";

import {
    container,
    input,
    sizes,
    thumb,
    track,
    type ToggleSize,
} from "./toggle.styles.ts";
import {
    checkableInputProps,
    type CheckableControlProps,
} from "../form-control.types.ts";

import type { ReactElement } from "react";

export type { ToggleSize };

export type ToggleProps = {
    readonly size?: ToggleSize;
} & CheckableControlProps;

/** An accessible checkbox styled as an on/off switch. */
export function Toggle({
    size = "md",
    ...controlProps
}: ToggleProps): ReactElement {
    return (
        <span className={clsx(container, sizes[size].container)}>
            <input
                type="checkbox"
                role="switch"
                className={input}
                {...checkableInputProps(controlProps)}
            />
            <span aria-hidden="true" className={track} />
            <span
                aria-hidden="true"
                className={clsx(thumb, sizes[size].thumb)}
            />
        </span>
    );
}
