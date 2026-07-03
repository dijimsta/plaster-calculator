import type { QuestionnairesServiceProviderProps } from "@libraries/plaster-calculator-ui";

type QuestionnairesService = QuestionnairesServiceProviderProps["service"];

export const questionnaireTemplates: Awaited<
    ReturnType<QuestionnairesService["listTemplates"]>
> = [
    {
        id: "detached-dwelling",
        name: "Standard residential questionnaire",
        scope: "Detached dwelling",
        origin: "standard",
        isDefault: true,
        questionCount: 24,
        sectionCount: 6,
        usedByLabel: "12 builders",
        updated: "Updated 2 days ago",
    },
    {
        id: "custom-renovation",
        name: "Renovation and extension",
        scope: "Residential renovation",
        origin: "custom",
        isDefault: false,
        questionCount: 18,
        sectionCount: 4,
        usedByLabel: "3 builders",
        updated: "Updated yesterday",
    },
    {
        id: "commercial-fitout",
        name: "Commercial fit-out",
        scope: "Small commercial projects",
        origin: "custom",
        isDefault: false,
        questionCount: 31,
        sectionCount: 8,
        usedByLabel: "Not used yet",
        updated: "Updated 5 days ago",
    },
];

export const questionnairesServiceStub: QuestionnairesServiceProviderProps["service"] =
    {
        async listTemplates() {
            return questionnaireTemplates;
        },
    };
