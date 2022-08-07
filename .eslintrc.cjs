module.exports = {
  root: true,
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {},
  extends: [
    'airbnb-base',
    '@open-wc',
    'plugin:lit/recommended',
    'plugin:lit-a11y/recommended',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  plugins: ['sonarjs', 'html', 'no-only-tests'],
  // add your custom rules here
  rules: {
    'no-only-tests/no-only-tests': 'error',
  },
};
