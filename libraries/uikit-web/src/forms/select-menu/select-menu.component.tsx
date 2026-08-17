"use client";

import { useId } from "react";
import type { ChangeEventHandler, ReactElement } from "react";

import { chevron, root, selectClassName } from "./select-menu.styles.ts";

export type SelectMenuOption = {
    readonly value: string;
    readonly label: string;
    /** Renders this option as unselectable, e.g. a "Mixed" placeholder. */
    readonly disabled?: boolean;
};

export type SelectMenuProps = {
    readonly options: readonly SelectMenuOption[];
    readonly id?: string;
    readonly label?: string;
    readonly value?: string;
    readonly defaultValue?: string;
    readonly name?: string;
    readonly disabled?: boolean;
    readonly required?: boolean;
    /** Applies error styling, mirroring `Input`'s `invalid` prop. */
    readonly invalid?: boolean;
    readonly onChange?: ChangeEventHandler<HTMLSelectElement>;
};

export function SelectMenu({
    options,
    id: externalId,
    label,
    value,
    defaultValue,
    name,
    disabled,
    required,
    invalid = false,
    onChange,
}: SelectMenuProps): ReactElement {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    return (
        <div className={root}>
            <select
                id={id}
                value={value}
                defaultValue={defaultValue}
                name={name}
                disabled={disabled}
                required={required}
                aria-label={label}
                aria-invalid={invalid ? true : undefined}
                onChange={onChange}
                className={selectClassName(invalid)}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                className={chevron}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                />
            </svg>
        </div>
    );
}
