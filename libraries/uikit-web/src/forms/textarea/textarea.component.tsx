import clsx from "clsx";

import { base, resizes, type TextareaResize } from "./textarea.styles.ts";

import type { ReactElement, TextareaHTMLAttributes } from "react";

export type { TextareaResize };

export interface TextareaProps extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "className"
> {
    readonly resize?: TextareaResize;
}

export function Textarea({
    resize = "vertical",
    rows = 4,
    ...props
}: TextareaProps): ReactElement {
    return (
        <textarea
            rows={rows}
            className={clsx(base, resizes[resize])}
            {...props}
        />
    );
}
