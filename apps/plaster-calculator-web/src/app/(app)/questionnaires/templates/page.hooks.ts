import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useQueryClient } from "@tanstack/react-query";
import { QueryFetchPolicy } from "firebase/data-connect";
import { useCallback } from "react";

import type { QuestionnaireTemplatesPageAction } from "./page.reducer.js";
import type {
    QuestionnaireTemplate,
    QuestionnaireTemplateDetails,
    QuestionnaireTemplateFormValues,
} from "@libraries/plaster-calculator-ui";
import type { Dispatch } from "react";

type RefreshTemplates = () => Promise<void>;
type DeleteTemplate = (template: QuestionnaireTemplate) => Promise<void>;
type UpdateTemplate = (
    template: QuestionnaireTemplateDetails,
    values: QuestionnaireTemplateFormValues,
) => Promise<void>;
type PageDispatch = Dispatch<QuestionnaireTemplatesPageAction>;

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);
const questionnaireTemplatesRef =
    DataConnector.listQuestionnaireTemplatesRef(dataConnect);

export function useQuestionnaireTemplates() {
    const { data } =
        DataConnectorReact.useListQuestionnaireTemplates(dataConnect);
    return data?.questionnaireTemplates ?? [];
}

export function useRefreshQuestionnaireTemplatesCallback(): RefreshTemplates {
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

export function useCreateQuestionnaireTemplateCallback(
    refreshTemplates: RefreshTemplates,
    dispatch: PageDispatch,
) {
    const { mutateAsync: createTemplate } =
        DataConnectorReact.useCreateQuestionnaireTemplate(dataConnect);
    const { mutateAsync: createQuestion } =
        DataConnectorReact.useCreateQuestionnaireTemplateQuestion(dataConnect);
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
        DataConnectorReact.useDeleteQuestionnaireTemplate(dataConnect);
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

export function useQuestionnaireTemplateDetails(templateId: string | null): {
    readonly template: QuestionnaireTemplateDetails | null;
    readonly isLoading: boolean;
} {
    const { data, isLoading } = DataConnectorReact.useGetQuestionnaireTemplate(
        dataConnect,
        { id: templateId ?? "" },
        { enabled: templateId !== null },
    );

    return {
        template: data?.questionnaireTemplate ?? null,
        isLoading,
    };
}

export function useUpdateQuestionnaireTemplateCallback(
    refreshTemplates: RefreshTemplates,
    dispatch: PageDispatch,
): UpdateTemplate {
    const { mutateAsync: updateName } =
        DataConnectorReact.useUpdateQuestionnaireTemplateName(dataConnect);
    const { mutateAsync: updateQuestion } =
        DataConnectorReact.useUpdateQuestionnaireTemplateQuestion(dataConnect);
    const { mutateAsync: createQuestion } =
        DataConnectorReact.useCreateQuestionnaireTemplateQuestion(dataConnect);
    const { mutateAsync: deleteQuestion } =
        DataConnectorReact.useDeleteQuestionnaireTemplateQuestion(dataConnect);
    const { notify } = useNotificationsManager();
    const queryClient = useQueryClient();

    return useCallback(
        async (
            template: QuestionnaireTemplateDetails,
            values: QuestionnaireTemplateFormValues,
        ): Promise<void> => {
            try {
                await updateName({ id: template.id, name: values.name });

                const remainingQuestionIds = new Set(
                    values.questions.flatMap((question) =>
                        question.id === undefined ? [] : [question.id],
                    ),
                );
                await Promise.all(
                    template.questions
                        .filter(
                            (question) =>
                                !remainingQuestionIds.has(question.id),
                        )
                        .map((question) =>
                            deleteQuestion({
                                id: question.id,
                                templateId: template.id,
                            }),
                        ),
                );

                await Promise.all(
                    values.questions.map((question, position) =>
                        question.id === undefined
                            ? createQuestion({
                                  id: crypto.randomUUID(),
                                  templateId: template.id,
                                  label: question.label,
                                  position,
                              })
                            : updateQuestion({
                                  id: question.id,
                                  templateId: template.id,
                                  label: question.label,
                                  position,
                              }),
                    ),
                );

                const templateRef = DataConnector.getQuestionnaireTemplateRef(
                    dataConnect,
                    {
                        id: template.id,
                    },
                );
                const refreshedTemplate =
                    await DataConnector.getQuestionnaireTemplate(
                        dataConnect,
                        { id: template.id },
                        { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
                    );
                queryClient.setQueryData(
                    [templateRef.name, templateRef.variables ?? null],
                    refreshedTemplate.data,
                );

                await refreshTemplates();
                dispatch({ type: "editSucceeded" });
                notify({
                    intent: "success",
                    title: "Template updated",
                    description: `"${values.name}" has been saved.`,
                });
            } catch {
                notify({
                    intent: "error",
                    title: "Couldn't update template",
                    description:
                        "Something went wrong while saving. Please try again.",
                });
            }
        },
        [
            createQuestion,
            deleteQuestion,
            dispatch,
            notify,
            queryClient,
            refreshTemplates,
            updateName,
            updateQuestion,
        ],
    );
}
