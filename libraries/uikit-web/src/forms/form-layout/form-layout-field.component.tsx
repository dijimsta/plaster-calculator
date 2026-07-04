import clsx from "clsx";

import {
    fieldContent,
    fieldControlPlacements,
    fieldDescription,
    fieldLabel,
    fieldLabelPlacements,
    fieldSpans,
    fieldVariants,
    type FormLayoutFieldSpan,
    type FormLayoutFieldLabelPlacement,
} from "./form-layout-field.styles.ts";
import { useFormLayoutVariant } from "./form-layout.context.ts";

import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export type { FormLayoutFieldLabelPlacement, FormLayoutFieldSpan };

export type FormLayoutFieldProps = {
    readonly label: ReactNode;
    readonly description?: ReactNode;
    readonly htmlFor?: string;
    readonly labelPlacement?: FormLayoutFieldLabelPlacement;
    readonly span?: FormLayoutFieldSpan;
} & HTMLAttributes<HTMLDivElement>;

/** A labelled form control with optional supporting text. */
export function FormLayoutField({
    label,
    description,
    htmlFor,
    labelPlacement = "above",
    span = "full",
    className,
    children,
    ...props
}: FormLayoutFieldProps): ReactElement {
    const variant = useFormLayoutVariant();
    const isLabelsLeft = variant === "labels-left";
    const effectiveLabelPlacement = isLabelsLeft ? "above" : labelPlacement;

    return (
        <div
            className={clsx(
                fieldSpans[span],
                fieldVariants[isLabelsLeft ? "labels-left" : "default"],
                className,
            )}
            {...props}
        >
            <label
                htmlFor={htmlFor}
                className={clsx(
                    fieldLabel,
                    fieldLabelPlacements[effectiveLabelPlacement],
                )}
            >
                {label}
            </label>
            <div className={clsx(isLabelsLeft && fieldContent)}>
                <div
                    className={
                        isLabelsLeft
                            ? undefined
                            : fieldControlPlacements[effectiveLabelPlacement]
                    }
                >
                    {children}
                </div>
                {description === undefined ? null : (
                    <p className={fieldDescription}>{description}</p>
                )}
            </div>
        </div>
    );
}
