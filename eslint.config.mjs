import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";

const nextRules = nextPlugin.configs.recommended.rules;

export default [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "next-env.d.ts"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextRules,
    },
  },
];
