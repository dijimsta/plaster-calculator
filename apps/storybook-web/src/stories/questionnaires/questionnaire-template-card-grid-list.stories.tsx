import {
    QuestionnaireTemplateCardGridList,
    QuestionnairesServiceProvider,
} from "@libraries/plaster-calculator-ui";
import { fn } from "@storybook/test";

import {
    questionnaireTemplates,
    questionnairesServiceStub,
} from "../../stubs/questionnaires-service.stub.ts";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof QuestionnaireTemplateCardGridList> = {
    title: "Plaster Calculator/Questionnaires/QuestionnaireTemplateCardGridList",
    component: QuestionnaireTemplateCardGridList,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Displays questionnaire templates in a responsive grid and identifies the template selected by each action.",
            },
        },
    },
    args: {
        templates: questionnaireTemplates,
        onOpen: fn(),
        onDuplicate: fn(),
        onDelete: fn(),
    },
    argTypes: {
        templates: { control: false },
    },
    decorators: [
        (Story) => (
            <QuestionnairesServiceProvider service={questionnairesServiceStub}>
                <Story />
            </QuestionnairesServiceProvider>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof QuestionnaireTemplateCardGridList>;

export const Default: Story = {};
