module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: ['prettier', 'eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'warn',
    'react/display-name': 'off',
    'no-case-declarations': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/jsx-key': 'warn',
    'no-dupe-keys': 'warn',
  },
}
