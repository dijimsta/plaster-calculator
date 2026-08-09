import clsx from "clsx";
import type { ReactElement } from "react";

import {
    checkableInputProps,
    type CheckableControlProps,
} from "../form-control.types.ts";

import {
    radioContainer,
    radioInput,
    radioSizes,
    type RadioSize,
} from "./radio.styles.ts";

export type RadioProps = {
    readonly size?: RadioSize;
} & CheckableControlProps;

type RadioControlProps = RadioProps & {
    readonly describedBy?: string;
    readonly offset?: boolean;
};

/** An accessible radio control for selecting one option from a group. */
export function Radio({ ...props }: RadioProps): ReactElement {
    return <RadioControl {...props} />;
}

export function RadioControl({
    size = "md",
    describedBy,
    offset = false,
    ...controlProps
}: RadioControlProps): ReactElement {
    return (
        <span className={clsx(radioContainer, offset && "mt-0.5")}>
            <input
                type="radio"
                aria-describedby={describedBy}
                className={clsx(radioInput, radioSizes[size])}
                {...checkableInputProps(controlProps)}
            />
        </span>
    );
}
