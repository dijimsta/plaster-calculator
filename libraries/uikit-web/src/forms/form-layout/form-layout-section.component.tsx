import clsx from "clsx";

import {
    sectionBodyVariants,
    sectionDescription,
    sectionHeader,
    sectionTitle,
    sectionVariants,
} from "./form-layout-section.styles.ts";
import { useFormLayoutVariant } from "./form-layout.context.ts";

import type { HTMLAttributes, ReactElement, ReactNode } from "react";

export type FormLayoutSectionProps = {
    readonly title: ReactNode;
    readonly description?: ReactNode;
} & HTMLAttributes<HTMLElement>;

/** A titled group of related fields within a FormLayout. */
export function FormLayoutSection({
    title,
    description,
    className,
    children,
    ...props
}: FormLayoutSectionProps): ReactElement {
    const variant = useFormLayoutVariant();

    return (
        <section
            className={clsx(sectionVariants[variant], className)}
            {...props}
        >
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
