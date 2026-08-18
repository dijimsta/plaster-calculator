import { useTranslation } from "react-i18next";
import type { UseTranslationResponse } from "react-i18next";

import { COMPANIES_NAMESPACE } from "./i18n.ts";

export function useCompaniesTranslation(): UseTranslationResponse<
    typeof COMPANIES_NAMESPACE,
    undefined
> {
    return useTranslation(COMPANIES_NAMESPACE);
}
