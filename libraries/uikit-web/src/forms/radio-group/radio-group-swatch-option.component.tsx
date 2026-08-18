import type { ReactElement, ReactNode } from "react";

import {
    checkableInputProps,
    type CheckableControlProps,
} from "../form-control.types.ts";

import {
    swatchButton,
    swatchInput,
    swatchWrapper,
} from "./radio-group-swatch-option.styles.ts";

export type RadioGroupSwatchOptionProps = {
    readonly id: string;
    readonly name: string;
    readonly value: string;
    /** The swatch's own visible content -- e.g. a small `Avatar` with no initials. Renders with no card chrome, just a selection ring. */
    readonly label: ReactNode;
    /** Doubles as the control's accessible name when a plain string -- nothing else renders it visibly for this variant. */
    readonly description?: ReactNode;
} & Omit<CheckableControlProps, "id" | "label" | "name" | "value">;

/**
 * A bare colour-swatch option for `RadioGroup`'s "swatch" variant: unlike
 * `RadioGroupCardOption`, it has no card background, border, or visible
 * text -- `label` is the swatch's own colour content, and a ring appears
 * around it on selection. Hides the native input with the same
 * `sr-only`/`peer` technique `RadioGroupCardOption` uses so a screen reader
 * still finds a real radio input, not a decorative `<span>`.
 */
export function RadioGroupSwatchOption({
    id,
    name,
    value,
    label,
    description,
    disabled,
    ...controlProps
}: RadioGroupSwatchOptionProps): ReactElement {
    const accessibleLabel =
        typeof description === "string" ? description : undefined;

    return (
        <label className={swatchWrapper}>
            <input
                type="radio"
                {...checkableInputProps({
                    ...controlProps,
                    label: accessibleLabel,
                })}
                id={id}
                name={name}
                value={value}
                disabled={disabled}
                className={swatchInput}
            />
            <span className={swatchButton}>{label}</span>
        </label>
    );
}
