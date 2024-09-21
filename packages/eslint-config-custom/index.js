module.exports = {
    extends: [
      'next',
      'turbo',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'unused-imports'],
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      'unused-imports/no-unused-imports': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/display-name': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      'no-console': 'warn',
    },
    parserOptions: {
      babelOptions: {
        presets: [require.resolve('next/babel')],
      },
    },
  };