import { ClarificationsStep } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import {
    clarificationsStepRowsAfterRun,
    clarificationsStepRowsTemplateApplied,
    clarificationsStepTemplates,
} from "./questionnaires.stubs.ts";

const meta: Meta<typeof ClarificationsStep> = {
    title: "Plaster Calculator/Questionnaires/ClarificationsStep",
    component: ClarificationsStep,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    'Step 2 of the new-project wizard: pick a clarification template (or start from scratch), edit the resulting rows, run "Find Answers on Plan", and email the builder about whatever is left unanswered.',
            },
        },
    },
    args: {
        onSelectTemplate: fn(),
        onApplyTemplate: fn(),
        onAddRow: fn(),
        onEditRowLabel: fn(),
        onRemoveRow: fn(),
        onRunFindAnswersOnPlan: fn(),
        onSendEmail: fn(),
    },
};
export default meta;

type Story = StoryObj<typeof ClarificationsStep>;

export const TemplateAppliedNothingRun: Story = {
    args: {
        templates: clarificationsStepTemplates,
        selectedTemplateId: "detached-dwelling",
        isApplyingTemplate: false,
        rows: clarificationsStepRowsTemplateApplied,
        findAnswersCreditCost: 1,
        isRunningFindAnswersOnPlan: false,
        hasRunFindAnswersOnPlan: false,
        notAnsweredOnPlanCount: clarificationsStepRowsTemplateApplied.length,
        isEmailSent: false,
    },
};

export const RunningFindAnswersOnPlan: Story = {
    args: {
        templates: clarificationsStepTemplates,
        selectedTemplateId: "detached-dwelling",
        isApplyingTemplate: false,
        rows: clarificationsStepRowsTemplateApplied,
        findAnswersCreditCost: 2,
        isRunningFindAnswersOnPlan: true,
        hasRunFindAnswersOnPlan: false,
        notAnsweredOnPlanCount: clarificationsStepRowsTemplateApplied.length,
        isEmailSent: false,
    },
};

export const AfterRunMixedResults: Story = {
    args: {
        templates: clarificationsStepTemplates,
        selectedTemplateId: "detached-dwelling",
        isApplyingTemplate: false,
        rows: clarificationsStepRowsAfterRun,
        findAnswersCreditCost: 3,
        isRunningFindAnswersOnPlan: false,
        hasRunFindAnswersOnPlan: true,
        notAnsweredOnPlanCount: clarificationsStepRowsAfterRun.filter(
            (row) => row.status === "ASK_BUILDER",
        ).length,
        isEmailSent: false,
    },
};

export const StartFromScratchEmpty: Story = {
    args: {
        templates: clarificationsStepTemplates,
        selectedTemplateId: null,
        isApplyingTemplate: false,
        rows: [],
        findAnswersCreditCost: 1,
        isRunningFindAnswersOnPlan: false,
        hasRunFindAnswersOnPlan: false,
        notAnsweredOnPlanCount: 0,
        isEmailSent: false,
    },
};

export const EmailCardBeforeRun: Story = {
    args: {
        templates: clarificationsStepTemplates,
        selectedTemplateId: null,
        isApplyingTemplate: false,
        rows: [
            {
                id: "access-notes",
                label: "Are there any site access notes?",
                status: "UNCHECKED",
            },
        ],
        findAnswersCreditCost: 1,
        isRunningFindAnswersOnPlan: false,
        hasRunFindAnswersOnPlan: false,
        notAnsweredOnPlanCount: 1,
        isEmailSent: false,
    },
};

export const EmailCardAfterRun: Story = {
    args: {
        templates: clarificationsStepTemplates,
        selectedTemplateId: "detached-dwelling",
        isApplyingTemplate: false,
        rows: [
            {
                id: "ceiling-height",
                label: "What is the ceiling height in the main living area?",
                status: "ON_PLAN",
                answer: "2.7m stud height throughout.",
                sheetReference: "A-102 Section",
            },
            {
                id: "existing-services",
                label: "Are there any existing services (electrical, plumbing) to work around?",
                status: "ASK_BUILDER",
            },
        ],
        findAnswersCreditCost: 1,
        isRunningFindAnswersOnPlan: false,
        hasRunFindAnswersOnPlan: true,
        notAnsweredOnPlanCount: 1,
        isEmailSent: true,
    },
};
