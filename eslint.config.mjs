import pluginJs from '@eslint/js';
import pluginTS from '@typescript-eslint/eslint-plugin';
import parserTS from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: parserTS,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        React: 'writable',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTS,
      react: pluginReact,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginTS.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
