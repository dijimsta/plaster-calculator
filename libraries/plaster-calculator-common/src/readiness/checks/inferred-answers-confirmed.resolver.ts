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
 * No question-level identity is set on the result: `ReadinessResult` only
 * carries `pageId`/`areaId`/`quoteItemTemplateId`, none of which identify a
 * questionnaire question, so the fix control targets the questionnaire as a
 * whole via `affectedItemCount`.
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
    };
}
