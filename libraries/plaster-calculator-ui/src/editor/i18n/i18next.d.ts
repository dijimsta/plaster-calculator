import "i18next";

import type { en } from "./locales/en.ts";

declare module "i18next" {
    // Key must match EDITOR_NAMESPACE in ./i18n.ts — interface property
    // keys can't be derived from an imported const.
    interface ResourceNamespaceMap {
        plasterCalculatorUiEditor: typeof en;
    }
}
