import * as DataConnector from "@generated/data-connector-web";
import * as DataConnectorReact from "@generated/data-connector-web/react";
import {
    COMPLETED_COMPLETION_STATE,
    countAnswered,
    deriveFrom,
    IN_PROGRESS_COMPLETION_STATE,
} from "@libraries/plaster-calculator-common";
import type { QuestionnaireCompletionState } from "@libraries/plaster-calculator-common";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import { useState } from "react";

const dataConnect = FirebaseService.getDataConnect(
    DataConnector.connectorConfig,
);

/** Project questionnaires shown per page. */
const PAGE_SIZE = 20;

export type QuestionnaireListItem = {
    readonly projectId: string;
    readonly projectName: string;
    readonly updatedAt: string;
    readonly answeredCount: number;
    readonly totalQuestions: number;
    readonly completionState: QuestionnaireCompletionState;
};

export type QuestionnaireStats = {
    readonly total: number;
    readonly inProgressCount: number;
    readonly completedCount: number;
    readonly isLoading: boolean;
    readonly questionnaires: readonly QuestionnaireListItem[];
    readonly page: number;
    readonly pageCount: number;
    readonly setPage: (page: number) => void;
};

/**
 * There's no total-count query backing the questionnaires list, so
 * pagination uses the fetch-one-extra-row technique: request
 * `PAGE_SIZE + 1` rows and, if the extra row comes back, report another
 * page exists without a separate count query. The extra row is sliced off
 * before per-row progress is derived, so stats and progress always reflect
 * only the current page's rows.
 */
export function useQuestionnaireStats(): QuestionnaireStats {
    const [page, setPage] = useState(1);
    const { data, isLoading } = DataConnectorReact.useListProjectQuestionnaires(
        dataConnect,
        { limit: PAGE_SIZE + 1, offset: (page - 1) * PAGE_SIZE },
    );

    const allProjectQuestionnaires = data?.projectQuestionnaires ?? [];
    const hasNextPage = allProjectQuestionnaires.length > PAGE_SIZE;
    const projectQuestionnaires = hasNextPage
        ? allProjectQuestionnaires.slice(0, PAGE_SIZE)
        : allProjectQuestionnaires;

    const questionnaires: QuestionnaireListItem[] = projectQuestionnaires.map(
        (questionnaire) => ({
            projectId: questionnaire.projectId,
            projectName: questionnaire.project.name,
            updatedAt: questionnaire.updatedAt,
            answeredCount: countAnswered(questionnaire.questions),
            totalQuestions: questionnaire.questions.length,
            completionState: deriveFrom(questionnaire.questions),
        }),
    );

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
        page,
        pageCount: hasNextPage ? page + 1 : page,
        setPage,
    };
}
