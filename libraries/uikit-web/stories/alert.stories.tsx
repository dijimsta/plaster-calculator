import { Alert } from "../src/alert/alert.component.tsx";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Alert> = {
    title: "Feedback/Alert",
    component: Alert,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Contextual feedback message with an icon, optional title, and body text. Supports five intents.",
            },
        },
    },
    argTypes: {
        intent: {
            control: "select",
            options: ["neutral", "info", "warn", "error", "success"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
    args: {
        intent: "warn",
        title: "Attention needed",
        children:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam quo totam eius aperiam dolorum.",
    },
};

export const TitleOnly: Story = {
    args: {
        intent: "info",
        title: "A new software update is available.",
    },
};

export const BodyOnly: Story = {
    args: {
        intent: "success",
        children: "Your changes have been saved successfully.",
    },
};

export const AllIntents: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <Alert intent="neutral" title="Note">
                This is a neutral informational message.
            </Alert>
            <Alert intent="info" title="Info">
                A new software update is available. See what&apos;s new in
                version 2.0.4.
            </Alert>
            <Alert intent="warn" title="Attention needed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                pariatur, ipsum similique veniam quo totam eius aperiam dolorum.
            </Alert>
            <Alert
                intent="error"
                title="There were errors with your submission"
            >
                Your account has been suspended. Please contact support to
                resolve this issue.
            </Alert>
            <Alert intent="success" title="Payment successful">
                Your payment of $29.00 has been processed successfully.
            </Alert>
        </div>
    ),
};
