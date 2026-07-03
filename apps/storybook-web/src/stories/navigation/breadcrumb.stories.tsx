import { Breadcrumb } from "@libraries/uikit-web";
import { Home } from "lucide-react";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Breadcrumb> = {
    title: "UIKit/Navigation/Breadcrumb",
    component: Breadcrumb,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A breadcrumb trail that helps people understand and navigate the current page hierarchy.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
    render: (args) => (
        <Breadcrumb {...args}>
            <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Richmond apartment</Breadcrumb.Item>
            <Breadcrumb.Item current>Scope questionnaire</Breadcrumb.Item>
        </Breadcrumb>
    ),
};

export const WithHomeIcon: Story = {
    render: () => (
        <Breadcrumb>
            <Breadcrumb.Item href="#" aria-label="Home">
                <Home aria-hidden="true" className="size-5 shrink-0" />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
            <Breadcrumb.Item current>Richmond apartment</Breadcrumb.Item>
        </Breadcrumb>
    ),
};
