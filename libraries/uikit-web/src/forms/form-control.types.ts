import type { ChangeEventHandler } from "react";

/** Deliberately supported props shared by checkbox and radio controls. */
export type CheckableControlProps = {
    readonly checked?: boolean;
    readonly defaultChecked?: boolean;
    readonly disabled?: boolean;
    readonly id?: string;
    readonly name?: string;
    readonly required?: boolean;
    readonly value?: string;
    /** Human-readable name used when no visible label wraps the control. */
    readonly label?: string;
    readonly onChange?: ChangeEventHandler<HTMLInputElement>;
};

/** Filters component props before they reach a native checkable input. */
export function checkableInputProps({
    checked,
    defaultChecked,
    disabled,
    id,
    name,
    required,
    value,
    label,
    onChange,
}: CheckableControlProps) {
    return {
        "aria-label": label,
        checked,
        defaultChecked,
        disabled,
        id,
        name,
        onChange,
        required,
        value,
    };
}
