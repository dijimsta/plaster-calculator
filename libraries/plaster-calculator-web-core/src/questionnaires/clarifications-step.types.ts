import type { BatchApplyQuestionnaireTemplateToProjectVariables } from "@generated/data-connector-web";
import type { AnswerSource } from "@libraries/plaster-calculator-common";

/**
 * A clarification row's status, derived purely from its persisted `answer`/
 * `answerSource` (see `ClarificationsStepUtils.deriveRowStatus()`) — never
 * from local-only wizard state. This is what makes the scope-of-work tab
 * (which reads the same two columns via `answerSource ===
 * AI_SUGGESTED_ANSWER_SOURCE`, see `ProjectQuestionnaireQuestionList`) show
 * the same state for a row the wizard created, after the wizard closes.
 *
 * - `ON_PLAN`: has an answer, and it came from the AI scanning the plan
 *   (`AI_SUGGESTED` or `AI_CONFIRMED`) — a source sheet reference is a later
 *   ticket's UI concern, not a different persisted signal.
 * - `UNCHECKED`: has an answer, but it was typed by hand (`MANUAL`) rather
 *   than found on the plan.
 * - `ASK_BUILDER`: no answer at all yet, regardless of `answerSource` —
 *   these are exactly the rows `countNotAnsweredOnPlan()` counts.
 */
export type ClarificationRowStatus = "ON_PLAN" | "UNCHECKED" | "ASK_BUILDER";

/** One persisted `ProjectQuestionnaireQuestion` row, plus its derived status. */
export type ClarificationRow = {
    readonly id: string;
    readonly label: string;
    readonly position: number;
    readonly answer: string | null;
    readonly answerSource: AnswerSource;
    readonly status: ClarificationRowStatus;
};

/** The subset of `GetProjectQuestionnaire`'s question shape the step needs to derive `ClarificationRow`s from. */
export type RawClarificationQuestion = {
    readonly id: string;
    readonly label: string;
    readonly position: number;
    readonly answer?: string | null;
    readonly answerSource?: string | null;
};

/** One entry in the template picker — a minimal projection of `ListQuestionnaireTemplates`'s result. */
export type ClarificationsTemplateOption = {
    readonly id: string;
    readonly name: string;
};

/** One question copied out of a template, as read from `GetQuestionnaireTemplate`. */
export type ClarificationsTemplateQuestion = {
    readonly label: string;
};

/**
 * Why `ClarificationsStepUtils.buildBatchApplyTemplateVariables()` refused
 * to build a `BatchApplyQuestionnaireTemplateToProject` payload:
 * `TOO_MANY_QUESTIONS` when the template has more questions than that
 * mutation's 20 fixed slots can hold — see that mutation's own doc comment
 * in `data/connector-web/questionnaires.mutations.gql`.
 */
export type BuildBatchApplyTemplateVariablesResult =
    | {
          readonly ok: true;
          readonly variables: BatchApplyQuestionnaireTemplateToProjectVariables;
      }
    | {
          readonly ok: false;
          readonly reason: "TOO_MANY_QUESTIONS";
          readonly message: string;
      };

/**
 * Thrown by `ClarificationsStepService.applyTemplate()` when
 * `buildBatchApplyTemplateVariables()` refuses to run, so a template that
 * can't fit `BatchApplyQuestionnaireTemplateToProject`'s slots fails loudly
 * instead of silently applying a truncated set of clarifications.
 */
export class ClarificationsStepError extends Error {
    public readonly reason: "TOO_MANY_QUESTIONS";

    public constructor(reason: "TOO_MANY_QUESTIONS", message: string) {
        super(message);
        this.name = "ClarificationsStepError";
        this.reason = reason;
    }
}

/**
 * External effects `ClarificationsStepService` needs, injected so applying
 * a template and adding/editing/removing rows can be unit tested without a
 * live Data Connect stack. `use-clarifications-step.hook.ts` wires these to
 * the generated `@generated/data-connector-web/react` mutation hooks and a
 * `GetProjectQuestionnaire` refresh, the same "thin hook, injected effects"
 * split `questionnaire-answer-domain.ts` (functions package) uses for
 * `answerQuestionnaireWithAI` server-side.
 */
export type ClarificationsStepDependencies = {
    getTemplateQuestions(
        templateId: string,
    ): Promise<readonly ClarificationsTemplateQuestion[]>;
    batchApplyTemplate(
        variables: BatchApplyQuestionnaireTemplateToProjectVariables,
    ): Promise<unknown>;
    ensureQuestionnaire(projectId: string): Promise<unknown>;
    createQuestion(input: {
        id: string;
        projectId: string;
        label: string;
        position: number;
    }): Promise<unknown>;
    updateQuestionLabel(input: {
        id: string;
        projectId: string;
        label: string;
        position: number;
    }): Promise<unknown>;
    deleteQuestion(input: { id: string; projectId: string }): Promise<unknown>;
    refresh(): Promise<void>;
};
