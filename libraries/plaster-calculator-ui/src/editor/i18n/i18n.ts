import { createI18nNamespaceTranslations } from "@ui/internationalization";

import { en } from "./locales/en.ts";
import { zh } from "./locales/zh.ts";

export const EDITOR_NAMESPACE = "plasterCalculatorUiEditor";

export const editorTranslations = createI18nNamespaceTranslations({
    namespace: EDITOR_NAMESPACE,
    resourcesByLanguage: { en, zh },
});
