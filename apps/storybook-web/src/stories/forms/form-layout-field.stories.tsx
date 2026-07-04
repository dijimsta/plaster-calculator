import { Box, FormLayoutField, Input } from "@libraries/uikit-web";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof FormLayoutField> = {
    title: "UIKit/Forms/Form Layout Field",
    component: FormLayoutField,
    tags: ["autodocs"],
    args: {
        htmlFor: "form-layout-field-input",
        label: "Email",
        labelPlacement: "above",
    },
    argTypes: {
        labelPlacement: {
            control: "select",
            options: ["above", "inset", "overlapping"],
        },
    },
    decorators: [
        (Story) => (
            <Box direction="column" padding="lg">
                <Story />
            </Box>
        ),
    ],
    render: (args) => (
        <FormLayoutField {...args}>
            <Input id="form-layout-field-input" type="email" />
        </FormLayoutField>
    ),
};

export default meta;

type Story = StoryObj<typeof FormLayoutField>;

export const Above: Story = {};

export const Inset: Story = {
    args: {
        labelPlacement: "inset",
    },
};

export const Overlapping: Story = {
    args: {
        labelPlacement: "overlapping",
    },
};
