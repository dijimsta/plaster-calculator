import { Box, Button, GitHubIcon, GoogleIcon } from "@libraries/uikit-web";
import { fn } from "storybook/test";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Button> = {
    title: "UIKit/Elements/Button",
    component: Button,
    tags: ["autodocs"],
    args: {
        onClick: fn(),
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Clickable action element. Supports four visual variants and an optional icon on either side.",
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["primary", "secondary", "soft", "ghost", "link"],
        },
        iconPosition: {
            control: "select",
            options: ["left", "right"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        variant: "primary",
        children: "Button",
    },
};

export const Secondary: Story = {
    args: {
        variant: "secondary",
        children: "Button",
    },
};

export const Soft: Story = {
    args: {
        variant: "soft",
        children: "Button",
    },
};

export const Ghost: Story = {
    args: {
        variant: "ghost",
        children: "Button",
    },
};

export const Link: Story = {
    args: {
        variant: "link",
        children: "Page 3, north wall",
    },
};

export const Disabled: Story = {
    args: {
        variant: "primary",
        children: "Button",
        disabled: true,
    },
};

export const WithLeadingIcon: Story = {
    render: (args) => (
        <Button
            {...args}
            variant="primary"
            icon={<GitHubIcon />}
            iconPosition="left"
        >
            Sign in with GitHub
        </Button>
    ),
};

export const WithTrailingIcon: Story = {
    render: (args) => (
        <Button
            {...args}
            variant="secondary"
            icon={<GoogleIcon />}
            iconPosition="right"
        >
            Sign in with Google
        </Button>
    ),
};

export const IconOnly: Story = {
    render: (args) => (
        <Button
            {...args}
            variant="ghost"
            icon={<GitHubIcon />}
            aria-label="GitHub"
        />
    ),
};

export const IconOnlySecondary: Story = {
    render: (args) => (
        <Button
            {...args}
            variant="secondary"
            icon={<GitHubIcon />}
            aria-label="GitHub"
        />
    ),
};

export const Growing: Story = {
    render: (args) => (
        <Box direction="row" gap="sm">
            <Button {...args} grow>
                Growing button
            </Button>
            <Button {...args} variant="secondary">
                Secondary action
            </Button>
        </Box>
    ),
};
