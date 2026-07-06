import * as DataConnectorReact from "@generated/data-connector-web/react";
import { QuestionnaireTemplateCardGridList } from "@libraries/plaster-calculator-ui";
import { fn } from "storybook/test";

import { questionnaireTemplates } from "./questionnaires.stubs.ts";
import { withDataConnectQueryClient } from "../../stubs/data-connect.stub.tsx";

import type { Meta, StoryObj } from "@storybook/react-vite";

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
};

export default meta;

type Story = StoryObj<typeof QuestionnaireTemplateCardGridList>;

export const Default: Story = {};

export const FromDataConnectHook: Story = {
    decorators: [withDataConnectQueryClient],
    parameters: {
        docs: {
            description: {
                story: "Sourced from the generated useListQuestionnaireTemplates hook instead of a static stub, using initialData + enabled: false to mock the network response.",
            },
        },
    },
    render: () => {
        const { data } = DataConnectorReact.useListQuestionnaireTemplates({
            enabled: false,
            initialData: {
                questionnaireTemplates: [...questionnaireTemplates],
            },
        });

        return (
            <QuestionnaireTemplateCardGridList
                templates={data?.questionnaireTemplates ?? []}
                onOpen={fn()}
                onDuplicate={fn()}
                onDelete={fn()}
            />
        );
    },
};
