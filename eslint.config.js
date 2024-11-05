// eslint.config.js
import { defineConfig } from 'eslint-define-config';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import { ESLint } from 'eslint';

const eslint = new ESLint();

export default defineConfig([
    {
        languageOptions: {
            parser: '@typescript-eslint/parser', // Precisamos passar um objeto aqui, não uma string
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslintPlugin,
        },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },
]);
