import "../src/themes/light.css";
import "../src/themes/dark.css";

import type { Preview } from "@storybook/react";

const preview: Preview = {
    globalTypes: {
        theme: {
            description: "Color theme",
            toolbar: {
                title: "Theme",
                icon: "circlehollow",
                items: [
                    { value: "light", title: "Light", icon: "sun" },
                    { value: "dark", title: "Dark", icon: "moon" },
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: {
        theme: "light",
    },
    decorators: [
        (Story, context) => {
            const theme =
                (context.globals["theme"] as string | undefined) ?? "light";
            return (
                <div
                    data-theme={theme}
                    style={{
                        minHeight: "100vh",
                        background: "var(--color-background)",
                        color: "var(--color-text-primary)",
                    }}
                >
                    <Story />
                </div>
            );
        },
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
