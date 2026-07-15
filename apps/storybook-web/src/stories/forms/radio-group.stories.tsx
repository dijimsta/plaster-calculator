import { RadioGroup, RadioGroupOption } from "@libraries/uikit-web";
import { fn } from "storybook/test";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof RadioGroup> = {
    title: "UIKit/Forms/Radio Group",
    component: RadioGroup,
    tags: ["autodocs"],
    args: {
        onChange: fn(),
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Accessible radio group for choosing one option from a labelled set.",
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="max-w-lg p-8">
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
    render: (args) => (
        <RadioGroup {...args} name="notification-method" legend="Notifications">
            <RadioGroupOption value="email" label="Email" defaultChecked />
            <RadioGroupOption value="sms" label="SMS" />
            <RadioGroupOption value="push" label="Push notification" />
        </RadioGroup>
    ),
};

export const WithDescriptions: Story = {
    render: (args) => (
        <RadioGroup
            {...args}
            name="plan"
            legend="Select a plan"
            description="Choose the plan that best fits your team."
        >
            <RadioGroupOption
                value="startup"
                label="Startup"
                description="Up to 5 users and 10 GB of storage."
                defaultChecked
            />
            <RadioGroupOption
                value="business"
                label="Business"
                description="Up to 25 users and 100 GB of storage."
            />
            <RadioGroupOption
                value="enterprise"
                label="Enterprise"
                description="Unlimited users, storage, and priority support."
            />
        </RadioGroup>
    ),
};

export const Inline: Story = {
    render: (args) => (
        <RadioGroup
            {...args}
            name="memory"
            legend="Memory"
            variant="inline"
            size="sm"
        >
            <RadioGroupOption value="4" label="4 GB" />
            <RadioGroupOption value="8" label="8 GB" defaultChecked />
            <RadioGroupOption value="16" label="16 GB" />
            <RadioGroupOption value="32" label="32 GB" disabled />
        </RadioGroup>
    ),
};

export const Cards: Story = {
    render: (args) => (
        <RadioGroup
            {...args}
            name="hosting-plan"
            legend="Select a hosting plan"
            variant="cards"
        >
            <RadioGroupOption
                value="hobby"
                label="Hobby"
                description="$10/month for personal projects."
            />
            <RadioGroupOption
                value="startup"
                label="Startup"
                description="$40/month for growing teams."
                defaultChecked
            />
            <RadioGroupOption
                value="business"
                label="Business"
                description="$80/month with priority support."
                disabled
            />
        </RadioGroup>
    ),
};

export const SmallCards: Story = {
    render: (args) => (
        <RadioGroup
            {...args}
            name="storage"
            legend="Storage"
            variant="small-cards"
        >
            <RadioGroupOption value="128" label="128 GB" />
            <RadioGroupOption value="256" label="256 GB" defaultChecked />
            <RadioGroupOption value="512" label="512 GB" />
            <RadioGroupOption value="1024" label="1 TB" disabled />
        </RadioGroup>
    ),
};

export const Segmented: Story = {
    render: (args) => (
        <RadioGroup
            {...args}
            name="overlay-mode"
            legend="Overlay mode"
            variant="segmented"
        >
            <RadioGroupOption value="none" label="None" defaultChecked />
            <RadioGroupOption value="grid" label="Grid" />
            <RadioGroupOption value="outline" label="Outline" />
        </RadioGroup>
    ),
};

export const List: Story = {
    render: (args) => (
        <RadioGroup
            {...args}
            name="environment"
            legend="Environment"
            variant="list"
        >
            <RadioGroupOption
                value="development"
                label="Development"
                description="Frequent deployments for active development."
                defaultChecked
            />
            <RadioGroupOption
                value="staging"
                label="Staging"
                description="Pre-production testing and review."
            />
            <RadioGroupOption
                value="production"
                label="Production"
                description="Stable releases for customers."
            />
        </RadioGroup>
    ),
};

export const ListWithRadioOnRight: Story = {
    render: (args) => (
        <RadioGroup
            {...args}
            name="delivery-window"
            legend="Delivery window"
            variant="list-right"
        >
            <RadioGroupOption
                value="weekday"
                label="Weekdays"
                description="Free"
                defaultChecked
            />
            <RadioGroupOption
                value="saturday"
                label="Saturday"
                description="$10"
            />
            <RadioGroupOption
                value="priority"
                label="Priority"
                description="$25"
            />
        </RadioGroup>
    ),
};

export const TableStyle: Story = {
    render: (args) => (
        <RadioGroup
            {...args}
            name="team-plan"
            legend="Team plan"
            variant="table"
        >
            <RadioGroupOption
                value="basic"
                label="Basic"
                description="5 users · 10 GB"
            />
            <RadioGroupOption
                value="pro"
                label="Pro"
                description="25 users · 100 GB"
                defaultChecked
            />
            <RadioGroupOption
                value="enterprise"
                label="Enterprise"
                description="Unlimited users and storage"
            />
        </RadioGroup>
    ),
};

export const Disabled: Story = {
    render: (args) => (
        <RadioGroup {...args} name="delivery" legend="Delivery method" disabled>
            <RadioGroupOption
                value="standard"
                label="Standard"
                defaultChecked
            />
            <RadioGroupOption value="express" label="Express" />
        </RadioGroup>
    ),
};
