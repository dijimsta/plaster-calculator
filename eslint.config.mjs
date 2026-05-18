import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

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
        rules: {
            complexity: ["error", 80],
        },
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        ...tseslint.configs.disableTypeChecked,
    },
);
