import { fixupPluginRules } from "@eslint/compat";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

const typescriptFiles = ["**/*.ts"];
const tsxFiles = ["**/*.tsx"];

const typescriptLanguageOptions = {
    globals: {
        ...globals.node,
        ...globals.browser,
    },
};

const javascriptLanguageOptions = {
    globals: {
        ...globals.node,
        ...globals.browser,
    },
};

const importSettings = {
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
};

const importPlugins = {
    import: fixupPluginRules(importPlugin),
};

const maxLinesOptions = {
    skipBlankLines: true,
    skipComments: true,
};

const sharedTypescriptRules = {
    complexity: ["error", { max: 14, variant: "modified" }],
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
};

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
        files: typescriptFiles,
        languageOptions: typescriptLanguageOptions,
        plugins: importPlugins,
        settings: importSettings,
        rules: {
            ...sharedTypescriptRules,
            "max-lines": ["warn", { ...maxLinesOptions, max: 300 }],
        },
    },
    {
        files: tsxFiles,
        languageOptions: {
            ...typescriptLanguageOptions,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: importPlugins,
        settings: importSettings,
        rules: {
            ...sharedTypescriptRules,
            "max-lines": ["warn", { ...maxLinesOptions, max: 450 }],
        },
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        ...tseslint.configs.disableTypeChecked,
        languageOptions: javascriptLanguageOptions,
    },
);
