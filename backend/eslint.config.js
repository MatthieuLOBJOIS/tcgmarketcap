import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  {
    files: ['**/*.js'],
    ignores: ['dist', 'node_modules'],
    extends: [js.configs.recommended, prettier],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
])
