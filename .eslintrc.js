module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  extends: ['plugin:prettier/recommended'],
  rules: {
    'no-underscore-dangle': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  ignorePatterns: ['node_modules/*', 'dist/*'],
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: {
          rules: {
            'no-console': 'off',
            'global-require': 'off',
            'import/no-dynamic-require': 'off',
          },
        },
      },
    },
  },
};
