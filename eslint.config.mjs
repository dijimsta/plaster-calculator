import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: [
            "**/node_modules/**",
            "**/out/**",
            "**/dist/**",
            "**/.next/**",
            "**/generated/**",
            "**/*.tsbuildinfo",
            "generated/**",
            "example/**",
            "tmp/**",
            "data/**",
            "**/venv/**",
            "**/.venv/**",
            "**/__pycache__/**",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        plugins: {
            import: fixupPluginRules(importPlugin),
        },
        settings: {
            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx"],
            },
            "import/resolver": {
                node: {
                    extensions: [".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx"],
                },
                typescript: {
                    alwaysTryTypes: true,
                    noWarnOnMultipleProjects: true,
                    project: [
                        "./tsconfig.base.json",
                        "./apps/*/tsconfig.json",
                        "./functions/*/tsconfig.json",
                        "./libraries/*/tsconfig.json",
                    ],
                },
            },
        },
        rules: {
            complexity: ["error", 80],
            "import/order": [
                "error",
                {
                    alphabetize: {
                        caseInsensitive: true,
                        order: "asc",
                    },
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        ["parent", "sibling", "index"],
                        "type",
                    ],
                    "newlines-between": "always",
                },
            ],
        },
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        ...tseslint.configs.disableTypeChecked,
    },
);
