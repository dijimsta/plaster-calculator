import type { ReactElement, ReactNode } from "react";

import {
    sectionBodyClassName,
    type FormLayoutSectionBodySpacing,
    sectionDescription,
    sectionHeader,
    sectionTitle,
    sectionVariants,
} from "./form-layout-section.styles.ts";
import { useFormLayoutVariant } from "./form-layout.context.ts";

export type FormLayoutSectionProps = {
    readonly title: ReactNode;
    readonly description?: ReactNode;
    readonly bodySpacing?: FormLayoutSectionBodySpacing;
    readonly children?: ReactNode;
};

export type { FormLayoutSectionBodySpacing };

/** A titled group of related fields within a FormLayout. */
export function FormLayoutSection({
    title,
    description,
    bodySpacing = "default",
    children,
}: FormLayoutSectionProps): ReactElement {
    const variant = useFormLayoutVariant();

    return (
        <section className={sectionVariants[variant]}>
            <div className={sectionHeader}>
                <h2 className={sectionTitle}>{title}</h2>
                {description === undefined ? null : (
                    <p className={sectionDescription}>{description}</p>
                )}
            </div>
            <div className={sectionBodyClassName(variant, bodySpacing)}>
                {children}
            </div>
        </section>
    );
}
