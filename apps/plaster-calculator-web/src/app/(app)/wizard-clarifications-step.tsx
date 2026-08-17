"use client";

import {
    ClarificationsStep,
    GenerateQuestionnaireEmailModal,
} from "@libraries/plaster-calculator-ui";
import type { ClarificationsStepRow } from "@libraries/plaster-calculator-ui";
import {
    useClarificationsStep,
    useGenerateQuestionnaireEmailModal,
} from "@libraries/plaster-calculator-web-core";
import type { ClarificationRow } from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useState } from "react";

/**
 * "Find Answers on Plan" doesn't have a billing story yet (see
 * `questionnaire-answer-domain.ts`'s "credit cost" note) -- one credit per
 * run is a placeholder until that lands, matching the value used in most of
 * `ClarificationsStep`'s own stories.
 */
const FIND_ANSWERS_CREDIT_COST = 1;

type WizardClarificationsStepProps = {
    /** The project created earlier in the wizard (on upload) -- clarifications persist against it as the user goes. */
    readonly projectId: string;
    readonly companyId: string | null;
};

/**
 * Step 2 of the new-project wizard: bridges `useClarificationsStep`'s
 * stateful orchestration onto the presentational `ClarificationsStep`, and
 * owns the "email the builder" modal alongside it. A thin wizard-specific
 * cousin of `projects/[projectId]/questionnaires/page.tsx`'s wiring for the
 * scope-of-work tab.
 */
export function WizardClarificationsStep({
    projectId,
    companyId,
}: WizardClarificationsStepProps) {
    const { notify } = useNotificationsManager();
    const [hasRunFindAnswers, setHasRunFindAnswers] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const {
        templates,
        selectedTemplateId,
        selectTemplate,
        rows,
        notAnsweredOnPlanCount,
        applyTemplate,
        isApplyingTemplate,
        addRow,
        editRowLabel,
        removeRow,
        runFindAnswersOnPlan,
        isRunningAi,
    } = useClarificationsStep(projectId);

    const emailModal = useGenerateQuestionnaireEmailModal(
        companyId,
        rows.map((row) => ({ label: row.label, answer: row.answer })),
    );

    function findRow(rowId: string): ClarificationRow | undefined {
        return rows.find((row) => row.id === rowId);
    }

    async function handleApplyTemplate(): Promise<void> {
        try {
            await applyTemplate(selectedTemplateId);
        } catch (error) {
            notify({
                intent: "error",
                title: "Couldn't apply template",
                description:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while copying the template. Please try again.",
            });
        }
    }

    async function handleAddRow(label: string): Promise<void> {
        try {
            await addRow(label);
        } catch {
            notify({
                intent: "error",
                title: "Couldn't add clarification",
                description:
                    "Something went wrong while saving. Please try again.",
            });
        }
    }

    async function handleEditRowLabel(
        row: ClarificationsStepRow,
        label: string,
    ): Promise<void> {
        const rawRow = findRow(row.id);
        if (!rawRow) return;
        try {
            await editRowLabel(rawRow, label);
        } catch {
            notify({
                intent: "error",
                title: "Couldn't save clarification",
                description:
                    "Something went wrong while saving. Please try again.",
            });
        }
    }

    async function handleRemoveRow(row: ClarificationsStepRow): Promise<void> {
        const rawRow = findRow(row.id);
        if (!rawRow) return;
        try {
            await removeRow(rawRow);
        } catch {
            notify({
                intent: "error",
                title: "Couldn't remove clarification",
                description:
                    "Something went wrong while removing. Please try again.",
            });
        }
    }

    async function handleRunFindAnswers(): Promise<void> {
        try {
            await runFindAnswersOnPlan();
            setHasRunFindAnswers(true);
        } catch {
            notify({
                intent: "error",
                title: "Couldn't find answers on plan",
                description:
                    "Something went wrong while checking the plan. Please try again.",
            });
        }
    }

    function handleSendEmail(): void {
        emailModal.openModal();
        setIsEmailSent(true);
    }

    return (
        <>
            <ClarificationsStep
                templates={templates}
                selectedTemplateId={selectedTemplateId}
                onSelectTemplate={selectTemplate}
                onApplyTemplate={() => void handleApplyTemplate()}
                isApplyingTemplate={isApplyingTemplate}
                rows={rows}
                onAddRow={(label) => void handleAddRow(label)}
                onEditRowLabel={(row, label) =>
                    void handleEditRowLabel(row, label)
                }
                onRemoveRow={(row) => void handleRemoveRow(row)}
                findAnswersCreditCost={FIND_ANSWERS_CREDIT_COST}
                onRunFindAnswersOnPlan={() => void handleRunFindAnswers()}
                isRunningFindAnswersOnPlan={isRunningAi}
                hasRunFindAnswersOnPlan={
                    hasRunFindAnswers ||
                    rows.some((row) => row.status === "ON_PLAN")
                }
                notAnsweredOnPlanCount={notAnsweredOnPlanCount}
                onSendEmail={handleSendEmail}
                isEmailSent={isEmailSent}
            />
            <GenerateQuestionnaireEmailModal
                open={emailModal.isOpen}
                onClose={emailModal.closeModal}
                subject={emailModal.subject}
                body={emailModal.body}
                mailtoHref={emailModal.mailtoHref}
            />
        </>
    );
}
