"use client";

import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import type { AnswerQuestionnaireWithAiResponse } from "@libraries/plaster-calculator-common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FirebaseError } from "firebase/app";
import { QueryFetchPolicy } from "firebase/data-connect";
import { useCallback, useMemo, useState } from "react";

import { FirebaseService } from "../firebase/firebase.service.ts";

import { ClarificationsStepService } from "./clarifications-step.service.ts";
import type {
    ClarificationRow,
    ClarificationsStepDependencies,
    ClarificationsStepError,
    ClarificationsTemplateOption,
} from "./clarifications-step.types.ts";
import { ClarificationsStepUtils } from "./clarifications-step.utils.ts";
import { QuestionnairesService } from "./questionnaires.service.ts";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

export type UseClarificationsStepResult = {
    /** The team's templates for the picker, most recently updated first (`ListQuestionnaireTemplates`'s own ordering). */
    readonly templates: readonly ClarificationsTemplateOption[];
    /** Defaults to `templates[0]?.id ?? null` until `selectTemplate()` is called; `null` is the "start from scratch" option. */
    readonly selectedTemplateId: string | null;
    readonly selectTemplate: (templateId: string | null) => void;
    readonly rows: readonly ClarificationRow[];
    readonly isLoading: boolean;
    /** Clarifications not (yet) answered from the plan, before and after a run — feeds the email card. */
    readonly notAnsweredOnPlanCount: number;
    /** `templateId: null` (start from scratch) applies nothing and resolves immediately. */
    readonly applyTemplate: (templateId: string | null) => Promise<void>;
    readonly isApplyingTemplate: boolean;
    readonly applyTemplateError: ClarificationsStepError | FirebaseError | null;
    readonly addRow: (label: string) => Promise<void>;
    readonly isAddingRow: boolean;
    readonly addRowError: FirebaseError | null;
    readonly editRowLabel: (
        row: ClarificationRow,
        label: string,
    ) => Promise<void>;
    readonly isEditingRowLabel: boolean;
    readonly editRowLabelError: FirebaseError | null;
    readonly removeRow: (row: ClarificationRow) => Promise<void>;
    readonly isRemovingRow: boolean;
    readonly removeRowError: FirebaseError | null;
    /** Runs "Find Answers on Plan" and refreshes `rows` on success only — a failure leaves `rows` exactly as they were. */
    readonly runFindAnswersOnPlan: () => Promise<void>;
    readonly isRunningAi: boolean;
    readonly aiError: Error | null;
    readonly lastAiResult: AnswerQuestionnaireWithAiResponse | null;
};

type ClarificationsTemplatePickerState = {
    readonly templates: readonly ClarificationsTemplateOption[];
    readonly selectedTemplateId: string | null;
    readonly selectTemplate: (templateId: string | null) => void;
};

type ClarificationsRowsState = {
    readonly rows: readonly ClarificationRow[];
    readonly isLoading: boolean;
};

/** The picker's template list, plus a selection that defaults to the most recently updated template until the caller picks explicitly (including "start from scratch", `null`). */
function useClarificationsTemplatePicker(): ClarificationsTemplatePickerState {
    const [manualTemplateId, setManualTemplateId] = useState<
        string | null | undefined
    >(undefined);
    const { data } =
        DataConnectorReact.useListQuestionnaireTemplates(dataConnect);
    const templates: readonly ClarificationsTemplateOption[] = useMemo(
        () =>
            (data?.questionnaireTemplates ?? []).map((template) => ({
                id: template.id,
                name: template.name,
            })),
        [data],
    );
    const selectedTemplateId =
        manualTemplateId === undefined
            ? (templates[0]?.id ?? null)
            : manualTemplateId;
    const selectTemplate = useCallback((templateId: string | null) => {
        setManualTemplateId(templateId);
    }, []);

    return { templates, selectedTemplateId, selectTemplate };
}

