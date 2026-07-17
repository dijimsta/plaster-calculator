import clsx from "clsx";

import {
    defaultOption,
    defaultOptionAlignment,
    describedRadio,
    disabledOption,
    optionDescription,
    optionLabel,
    optionLabelCursor,
    optionText,
} from "./radio-group-default-option.styles.ts";
import { Radio } from "./radio.component.tsx";

import type { RadioSize } from "./radio.styles.ts";
import type { InputHTMLAttributes, ReactElement, ReactNode } from "react";

export type RadioGroupDefaultOptionProps = {
    readonly id: string;
    readonly name: string;
    readonly size: RadioSize;
    readonly value: string;
    readonly label: ReactNode;
    readonly description?: ReactNode;
    readonly className?: string;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "children" | "className" | "id" | "name" | "size" | "type" | "value"
>;

export function RadioGroupDefaultOption({
    id,
    name,
    size,
    value,
    label,
    description,
    className,
    disabled,
    ...props
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
                className,
            )}
        >
            <Radio
                id={id}
                name={name}
                value={value}
                size={size}
                className={
                    description === undefined ? undefined : describedRadio
                }
                disabled={disabled}
                aria-describedby={
                    description === undefined ? undefined : descriptionId
                }
                {...props}
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
