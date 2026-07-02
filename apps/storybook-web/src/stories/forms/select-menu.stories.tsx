import { Label, SelectMenu } from "@libraries/uikit-web";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

const locations = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "mx", label: "Mexico" },
];

const meta: Meta<typeof SelectMenu> = {
    title: "Forms/SelectMenu",
    component: SelectMenu,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Native select element with consistent styling. Use for short, known option lists where search is not needed. Requires controlled value and onChange.",
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="p-8 max-w-xs">
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof SelectMenu>;

function ControlledSelectMenu(
    args: Omit<React.ComponentProps<typeof SelectMenu>, "value" | "onChange">,
) {
    const [value, setValue] = useState(args.options[0]?.value ?? "");
    return (
        <SelectMenu
            {...args}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

export const Default: Story = {
    render: (args) => (
        <div className="grid gap-1.5">
            <Label htmlFor="select-default">Location</Label>
            <ControlledSelectMenu id="select-default" {...args} />
        </div>
    ),
    args: {
        options: locations,
    },
};

export const WithoutLabel: Story = {
    render: (args) => <ControlledSelectMenu {...args} />,
    args: {
        options: locations,
    },
};

export const Disabled: Story = {
    render: (args) => (
        <div className="grid gap-1.5">
            <Label htmlFor="select-disabled">Location</Label>
            <SelectMenu id="select-disabled" {...args} />
        </div>
    ),
    args: {
        options: locations,
        value: "ca",
        disabled: true,
    },
};
