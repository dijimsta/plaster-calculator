import clsx from "clsx";
import { createContext, useContext, useId } from "react";

import { RadioGroupCardOption } from "./radio-group-card-option.component.tsx";
import {
    defaultOption,
    defaultOptionAlignment,
    describedRadio,
    disabledOption,
    groupContentSpacingClassName,
    groupDescription,
    groupFieldset,
    groupVariants,
    legendClassName,
    optionDescription,
    optionLabel,
    optionLabelCursor,
    optionText,
    panelDescription,
    panelDescriptionRight,
    panelLabel,
    panelListContent,
    panelListDescription,
    panelListLabel,
    panelOption,
    panelOptionLayout,
    segmentedDisplayClassName,
    type RadioGroupVariant,
    type RadioSize,
} from "./radio-group.styles.ts";
import { Radio } from "./radio.component.tsx";

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

type OptionRendererProps = RadioGroupOptionProps & {
    readonly id: string;
    readonly name: string;
    readonly size: RadioSize;
    readonly variant: RadioGroupVariant;
};

type DefaultOptionProps = Omit<OptionRendererProps, "variant">;

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
            <PanelOption
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
        <DefaultOption
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

function DefaultOption({
    id,
    name,
    size,
    value,
    label,
    description,
    className,
    disabled,
    ...props
}: DefaultOptionProps): ReactElement {
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

function PanelOption({
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
}: OptionRendererProps): ReactElement {
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
