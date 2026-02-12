import noUnsanitized from 'eslint-plugin-no-unsanitized';

export default [
  {
    files: ['**/*.js'],
    ignores: ['**/node_modules/**'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    plugins: {
      'no-unsanitized': noUnsanitized
    },
    rules: {
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error'
    }
  }
];
