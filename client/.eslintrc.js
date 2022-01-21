module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended', 'airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-unescaped-entities': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/default-props-match-prop-types': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-shadow': 'warn',
    'no-console': 0,
    'no-restricted-syntax': 'warn',
    'no-plusplus': 'warn',
    'no-unused-vars': 'warn',
    'no-param-reassign': 'warn',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
