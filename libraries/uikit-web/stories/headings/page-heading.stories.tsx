import { Breadcrumb, Button, PageHeading } from "../../src/index.ts";

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
                <PageHeading.Description>
                    Review the project scope and prepare an estimate.
                </PageHeading.Description>
            </PageHeading.Content>
            <PageHeading.Actions>
                <Button variant="secondary">Edit</Button>
                <Button>Create estimate</Button>
            </PageHeading.Actions>
        </PageHeading>
    ),
};
