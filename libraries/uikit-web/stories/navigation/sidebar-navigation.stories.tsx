import { House, User, Users } from "lucide-react";

import {
    Button,
    SidebarNavigation,
    VerticalNavigation,
} from "../../src/index.ts";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SidebarNavigation> = {
    title: "Navigation/Sidebar Navigation",
    component: SidebarNavigation,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A full-height sidebar navigation container with composable header, scrollable body, and pinned footer regions.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof SidebarNavigation>;

export const Default: Story = {
    render: () => (
        <div style={{ height: "36rem", width: "18rem" }}>
            <SidebarNavigation>
                <SidebarNavigation.Header>
                    <strong>Plaster Calculator</strong>
                </SidebarNavigation.Header>
                <SidebarNavigation.Body>
                    <VerticalNavigation aria-label="Application navigation">
                        <VerticalNavigation.Section>
                            <VerticalNavigation.Item isCurrent>
                                <a href="#home">
                                    <House />
                                    Home
                                </a>
                            </VerticalNavigation.Item>
                            <VerticalNavigation.Item>
                                <a href="#accounts">
                                    <Users />
                                    Accounts
                                </a>
                            </VerticalNavigation.Item>
                        </VerticalNavigation.Section>
                    </VerticalNavigation>
                </SidebarNavigation.Body>
                <SidebarNavigation.Footer>
                    <VerticalNavigation aria-label="Account navigation">
                        <VerticalNavigation.Section>
                            <VerticalNavigation.Item>
                                <a href="#profile">
                                    <User />
                                    Profile
                                </a>
                            </VerticalNavigation.Item>
                        </VerticalNavigation.Section>
                    </VerticalNavigation>
                    <Button variant="secondary">Logout</Button>
                </SidebarNavigation.Footer>
            </SidebarNavigation>
        </div>
    ),
};
