import { Input, Label } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Label> = {
    title: "UIKit/Forms/Label",
    component: Label,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Accessible form label that associates descriptive text with a form control.",
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="max-w-xs p-8">
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
    args: {
        children: "Email address",
    },
};

export const WithRequiredIndicator: Story = {
    args: {
        children: (
            <>
                Email address <span className="text-red-600">*</span>
            </>
        ),
    },
};

export const WithFormControl: Story = {
    render: () => (
        <div className="grid gap-1.5">
            <Label htmlFor="label-email">Email address</Label>
            <Input
                id="label-email"
                type="email"
                placeholder="you@example.com"
            />
        </div>
    ),
};
