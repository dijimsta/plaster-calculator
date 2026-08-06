import clsx from "clsx";
import { useId } from "react";

import {
    base,
    descriptionStyle,
    resizes,
    wrapper,
    type TextareaResize,
} from "./textarea.styles.ts";

import type {
    ChangeEventHandler,
    FocusEventHandler,
    ReactElement,
    ReactNode,
} from "react";

export type { TextareaResize };

export type TextareaProps = {
    readonly resize?: TextareaResize;
    readonly id?: string;
    readonly name?: string;
    readonly value?: string;
    readonly defaultValue?: string;
    readonly placeholder?: string;
    readonly rows?: number;
    readonly disabled?: boolean;
    readonly readOnly?: boolean;
    readonly required?: boolean;
    readonly autoFocus?: boolean;
    readonly label?: string;
    readonly description?: ReactNode;
    readonly onBlur?: FocusEventHandler<HTMLTextAreaElement>;
    readonly onChange?: ChangeEventHandler<HTMLTextAreaElement>;
};

export function Textarea({
    resize = "vertical",
    rows = 4,
    id,
    name,
    value,
    defaultValue,
    placeholder,
    disabled,
    readOnly,
    required,
    autoFocus,
    label,
    description,
    onBlur,
    onChange,
}: TextareaProps): ReactElement {
    const descriptionId = useId();

    return (
        <div className={wrapper}>
            <textarea
                id={id}
                name={name}
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                rows={rows}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                autoFocus={autoFocus}
                aria-describedby={
                    description === undefined ? undefined : descriptionId
                }
                aria-label={textareaLabel(label, placeholder, id !== undefined)}
                onBlur={onBlur}
                onChange={onChange}
                className={clsx(base, resizes[resize])}
            />
            {description === undefined ? null : (
                <p id={descriptionId} className={descriptionStyle}>
                    {description}
                </p>
            )}
        </div>
    );
}

function textareaLabel(
    label: string | undefined,
    placeholder: string | undefined,
    hasExternalId: boolean,
): string | undefined {
    return label ?? (hasExternalId ? undefined : placeholder);
}
