import "i18next";

import type { QUESTIONNAIRES_NAMESPACE } from "./i18n.ts";
import type { en } from "./locales/en.ts";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof QUESTIONNAIRES_NAMESPACE;
    }

    // Key must match QUESTIONNAIRES_NAMESPACE in ./i18n.ts — interface
    // property keys can't be derived from an imported const.
    interface ResourceNamespaceMap {
        plasterCalculatorUiQuestionnaires: typeof en;
    }
}
