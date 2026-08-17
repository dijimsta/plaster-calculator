import { SaveQuestionnaireTemplateFromProjectModal } from "@libraries/plaster-calculator-ui";
import { Button } from "@libraries/uikit-web";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta: Meta<typeof SaveQuestionnaireTemplateFromProjectModal> = {
    title: "Plaster Calculator/Questionnaires/SaveQuestionnaireTemplateFromProjectModal",
    component: SaveQuestionnaireTemplateFromProjectModal,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A modal for saving a project's clarifications as a reusable clarification template.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof SaveQuestionnaireTemplateFromProjectModal>;

export const Default: Story = {
    args: {
        open: false,
        isSaving: false,
        onClose: () => undefined,
        defaultName: "12 Maple Street",
        questions: [],
        existingTemplateNames: ["Standard Kitchen Remodel"],
        onSave: () => undefined,
    },
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>
                    Save as template
                </Button>
                <SaveQuestionnaireTemplateFromProjectModal
                    open={isOpen}
                    isSaving={false}
                    onClose={() => setIsOpen(false)}
                    defaultName="12 Maple Street"
                    questions={[]}
                    existingTemplateNames={["Standard Kitchen Remodel"]}
                    onSave={() => setIsOpen(false)}
                />
            </>
        );
    },
};

export const WithMixedClarifications: Story = {
    args: {
        ...Default.args,
        defaultName: "42 Oak Avenue",
        questions: [
            {
                label: "What is the ceiling height in the main living area?",
                isFromSourceTemplate: true,
            },
            {
                label: "Are there any existing services to work around?",
                isFromSourceTemplate: true,
            },
            {
                label: "Should the hallway closet be included in this scope?",
                isFromSourceTemplate: false,
            },
        ],
    },
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>
                    Save as template
                </Button>
                <SaveQuestionnaireTemplateFromProjectModal
                    open={isOpen}
                    isSaving={false}
                    onClose={() => setIsOpen(false)}
                    defaultName="42 Oak Avenue"
                    questions={[
                        {
                            label: "What is the ceiling height in the main living area?",
                            isFromSourceTemplate: true,
                        },
                        {
                            label: "Are there any existing services to work around?",
                            isFromSourceTemplate: true,
                        },
                        {
                            label: "Should the hallway closet be included in this scope?",
                            isFromSourceTemplate: false,
                        },
                    ]}
                    existingTemplateNames={["Standard Kitchen Remodel"]}
                    onSave={() => setIsOpen(false)}
                />
            </>
        );
    },
};

export const DuplicateNameWarning: Story = {
    args: {
        ...Default.args,
        defaultName: "Standard Kitchen Remodel",
        questions: [
            {
                label: "What is the ceiling height in the main living area?",
                isFromSourceTemplate: true,
            },
        ],
    },
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>
                    Save as template
                </Button>
                <SaveQuestionnaireTemplateFromProjectModal
                    open={isOpen}
                    isSaving={false}
                    onClose={() => setIsOpen(false)}
                    defaultName="Standard Kitchen Remodel"
                    questions={[
                        {
                            label: "What is the ceiling height in the main living area?",
                            isFromSourceTemplate: true,
                        },
                    ]}
                    existingTemplateNames={["Standard Kitchen Remodel"]}
                    onSave={() => setIsOpen(false)}
                />
            </>
        );
    },
};
