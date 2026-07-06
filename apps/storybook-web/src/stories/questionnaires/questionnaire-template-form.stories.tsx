import { QuestionnaireTemplateForm } from "@libraries/plaster-calculator-ui";
import { fn } from "storybook/test";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof QuestionnaireTemplateForm> = {
    title: "Plaster Calculator/Questionnaires/QuestionnaireTemplateForm",
    component: QuestionnaireTemplateForm,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A form for drafting a questionnaire template's name and questions.",
            },
        },
    },
    args: {
        formId: "new-template-form",
        onCancel: fn(),
        onSubmit: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof QuestionnaireTemplateForm>;

export const Default: Story = {};
