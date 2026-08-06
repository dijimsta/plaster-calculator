import {
    DEFAULT_FORM_LAYOUT_VARIANT,
    FormLayoutContext,
} from "./form-layout.context.ts";
import {
    formLayoutVariants,
    type FormLayoutVariant,
} from "./form-layout.styles.ts";

import type { FormEventHandler, ReactElement, ReactNode } from "react";

export type { FormLayoutVariant };

export type FormLayoutProps = {
    readonly variant?: FormLayoutVariant;
    readonly id?: string;
    readonly children?: ReactNode;
    readonly onSubmit?: FormEventHandler<HTMLFormElement>;
};

/** A responsive form shell for settings and data-entry screens. */
export function FormLayout({
    variant = DEFAULT_FORM_LAYOUT_VARIANT,
    id,
    children,
    onSubmit,
}: FormLayoutProps): ReactElement {
    return (
        <FormLayoutContext.Provider value={variant}>
            <form
                id={id}
                className={formLayoutVariants[variant]}
                onSubmit={onSubmit}
            >
                {children}
            </form>
        </FormLayoutContext.Provider>
    );
}
