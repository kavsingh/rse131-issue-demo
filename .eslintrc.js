const config = require('./config');

module.exports = {
  parser: 'babel-eslint',
  settings: { 'import/resolver': 'webpack' },
  env: { node: true, browser: false },
  plugins: ['prettier'],
  extends: ['airbnb', 'prettier', 'prettier/react'],
  rules: {
    'prettier/prettier': 'warn',
    'no-console': 'off',
    'no-alert': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
  },
  overrides: [
    {
      files: 'src/**/*.js',
      env: { node: false, browser: true },
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: false },
        ],
      },
      globals: Object.keys(config).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
    },
    {
      files: 'src/**/*.test.js',
      env: { jest: true },
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
    {
      files: 'scripts/bin/**/*.js',
      rules: { 'no-console': 'off' },
    },
  ],
};
