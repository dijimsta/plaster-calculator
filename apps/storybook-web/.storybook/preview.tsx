import "../src/styles.css";

import { NotificationsProvider } from "@libraries/uikit-web";
import type { Preview } from "@storybook/react-vite";
import { INITIAL_VIEWPORTS } from "storybook/viewport";

const preview: Preview = {
    decorators: [
        (Story) => (
            <NotificationsProvider>
                <Story />
            </NotificationsProvider>
        ),
    ],
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
