import clsx from "clsx";

import {
    defaultOption,
    defaultOptionAlignment,
    disabledOption,
    optionDescription,
    optionLabel,
    optionLabelCursor,
    optionText,
} from "./radio-group-default-option.styles.ts";
import { RadioControl } from "./radio.component.tsx";

import type { RadioSize } from "./radio.styles.ts";
import type { CheckableControlProps } from "../form-control.types.ts";
import type { ReactElement, ReactNode } from "react";

export type RadioGroupDefaultOptionProps = {
    readonly id: string;
    readonly name: string;
    readonly size: RadioSize;
    readonly value: string;
    readonly label: ReactNode;
    readonly description?: ReactNode;
} & Omit<CheckableControlProps, "id" | "label" | "name" | "value">;

export function RadioGroupDefaultOption({
    id,
    name,
    size,
    value,
    label,
    description,
    disabled,
    ...controlProps
}: RadioGroupDefaultOptionProps): ReactElement {
    const descriptionId = `${id}-description`;

    return (
        <div
            className={clsx(
                defaultOption,
                description === undefined
                    ? defaultOptionAlignment.default
                    : defaultOptionAlignment.described,
                disabled && disabledOption,
            )}
        >
            <RadioControl
                id={id}
                name={name}
                value={value}
                size={size}
                disabled={disabled}
                describedBy={
                    description === undefined ? undefined : descriptionId
                }
                offset={description !== undefined}
                {...controlProps}
            />
            <div className={optionText}>
                <label
                    htmlFor={id}
                    className={clsx(
                        optionLabel,
                        disabled
                            ? optionLabelCursor.disabled
                            : optionLabelCursor.default,
                    )}
                >
                    {label}
                </label>
                {description === undefined ? null : (
                    <p id={descriptionId} className={optionDescription}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
