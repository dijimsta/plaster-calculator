import { AI_SUGGESTED_ANSWER_SOURCE } from "../../questionnaires/schemas/answer-source.schema.ts";
import type {
    ReadinessCheckInput,
    ReadinessResult,
} from "../readiness-check.types.ts";

/**
 * Check #6: an AI-inferred answer that hasn't been confirmed yet must block
 * quoting. `AnswerSource` has three states — `MANUAL`, `AI_SUGGESTED`, and
 * `AI_CONFIRMED` — so "inferred and not yet confirmed" is exactly
 * `answerSource === AI_SUGGESTED`; `AI_CONFIRMED` answers have already been
 * through this same confirmation step and are met, same as `MANUAL` ones.
 * Each unconfirmed answer becomes one `ReadinessAffectedItem`, identified by
 * `questionId` and named by `questionLabel` (there's no page/room for a
 * questionnaire question to be named by).
 */
export const INFERRED_ANSWERS_CONFIRMED_CHECK_ID = "INFERRED_ANSWERS_CONFIRMED";

export function resolveInferredAnswersConfirmed(
    input: ReadinessCheckInput,
): ReadinessResult {
    const unconfirmed = (input.questionnaireAnswers ?? []).filter(
        (question) =>
            question.answerSource === AI_SUGGESTED_ANSWER_SOURCE &&
            question.answer != null,
    );
    return {
        checkId: INFERRED_ANSWERS_CONFIRMED_CHECK_ID,
        isMet: unconfirmed.length === 0,
        affectedItemCount: unconfirmed.length,
        affectedItems: unconfirmed.map((question) => ({
            questionId: question.questionId,
            questionLabel: question.label,
        })),
    };
}
