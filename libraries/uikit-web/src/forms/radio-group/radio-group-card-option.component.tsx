import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import {
    checkableInputProps,
    type CheckableControlProps,
} from "../form-control.types.ts";

import {
    card,
    cardDescription,
    cardIndicator,
    cardInput,
    cardLabel,
    cardWrapper,
    segmentedOption,
    smallCard,
} from "./radio-group-card-option.styles.ts";
import type { RadioGroupVariant } from "./radio-group.styles.ts";

export type RadioGroupCardOptionVariant = Extract<
    RadioGroupVariant,
    "cards" | "small-cards" | "segmented"
>;

export type RadioGroupCardOptionProps = {
    readonly id: string;
    readonly name: string;
    readonly value: string;
    readonly label: ReactNode;
    readonly description?: ReactNode;
    readonly fullWidth?: boolean;
    readonly variant: RadioGroupCardOptionVariant;
} & Omit<CheckableControlProps, "id" | "label" | "name" | "value">;

const optionStyles: Record<RadioGroupCardOptionVariant, string> = {
    "cards": card,
    "small-cards": smallCard,
    "segmented": segmentedOption,
};

export function RadioGroupCardOption({
    id,
    name,
    value,
    label,
    description,
    fullWidth = false,
    disabled,
    variant,
    ...controlProps
}: RadioGroupCardOptionProps): ReactElement {
    const descriptionId = `${id}-description`;

    return (
        <label className={clsx(cardWrapper, fullWidth && "flex-1")}>
            <input
                type="radio"
                {...checkableInputProps(controlProps)}
                id={id}
                name={name}
                value={value}
                disabled={disabled}
                aria-describedby={
                    description === undefined ? undefined : descriptionId
                }
                className={cardInput}
            />
            <span className={optionStyles[variant]}>
                <span>
                    <span className={cardLabel}>{label}</span>
                    {description === undefined ? null : (
                        <span id={descriptionId} className={cardDescription}>
                            {description}
                        </span>
                    )}
                </span>
            </span>
            {variant === "cards" ? (
                <span aria-hidden="true" className={cardIndicator} />
            ) : null}
        </label>
    );
}
