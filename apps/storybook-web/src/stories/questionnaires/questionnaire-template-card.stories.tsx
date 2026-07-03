import { QuestionnaireTemplateCard } from "@libraries/plaster-calculator-ui";
import { fn } from "storybook/test";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof QuestionnaireTemplateCard> = {
    title: "Plaster Calculator/Questionnaires/QuestionnaireTemplateCard",
    component: QuestionnaireTemplateCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "Displays questionnaire template metadata and the actions available for built-in or custom templates.",
            },
        },
    },
    args: {
        onOpen: fn(),
        onDuplicate: fn(),
        onDelete: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof QuestionnaireTemplateCard>;

export const BuiltIn: Story = {
    args: {
        template: {
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
    },
};

export const Custom: Story = {
    args: {
        template: {
            id: "custom-renovation",
            name: "Renovation and extension",
            scope: "Residential renovation",
            origin: "custom",
            isDefault: false,
            questionCount: 18,
            sectionCount: 4,
            usedByLabel: "Not used yet",
            updated: "Updated yesterday",
        },
    },
};
