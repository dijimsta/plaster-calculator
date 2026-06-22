import "tailwindcss/index.css";

import type { Preview } from "@storybook/react";

const preview: Preview = {
    decorators: [
        (Story) => (
            <div className="bg-gray-100 p-4">
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
