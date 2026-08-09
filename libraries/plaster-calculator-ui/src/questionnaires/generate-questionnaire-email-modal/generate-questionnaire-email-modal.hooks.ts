import { useNotificationsManager } from "@libraries/uikit-web";
import { useCallback } from "react";

import { useQuestionnairesTranslation } from "../../i18n/index.ts";

export function useCopyQuestionnaireEmailBodyCallback(
    body: string,
): () => Promise<void> {
    const { notify } = useNotificationsManager();
    const { t } = useQuestionnairesTranslation();

    return useCallback(async () => {
        await navigator.clipboard.writeText(body);
        notify({
            intent: "success",
            title: t("generateQuestionnaireEmailModal.copiedTitle"),
            description: t("generateQuestionnaireEmailModal.copiedDescription"),
        });
    }, [body, notify, t]);
}
