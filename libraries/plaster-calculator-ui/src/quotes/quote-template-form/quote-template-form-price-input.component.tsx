import { Input } from "@libraries/uikit-web";
import { centsToDollarsText, dollarsTextToCents } from "@libraries/utilities";
import { useState } from "react";
import type { ReactElement } from "react";

export type QuoteTemplateFormPriceInputProps = {
    readonly id: string;
    readonly label: string;
    readonly value: number;
    readonly onChange: (cents: number) => void;
    readonly onBlur?: () => void;
};

// Local text state avoids "12." being clobbered by re-deriving the display
// string from parsed cents on every keystroke; re-normalized only on blur.
export function QuoteTemplateFormPriceInput({
    id,
    label,
    value,
    onChange,
    onBlur,
}: QuoteTemplateFormPriceInputProps): ReactElement {
    const [text, setText] = useState(() => centsToDollarsText(value));

    return (
        <Input
            id={id}
            label={label}
            type="text"
            inputMode="decimal"
            leadingAddon="$"
            value={text}
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
