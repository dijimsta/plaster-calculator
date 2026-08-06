import {
    sectionBodyVariants,
    sectionDescription,
    sectionHeader,
    sectionTitle,
    sectionVariants,
} from "./form-layout-section.styles.ts";
import { useFormLayoutVariant } from "./form-layout.context.ts";

import type { ReactElement, ReactNode } from "react";

export type FormLayoutSectionProps = {
    readonly title: ReactNode;
    readonly description?: ReactNode;
    readonly children?: ReactNode;
};

/** A titled group of related fields within a FormLayout. */
export function FormLayoutSection({
    title,
    description,
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
            <div className={sectionBodyVariants[variant]}>{children}</div>
        </section>
    );
}
