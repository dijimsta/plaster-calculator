import { createI18nNamespaceTranslations } from "@ui/internationalization";

import { en } from "./locales/en.ts";
import { zh } from "./locales/zh.ts";

export const SUPPLIERS_NAMESPACE = "plasterCalculatorUiSuppliers";

export const suppliersTranslations = createI18nNamespaceTranslations({
    namespace: SUPPLIERS_NAMESPACE,
    resourcesByLanguage: { en, zh },
});
