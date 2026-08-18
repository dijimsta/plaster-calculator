"use client";

import clsx from "clsx";
import { useId } from "react";
import type { ChangeEventHandler, ReactElement, ReactNode } from "react";

import {
    buttonClassName,
    type ButtonSize,
    type ButtonVariant,
} from "../../elements/button/button.styles.ts";

import { disabledLabel, hiddenFileInput } from "./file-picker-button.styles.ts";

export type FilePickerButtonProps = {
    readonly id?: string;
    readonly variant?: ButtonVariant;
    readonly size?: ButtonSize;
    readonly disabled?: boolean;
    /** Restricts the OS file picker to these MIME types/extensions, e.g. `"image/png,image/svg+xml"`. */
    readonly accept?: string;
    readonly children?: ReactNode;
    readonly onChange?: ChangeEventHandler<HTMLInputElement>;
};

/**
 * A button that opens the OS file picker. A native `<input type="file">`
 * is hidden with the same `sr-only` technique `RadioGroupCardOption` uses
 * to style a native input as something else
 * (`radio-group-card-option.styles.ts`), wrapped in a `<label>` styled
 * exactly like `Button` (reusing its own `buttonClassName` builder) --
 * clicking the visible label opens the file dialog natively, with no JS
 * click-proxying. A native `<input type="file">` can't be restyled
 * directly (browsers ignore most of its box styling), which is why `Input`
 * with `type="file"` renders the browser's own file-input chrome instead of
 * a button; this component exists for call sites that need a real button.
 */
export function FilePickerButton({
    id: externalId,
    variant = "secondary",
    size = "medium",
    disabled = false,
    accept,
    children,
    onChange,
}: FilePickerButtonProps): ReactElement {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    return (
        <label
            htmlFor={id}
            className={clsx(
                buttonClassName({
                    align: "center",
                    flush: false,
                    fullWidth: false,
                    grow: false,
                    size,
                    variant,
                }),
                disabled && disabledLabel,
            )}
        >
            <input
                id={id}
                type="file"
                accept={accept}
                disabled={disabled}
                className={hiddenFileInput}
                onChange={onChange}
            />
            {children}
        </label>
    );
}
