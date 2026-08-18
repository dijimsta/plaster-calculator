import {
    COMPLETED_COMPLETION_STATE,
    IN_PROGRESS_COMPLETION_STATE,
    NOT_STARTED_COMPLETION_STATE,
    type QuestionnaireCompletionState,
} from "./schemas/completion-state.schema.ts";

export type QuestionnaireAnswerState = {
    readonly answer?: string | null;
};

export function countAnswered(
    questions: readonly QuestionnaireAnswerState[],
): number {
    return questions.filter(
        (question) => question.answer != null && question.answer !== "",
    ).length;
}

export function deriveFrom(
    questions: readonly QuestionnaireAnswerState[],
): QuestionnaireCompletionState {
    const answeredCount = countAnswered(questions);

    if (answeredCount === 0) return NOT_STARTED_COMPLETION_STATE;
    if (answeredCount === questions.length) return COMPLETED_COMPLETION_STATE;
    return IN_PROGRESS_COMPLETION_STATE;
}
