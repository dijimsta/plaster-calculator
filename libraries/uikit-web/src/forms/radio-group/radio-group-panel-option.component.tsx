import clsx from "clsx";

import {
    panelDescription,
    panelDescriptionRight,
    panelLabel,
    panelListContent,
    panelListDescription,
    panelListLabel,
    panelOption,
    panelOptionLayout,
} from "./radio-group-panel-option.styles.ts";
import { Radio } from "./radio.component.tsx";

import type { RadioGroupVariant } from "./radio-group.styles.ts";
import type { RadioSize } from "./radio.styles.ts";
import type { InputHTMLAttributes, ReactElement, ReactNode } from "react";

export type RadioGroupPanelOptionVariant = Extract<
    RadioGroupVariant,
    "list" | "list-right" | "table"
>;

export type RadioGroupPanelOptionProps = {
    readonly id: string;
    readonly name: string;
    readonly size: RadioSize;
    readonly value: string;
    readonly label: ReactNode;
    readonly description?: ReactNode;
    readonly className?: string;
    readonly variant: RadioGroupPanelOptionVariant;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "children" | "className" | "id" | "name" | "size" | "type" | "value"
>;

export function RadioGroupPanelOption({
    id,
    name,
    size,
    value,
    label,
    description,
    className,
    disabled,
    variant,
    ...props
}: RadioGroupPanelOptionProps): ReactElement {
    const descriptionId = `${id}-description`;
    const radio = (
        <Radio
            id={id}
            name={name}
            value={value}
            size={size}
            disabled={disabled}
            aria-describedby={
                description === undefined ? undefined : descriptionId
            }
            {...props}
        />
    );
    const radioOnRight = variant === "list-right" || variant === "table";

    return (
        <label
            htmlFor={id}
            className={clsx(
                panelOption,
                variant === "table"
                    ? panelOptionLayout.table
                    : panelOptionLayout.default,
                className,
            )}
        >
            {radioOnRight ? null : radio}
            {variant === "list" ? (
                <span className={panelListContent}>
                    <span className={panelListLabel}>{label}</span>
                    {description === undefined ? null : (
                        <span
                            id={descriptionId}
                            className={panelListDescription}
                        >
                            {description}
                        </span>
                    )}
                </span>
            ) : (
                <>
                    <span className={panelLabel}>{label}</span>
                    {description === undefined ? null : (
                        <span
                            id={descriptionId}
                            className={clsx(
                                panelDescription,
                                variant === "list-right" &&
                                    panelDescriptionRight,
                            )}
                        >
                            {description}
                        </span>
                    )}
                </>
            )}
            {radioOnRight ? radio : null}
        </label>
    );
}
