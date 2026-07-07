import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useQueryClient } from "@tanstack/react-query";
import { QueryFetchPolicy } from "firebase/data-connect";
import { useCallback } from "react";

import type { QuestionnaireTemplate } from "@libraries/plaster-calculator-ui";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

export interface ProjectQuestionnaireQuestion {
    readonly id: string;
    readonly label: string;
    readonly position: number;
    readonly answer?: string | null;
}

function nextPositionAfter(
    questions: readonly ProjectQuestionnaireQuestion[],
): number {
    return questions.reduce(
        (max, question) => Math.max(max, question.position + 1),
        0,
    );
}

export function useQuestionnaireTemplates(): readonly QuestionnaireTemplate[] {
    const { data } =
        DataConnectorReact.useListQuestionnaireTemplates(dataConnect);
    return data?.questionnaireTemplates ?? [];
}

export function useProjectQuestionnaireQuestions(projectId: string): {
    readonly questions: readonly ProjectQuestionnaireQuestion[];
    readonly isLoading: boolean;
} {
    const { data, isLoading } = DataConnectorReact.useGetProjectQuestionnaire(
        dataConnect,
        { projectId },
    );

    return {
        questions: data?.projectQuestionnaire?.questions ?? [],
        isLoading,
    };
}

function useRefreshProjectQuestionnaireCallback(
    projectId: string,
): () => Promise<void> {
    const queryClient = useQueryClient();

    return useCallback(async () => {
        const ref = DataConnector.getProjectQuestionnaireRef(dataConnect, {
            projectId,
        });
        const refreshed = await DataConnector.getProjectQuestionnaire(
            dataConnect,
            { projectId },
            { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
        );
        queryClient.setQueryData(
            [ref.name, ref.variables ?? null],
            refreshed.data,
        );
    }, [projectId, queryClient]);
}

export function useAddProjectQuestionnaireQuestionCallback(
    projectId: string,
    questions: readonly ProjectQuestionnaireQuestion[],
): (label: string) => Promise<void> {
    const { mutateAsync: ensureQuestionnaire } =
        DataConnectorReact.useEnsureProjectQuestionnaire(dataConnect);
    const { mutateAsync: createQuestion } =
        DataConnectorReact.useCreateProjectQuestionnaireQuestion(dataConnect);
    const refresh = useRefreshProjectQuestionnaireCallback(projectId);
    const { notify } = useNotificationsManager();

    return useCallback(
        async (label: string): Promise<void> => {
            try {
                await ensureQuestionnaire({ projectId });
                await createQuestion({
                    id: crypto.randomUUID(),
                    projectId,
                    label,
                    position: nextPositionAfter(questions),
                });
                await refresh();
            } catch {
                notify({
                    intent: "error",
                    title: "Couldn't add question",
                    description:
                        "Something went wrong while saving. Please try again.",
                });
            }
        },
        [
            createQuestion,
            ensureQuestionnaire,
            notify,
            projectId,
            questions,
            refresh,
        ],
    );
}

export function useApplyQuestionnaireTemplateCallback(
    projectId: string,
    questions: readonly ProjectQuestionnaireQuestion[],
): (template: QuestionnaireTemplate) => Promise<void> {
    const { mutateAsync: applyTemplate } =
        DataConnectorReact.useApplyQuestionnaireTemplateToProject(dataConnect);
    const { mutateAsync: createQuestion } =
        DataConnectorReact.useCreateProjectQuestionnaireQuestion(dataConnect);
    const refresh = useRefreshProjectQuestionnaireCallback(projectId);
    const { notify } = useNotificationsManager();

    return useCallback(
        async (template: QuestionnaireTemplate): Promise<void> => {
            try {
                await applyTemplate({
                    projectId,
                    sourceTemplateId: template.id,
                });

                const templateResult =
                    await DataConnector.getQuestionnaireTemplate(
                        dataConnect,
                        { id: template.id },
                        { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
                    );
                const templateQuestions =
                    templateResult.data.questionnaireTemplate?.questions ?? [];
                const startingPosition = nextPositionAfter(questions);

                await Promise.all(
                    templateQuestions.map((question, index) =>
                        createQuestion({
                            id: crypto.randomUUID(),
                            projectId,
                            label: question.label,
                            position: startingPosition + index,
                        }),
                    ),
                );

                await refresh();
                notify({
                    intent: "success",
                    title: "Questions added",
                    description: `"${template.name}"'s questions were copied in.`,
                });
            } catch {
                notify({
                    intent: "error",
                    title: "Couldn't add questions",
                    description:
                        "Something went wrong while copying the template. Please try again.",
                });
            }
        },
        [applyTemplate, createQuestion, notify, projectId, questions, refresh],
    );
}

export function useSaveProjectQuestionnaireQuestionAnswerCallback(
    projectId: string,
): (question: ProjectQuestionnaireQuestion, answer: string) => Promise<void> {
    const { mutateAsync: updateAnswer } =
        DataConnectorReact.useUpdateProjectQuestionnaireQuestionAnswer(
            dataConnect,
        );
    const refresh = useRefreshProjectQuestionnaireCallback(projectId);
    const { notify } = useNotificationsManager();

    return useCallback(
        async (
            question: ProjectQuestionnaireQuestion,
            answer: string,
        ): Promise<void> => {
            try {
                await updateAnswer({
                    id: question.id,
                    projectId,
                    answer: answer.trim() === "" ? null : answer,
                });
                await refresh();
            } catch {
                notify({
                    intent: "error",
                    title: "Couldn't save answer",
                    description:
                        "Something went wrong while saving. Please try again.",
                });
            }
        },
        [notify, projectId, refresh, updateAnswer],
    );
}

export function useRemoveProjectQuestionnaireQuestionCallback(
    projectId: string,
): (question: ProjectQuestionnaireQuestion) => Promise<void> {
    const { mutateAsync: deleteQuestion } =
        DataConnectorReact.useDeleteProjectQuestionnaireQuestion(dataConnect);
    const refresh = useRefreshProjectQuestionnaireCallback(projectId);
    const { notify } = useNotificationsManager();

    return useCallback(
        async (question: ProjectQuestionnaireQuestion): Promise<void> => {
            try {
                await deleteQuestion({ id: question.id, projectId });
                await refresh();
            } catch {
                notify({
                    intent: "error",
                    title: "Couldn't remove question",
                    description:
                        "Something went wrong while removing. Please try again.",
                });
            }
        },
        [deleteQuestion, notify, projectId, refresh],
    );
}
