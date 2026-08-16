import type {
    ClarificationsStepRow,
    ClarificationsStepTemplateOption,
    QuestionnaireTemplate,
} from "@libraries/plaster-calculator-ui";

export const questionnaireTemplates: readonly QuestionnaireTemplate[] = [
    {
        id: "detached-dwelling",
        name: "Standard residential questionnaire",
        createdAt: "2026-01-15T09:00:00.000Z",
        updatedAt: "2026-07-04T09:00:00.000Z",
    },
    {
        id: "custom-renovation",
        name: "Renovation and extension",
        createdAt: "2026-03-10T09:00:00.000Z",
        updatedAt: "2026-07-05T09:00:00.000Z",
    },
    {
        id: "commercial-fitout",
        name: "Commercial fit-out",
        createdAt: "2025-11-20T09:00:00.000Z",
        updatedAt: "2026-07-01T09:00:00.000Z",
    },
];

/** `ClarificationsStep`'s template picker only needs an id and a name — the same templates as {@link questionnaireTemplates}, projected down to that shape. */
export const clarificationsStepTemplates: readonly ClarificationsStepTemplateOption[] =
    questionnaireTemplates.map(({ id, name }) => ({ id, name }));

/** Rows immediately after applying "Standard residential questionnaire" — every row still `UNCHECKED`, nothing run yet. */
export const clarificationsStepRowsTemplateApplied: readonly ClarificationsStepRow[] =
    [
        {
            id: "ceiling-height",
            label: "What is the ceiling height in the main living area?",
            status: "UNCHECKED",
        },
        {
            id: "existing-services",
            label: "Are there any existing services (electrical, plumbing) to work around?",
            status: "UNCHECKED",
        },
        {
            id: "insulation-rvalue",
            label: "What insulation R-value is required?",
            status: "UNCHECKED",
        },
        {
            id: "access-notes",
            label: "Are there any site access notes?",
            status: "UNCHECKED",
        },
    ];

/** The same rows after "Find Answers on Plan" has run once — a mix of `ON_PLAN` rows (with an answer and sheet reference) and `ASK_BUILDER` rows the plan couldn't resolve. */
export const clarificationsStepRowsAfterRun: readonly ClarificationsStepRow[] =
    [
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
        {
            id: "insulation-rvalue",
            label: "What insulation R-value is required?",
            status: "ON_PLAN",
            answer: "R2.5 batts to external walls.",
            sheetReference: "A-201 Notes",
        },
        {
            id: "access-notes",
            label: "Are there any site access notes?",
            status: "ASK_BUILDER",
        },
    ];
