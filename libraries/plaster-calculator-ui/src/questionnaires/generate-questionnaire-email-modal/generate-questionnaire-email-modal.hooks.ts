import { useNotificationsManager } from "@libraries/uikit-web";
import { useCallback } from "react";

export function useCopyQuestionnaireEmailBodyCallback(
    body: string,
): () => Promise<void> {
    const { notify } = useNotificationsManager();

    return useCallback(async () => {
        await navigator.clipboard.writeText(body);
        notify({
            intent: "success",
            title: "Copied to clipboard",
            description: "The email body has been copied.",
        });
    }, [body, notify]);
}
