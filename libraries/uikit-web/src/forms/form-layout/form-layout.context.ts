import { createContext, useContext } from "react";

import type { FormLayoutVariant } from "./form-layout.styles.ts";

export const DEFAULT_FORM_LAYOUT_VARIANT: FormLayoutVariant = "stacked";

export const FormLayoutContext = createContext<FormLayoutVariant>(
    DEFAULT_FORM_LAYOUT_VARIANT,
);

export function useFormLayoutVariant(): FormLayoutVariant {
    return useContext(FormLayoutContext);
}
