import { GitHubIcon } from "../../src/elements/icons/github-icon.component.tsx";
import { GoogleIcon } from "../../src/elements/icons/google-icon.component.tsx";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GitHubIcon> = {
    title: "Elements/Icons",
    component: GitHubIcon,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Brand icons used alongside auth provider buttons. Each icon is an inline SVG component with no external dependencies.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof GitHubIcon>;

export const GitHub: Story = {
    render: () => <GitHubIcon />,
};

export const Google: Story = {
    render: () => <GoogleIcon />,
};
