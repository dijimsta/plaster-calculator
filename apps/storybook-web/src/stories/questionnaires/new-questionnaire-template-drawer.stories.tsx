import { NewQuestionnaireTemplateDrawer } from "@libraries/plaster-calculator-ui";
import { Button } from "@libraries/uikit-web";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

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
