import { CalendarDays, MapPin } from "lucide-react";

import { Breadcrumb, Button, PageHeading, Tabs } from "../../src/index.ts";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PageHeading> = {
    title: "Headings/Page Heading",
    component: PageHeading,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A responsive page title with optional supporting text and actions.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof PageHeading>;

export const Default: Story = {
    render: () => (
        <PageHeading>
            <PageHeading.Content>
                <PageHeading.Title>Projects</PageHeading.Title>
                <PageHeading.Description>
                    Manage estimates, questionnaires, and project details.
                </PageHeading.Description>
            </PageHeading.Content>
        </PageHeading>
    ),
};

export const WithActions: Story = {
    render: () => (
        <PageHeading>
            <PageHeading.Content>
                <PageHeading.Title>Projects</PageHeading.Title>
                <PageHeading.Description>
                    Manage estimates, questionnaires, and project details.
                </PageHeading.Description>
            </PageHeading.Content>
            <PageHeading.Actions>
                <Button variant="secondary">Export</Button>
                <Button>New project</Button>
            </PageHeading.Actions>
        </PageHeading>
    ),
};

export const WithMetaAndActions: Story = {
    render: () => (
        <PageHeading>
            <PageHeading.Content>
                <PageHeading.Title>Richmond apartment</PageHeading.Title>
                <PageHeading.Meta aria-label="Project details">
                    <PageHeading.Meta.Item>
                        <MapPin aria-hidden="true" />
                        Richmond, Victoria
                    </PageHeading.Meta.Item>
                    <PageHeading.Meta.Item>
                        <CalendarDays aria-hidden="true" />
                        <time dateTime="2026-07-02">Created 2 July 2026</time>
                    </PageHeading.Meta.Item>
                </PageHeading.Meta>
            </PageHeading.Content>
            <PageHeading.Actions>
                <Button variant="secondary">Edit</Button>
                <Button>Create estimate</Button>
            </PageHeading.Actions>
        </PageHeading>
    ),
};

export const WithActionsAndBreadcrumbs: Story = {
    render: () => (
        <PageHeading>
            <PageHeading.Breadcrumbs>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
                    <Breadcrumb.Item current>
                        Richmond apartment
                    </Breadcrumb.Item>
                </Breadcrumb>
            </PageHeading.Breadcrumbs>
            <PageHeading.Content>
                <PageHeading.Title>Richmond apartment</PageHeading.Title>
                <PageHeading.Meta aria-label="Project details">
                    <PageHeading.Meta.Item>
                        <MapPin aria-hidden="true" />
                        Richmond, Victoria
                    </PageHeading.Meta.Item>
                    <PageHeading.Meta.Item>
                        <CalendarDays aria-hidden="true" />
                        <time dateTime="2026-07-02">Created 2 July 2026</time>
                    </PageHeading.Meta.Item>
                </PageHeading.Meta>
            </PageHeading.Content>
            <PageHeading.Actions>
                <Button variant="secondary">Edit</Button>
                <Button>Create estimate</Button>
            </PageHeading.Actions>
        </PageHeading>
    ),
};

export const WithNavigation: Story = {
    render: () => (
        <PageHeading>
            <PageHeading.Content>
                <PageHeading.Title>Questionnaires</PageHeading.Title>
                <PageHeading.Description>
                    Manage project questionnaires and reusable templates.
                </PageHeading.Description>
            </PageHeading.Content>
            <PageHeading.Actions>
                <Button>New template</Button>
            </PageHeading.Actions>
            <PageHeading.Navigation>
                <Tabs>
                    <Tabs.Item>
                        <a href="#">Projects</a>
                    </Tabs.Item>
                    <Tabs.Item current>
                        <a href="#">Templates</a>
                    </Tabs.Item>
                </Tabs>
            </PageHeading.Navigation>
        </PageHeading>
    ),
};
