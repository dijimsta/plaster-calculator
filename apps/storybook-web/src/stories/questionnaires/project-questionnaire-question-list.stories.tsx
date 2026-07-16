import {
    AI_CONFIRMED_ANSWER_SOURCE,
    AI_SUGGESTED_ANSWER_SOURCE,
    MANUAL_ANSWER_SOURCE,
} from "@libraries/plaster-calculator-common";
import { ProjectQuestionnaireQuestionList } from "@libraries/plaster-calculator-ui";
import { useState } from "react";
import { fn } from "storybook/test";

import type { ProjectQuestionnaireQuestion } from "@libraries/plaster-calculator-ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ProjectQuestionnaireQuestionList> = {
    title: "Plaster Calculator/Questionnaires/ProjectQuestionnaireQuestionList",
    component: ProjectQuestionnaireQuestionList,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Renders a project's questionnaire questions with an answer field for each, including the AI-suggested badge and confirm action.",
            },
        },
    },
    args: {
        onSaveAnswer: fn(),
        onRemove: fn(),
        onConfirmAnswer: fn(),
    },
};

export default meta;

type Story = StoryObj<typeof ProjectQuestionnaireQuestionList>;

export const Default: Story = {
    args: {
        questions: [
            {
                id: "access-notes",
                label: "Are there any site access notes?",
                position: 0,
                answer: "Side gate code is 4521.",
                answerSource: MANUAL_ANSWER_SOURCE,
            },
            {
                id: "ceiling-height",
                label: "What is the ceiling height?",
                position: 1,
                answer: null,
                answerSource: MANUAL_ANSWER_SOURCE,
            },
        ],
    },
};

export const AiSuggested: Story = {
    args: {
        questions: [
            {
                id: "ceiling-area",
                label: "What is the total ceiling area to be plastered?",
                position: 0,
                answer: "Approximately 142m², excluding wet areas.",
                answerSource: AI_SUGGESTED_ANSWER_SOURCE,
            },
            {
                id: "access-notes",
                label: "Are there any site access notes?",
                position: 1,
                answer: null,
                answerSource: MANUAL_ANSWER_SOURCE,
            },
        ],
    },
    render: (args) => {
        const [questions, setQuestions] = useState<
            readonly ProjectQuestionnaireQuestion[]
        >(args.questions);

        return (
            <ProjectQuestionnaireQuestionList
                {...args}
                questions={questions}
                onConfirmAnswer={(question) => {
                    setQuestions((current) =>
                        current.map((existing) =>
                            existing.id === question.id
                                ? {
                                      ...existing,
                                      answerSource: AI_CONFIRMED_ANSWER_SOURCE,
                                  }
                                : existing,
                        ),
                    );
                }}
            />
        );
    },
};
