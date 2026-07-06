import { MultiStepNavigation } from "@libraries/uikit-web";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

const steps = [
    {
        id: "details",
        name: "Questionnaire details",
        description: "Choose a name and category",
    },
    {
        id: "questions",
        name: "Questions",
        description: "Build the questionnaire",
    },
    {
        id: "review",
        name: "Review",
        description: "Check everything looks right",
    },
    {
        id: "publish",
        name: "Publish",
        description: "Make it available",
    },
] as const;

const meta: Meta<typeof MultiStepNavigation> = {
    title: "UIKit/Navigation/Multi-step Navigation",
    component: MultiStepNavigation,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A responsive stepper that communicates workflow progress and can optionally navigate between steps.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof MultiStepNavigation>;

export const Default: Story = {
    render: () => {
        const [currentStep, setCurrentStep] = useState(2);

        return (
            <MultiStepNavigation
                steps={steps}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
            />
        );
    },
};

export const ReadOnly: Story = {
    args: {
        steps,
        currentStep: 3,
    },
};
