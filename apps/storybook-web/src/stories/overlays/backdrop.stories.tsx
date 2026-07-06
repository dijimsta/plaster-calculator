import { Backdrop, Button } from "@libraries/uikit-web";
import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Backdrop> = {
    title: "UIKit/Overlays/Backdrop",
    component: Backdrop,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "A full-viewport scrim for separating drawers, dialogs, and other overlaid content from the page beneath.",
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Backdrop>;

export const Default: Story = {
    render: () => {
        const [isVisible, setIsVisible] = useState(false);

        return (
            <>
                <Button onClick={() => setIsVisible(true)}>
                    Show backdrop
                </Button>
                {isVisible && <Backdrop onClick={() => setIsVisible(false)} />}
            </>
        );
    },
};
