import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser,              // TypeScript parser
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.eslint.json', // Type-aware linting
      },
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.eslint.json',
        },
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier,
    },

    rules: {
      // Base JS rules
      ...js.configs.recommended.rules,

      // TypeScript rules
      ...tseslint.configs.recommended.rules,

      // React rules
      ...react.configs.recommended.rules,

      // React Hooks
      ...reactHooks.configs['recommended-latest'].rules,

      // React Refresh
      ...reactRefresh.configs.vite.rules,

      // Accessibility
      ...jsxA11y.configs.recommended.rules,

      // Import rules
      ...importPlugin.configs.recommended.rules,

      // Prettier integration
      ...prettier.configs.recommended.rules,
      'prettier/prettier': 'error',

      // Custom tweaks
      'react/react-in-jsx-scope': 'off',
    },
  },
])
