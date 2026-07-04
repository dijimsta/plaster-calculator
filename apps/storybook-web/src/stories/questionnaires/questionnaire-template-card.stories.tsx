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
                    "Displays questionnaire template metadata and its available actions.",
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

export const Default: Story = {
    args: {
        template: {
            id: "detached-dwelling",
            name: "Standard residential questionnaire",
            usedByLabel: "12 builders",
            updated: "Updated 2 days ago",
        },
    },
};
