import { Input } from "@libraries/uikit-web";
import { centsToDollarsText, dollarsTextToCents } from "@libraries/utilities";
import { useState } from "react";
import type { ReactElement } from "react";

export type EditableQuotePriceInputProps = {
    readonly id: string;
    readonly label: string;
    readonly value: number;
    readonly disabled: boolean;
    readonly onChange: (cents: number) => void;
    readonly onBlur?: () => void;
};

export function EditableQuotePriceInput({
    id,
    label,
    value,
    disabled,
    onChange,
    onBlur,
}: EditableQuotePriceInputProps): ReactElement {
    const [text, setText] = useState(() => centsToDollarsText(value));

    return (
        <Input
            id={id}
            label={label}
            type="text"
            inputMode="decimal"
            leadingAddon="$"
            value={text}
            disabled={disabled}
            onChange={(event) => {
                setText(event.target.value);
                onChange(dollarsTextToCents(event.target.value));
            }}
            onBlur={() => {
                setText(centsToDollarsText(value));
                onBlur?.();
            }}
        />
    );
}
