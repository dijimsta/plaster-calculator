import {
    connectorConfig,
    listQuestionnaireTemplates,
    listQuestionnaireTemplatesRef,
} from "@generated/questionnaires-data-connector-web";
import {
    useCreateQuestionnaireTemplate,
    useCreateQuestionnaireTemplateQuestion,
    useDeleteQuestionnaireTemplate,
    useListQuestionnaireTemplates,
} from "@generated/questionnaires-data-connector-web/react";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useQueryClient } from "@tanstack/react-query";
import { QueryFetchPolicy } from "firebase/data-connect";
import { useCallback } from "react";

import type { QuestionnaireTemplatesPageAction } from "./page.reducer.js";
import type {
    QuestionnaireTemplate,
    QuestionnaireTemplateFormValues,
} from "@libraries/plaster-calculator-ui";
import type { Dispatch } from "react";

type RefreshTemplates = () => Promise<void>;
type DeleteTemplate = (template: QuestionnaireTemplate) => Promise<void>;
type PageDispatch = Dispatch<QuestionnaireTemplatesPageAction>;

const dataConnect = FirebaseService.getDataConnect(connectorConfig);
const questionnaireTemplatesRef = listQuestionnaireTemplatesRef(dataConnect);

export function useQuestionnaireTemplates() {
    const { data } = useListQuestionnaireTemplates(dataConnect);
    return data?.questionnaireTemplates ?? [];
}

export function useRefreshQuestionnaireTemplatesCallback(): RefreshTemplates {
    const queryClient = useQueryClient();

    return useCallback(async () => {
        const refreshedTemplates = await listQuestionnaireTemplates(
            dataConnect,
            { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
        );
        queryClient.setQueryData(
            [
                questionnaireTemplatesRef.name,
                questionnaireTemplatesRef.variables ?? null,
            ],
            refreshedTemplates.data,
        );
    }, [queryClient]);
}

export function useCreateQuestionnaireTemplateCallback(
    refreshTemplates: RefreshTemplates,
    dispatch: PageDispatch,
) {
    const { mutateAsync: createTemplate } =
        useCreateQuestionnaireTemplate(dataConnect);
    const { mutateAsync: createQuestion } =
        useCreateQuestionnaireTemplateQuestion(dataConnect);
    const { notify } = useNotificationsManager();

    return useCallback(
        async (values: QuestionnaireTemplateFormValues): Promise<void> => {
            try {
                const { questionnaireTemplate_insert } = await createTemplate({
                    id: crypto.randomUUID(),
                    name: values.name,
                });

                await Promise.all(
                    values.questions.map((question, position) =>
                        createQuestion({
                            id: crypto.randomUUID(),
                            templateId: questionnaireTemplate_insert.id,
                            label: question.label,
                            description: question.description,
                            position,
                        }),
                    ),
                );

                await refreshTemplates();
                dispatch({ type: "createSucceeded" });
                notify({
                    intent: "success",
                    title: "Template created",
                    description: `"${values.name}" is ready to use.`,
                });
            } catch {
                notify({
                    intent: "error",
                    title: "Couldn't create template",
                    description:
                        "Something went wrong while saving. Please try again.",
                });
            }
        },
        [createQuestion, createTemplate, dispatch, notify, refreshTemplates],
    );
}

export function useDeleteQuestionnaireTemplateCallback(
    refreshTemplates: RefreshTemplates,
    dispatch: PageDispatch,
) {
    const { mutateAsync: deleteTemplate } =
        useDeleteQuestionnaireTemplate(dataConnect);
    const { notify } = useNotificationsManager();

    return useCallback(
        async (template: QuestionnaireTemplate): Promise<void> => {
            dispatch({ type: "deleteStarted" });
            try {
                await deleteTemplate({ id: template.id });
                await refreshTemplates();
                dispatch({ type: "deleteSucceeded" });
                notify({
                    intent: "success",
                    title: "Template deleted",
                    description: `"${template.name}" was permanently deleted.`,
                });
            } catch {
                dispatch({ type: "deleteFailed" });
                notify({
                    intent: "error",
                    title: "Couldn't delete template",
                    description:
                        "The template may already be in use. Please try again.",
                });
            }
        },
        [deleteTemplate, dispatch, notify, refreshTemplates],
    );
}

export function useConfirmDeleteCallback(
    template: QuestionnaireTemplate | null,
    deleteTemplate: DeleteTemplate,
) {
    return useCallback((): void => {
        if (template !== null) {
            void deleteTemplate(template);
        }
    }, [deleteTemplate, template]);
}
