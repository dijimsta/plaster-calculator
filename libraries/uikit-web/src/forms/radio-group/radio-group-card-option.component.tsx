import clsx from "clsx";

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
import type { InputHTMLAttributes, ReactElement, ReactNode } from "react";

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
    readonly className?: string;
    readonly variant: RadioGroupCardOptionVariant;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "children" | "className" | "id" | "name" | "size" | "type" | "value"
>;

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
    className,
    disabled,
    variant,
    ...props
}: RadioGroupCardOptionProps): ReactElement {
    const descriptionId = `${id}-description`;

    return (
        <label className={clsx(cardWrapper, className)}>
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                disabled={disabled}
                aria-describedby={
                    description === undefined ? undefined : descriptionId
                }
                className={cardInput}
                {...props}
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
