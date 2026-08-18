import {
    Box,
    Button,
    SidebarNavigation,
    VerticalNavigation,
} from "@libraries/uikit-web";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { House, User, Users } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof SidebarNavigation> = {
    title: "UIKit/Navigation/Sidebar Navigation",
    component: SidebarNavigation,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A full-height sidebar navigation container with composable header, scrollable body, and pinned footer regions. Owns its own width — collapse it into an icon rail via `collapsed`/`defaultCollapsed` or `SidebarNavigation.CollapseButton`.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof SidebarNavigation>;

export const Default: Story = {
    render: () => (
        <div style={{ height: "36rem" }}>
            <SidebarNavigation>
                <SidebarNavigation.Header>
                    <strong>Plaster Calculator</strong>
                </SidebarNavigation.Header>
                <SidebarNavigation.Body>
                    <VerticalNavigation label="Application navigation">
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
                    <VerticalNavigation label="Account navigation">
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

export const Collapsed: Story = {
    render: () => (
        <div style={{ height: "36rem" }}>
            <SidebarNavigation defaultCollapsed>
                <SidebarNavigation.Header>
                    <Box direction="row" justify="center">
                        <SidebarNavigation.CollapseButton />
                    </Box>
                </SidebarNavigation.Header>
                <SidebarNavigation.Body>
                    <VerticalNavigation label="Application navigation">
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
                    <VerticalNavigation label="Account navigation">
                        <VerticalNavigation.Section>
                            <VerticalNavigation.Item>
                                <a href="#profile">
                                    <User />
                                    Profile
                                </a>
                            </VerticalNavigation.Item>
                        </VerticalNavigation.Section>
                    </VerticalNavigation>
                </SidebarNavigation.Footer>
            </SidebarNavigation>
        </div>
    ),
};

export const Collapsible: Story = {
    render: () => {
        function CollapsibleSidebarNavigation() {
            const [isCollapsed, setIsCollapsed] = useState(false);

            return (
                <SidebarNavigation
                    collapsed={isCollapsed}
                    onCollapsedChange={setIsCollapsed}
                >
                    <SidebarNavigation.Header>
                        <Box
                            direction="row"
                            align="center"
                            justify={isCollapsed ? "center" : "between"}
                        >
                            {!isCollapsed && (
                                <strong>Plaster Calculator</strong>
                            )}
                            <SidebarNavigation.CollapseButton />
                        </Box>
                    </SidebarNavigation.Header>
                    <SidebarNavigation.Body>
                        <VerticalNavigation label="Application navigation">
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
                        <VerticalNavigation label="Account navigation">
                            <VerticalNavigation.Section>
                                <VerticalNavigation.Item>
                                    <a href="#profile">
                                        <User />
                                        Profile
                                    </a>
                                </VerticalNavigation.Item>
                            </VerticalNavigation.Section>
                        </VerticalNavigation>
                        {!isCollapsed && (
                            <Button variant="secondary">Logout</Button>
                        )}
                    </SidebarNavigation.Footer>
                </SidebarNavigation>
            );
        }

        return (
            <div style={{ height: "36rem" }}>
                <CollapsibleSidebarNavigation />
            </div>
        );
    },
};
