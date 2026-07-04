import type { QuestionnairesServiceProviderProps } from "@libraries/plaster-calculator-ui";

type QuestionnairesService = QuestionnairesServiceProviderProps["service"];

export const questionnaireTemplates: Awaited<
    ReturnType<QuestionnairesService["listTemplates"]>
> = [
    {
        id: "detached-dwelling",
        name: "Standard residential questionnaire",
        usedByLabel: "12 builders",
        updated: "Updated 2 days ago",
    },
    {
        id: "custom-renovation",
        name: "Renovation and extension",
        usedByLabel: "3 builders",
        updated: "Updated yesterday",
    },
    {
        id: "commercial-fitout",
        name: "Commercial fit-out",
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
