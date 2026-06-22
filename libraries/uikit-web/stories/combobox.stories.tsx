import { useState } from "react";

import { Combobox } from "../src/combobox/combobox.component.tsx";
import { Label } from "../src/label/label.component.tsx";

import type { Meta, StoryObj } from "@storybook/react";

const people = [
    { value: "leslie-alexander", label: "Leslie Alexander" },
    { value: "michael-foster", label: "Michael Foster" },
    { value: "dries-vincent", label: "Dries Vincent" },
    { value: "lindsay-walton", label: "Lindsay Walton" },
    { value: "courtney-henry", label: "Courtney Henry" },
    { value: "tom-cook", label: "Tom Cook" },
    { value: "whitney-francis", label: "Whitney Francis" },
    { value: "leonard-krasner", label: "Leonard Krasner" },
];

const meta: Meta<typeof Combobox> = {
    title: "Forms/Combobox",
    component: Combobox,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Searchable single-select dropdown. Filters a static option list as the user types. Requires controlled value and onChange.",
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

type Story = StoryObj<typeof Combobox>;

function ControlledCombobox(
    args: Omit<React.ComponentProps<typeof Combobox>, "value" | "onChange">,
) {
    const [value, setValue] = useState<string | null>(null);
    return (
        <div className="grid gap-1.5">
            <Label htmlFor="combobox-story">Assigned to</Label>
            <Combobox
                {...args}
                id="combobox-story"
                value={value}
                onChange={setValue}
            />
        </div>
    );
}

export const Default: Story = {
    render: (args) => <ControlledCombobox {...args} />,
    args: {
        options: people,
        placeholder: "Search...",
    },
};

export const WithPreselectedValue: Story = {
    render: (args) => <ControlledCombobox {...args} />,
    args: {
        options: people,
        placeholder: "Search...",
    },
};

export const Disabled: Story = {
    render: (args) => (
        <div className="grid gap-1.5">
            <Label htmlFor="combobox-disabled">Assigned to</Label>
            <Combobox {...args} id="combobox-disabled" />
        </div>
    ),
    args: {
        options: people,
        value: "tom-cook",
        disabled: true,
    },
};
