import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default defineConfig([pluginCypress.configs.recommended, globalIgnores(['cypress/screenshots/*', 'cypress/videos/*']), {
  plugins: {
    cypress: pluginCypress
  },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.commonjs,
      ...globals.node,
      ...globals.es2021
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-trailing-spaces': ['error'],
  },
}, {
  files: ['**/*.js'],
}]);