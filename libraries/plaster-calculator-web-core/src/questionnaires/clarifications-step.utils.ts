import type { BatchApplyQuestionnaireTemplateToProjectVariables } from "@generated/data-connector-web";
import {
    AI_CONFIRMED_ANSWER_SOURCE,
    AI_SUGGESTED_ANSWER_SOURCE,
    AnswerSourceSchema,
} from "@libraries/plaster-calculator-common";

import type {
    BuildBatchApplyTemplateVariablesResult,
    ClarificationRow,
    ClarificationRowStatus,
    ClarificationsTemplateQuestion,
    RawClarificationQuestion,
} from "./clarifications-step.types.ts";

/** `BatchApplyQuestionnaireTemplateToProject`'s fixed slot count (`data/connector-web/questionnaires.mutations.gql`). */
const MAX_TEMPLATE_QUESTIONS = 20;

/**
 * Pure helpers behind the clarifications step: status derivation, the
 * not-answered-on-plan count, next-position bookkeeping, and building
 * `BatchApplyQuestionnaireTemplateToProject` variables. Kept free of I/O
 * (matching `GenerateQuoteUtils`'s "thin hook, pure utils" split) so every
 * branch is testable without a `DataConnect` instance.
 */
export class ClarificationsStepUtils {
    /**
     * `ASK_BUILDER` whenever there's no answer yet, regardless of
     * `answerSource` — an AI run that found nothing leaves a question
     * exactly as untouched as one that was never checked, since
     * `answerQuestionnaireWithAI` only ever calls `updateAnswer` for
     * questions it actually answered (see `applyAnswers()` in
     * `questionnaire-answer-domain.ts`). Otherwise `ON_PLAN` when the
     * answer came from the AI scanning the plan, `UNCHECKED` when it was
     * typed by hand.
     */
    public static deriveRowStatus(
        answer: string | null | undefined,
        answerSource: string,
    ): ClarificationRowStatus {
        if (!answer?.trim()) {
            return "ASK_BUILDER";
        }
        return answerSource === AI_SUGGESTED_ANSWER_SOURCE ||
            answerSource === AI_CONFIRMED_ANSWER_SOURCE
            ? "ON_PLAN"
            : "UNCHECKED";
    }

    /**
     * Maps `GetProjectQuestionnaire`'s raw question rows onto
     * `ClarificationRow`s, parsing `answerSource` the same way
     * `useProjectQuestionnaireQuestions()` (the scope-of-work tab's
     * `page.hooks.ts`) does, and attaching each row's derived status.
     */
    public static toClarificationRows(
        questions: readonly RawClarificationQuestion[],
    ): readonly ClarificationRow[] {
        return questions.map((question) => {
            const answer = question.answer ?? null;
            const answerSource = AnswerSourceSchema.parse(
                question.answerSource,
            );
            return {
                id: question.id,
                label: question.label,
                position: question.position,
                answer,
                answerSource,
                status: ClarificationsStepUtils.deriveRowStatus(
                    answer,
                    answerSource,
                ),
            };
        });
    }

    /** Clarifications not (yet) answered from the plan — i.e. every row whose status isn't `ON_PLAN` — for the email card, before and after a run. */
    public static countNotAnsweredOnPlan(
        rows: readonly ClarificationRow[],
    ): number {
        return rows.filter((row) => row.status !== "ON_PLAN").length;
    }

    /** The position a newly added/copied row should take, appended after every existing row. */
    public static nextPositionAfter(rows: readonly ClarificationRow[]): number {
        return rows.reduce((max, row) => Math.max(max, row.position + 1), 0);
    }

    /**
     * Maps up to `MAX_TEMPLATE_QUESTIONS` template questions onto
     * `BatchApplyQuestionnaireTemplateToProject`'s fixed `includeQuestionN`/
     * `questionN*` slots, starting at `startingPosition`. Refuses — rather
     * than truncating — when there are more questions than slots, matching
     * `GenerateQuoteUtils.buildMutationVariables()`'s "fail loudly rather
     * than silently drop rows" precedent for the same fixed-slot mutation
     * shape.
     */
    public static buildBatchApplyTemplateVariables(
        projectId: string,
        sourceTemplateId: string,
        questions: readonly ClarificationsTemplateQuestion[],
        startingPosition: number,
    ): BuildBatchApplyTemplateVariablesResult {
        if (questions.length > MAX_TEMPLATE_QUESTIONS) {
            return {
                ok: false,
                reason: "TOO_MANY_QUESTIONS",
                message: `Template has ${String(questions.length)} questions, but BatchApplyQuestionnaireTemplateToProject only supports ${String(MAX_TEMPLATE_QUESTIONS)}.`,
            };
        }

        const variables: Record<string, unknown> = {
            projectId,
            sourceTemplateId,
        };
        questions.forEach((question, index) => {
            const slot = index + 1;
            variables[`includeQuestion${String(slot)}`] = true;
            variables[`question${String(slot)}Label`] = question.label;
            variables[`question${String(slot)}Position`] =
                startingPosition + index;
        });

        return {
            ok: true,
            // `BatchApplyQuestionnaireTemplateToProjectVariables` has no
            // index signature — its slots are static, unrelated properties
            // (see that mutation's own doc comment for why: a GraphQL
            // document can't accept a variable-length list of table-row
            // inputs). Building the object by dynamic key is the only way
            // to fill a variable number of slots without 20 hand-written
            // branches, matching `GenerateQuoteUtils.assignSlot()`'s cast.
            variables:
                variables as unknown as BatchApplyQuestionnaireTemplateToProjectVariables,
        };
    }
}
