import daStyle from 'eslint-config-dicodingacademy';
import reactPlugin from 'eslint-plugin-react';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import cypressPlugin from 'eslint-plugin-cypress/flat';

export default [
  {
    ignores: ['dist', 'node_modules'],
  },
  daStyle,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'react': reactPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17+ doesn't require importing React
      'no-console': 'warn',
    },
  },
  {
    files: ['cypress/**/*.cy.{js,ts,jsx,tsx}', 'cypress/**/*.{js,ts}'],
    ...cypressPlugin.configs.recommended,
  },
];
