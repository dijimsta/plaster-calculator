"use client";

import clsx from "clsx";
import { useId } from "react";
import type {
    ChangeEventHandler,
    FocusEventHandler,
    HTMLInputTypeAttribute,
    KeyboardEventHandler,
    ReactElement,
    ReactNode,
} from "react";

import { useInputGroup } from "../input-group/input-group.context.ts";

import {
    addon,
    addonBorders,
    iconContainer,
    inputAppearance,
    inputContainer,
    inputControl,
    inputControlPadding,
    inputRootClassName,
    pillIconContainer,
    type InputShape,
    type InputVariant,
} from "./input.styles.ts";

export type { InputShape, InputVariant };

export type InputProps = {
    readonly leadingAddon?: ReactNode;
    readonly leadingIcon?: ReactNode;
    readonly trailingAddon?: ReactNode;
    readonly shape?: InputShape;
    readonly variant?: InputVariant;
    readonly id?: string;
    readonly label?: string;
    readonly invalid?: boolean;
    readonly type?: HTMLInputTypeAttribute;
    readonly value?: string | number;
    readonly defaultValue?: string | number;
    readonly name?: string;
    readonly placeholder?: string;
    readonly autoComplete?: string;
    readonly autoFocus?: boolean;
    readonly disabled?: boolean;
    readonly readOnly?: boolean;
    readonly required?: boolean;
    readonly inputMode?:
        | "none"
        | "text"
        | "tel"
        | "url"
        | "email"
        | "numeric"
        | "decimal"
        | "search";
    readonly min?: string | number;
    readonly max?: string | number;
    readonly step?: string | number;
    readonly onBlur?: FocusEventHandler<HTMLInputElement>;
    readonly onChange?: ChangeEventHandler<HTMLInputElement>;
    readonly onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export function Input({
    leadingAddon,
    leadingIcon,
    trailingAddon,
    shape = "default",
    variant = "default",
    id: externalId,
    label,
    invalid = false,
    type,
    value,
    defaultValue,
    name,
    placeholder,
    autoComplete,
    autoFocus,
    disabled,
    readOnly,
    required,
    inputMode,
    min,
    max,
    step,
    onBlur,
    onChange,
    onKeyDown,
}: InputProps): ReactElement {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const inputGroup = useInputGroup();
    const appearance = inputAppearance({
        groupOrientation: inputGroup?.orientation,
        invalid,
        shape,
        variant,
    });

    return (
        <div
            className={inputRootClassName({
                disabled: Boolean(disabled),
                groupStyle: appearance.groupStyle,
                invalidStyle: appearance.invalidStyle,
                shapeStyle: appearance.shapeStyle,
                variantStyle: appearance.variantStyle,
            })}
        >
            {leadingAddon !== undefined && (
                <span className={clsx(addon, addonBorders.leading)}>
                    {leadingAddon}
                </span>
            )}
            <span className={inputContainer}>
                {leadingIcon !== undefined && (
                    <span
                        className={clsx(
                            iconContainer,
                            appearance.pill && pillIconContainer,
                        )}
                    >
                        {leadingIcon}
                    </span>
                )}
                <input
                    id={id}
                    type={type}
                    value={value}
                    defaultValue={defaultValue}
                    name={name}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    aria-invalid={invalidState(invalid)}
                    aria-label={inputLabel(
                        label,
                        placeholder,
                        externalId !== undefined,
                    )}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                    inputMode={inputMode}
                    min={min}
                    max={max}
                    step={step}
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    className={clsx(
                        inputControl,
                        inputControlPadding(
                            leadingIcon !== undefined,
                            appearance.pill,
                        ),
                    )}
                />
            </span>
            {trailingAddon !== undefined && (
                <span className={clsx(addon, addonBorders.trailing)}>
                    {trailingAddon}
                </span>
            )}
        </div>
    );
}

function invalidState(invalid: boolean): true | undefined {
    return invalid ? true : undefined;
}

function inputLabel(
    label: string | undefined,
    placeholder: string | undefined,
    hasExternalId: boolean,
): string | undefined {
    return label ?? (hasExternalId ? undefined : placeholder);
}
