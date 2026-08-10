import { useTranslation } from "react-i18next";

import { QUOTES_NAMESPACE } from "./i18n.ts";

export function useQuotesTranslation() {
    return useTranslation(QUOTES_NAMESPACE);
}
