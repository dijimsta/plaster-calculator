import { Avatar, Box, Button, Notification } from "@libraries/uikit-web";
import { useState } from "react";
import { fn } from "storybook/test";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Notification> = {
    title: "UIKit/Overlays/Notification",
    component: Notification,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A compact toast-style message for non-interruptive feedback, with optional actions, custom media, and dismissal.",
            },
        },
    },
    argTypes: {
        intent: {
            control: "select",
            options: ["neutral", "info", "warn", "error", "success"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const Default: Story = {
    args: {
        title: "Successfully saved",
        description: "Your project changes are now live.",
        intent: "success",
        onDismiss: fn(),
    },
};

export const WithActions: Story = {
    args: {
        title: "New version available",
        description: "Refresh the page to use the latest version.",
        intent: "info",
        onDismiss: fn(),
        actions: (
            <>
                <Button>Refresh</Button>
                <Button variant="link">Not now</Button>
            </>
        ),
    },
};

export const WithAvatar: Story = {
    args: {
        title: "Alex Morgan mentioned you",
        description: "“Can you check these measurements?”",
        media: <Avatar initials="AM" size="sm" />,
        onDismiss: fn(),
    },
};

export const Interactive: Story = {
    args: {
        title: "Successfully saved",
    },
    render: () => {
        const [isVisible, setIsVisible] = useState(false);

        return (
            <Box direction="column" align="end" gap="lg">
                <Button onClick={() => setIsVisible(true)}>
                    Show notification
                </Button>
                {isVisible && (
                    <Notification
                        title="Successfully saved"
                        description="Your project changes are now live."
                        intent="success"
                        onDismiss={() => setIsVisible(false)}
                    />
                )}
            </Box>
        );
    },
};
