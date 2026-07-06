import type { QuestionnaireTemplate } from "@libraries/plaster-calculator-ui";

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
