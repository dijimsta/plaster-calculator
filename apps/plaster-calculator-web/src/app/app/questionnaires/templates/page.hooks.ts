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
                dispatch({ type: "createSucceeded", name: values.name });
            } catch {
                dispatch({ type: "createFailed" });
            }
        },
        [createQuestion, createTemplate, dispatch, refreshTemplates],
    );
}

export function useDeleteQuestionnaireTemplateCallback(
    refreshTemplates: RefreshTemplates,
    dispatch: PageDispatch,
) {
    const { mutateAsync: deleteTemplate } =
        useDeleteQuestionnaireTemplate(dataConnect);

    return useCallback(
        async (template: QuestionnaireTemplate): Promise<void> => {
            dispatch({ type: "deleteStarted" });
            try {
                await deleteTemplate({ id: template.id });
                await refreshTemplates();
                dispatch({ type: "deleteSucceeded", name: template.name });
            } catch {
                dispatch({ type: "deleteFailed" });
            }
        },
        [deleteTemplate, dispatch, refreshTemplates],
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
