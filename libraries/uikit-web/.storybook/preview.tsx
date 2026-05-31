import "tailwindcss/index.css";

import type { Preview } from "@storybook/react";

const preview: Preview = {
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-gray-100 p-8">
                <Story />
            </div>
        ),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
