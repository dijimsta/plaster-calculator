import { createI18nNamespaceTranslations } from "@ui/internationalization";

import { en } from "./locales/en.ts";
import { zh } from "./locales/zh.ts";

export const PROJECTS_NAMESPACE = "plasterCalculatorUiProjects";

export const projectsTranslations = createI18nNamespaceTranslations({
    namespace: PROJECTS_NAMESPACE,
    resourcesByLanguage: { en, zh },
});
