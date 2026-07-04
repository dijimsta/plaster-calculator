import clsx from "clsx";

import {
    fieldContent,
    fieldControlSpacing,
    fieldDescription,
    fieldLabel,
    fieldSpans,
    fieldVariants,
    type FormLayoutFieldSpan,
} from "./form-layout-field.styles.ts";
import { useFormLayoutVariant } from "./form-layout.context.ts";

import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export type { FormLayoutFieldSpan };

export type FormLayoutFieldProps = {
    readonly label: ReactNode;
    readonly description?: ReactNode;
    readonly htmlFor?: string;
    readonly span?: FormLayoutFieldSpan;
} & HTMLAttributes<HTMLDivElement>;

/** A labelled form control with optional supporting text. */
export function FormLayoutField({
    label,
    description,
    htmlFor,
    span = "full",
    className,
    children,
    ...props
}: FormLayoutFieldProps): ReactElement {
    const variant = useFormLayoutVariant();
    const isLabelsLeft = variant === "labels-left";

    return (
        <div
            className={clsx(
                fieldSpans[span],
                fieldVariants[isLabelsLeft ? "labels-left" : "default"],
                className,
            )}
            {...props}
        >
            <label htmlFor={htmlFor} className={fieldLabel}>
                {label}
            </label>
            <div className={clsx(isLabelsLeft && fieldContent)}>
                <div className={isLabelsLeft ? undefined : fieldControlSpacing}>
                    {children}
                </div>
                {description === undefined ? null : (
                    <p className={fieldDescription}>{description}</p>
                )}
            </div>
        </div>
    );
}
