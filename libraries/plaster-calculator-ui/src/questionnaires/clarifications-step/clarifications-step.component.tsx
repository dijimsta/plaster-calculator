import { Box, EmptyState } from "@libraries/uikit-web";
import { ClipboardList } from "lucide-react";
import type { ReactElement } from "react";

import { useQuestionnairesTranslation } from "../i18n/index.ts";

import { ClarificationsAddRowForm } from "./clarifications-add-row-form.component.tsx";
import { ClarificationsEmailCard } from "./clarifications-email-card.component.tsx";
import { ClarificationsFindAnswersAction } from "./clarifications-find-answers-action.component.tsx";
import { ClarificationRowList } from "./clarifications-row-list.component.tsx";
import type {
    ClarificationRowStatus,
    ClarificationsStepProps,
    ClarificationsStepRow,
    ClarificationsStepTemplateOption,
} from "./clarifications-step.types.ts";
import { ClarificationsTemplatePicker } from "./clarifications-template-picker.component.tsx";

export type {
    ClarificationRowStatus,
    ClarificationsStepProps,
    ClarificationsStepRow,
    ClarificationsStepTemplateOption,
};

/**
 * Step 2 of the new-project wizard: pick a clarification template (or start
 * from scratch), edit the resulting clarification rows freely, run "Find
 * Answers on Plan", and hand off the unanswered ones to an email for the
 * builder. A tighter, modal-sized arrangement of the same ideas as the
 * scope-of-work tab's `ProjectQuestionnaireQuestionList` and
 * `AddQuestionsFromTemplateDrawer`.
 *
 * Fully presentational: every row, status, count, and handler arrives as a
 * prop. Nothing here fetches data or calls a service — a later ticket wires
 * this to `useClarificationsStep()` (`@libraries/plaster-calculator-web-core`).
 */
export function ClarificationsStep({
    templates,
    selectedTemplateId,
    onSelectTemplate,
    onApplyTemplate,
    isApplyingTemplate,
    rows,
    onAddRow,
    onEditRowLabel,
    onRemoveRow,
    findAnswersCreditCost,
    onRunFindAnswersOnPlan,
    isRunningFindAnswersOnPlan,
    hasRunFindAnswersOnPlan,
    notAnsweredOnPlanCount,
    onSendEmail,
    isEmailSent,
}: ClarificationsStepProps): ReactElement {
    return (
        <Box direction="column" gap="lg">
            <ClarificationsTemplatePicker
                templates={templates}
                selectedTemplateId={selectedTemplateId}
                onSelectTemplate={onSelectTemplate}
                onApplyTemplate={onApplyTemplate}
                isApplyingTemplate={isApplyingTemplate}
            />
            <ClarificationsFindAnswersAction
                creditCost={findAnswersCreditCost}
                isRunning={isRunningFindAnswersOnPlan}
                disabled={rows.length === 0}
                onRun={onRunFindAnswersOnPlan}
            />
            {rows.length === 0 ? (
                <ClarificationsEmptyState />
            ) : (
                <ClarificationRowList
                    rows={rows}
                    onEditLabel={onEditRowLabel}
                    onRemove={onRemoveRow}
                />
            )}
            <ClarificationsAddRowForm onAddRow={onAddRow} />
            {rows.length > 0 && (
                <ClarificationsEmailCard
                    notAnsweredOnPlanCount={notAnsweredOnPlanCount}
                    hasRunFindAnswersOnPlan={hasRunFindAnswersOnPlan}
                    isEmailSent={isEmailSent}
                    onSendEmail={onSendEmail}
                />
            )}
        </Box>
    );
}

function ClarificationsEmptyState(): ReactElement {
    const { t } = useQuestionnairesTranslation();

    return (
        <EmptyState
            icon={<ClipboardList />}
            title={t("clarificationsStep.emptyState.title")}
            description={t("clarificationsStep.emptyState.description")}
        />
    );
}
