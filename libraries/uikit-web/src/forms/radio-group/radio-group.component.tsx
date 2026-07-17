import clsx from "clsx";
import { createContext, useContext, useId } from "react";

import { RadioGroupCardOption } from "./radio-group-card-option.component.tsx";
import { RadioGroupDefaultOption } from "./radio-group-default-option.component.tsx";
import { RadioGroupPanelOption } from "./radio-group-panel-option.component.tsx";
import {
    groupContentSpacingClassName,
    groupDescription,
    groupFieldset,
    groupVariants,
    legendClassName,
    segmentedDisplayClassName,
    type RadioGroupVariant,
} from "./radio-group.styles.ts";

import type { RadioSize } from "./radio.styles.ts";
import type {
    FieldsetHTMLAttributes,
    InputHTMLAttributes,
    ReactElement,
    ReactNode,
} from "react";

export { Radio } from "./radio.component.tsx";
export type { RadioProps } from "./radio.component.tsx";
export type { RadioGroupVariant, RadioSize };

type RadioGroupContextValue = {
    readonly name: string;
    readonly size: RadioSize;
    readonly variant: RadioGroupVariant;
    readonly fullWidth: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(
    undefined,
);

export type RadioGroupProps = {
    readonly name: string;
    readonly legend: ReactNode;
    readonly description?: ReactNode;
    readonly variant?: RadioGroupVariant;
    readonly size?: RadioSize;
    /** Stretches options to fill the available width. Only affects the segmented variant. */
    readonly fullWidth?: boolean;
    /** Keeps the legend in the accessibility tree but visually hides it. */
    readonly hideLegend?: boolean;
} & Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "name">;

/** A semantic fieldset for a mutually exclusive collection of radio options. */
export function RadioGroup({
    name,
    legend,
    description,
    variant = "default",
    size = "md",
    fullWidth = false,
    hideLegend = false,
    className,
    children,
    ...props
}: RadioGroupProps): ReactElement {
    return (
        <RadioGroupContext.Provider value={{ name, size, variant, fullWidth }}>
            <fieldset className={clsx(groupFieldset, className)} {...props}>
                <legend className={legendClassName(hideLegend)}>
                    {legend}
                </legend>
                {description === undefined ? null : (
                    <p className={groupDescription}>{description}</p>
                )}
                <div
                    className={clsx(
                        groupContentSpacingClassName(
                            hideLegend,
                            description !== undefined,
                        ),
                        groupVariants[variant],
                        segmentedDisplayClassName(variant, fullWidth),
                    )}
                >
                    {children}
                </div>
            </fieldset>
        </RadioGroupContext.Provider>
    );
}

export type RadioGroupOptionProps = {
    readonly value: string;
    readonly label: ReactNode;
    readonly description?: ReactNode;
    readonly className?: string;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "children" | "className" | "id" | "name" | "size" | "type" | "value"
>;

/** A labelled option within a RadioGroup. */
export function RadioGroupOption({
    value,
    label,
    description,
    className,
    disabled,
    ...props
}: RadioGroupOptionProps): ReactElement {
    const context = useContext(RadioGroupContext);
    const generatedId = useId();

    if (context === undefined) {
        throw new Error("RadioGroupOption must be used within a RadioGroup.");
    }

    if (
        context.variant === "cards" ||
        context.variant === "small-cards" ||
        context.variant === "segmented"
    ) {
        return (
            <RadioGroupCardOption
                id={generatedId}
                name={context.name}
                value={value}
                label={label}
                description={description}
                className={clsx(
                    context.variant === "segmented" &&
                        context.fullWidth &&
                        "flex-1",
                    className,
                )}
                disabled={disabled}
                variant={context.variant}
                {...props}
            />
        );
    }

    if (
        context.variant === "list" ||
        context.variant === "list-right" ||
        context.variant === "table"
    ) {
        return (
            <RadioGroupPanelOption
                id={generatedId}
                name={context.name}
                size={context.size}
                value={value}
                label={label}
                description={description}
                className={className}
                disabled={disabled}
                variant={context.variant}
                {...props}
            />
        );
    }

    return (
        <RadioGroupDefaultOption
            id={generatedId}
            name={context.name}
            size={context.size}
            value={value}
            label={label}
            description={description}
            className={className}
            disabled={disabled}
            {...props}
        />
    );
}
