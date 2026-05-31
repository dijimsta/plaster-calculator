import { GitHubIcon } from "../src/icons/github-icon.component.tsx";
import { GoogleIcon } from "../src/icons/google-icon.component.tsx";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GitHubIcon> = {
    title: "Components/Icons",
    component: GitHubIcon,
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof GitHubIcon>;

export const GitHub: Story = {
    render: () => <GitHubIcon />,
};

export const Google: Story = {
    render: () => <GoogleIcon />,
};
