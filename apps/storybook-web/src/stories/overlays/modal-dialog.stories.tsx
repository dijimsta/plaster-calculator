import { Button, ModalDialog, Text } from "@libraries/uikit-web";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ModalDialog> = {
    title: "UIKit/Overlays/ModalDialog",
    component: ModalDialog,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A centered modal for focused content, alerts, and confirmation prompts.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ModalDialog>;

export const Default: Story = {
    args: {
        open: false,
        onClose: () => undefined,
        title: "Edit project",
        children: null,
    },
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open modal</Button>
                <ModalDialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Edit project"
                    description="Make changes to the project details below."
                    footer={
                        <>
                            <Button
                                variant="secondary"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => setIsOpen(false)}>
                                Save changes
                            </Button>
                        </>
                    }
                >
                    <Text>
                        Place forms or other focused content inside the dialog.
                    </Text>
                </ModalDialog>
            </>
        );
    },
};

export const Confirmation: Story = {
    args: {
        open: false,
        onClose: () => undefined,
        title: "Delete project?",
        children: null,
    },
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Delete project</Button>
                <ModalDialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    size="sm"
                    title="Delete project?"
                    description="This action cannot be undone."
                    showCloseButton={false}
                    footer={
                        <>
                            <Button
                                variant="secondary"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => setIsOpen(false)}>
                                Delete
                            </Button>
                        </>
                    }
                >
                    <Text>
                        All project data and associated records will be
                        permanently removed.
                    </Text>
                </ModalDialog>
            </>
        );
    },
};
