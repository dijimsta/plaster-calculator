import { useTranslation } from "react-i18next";

import { PROJECTS_NAMESPACE } from "./i18n.ts";

export function useProjectsTranslation() {
    return useTranslation(PROJECTS_NAMESPACE);
}
