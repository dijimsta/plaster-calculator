import { Input } from "@libraries/uikit-web";
import { CurrencyUtils } from "@libraries/utilities";
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
    const [text, setText] = useState(() =>
        CurrencyUtils.centsToDollarsText(value),
    );

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
                onChange(CurrencyUtils.dollarsTextToCents(event.target.value));
            }}
            onBlur={() => {
                setText(CurrencyUtils.centsToDollarsText(value));
                onBlur?.();
            }}
        />
    );
}
