import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import type { CheckableControlProps } from "../form-control.types.ts";

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
import type { RadioGroupVariant } from "./radio-group.styles.ts";
import { RadioControl } from "./radio.component.tsx";
import type { RadioSize } from "./radio.styles.ts";

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
    readonly variant: RadioGroupPanelOptionVariant;
} & Omit<CheckableControlProps, "id" | "label" | "name" | "value">;

export function RadioGroupPanelOption({
    id,
    name,
    size,
    value,
    label,
    description,
    disabled,
    variant,
    ...controlProps
}: RadioGroupPanelOptionProps): ReactElement {
    const descriptionId = `${id}-description`;
    const radio = (
        <RadioControl
            id={id}
            name={name}
            value={value}
            size={size}
            disabled={disabled}
            describedBy={description === undefined ? undefined : descriptionId}
            {...controlProps}
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
