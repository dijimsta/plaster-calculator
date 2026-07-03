import "../src/styles.css";

import { INITIAL_VIEWPORTS } from "storybook/viewport";

import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
    decorators: [(Story) => <Story />],
    parameters: {
        options: {
            storySort: {
                method: "alphabetical",
            },
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        viewport: {
            options: INITIAL_VIEWPORTS,
        },
    },
};

export default preview;
