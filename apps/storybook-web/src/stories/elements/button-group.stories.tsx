import { Button, ButtonGroup } from "@libraries/uikit-web";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { fn } from "storybook/test";

const meta: Meta<typeof ButtonGroup> = {
    title: "UIKit/Elements/Button Group",
    component: ButtonGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Visually joins related buttons into a single action group.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Basic: Story = {
    render: (args) => (
        <ButtonGroup {...args} label="Text alignment">
            <Button variant="secondary" onClick={fn()}>
                Left
            </Button>
            <Button variant="secondary" onClick={fn()}>
                Centre
            </Button>
            <Button variant="secondary" onClick={fn()}>
                Right
            </Button>
        </ButtonGroup>
    ),
};

export const IconOnly: Story = {
    render: (args) => (
        <ButtonGroup {...args} label="Pagination">
            <Button
                variant="secondary"
                label="Previous page"
                icon={<ChevronLeft aria-hidden="true" />}
                onClick={fn()}
            />
            <Button
                variant="secondary"
                label="Next page"
                icon={<ChevronRight aria-hidden="true" />}
                onClick={fn()}
            />
        </ButtonGroup>
    ),
};

export const WithStat: Story = {
    render: (args) => (
        <ButtonGroup {...args} label="Reactions">
            <Button variant="secondary" onClick={fn()}>
                Like
            </Button>
            <Button variant="secondary" label="12 likes" onClick={fn()}>
                12
            </Button>
        </ButtonGroup>
    ),
};

export const WithDropdown: Story = {
    render: (args) => (
        <ButtonGroup {...args} label="Save options">
            <Button variant="secondary" onClick={fn()}>
                Save
            </Button>
            <Button
                variant="secondary"
                label="More save options"
                icon={<ChevronDown aria-hidden="true" />}
                onClick={fn()}
            />
        </ButtonGroup>
    ),
};
