import { Button, EmptyState } from "@libraries/uikit-web";
import { FolderOpen, Plus } from "lucide-react";
import { fn } from "storybook/test";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof EmptyState> = {
    title: "UIKit/Feedback/EmptyState",
    component: EmptyState,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A focused placeholder for views with no content, guiding people toward a useful next action.",
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["simple", "dashed"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
    args: {
        icon: <FolderOpen />,
        title: "No projects",
        description: "Get started by creating a new project.",
        actions: (
            <Button icon={<Plus />} onClick={fn()}>
                New project
            </Button>
        ),
    },
};

export const Dashed: Story = {
    args: {
        ...Default.args,
        variant: "dashed",
    },
};

export const WithoutIcon: Story = {
    args: {
        title: "Nothing here yet",
        description: "Items will appear here once they have been added.",
    },
};
