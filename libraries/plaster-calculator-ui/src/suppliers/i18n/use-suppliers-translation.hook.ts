import { useTranslation } from "react-i18next";
import type { UseTranslationResponse } from "react-i18next";

import { SUPPLIERS_NAMESPACE } from "./i18n.ts";

export function useSuppliersTranslation(): UseTranslationResponse<
    typeof SUPPLIERS_NAMESPACE,
    undefined
> {
    return useTranslation(SUPPLIERS_NAMESPACE);
}
