import { BusyOverlay, Button } from "@libraries/uikit-web";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

const meta: Meta<typeof BusyOverlay> = {
    title: "UIKit/Overlays/BusyOverlay",
    component: BusyOverlay,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A full-viewport busy indicator that blocks interaction while an operation is in progress.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof BusyOverlay>;

export const Default: Story = {
    args: {
        message: "Loading…",
    },
};

export const Interactive: Story = {
    render: () => {
        const [isBusy, setIsBusy] = useState(false);

        return (
            <>
                <Button onClick={() => setIsBusy(true)}>Start task</Button>
                {isBusy && <BusyOverlay message="Saving your changes…" />}
            </>
        );
    },
};
