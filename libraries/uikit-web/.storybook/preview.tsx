import "tailwindcss/index.css";

import type { Preview } from "@storybook/react";

const preview: Preview = {
    decorators: [(Story) => <Story />],
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
