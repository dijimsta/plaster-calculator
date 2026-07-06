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
            createdAt: "2026-01-15T09:00:00.000Z",
            updatedAt: "2026-07-04T09:00:00.000Z",
        },
    },
};
