import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/stories/**/*.stories.@(ts|tsx)"],
    addons: [getAbsolutePath("@storybook/addon-docs")],
    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {},
    },
};

export default config;

function getAbsolutePath(value: string): string {
    return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
