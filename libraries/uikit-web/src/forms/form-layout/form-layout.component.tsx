import clsx from "clsx";

import {
    DEFAULT_FORM_LAYOUT_VARIANT,
    FormLayoutContext,
} from "./form-layout.context.ts";
import {
    formLayoutVariants,
    type FormLayoutVariant,
} from "./form-layout.styles.ts";

import type { FormHTMLAttributes, ReactElement } from "react";

export type { FormLayoutVariant };

export type FormLayoutProps = {
    readonly variant?: FormLayoutVariant;
} & FormHTMLAttributes<HTMLFormElement>;

/** A responsive form shell for settings and data-entry screens. */
export function FormLayout({
    variant = DEFAULT_FORM_LAYOUT_VARIANT,
    className,
    children,
    ...props
}: FormLayoutProps): ReactElement {
    return (
        <FormLayoutContext.Provider value={variant}>
            <form
                className={clsx(formLayoutVariants[variant], className)}
                {...props}
            >
                {children}
            </form>
        </FormLayoutContext.Provider>
    );
}
