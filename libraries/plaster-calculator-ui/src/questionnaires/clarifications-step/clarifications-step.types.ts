import type { ClarificationRowStatus } from "@libraries/plaster-calculator-web-core";

export type { ClarificationRowStatus };

/**
 * One entry in the template picker. A minimal projection matching
 * `ClarificationsTemplateOption` (`@libraries/plaster-calculator-web-core`),
 * redeclared here so this package's presentational components don't take on
 * a runtime dependency on web-core just for a two-field shape.
 */
export type ClarificationsStepTemplateOption = {
    readonly id: string;
    readonly name: string;
};

/**
 * One clarification row as this step displays it. Deliberately its own
 * shape rather than web-core's `ClarificationRow` — this component only
 * ever renders what's here, and `status` is the one piece of shared
 * vocabulary that must match `ClarificationRowStatus` exactly so this UI
 * stays in lockstep with how the scope-of-work tab derives the same three
 * states from the same persisted columns.
 *
 * `sheetReference` has no persisted counterpart yet — deriving one from the
 * plan is a later ticket's concern — but the status chip's `ON_PLAN` state
 * is designed to show it once a caller can supply it, so it's accepted here
 * as optional display data.
 */
export type ClarificationsStepRow = {
    readonly id: string;
    readonly label: string;
    readonly status: ClarificationRowStatus;
    readonly answer?: string | null;
    readonly sheetReference?: string | null;
};

export type ClarificationsStepProps = {
    /** The team's templates for the picker, most recently updated first. */
    readonly templates: readonly ClarificationsStepTemplateOption[];
    /** `null` selects the "start from scratch" option. */
    readonly selectedTemplateId: string | null;
    readonly onSelectTemplate: (templateId: string | null) => void;
    readonly onApplyTemplate: () => void;
    readonly isApplyingTemplate: boolean;

    readonly rows: readonly ClarificationsStepRow[];
    readonly onAddRow: (label: string) => void;
    readonly onEditRowLabel: (
        row: ClarificationsStepRow,
        label: string,
    ) => void;
    readonly onRemoveRow: (row: ClarificationsStepRow) => void;

    /** Credits "Find Answers on Plan" will spend if run now, shown before the run starts. */
    readonly findAnswersCreditCost: number;
    readonly onRunFindAnswersOnPlan: () => void;
    readonly isRunningFindAnswersOnPlan: boolean;
    /** Whether a run has completed at least once this session — switches the email card's wording from "before" to "after" phrasing. */
    readonly hasRunFindAnswersOnPlan: boolean;

    /** Clarifications not (yet) answered from the plan — feeds the email card's count, before and after a run. */
    readonly notAnsweredOnPlanCount: number;
    readonly onSendEmail: () => void;
    readonly isEmailSent: boolean;
};
