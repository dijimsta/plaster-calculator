import { useTranslation } from "react-i18next";

import { APP_NAMESPACE } from "./i18n.ts";

export function useAppTranslation() {
    return useTranslation(APP_NAMESPACE);
}
