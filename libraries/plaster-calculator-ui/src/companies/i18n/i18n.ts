import { createI18nNamespaceTranslations } from "@ui/internationalization";

import { en } from "./locales/en.ts";
import { zh } from "./locales/zh.ts";

export const COMPANIES_NAMESPACE = "plasterCalculatorUiCompanies";

export const companiesTranslations = createI18nNamespaceTranslations({
    namespace: COMPANIES_NAMESPACE,
    resourcesByLanguage: { en, zh },
});
