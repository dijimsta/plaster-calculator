import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import {
    COMPLETED_COMPLETION_STATE,
    IN_PROGRESS_COMPLETION_STATE,
    QuestionnaireCompletionStateHelper,
} from "@libraries/plaster-calculator-common";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";

import type { QuestionnaireCompletionState } from "@libraries/plaster-calculator-common";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

export interface QuestionnaireListItem {
    readonly projectId: string;
    readonly projectName: string;
    readonly updatedAt: string;
    readonly answeredCount: number;
    readonly totalQuestions: number;
    readonly completionState: QuestionnaireCompletionState;
}

export interface QuestionnaireStats {
    readonly total: number;
    readonly inProgressCount: number;
    readonly completedCount: number;
    readonly isLoading: boolean;
    readonly questionnaires: readonly QuestionnaireListItem[];
}

export function useQuestionnaireStats(): QuestionnaireStats {
    const { data, isLoading } =
        DataConnectorReact.useListProjectQuestionnaires(dataConnect);

    const questionnaires: QuestionnaireListItem[] = (
        data?.projectQuestionnaires ?? []
    ).map((questionnaire) => ({
        projectId: questionnaire.projectId,
        projectName: questionnaire.project.name,
        updatedAt: questionnaire.updatedAt,
        answeredCount: QuestionnaireCompletionStateHelper.countAnswered(
            questionnaire.questions,
        ),
        totalQuestions: questionnaire.questions.length,
        completionState: QuestionnaireCompletionStateHelper.deriveFrom(
            questionnaire.questions,
        ),
    }));

    return {
        total: questionnaires.length,
        inProgressCount: questionnaires.filter(
            (questionnaire) =>
                questionnaire.completionState === IN_PROGRESS_COMPLETION_STATE,
        ).length,
        completedCount: questionnaires.filter(
            (questionnaire) =>
                questionnaire.completionState === COMPLETED_COMPLETION_STATE,
        ).length,
        isLoading,
        questionnaires,
    };
}
