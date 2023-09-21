module.exports = {
  defaultNamespace: 'translation',
  lexers: {
    js: [ 'JsxLexer' ],
    default: [ 'JavascriptLexer' ],
    ts: [ 'JavascriptLexer' ],
    tsx: [ 'JsxLexer' ],
  },
  locales: [ 'pl' ],
  output: 'translations/$LOCALE/$NAMESPACE.json',
  input: '**/*.{ts,tsx}',
  js: [
    {
      lexer: 'JavascriptLexer',
      functions: [ 't' ],
    },
  ],
  react: {
    useSuspense: false,
    wait: true,
  },
};
