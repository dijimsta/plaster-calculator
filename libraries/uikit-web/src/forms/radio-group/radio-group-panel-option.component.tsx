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
    stackedCardOption,
} from "./radio-group-panel-option.styles.ts";
import type { RadioGroupVariant } from "./radio-group.styles.ts";
import { RadioControl } from "./radio.component.tsx";
import type { RadioSize } from "./radio.styles.ts";

export type RadioGroupPanelOptionVariant = Extract<
    RadioGroupVariant,
    "list" | "list-right" | "table" | "stacked-cards"
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
        <label htmlFor={id} className={optionWrapperClassName(variant)}>
            {radioOnRight ? null : radio}
            <OptionContent
                variant={variant}
                label={label}
                description={description}
                descriptionId={descriptionId}
            />
            {radioOnRight ? radio : null}
        </label>
    );
}

function optionWrapperClassName(variant: RadioGroupPanelOptionVariant): string {
    switch (variant) {
        case "stacked-cards":
            return clsx(stackedCardOption, panelOptionLayout.default);
        case "table":
            return clsx(panelOption, panelOptionLayout.table);
        default:
            return clsx(panelOption, panelOptionLayout.default);
    }
}

type OptionContentProps = {
    readonly variant: RadioGroupPanelOptionVariant;
    readonly label: ReactNode;
    readonly description?: ReactNode;
    readonly descriptionId: string;
};

/** The label/description pairing, styled per variant -- `panelListContent` for "list"/"stacked-cards", the plain (optionally right-aligned) layout otherwise. */
function OptionContent({
    variant,
    label,
    description,
    descriptionId,
}: OptionContentProps): ReactElement {
    if (variant === "list" || variant === "stacked-cards") {
        return (
            <span className={panelListContent}>
                <span className={panelListLabel}>{label}</span>
                {description === undefined ? null : (
                    <span id={descriptionId} className={panelListDescription}>
                        {description}
                    </span>
                )}
            </span>
        );
    }

    return (
        <>
            <span className={panelLabel}>{label}</span>
            {description === undefined ? null : (
                <span
                    id={descriptionId}
                    className={clsx(
                        panelDescription,
                        variant === "list-right" && panelDescriptionRight,
                    )}
                >
                    {description}
                </span>
            )}
        </>
    );
}
