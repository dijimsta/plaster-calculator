import { LogOut } from "lucide-react";

import { Avatar, Badge, Box, Button } from "../../src/index.ts";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Box> = {
    title: "Layout/Box",
    component: Box,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A flexbox layout primitive with constrained direction, alignment, and spacing props.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Box>;

export const HorizontalRow: Story = {
    render: () => (
        <Box direction="row" align="center" gap="md">
            <Avatar initials="EY" shape="circular" size="sm" />
            <Box direction="column" align="start" gap="xs" grow>
                <span>Echo Yuan</span>
                <span>Estimator</span>
            </Box>
            <Button
                variant="secondary"
                icon={<LogOut aria-hidden="true" />}
                aria-label="Log out"
            />
        </Box>
    ),
};

export const VerticalStack: Story = {
    render: () => (
        <Box direction="column" gap="sm">
            <Badge>Draft</Badge>
            <Badge color="green">Active</Badge>
            <Badge color="red">Archived</Badge>
        </Box>
    ),
};
