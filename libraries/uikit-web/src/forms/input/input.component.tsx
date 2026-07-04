"use client";

import clsx from "clsx";
import { useId } from "react";

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
import { useInputGroup } from "../input-group/input-group.context.ts";

import type { InputHTMLAttributes, ReactElement, ReactNode } from "react";

export type { InputShape, InputVariant };

export type InputProps = {
    readonly leadingAddon?: ReactNode;
    readonly leadingIcon?: ReactNode;
    readonly trailingAddon?: ReactNode;
    readonly shape?: InputShape;
    readonly variant?: InputVariant;
    readonly id?: string;
    readonly className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className">;

export function Input({
    leadingAddon,
    leadingIcon,
    trailingAddon,
    shape = "default",
    variant = "default",
    "id": externalId,
    className,
    "aria-invalid": ariaInvalid,
    disabled,
    ...props
}: InputProps): ReactElement {
    const generatedId = useId();
    const id = externalId ?? generatedId;
    const inputGroup = useInputGroup();
    const isInvalid = ariaInvalid === true || ariaInvalid === "true";
    const appearance = inputAppearance({
        groupOrientation: inputGroup?.orientation,
        invalid: isInvalid,
        shape,
        variant,
    });

    return (
        <div
            className={inputRootClassName({
                className,
                disabled: disabled === true,
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
                    aria-invalid={ariaInvalid}
                    disabled={disabled}
                    className={clsx(
                        inputControl,
                        inputControlPadding(
                            leadingIcon !== undefined,
                            appearance.pill,
                        ),
                    )}
                    {...props}
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
