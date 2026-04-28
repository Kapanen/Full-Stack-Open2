import globals from 'globals'
import react from 'eslint-plugin-react'

export default [
  {
    ignores: ['node_modules', 'dist', 'build'],
  },

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'react/react-in-jsx-scope': 'off',

      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
    },
  },
]