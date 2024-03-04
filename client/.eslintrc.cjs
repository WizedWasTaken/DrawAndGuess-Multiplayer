/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  plugins: ['jsdoc'],

  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'jsdoc/check-alignment': 'error', // Ensures JSDoc comments are aligned
    'jsdoc/check-param-names': 'error', // Checks parameter names match documentation
    'jsdoc/check-tag-names': 'error', // Ensures JSDoc tags are valid
    'jsdoc/check-types': 'error', // Ensures JSDoc types are valid
    'jsdoc/require-jsdoc': [
      'error',
      {
        // Requires JSDoc comments for documentation
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true
        }
      }
    ]
  }
}
