import { Avatar, Button, Navbar } from "@libraries/uikit-web";
import { Plus } from "lucide-react";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Navbar> = {
    title: "UIKit/Navigation/Navbar",
    component: Navbar,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Responsive application navigation with composable brand, navigation, and actions regions. The row layout and mobile disclosure toggle are handled automatically from a single navigation item list.",
            },
        },
    },
    argTypes: {
        tone: {
            control: "select",
            options: ["light", "dark"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
    args: {
        tone: "light",
    },
    render: (args) => (
        <Navbar tone={args.tone}>
            <Navbar.Brand>
                <a href="#">Northstar</a>
            </Navbar.Brand>
            <Navbar.Navigation>
                <Navbar.Item current>
                    <a href="#">Dashboard</a>
                </Navbar.Item>
                <Navbar.Item>
                    <a href="#">Team</a>
                </Navbar.Item>
                <Navbar.Item>
                    <a href="#">Projects</a>
                </Navbar.Item>
                <Navbar.Item>
                    <a href="#">Calendar</a>
                </Navbar.Item>
            </Navbar.Navigation>
            <Navbar.Actions>
                <Avatar initials="JS" size="sm" />
            </Navbar.Actions>
        </Navbar>
    ),
};

export const Dark: Story = {
    render: () => (
        <Navbar tone="dark">
            <Navbar.Brand>
                <a href="#">Northstar</a>
            </Navbar.Brand>
            <Navbar.Navigation>
                <Navbar.Item current>
                    <a href="#">Dashboard</a>
                </Navbar.Item>
                <Navbar.Item>
                    <a href="#">Team</a>
                </Navbar.Item>
                <Navbar.Item>
                    <a href="#">Projects</a>
                </Navbar.Item>
                <Navbar.Item>
                    <a href="#">Calendar</a>
                </Navbar.Item>
            </Navbar.Navigation>
            <Navbar.Actions>
                <Avatar initials="JS" size="sm" />
            </Navbar.Actions>
        </Navbar>
    ),
};

export const WithQuickAction: Story = {
    render: () => (
        <Navbar>
            <Navbar.Brand>
                <a href="#">Northstar</a>
            </Navbar.Brand>
            <Navbar.Navigation>
                <Navbar.Item current>
                    <a href="#">Dashboard</a>
                </Navbar.Item>
                <Navbar.Item>
                    <a href="#">Team</a>
                </Navbar.Item>
                <Navbar.Item>
                    <a href="#">Projects</a>
                </Navbar.Item>
                <Navbar.Item>
                    <a href="#">Calendar</a>
                </Navbar.Item>
            </Navbar.Navigation>
            <Navbar.Actions>
                <Button icon={<Plus aria-hidden="true" />}>New project</Button>
                <Avatar initials="JS" size="sm" />
            </Navbar.Actions>
        </Navbar>
    ),
};
