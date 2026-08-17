import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import type { SaveQuestionnaireTemplateFromProjectModalQuestion } from "@libraries/plaster-calculator-ui";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useQueryClient } from "@tanstack/react-query";
import { QueryFetchPolicy } from "firebase/data-connect";
import { useCallback } from "react";

import type { ProjectQuestionnaireQuestion } from "./page.hooks.js";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);
const questionnaireTemplatesRef =
    DataConnector.listQuestionnaireTemplatesRef(dataConnect);

/**
 * Marks each project clarification as inherited from the project's source
 * template (label match) or added on the project (no match, or no source
 * template).
 */
export function useSourceTemplateQuestionOrigins(
    questions: readonly ProjectQuestionnaireQuestion[],
    sourceTemplateId: string | null,
): readonly SaveQuestionnaireTemplateFromProjectModalQuestion[] {
    const { data } = DataConnectorReact.useGetQuestionnaireTemplate(
        dataConnect,
        { id: sourceTemplateId ?? "" },
        { enabled: sourceTemplateId !== null },
    );
    const sourceTemplateLabels = new Set(
        (data?.questionnaireTemplate?.questions ?? []).map(
            (question) => question.label,
        ),
    );

    return questions.map((question) => ({
        label: question.label,
        isFromSourceTemplate: sourceTemplateLabels.has(question.label),
    }));
}

function useRefreshQuestionnaireTemplatesCallback(): () => Promise<void> {
    const queryClient = useQueryClient();

    return useCallback(async () => {
        const refreshedTemplates =
            await DataConnector.listQuestionnaireTemplates(dataConnect, {
                fetchPolicy: QueryFetchPolicy.SERVER_ONLY,
            });
        queryClient.setQueryData(
            [
                questionnaireTemplatesRef.name,
                questionnaireTemplatesRef.variables ?? null,
            ],
            refreshedTemplates.data,
        );
    }, [queryClient]);
}

export function useSaveProjectQuestionnaireAsTemplateCallback(
    questions: readonly ProjectQuestionnaireQuestion[],
): (name: string) => Promise<void> {
    const { mutateAsync: createTemplate } =
        DataConnectorReact.useCreateQuestionnaireTemplate(dataConnect);
    const { mutateAsync: createQuestion } =
        DataConnectorReact.useCreateQuestionnaireTemplateQuestion(dataConnect);
    const refreshTemplates = useRefreshQuestionnaireTemplatesCallback();
    const { notify } = useNotificationsManager();

    return useCallback(
        async (name: string): Promise<void> => {
            try {
                const { questionnaireTemplate_insert } = await createTemplate({
                    id: crypto.randomUUID(),
                    name,
                });

                await Promise.all(
                    questions.map((question, position) =>
                        createQuestion({
                            id: crypto.randomUUID(),
                            templateId: questionnaireTemplate_insert.id,
                            label: question.label,
                            position,
                        }),
                    ),
                );

                await refreshTemplates();
                notify({
                    intent: "success",
                    title: "Clarification template created",
                    description: `"${name}" is ready to use.`,
                });
            } catch {
                notify({
                    intent: "error",
                    title: "Couldn't create clarification template",
                    description:
                        "Something went wrong while saving. Please try again.",
                });
            }
        },
        [createQuestion, createTemplate, notify, questions, refreshTemplates],
    );
}
