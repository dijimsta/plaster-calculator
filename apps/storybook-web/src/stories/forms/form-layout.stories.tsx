import {
    Button,
    FormLayout,
    FormLayoutActions,
    FormLayoutField,
    FormLayoutSection,
    Input,
    Textarea,
} from "@libraries/uikit-web";
import { fn } from "storybook/test";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof FormLayout> = {
    title: "UIKit/Forms/Form Layout",
    component: FormLayout,
    tags: ["autodocs"],
    args: {
        onSubmit: fn(),
        variant: "stacked",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["stacked", "two-column", "cards", "labels-left"],
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Responsive form layouts for settings and data-entry screens.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof FormLayout>;

export const Stacked: Story = {
    render: (args) => (
        <FormLayout {...args}>
            <FormLayoutSection
                title="Profile"
                description="This information will be displayed publicly."
            >
                <FormLayoutField
                    label="First name"
                    htmlFor="stacked-first-name"
                    span="half"
                >
                    <Input id="stacked-first-name" name="first-name" />
                </FormLayoutField>
                <FormLayoutField
                    label="Last name"
                    htmlFor="stacked-last-name"
                    span="half"
                >
                    <Input id="stacked-last-name" name="last-name" />
                </FormLayoutField>
                <FormLayoutField
                    label="About"
                    htmlFor="stacked-about"
                    description="Write a few sentences about yourself."
                >
                    <Textarea id="stacked-about" name="about" rows={3} />
                </FormLayoutField>
            </FormLayoutSection>
            <FormLayoutActions>
                <Button type="button" variant="secondary">
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </FormLayoutActions>
        </FormLayout>
    ),
};

export const TwoColumn: Story = {
    args: {
        variant: "two-column",
    },
    render: (args) => (
        <FormLayout {...args}>
            <FormLayoutSection
                title="Profile"
                description="This information will be displayed publicly."
            >
                <FormLayoutField
                    label="First name"
                    htmlFor="two-column-first-name"
                    span="half"
                >
                    <Input id="two-column-first-name" name="first-name" />
                </FormLayoutField>
                <FormLayoutField
                    label="Last name"
                    htmlFor="two-column-last-name"
                    span="half"
                >
                    <Input id="two-column-last-name" name="last-name" />
                </FormLayoutField>
                <FormLayoutField
                    label="About"
                    htmlFor="two-column-about"
                    description="Write a few sentences about yourself."
                >
                    <Textarea id="two-column-about" name="about" rows={3} />
                </FormLayoutField>
            </FormLayoutSection>
            <FormLayoutActions>
                <Button type="button" variant="secondary">
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </FormLayoutActions>
        </FormLayout>
    ),
};

export const TwoColumnWithCards: Story = {
    args: {
        variant: "cards",
    },
    render: (args) => (
        <FormLayout {...args}>
            <FormLayoutSection
                title="Profile"
                description="This information will be displayed publicly."
            >
                <FormLayoutField
                    label="First name"
                    htmlFor="cards-first-name"
                    span="half"
                >
                    <Input id="cards-first-name" name="first-name" />
                </FormLayoutField>
                <FormLayoutField
                    label="Last name"
                    htmlFor="cards-last-name"
                    span="half"
                >
                    <Input id="cards-last-name" name="last-name" />
                </FormLayoutField>
                <FormLayoutField
                    label="About"
                    htmlFor="cards-about"
                    description="Write a few sentences about yourself."
                >
                    <Textarea id="cards-about" name="about" rows={3} />
                </FormLayoutField>
            </FormLayoutSection>
            <FormLayoutActions>
                <Button type="button" variant="secondary">
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </FormLayoutActions>
        </FormLayout>
    ),
};

export const LabelsOnLeft: Story = {
    args: {
        variant: "labels-left",
    },
    render: (args) => (
        <FormLayout {...args}>
            <FormLayoutSection
                title="Profile"
                description="This information will be displayed publicly."
            >
                <FormLayoutField
                    label="First name"
                    htmlFor="labels-left-first-name"
                >
                    <Input id="labels-left-first-name" name="first-name" />
                </FormLayoutField>
                <FormLayoutField
                    label="Last name"
                    htmlFor="labels-left-last-name"
                >
                    <Input id="labels-left-last-name" name="last-name" />
                </FormLayoutField>
                <FormLayoutField
                    label="About"
                    htmlFor="labels-left-about"
                    description="Write a few sentences about yourself."
                >
                    <Textarea id="labels-left-about" name="about" rows={3} />
                </FormLayoutField>
            </FormLayoutSection>
            <FormLayoutActions>
                <Button type="button" variant="secondary">
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </FormLayoutActions>
        </FormLayout>
    ),
};