/** `GetProjectQuestionnaire`'s rows, mapped onto `ClarificationRow`s with their derived status. */
function useClarificationsRows(projectId: string): ClarificationsRowsState {
    const { data, isLoading } = DataConnectorReact.useGetProjectQuestionnaire(
        dataConnect,
        {
            projectId,
        },
    );
    const rows = useMemo(
        () =>
            ClarificationsStepUtils.toClarificationRows(
                data?.projectQuestionnaire?.questions ?? [],
            ),
        [data],
    );

    return { rows, isLoading };
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

/** Binds every `ClarificationsStepDependencies` effect to its generated Data Connect mutation hook, plus `refresh`. */
function useClarificationsStepDependencies(
    refresh: () => Promise<void>,
): ClarificationsStepDependencies {
    const { mutateAsync: batchApplyTemplate } =
        DataConnectorReact.useBatchApplyQuestionnaireTemplateToProject(
            dataConnect,
        );
    const { mutateAsync: ensureQuestionnaire } =
        DataConnectorReact.useEnsureProjectQuestionnaire(dataConnect);
    const { mutateAsync: createQuestion } =
        DataConnectorReact.useCreateProjectQuestionnaireQuestion(dataConnect);
    const { mutateAsync: updateQuestion } =
        DataConnectorReact.useUpdateProjectQuestionnaireQuestion(dataConnect);
    const { mutateAsync: deleteQuestion } =
        DataConnectorReact.useDeleteProjectQuestionnaireQuestion(dataConnect);

    return useMemo(
        () => ({
            getTemplateQuestions: async (templateId: string) => {
                const result = await DataConnector.getQuestionnaireTemplate(
                    dataConnect,
                    { id: templateId },
                    { fetchPolicy: QueryFetchPolicy.SERVER_ONLY },
                );
                return (result.data.questionnaireTemplate?.questions ?? []).map(
                    (question) => ({ label: question.label }),
                );
            },
            batchApplyTemplate: (variables) => batchApplyTemplate(variables),
            ensureQuestionnaire: (id) => ensureQuestionnaire({ projectId: id }),
            createQuestion: (input) => createQuestion(input),
            updateQuestionLabel: (input) => updateQuestion(input),
            deleteQuestion: (input) => deleteQuestion(input),
            refresh,
        }),
        [
            batchApplyTemplate,
            createQuestion,
            deleteQuestion,
            ensureQuestionnaire,
            refresh,
            updateQuestion,
        ],
    );
}

/** Every mutation the step exposes, each a thin `useMutation` wrapper around one `ClarificationsStepService` method — matching `useGenerateQuote()`'s `isPending`/`error` shape. */
function useClarificationsStepMutations(
    service: ClarificationsStepService,
    projectId: string,
    rows: readonly ClarificationRow[],
) {
    const applyTemplateMutation = useMutation<
        void,
        ClarificationsStepError | FirebaseError,
        string | null
    >({
        mutationFn: async (templateId) => {
            if (templateId) {
                await service.applyTemplate(projectId, templateId, rows);
            }
        },
    });
    const addRowMutation = useMutation<void, FirebaseError, string>({
        mutationFn: (label) => service.addRow(projectId, rows, label),
    });
    const editRowLabelMutation = useMutation<
        void,
        FirebaseError,
        { row: ClarificationRow; label: string }
    >({
        mutationFn: ({ row, label }) =>
            service.editRowLabel(projectId, row, label),
    });
    const removeRowMutation = useMutation<
        void,
        FirebaseError,
        ClarificationRow
    >({
        mutationFn: (row) => service.removeRow(projectId, row),
    });
    const runAiMutation = useMutation<AnswerQuestionnaireWithAiResponse, Error>(
        {
            mutationFn: () => service.runFindAnswersOnPlan(projectId),
        },
    );

    return {
        applyTemplateMutation,
        addRowMutation,
        editRowLabelMutation,
        removeRowMutation,
        runAiMutation,
    };
}

/**
 * State and orchestration behind step 2 of the project-creation wizard
 * (template picker, editable clarification rows, the AI run, and what gets
 * persisted). Mirrors the scope-of-work tab's `page.hooks.ts` — same
 * `GetProjectQuestionnaire` query, same status derivation
 * (`ClarificationsStepUtils.deriveRowStatus()`), same
 * ensure-then-create/update/delete mutations — but lives in web-core so the
 * wizard's modal (a later ticket) stays purely presentational, and persists
 * as the user goes rather than batching writes until a final "save" step:
 * `projectId` is an existing project (created earlier in the wizard, e.g.
 * on upload), never created here.
 *
 * `questionnairesService` follows this package's existing
 * constructor-default-and-overridable convention (see `QuestionnairesService`,
 * `TeamsService`) rather than the scope-of-work tab's
 * `useQuestionnairesService()` context hook, so the wizard's modal doesn't
 * need a `QuestionnairesServiceProvider` in its tree and this hook is
 * directly testable by passing a fake.
 */
export function useClarificationsStep(
    projectId: string,
    questionnairesService: QuestionnairesService = new QuestionnairesService(),
): UseClarificationsStepResult {
    const { templates, selectedTemplateId, selectTemplate } =
        useClarificationsTemplatePicker();
    const { rows, isLoading } = useClarificationsRows(projectId);
    const notAnsweredOnPlanCount =
        ClarificationsStepUtils.countNotAnsweredOnPlan(rows);

    const refresh = useRefreshProjectQuestionnaireCallback(projectId);
    const dependencies = useClarificationsStepDependencies(refresh);
    const service = useMemo(
        () =>
            new ClarificationsStepService(dependencies, questionnairesService),
        [dependencies, questionnairesService],
    );

    const {
        applyTemplateMutation,
        addRowMutation,
        editRowLabelMutation,
        removeRowMutation,
        runAiMutation,
    } = useClarificationsStepMutations(service, projectId, rows);

    return {
        templates,
        selectedTemplateId,
        selectTemplate,
        rows,
        isLoading,
        notAnsweredOnPlanCount,
        applyTemplate: (templateId) =>
            applyTemplateMutation.mutateAsync(templateId),
        isApplyingTemplate: applyTemplateMutation.isPending,
        applyTemplateError: applyTemplateMutation.error ?? null,
        addRow: (label) => addRowMutation.mutateAsync(label),
        isAddingRow: addRowMutation.isPending,
        addRowError: addRowMutation.error ?? null,
        editRowLabel: (row, label) =>
            editRowLabelMutation.mutateAsync({ row, label }),
        isEditingRowLabel: editRowLabelMutation.isPending,
        editRowLabelError: editRowLabelMutation.error ?? null,
        removeRow: (row) => removeRowMutation.mutateAsync(row),
        isRemovingRow: removeRowMutation.isPending,
        removeRowError: removeRowMutation.error ?? null,
        runFindAnswersOnPlan: async () => {
            await runAiMutation.mutateAsync();
        },
        isRunningAi: runAiMutation.isPending,
        aiError: runAiMutation.error ?? null,
        lastAiResult: runAiMutation.data ?? null,
    };
}
