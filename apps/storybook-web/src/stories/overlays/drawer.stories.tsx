import { Button, Drawer, Text } from "@libraries/uikit-web";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Drawer> = {
    title: "UIKit/Overlays/Drawer",
    component: Drawer,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A modal panel for focused secondary content such as forms, details, and navigation.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
    args: {
        open: false,
        onClose: () => undefined,
        title: "Project details",
        children: null,
    },
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
                <Drawer
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Project details"
                    description="Review the information associated with this project."
                    footer={
                        <Button onClick={() => setIsOpen(false)}>Done</Button>
                    }
                >
                    <Text>
                        Drawer content scrolls independently while its header
                        and footer remain visible.
                    </Text>
                </Drawer>
            </>
        );
    },
};

export const FromLeft: Story = {
    args: {
        open: false,
        onClose: () => undefined,
        title: "Navigation",
        children: null,
    },
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <>
                <Button onClick={() => setIsOpen(true)}>
                    Open left drawer
                </Button>
                <Drawer
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    placement="left"
                    size="sm"
                    title="Navigation"
                >
                    <Text>
                        Place compact navigation or filtering controls here.
                    </Text>
                </Drawer>
            </>
        );
    },
};
