import { useTranslation } from "react-i18next";

import { EDITOR_NAMESPACE } from "./i18n.ts";

export function useEditorTranslation() {
    return useTranslation(EDITOR_NAMESPACE);
}
