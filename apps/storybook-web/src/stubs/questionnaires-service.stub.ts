import type { QuestionnairesServiceProviderProps } from "@libraries/plaster-calculator-ui";

type IQuestionnairesService = QuestionnairesServiceProviderProps["service"];

const STUB_OWNER_ID = "stub-owner";

export const questionnaireTemplates: Awaited<
    ReturnType<IQuestionnairesService["listTemplates"]>
> = [
    {
        id: "detached-dwelling",
        ownerId: STUB_OWNER_ID,
        name: "Standard residential questionnaire",
        createdAt: "2026-01-15T09:00:00.000Z",
        updatedAt: "2026-07-04T09:00:00.000Z",
    },
    {
        id: "custom-renovation",
        ownerId: STUB_OWNER_ID,
        name: "Renovation and extension",
        createdAt: "2026-03-10T09:00:00.000Z",
        updatedAt: "2026-07-05T09:00:00.000Z",
    },
    {
        id: "commercial-fitout",
        ownerId: STUB_OWNER_ID,
        name: "Commercial fit-out",
        createdAt: "2025-11-20T09:00:00.000Z",
        updatedAt: "2026-07-01T09:00:00.000Z",
    },
];

export const questionnairesServiceStub: QuestionnairesServiceProviderProps["service"] =
    {
        async listTemplates() {
            return questionnaireTemplates;
        },
        async createTemplate(input) {
            const now = new Date().toISOString();
            return {
                id: input.name.toLowerCase().replace(/\s+/g, "-"),
                ownerId: STUB_OWNER_ID,
                name: input.name,
                createdAt: now,
                updatedAt: now,
            };
        },
    };
