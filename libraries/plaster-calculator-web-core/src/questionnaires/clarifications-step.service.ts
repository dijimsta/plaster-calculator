import type { AnswerQuestionnaireWithAiResponse } from "@libraries/plaster-calculator-common";

import type {
    ClarificationRow,
    ClarificationsStepDependencies,
} from "./clarifications-step.types.ts";
import { ClarificationsStepError } from "./clarifications-step.types.ts";
import {
    buildBatchApplyTemplateVariables,
    nextPositionAfter,
} from "./clarifications-step.utils.ts";
import type { QuestionnairesService } from "./questionnaires.service.ts";

/**
 * The clarifications step's I/O orchestration: applying a template,
 * adding/editing/removing individual rows, and running "Find Answers on
 * Plan". Every Data Connect effect is injected via `dependencies`
 * (`ClarificationsStepDependencies`) so this class is testable with plain
 * fakes, the same way `createAnswerQuestionnaireService()`
 * (`questionnaire-answer-domain.ts`, functions package) is. `questionnairesService`
 * is likewise required here (no default) so this module only ever needs
 * `QuestionnairesService` as a type — `use-clarifications-step.hook.ts` is
 * where a real instance is constructed, following this package's existing
 * constructor-default-and-overridable convention (`QuestionnairesService`,
 * `TeamsService`, `CompaniesService` all default their own injected
 * clients the same way).
 *
 * A row that fails to persist here is surfaced to the caller as a rejected
 * promise — `use-clarifications-step.hook.ts` is responsible for turning
 * that into a recoverable, user-facing error rather than losing the rest of
 * the rows. In particular, `runFindAnswersOnPlan()` never touches existing
 * rows on failure: it does not call `dependencies.refresh()` unless
 * `answerQuestionnaireWithAI()` actually succeeds, so a failed run leaves
 * whatever was already loaded exactly as it was.
 */
export class ClarificationsStepService {
    private readonly dependencies: ClarificationsStepDependencies;
    private readonly questionnairesService: QuestionnairesService;

    public constructor(
        dependencies: ClarificationsStepDependencies,
        questionnairesService: QuestionnairesService,
    ) {
        this.dependencies = dependencies;
        this.questionnairesService = questionnairesService;
    }

    /**
     * Reads `sourceTemplateId`'s questions, copies them onto `projectId`
     * via `BatchApplyQuestionnaireTemplateToProject` (one round trip), and
     * refreshes. Appends after `existingRows` rather than replacing them,
     * matching `useApplyQuestionnaireTemplateCallback`'s (scope-of-work
     * tab) behaviour of adding to whatever's already there.
     */
    public async applyTemplate(
        projectId: string,
        sourceTemplateId: string,
        existingRows: readonly ClarificationRow[],
    ): Promise<void> {
        const questions =
            await this.dependencies.getTemplateQuestions(sourceTemplateId);
        const startingPosition = nextPositionAfter(existingRows);
        const result = buildBatchApplyTemplateVariables(
            projectId,
            sourceTemplateId,
            questions,
            startingPosition,
        );

        if (!result.ok) {
            throw new ClarificationsStepError(result.reason, result.message);
        }

        await this.dependencies.batchApplyTemplate(result.variables);
        await this.dependencies.refresh();
    }

    /**
     * Ensures a `ProjectQuestionnaire` exists (a brand-new wizard project
     * has none yet) before inserting the row, matching
     * `useAddProjectQuestionnaireQuestionCallback`'s ensure-then-create
     * sequencing.
     */
    public async addRow(
        projectId: string,
        existingRows: readonly ClarificationRow[],
        label: string,
    ): Promise<void> {
        await this.dependencies.ensureQuestionnaire(projectId);
        await this.dependencies.createQuestion({
            id: crypto.randomUUID(),
            projectId,
            label,
            position: nextPositionAfter(existingRows),
        });
        await this.dependencies.refresh();
    }

    /** Updates a row's label in place, keeping its existing position. */
    public async editRowLabel(
        projectId: string,
        row: ClarificationRow,
        label: string,
    ): Promise<void> {
        await this.dependencies.updateQuestionLabel({
            id: row.id,
            projectId,
            label,
            position: row.position,
        });
        await this.dependencies.refresh();
    }

    public async removeRow(
        projectId: string,
        row: ClarificationRow,
    ): Promise<void> {
        await this.dependencies.deleteQuestion({ id: row.id, projectId });
        await this.dependencies.refresh();
    }

    /**
     * Runs `QuestionnairesService.answerQuestionnaireWithAI()` and only
     * refreshes on success, so a failed run — surfaced to the caller as a
     * rejected promise — never clears or replaces whatever rows were
     * already loaded.
     */
    public async runFindAnswersOnPlan(
        projectId: string,
    ): Promise<AnswerQuestionnaireWithAiResponse> {
        const result =
            await this.questionnairesService.answerQuestionnaireWithAI(
                projectId,
            );
        await this.dependencies.refresh();
        return result;
    }
}
