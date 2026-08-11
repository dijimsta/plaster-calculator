import { createI18nNamespaceTranslations } from "@ui/internationalization";

import { en } from "./locales/en.ts";
import { zh } from "./locales/zh.ts";

export const APP_NAMESPACE = "plasterCalculatorWebApp";

export const appTranslations = createI18nNamespaceTranslations({
    namespace: APP_NAMESPACE,
    resourcesByLanguage: { en, zh },
});
