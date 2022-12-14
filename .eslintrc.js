module.exports = {
    env: { es2021: true },
    extends: [
        'plugin:react/recommended',
        'airbnb',
      ],
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'no-undef': 'error',
        'func-names': 'off',
        'react/function-component-definition': 'off',
        'array-element-newline': [
        'error', {
            ArrayExpression: 'consistent',
            ArrayPattern: { minItems: 2 },
        },
        ],
        'object-property-newline': [
        'error', {
            allowMultiplePropertiesPerLine: false,
        },
        ],
        'object-curly-newline': ['error'],
        'no-multi-spaces': 'error',
        'no-irregular-whitespace': 'error',
        'no-trailing-spaces': 'error',
        'import/no-extraneous-dependencies': 'off',
        'global-require': 'off',
        'max-len': [
        'error', {
            code: 140,
            tabWidth: 2,
        },
        ],
        indent: ['error', 2],
        'no-tabs': 'error',
        semi: ['error'],
        'linebreak-style': 'off',
        'import/no-unresolved': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-filename-extension': 'off',
        'no-lone-blocks': 'error',
        'eol-last': 'error',
        'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
        'no-use-before-define': 'off',
        'react/style-prop-object': 'off',
        'no-unused-vars': 'warn',
        'react/jsx-indent': 'off',
        'consistent-return': 'off',
        'import/prefer-default-export': 'off',
        'array-bracket-newline': ['error', { multiline: true }]
    }
}