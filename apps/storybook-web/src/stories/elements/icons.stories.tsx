import { GitHubIcon, GoogleIcon } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof GitHubIcon> = {
    title: "UIKit/Elements/Icons",
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
