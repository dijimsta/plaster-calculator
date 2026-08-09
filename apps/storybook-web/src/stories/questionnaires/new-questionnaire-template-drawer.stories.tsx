import { NewQuestionnaireTemplateDrawer } from "@libraries/plaster-calculator-ui";
import { Button } from "@libraries/uikit-web";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta: Meta<typeof NewQuestionnaireTemplateDrawer> = {
    title: "Plaster Calculator/Questionnaires/NewQuestionnaireTemplateDrawer",
    component: NewQuestionnaireTemplateDrawer,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A drawer for drafting and creating a new questionnaire template.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof NewQuestionnaireTemplateDrawer>;

export const Default: Story = {
    args: {
        open: false,
        onClose: () => undefined,
        onCreate: () => undefined,
    },
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>New template</Button>
                <NewQuestionnaireTemplateDrawer
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    onCreate={() => setIsOpen(false)}
                />
            </>
        );
    },
};
