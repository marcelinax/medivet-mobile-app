module.exports = {
  env: { es2021: true },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  parser: '@typescript-eslint/parser',
  plugins: [ '@typescript-eslint', 'react' ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'func-names': 'off',
    'array-element-newline': [
      'error',
      {
        ArrayExpression: 'consistent',
        ArrayPattern: { minItems: 3 },
      },
    ],
    'object-property-newline': [
      'error',
      {
        allowMultiplePropertiesPerLine: false,
      },
    ],
    'object-curly-newline': [ 'error' ],
    'no-multi-spaces': 'error',
    'no-irregular-whitespace': 'error',
    'no-trailing-spaces': 'error',
    'import/no-extraneous-dependencies': 'off',
    'global-require': 'off',
    'max-len': [
      'error',
      {
        code: 140,
        tabWidth: 2,
      },
    ],
    indent: [ 'error', 2 ],
    'no-tabs': 'error',
    semi: [ 'error' ],
    'linebreak-style': 'off',
    'import/no-unresolved': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'no-lone-blocks': 'error',
    'eol-last': 'error',
    'react/jsx-max-props-per-line': [ 'error', { maximum: 1 } ],
    'no-use-before-define': 'off',
    'react/style-prop-object': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/jsx-indent': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'array-bracket-newline': [ 'error', { multiline: true } ],
    'react/function-component-definition': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    curly: [
      'error',
      'multi-line',
    ],
    'array-bracket-spacing': [
      'error',
      'always',
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    'no-undef': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'no-empty-pattern': 'off',
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'react/no-array-index-key': 'off',
    'react/no-unstable-nested-components': 'off',
    '@typescript-eslint/ban-types': 'warn',
    'no-unused-vars': 'warn',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  globals: {
    React: true,
    JSX: true,
  },
  ignorePatterns: [ 'tsconfig.json' ],
};
