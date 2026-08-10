import { createI18nNamespaceTranslations } from "@ui/internationalization";

import { en } from "./locales/en.ts";
import { zh } from "./locales/zh.ts";

export const QUOTES_NAMESPACE = "plasterCalculatorUiQuotes";

export const quotesTranslations = createI18nNamespaceTranslations({
    namespace: QUOTES_NAMESPACE,
    resourcesByLanguage: { en, zh },
});
