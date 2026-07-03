import clsx from "clsx";

import {
    card,
    cardDescription,
    cardIndicator,
    cardInput,
    cardLabel,
    cardWrapper,
    smallCard,
    type RadioGroupVariant,
} from "./radio-group.styles.ts";

import type { InputHTMLAttributes, ReactElement, ReactNode } from "react";

export type RadioGroupCardOptionProps = {
    readonly id: string;
    readonly name: string;
    readonly value: string;
    readonly label: ReactNode;
    readonly description?: ReactNode;
    readonly className?: string;
    readonly variant: RadioGroupVariant;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "children" | "className" | "id" | "name" | "size" | "type" | "value"
>;

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
            <span className={variant === "cards" ? card : smallCard}>
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
