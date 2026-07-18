import { GenerateQuestionnaireEmailModal } from "@libraries/plaster-calculator-ui";
import { Button } from "@libraries/uikit-web";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof GenerateQuestionnaireEmailModal> = {
    title: "Plaster Calculator/Questionnaires/GenerateQuestionnaireEmailModal",
    component: GenerateQuestionnaireEmailModal,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A modal for previewing, copying, and sending a generated scope-of-work email.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof GenerateQuestionnaireEmailModal>;

export const Default: Story = {
    args: {
        open: false,
        onClose: () => undefined,
        subject: "Scope of work for 12 Maple Street",
        body: "Hi Jordan,\n\nHere is the scope of work for 12 Maple Street. A few questions remain unanswered:\n\n- What is the ceiling height in the main living area?\n- Are there any existing services (electrical, plumbing) that need to be worked around?\n\nPlease let us know so we can finalize the estimate.\n\nThanks,\nAcme Plastering",
        mailtoHref:
            "mailto:jordan@example.com?subject=Scope%20of%20work%20for%2012%20Maple%20Street",
    },
    render: () => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Generate email</Button>
                <GenerateQuestionnaireEmailModal
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    subject="Scope of work for 12 Maple Street"
                    body={
                        "Hi Jordan,\n\nHere is the scope of work for 12 Maple Street. A few questions remain unanswered:\n\n- What is the ceiling height in the main living area?\n- Are there any existing services (electrical, plumbing) that need to be worked around?\n\nPlease let us know so we can finalize the estimate.\n\nThanks,\nAcme Plastering"
                    }
                    mailtoHref="mailto:jordan@example.com?subject=Scope%20of%20work%20for%2012%20Maple%20Street"
                />
            </>
        );
    },
};
