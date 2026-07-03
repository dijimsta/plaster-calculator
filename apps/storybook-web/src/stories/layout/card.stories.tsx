import { Badge, Button, Card, Label, SelectMenu } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Card> = {
    title: "UIKit/Layout/Card",
    component: Card,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Application UI surface container with optional title, button group, and footer slots.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
    render: () => (
        <Card>
            <Card.Title>Project summary</Card.Title>
            <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                Review plaster scope, estimated labour, and material allowances
                before sending the quote.
            </p>
            <Card.Footer>
                Last updated <time dateTime="2026-06-23">23 June 2026</time>.
            </Card.Footer>
        </Card>
    ),
};

export const WithActions: Story = {
    render: () => (
        <Card>
            <Card.Title>Invite team members</Card.Title>
            <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                Add estimators and site supervisors who need access to this
                project.
            </p>
            <Card.ButtonGroup>
                <Button>Add member</Button>
                <Button variant="secondary">Copy invite link</Button>
            </Card.ButtonGroup>
            <Card.Footer>Invitations expire after seven days.</Card.Footer>
        </Card>
    ),
};

export const TitleOnly: Story = {
    render: () => (
        <Card>
            <Card.Title>Card title</Card.Title>
        </Card>
    ),
};

export const WithHeader: Story = {
    render: () => (
        <Card>
            <Card.Header>
                <Card.Title>Scope questionnaire</Card.Title>
                <Button variant="secondary">Edit</Button>
            </Card.Header>
            <Card.Footer>Last updated 1 July 2026.</Card.Footer>
        </Card>
    ),
};

export const WithHeaderAndBody: Story = {
    render: () => (
        <Card>
            <Card.Header>
                <Badge color="green">Confirmed</Badge>
                <Button variant="secondary">Confirm</Button>
            </Card.Header>
            <Card.Body>
                <Label>What type of cornice is specified?</Label>
                <SelectMenu
                    options={[
                        { value: "cove", label: "Cove" },
                        { value: "square", label: "Square set" },
                        { value: "other", label: "Other" },
                    ]}
                />
            </Card.Body>
        </Card>
    ),
};

export const WithFooterOnly: Story = {
    render: () => (
        <Card>
            <Card.Footer>
                Footer text with an <a href="#">inline link</a>.
            </Card.Footer>
        </Card>
    ),
};
