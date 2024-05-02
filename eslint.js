/**
 * Общая часть конфига и для /src и для *.config.js|ts (vite, next)
 */
const commonForTypeScript = {
  parser: '@typescript-eslint/parser',
  extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:@typescript-eslint/strict',
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier', 'sonarjs'],
  rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-require-imports': 'error',
      '@typescript-eslint/no-useless-empty-export': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
      '@typescript-eslint/non-nullable-type-assertion-style': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/unbound-method': 'off',
      'prettier/prettier': 'error',
  },
};

/**
* Переиспользуем конфиг таким образом вместо нативного extends,
* поскольку с extends есть проблемы при организации монорепозитория и секции overrides
**/
export default const  ({ tsFilesPlugins = [] } = {}) => ({
  root: true,
  ignorePatterns: ['dist', 'build', 'public', 'storybook-static', '*.cjs'],
  extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:storybook/recommended',
      'plugin:mdx/recommended',
      'plugin:sonarjs/recommended',
      'plugin:prettier/recommended',
  ],
  rules: {
      'eol-last': ["error", "always"],
      'prettier/prettier': 'error',
      'no-console': 'error',
      'import/no-cycle': ['error', { maxDepth: '∞' }],
      'linebreak-style': ["error", "unix"],
      'import/order': [
          'error',
          {
              groups: ['builtin', 'external', 'internal', 'object', 'parent', 'sibling', 'index'],
              pathGroups: [
                  {
                      pattern: '@/**',
                      group: 'internal',
                  },
              ],
              alphabetize: {
                  order: 'asc',
              },
              'newlines-between': 'always',
          },
      ],
      'padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: '*', next: 'export' },
      ],
  },
  settings: {
      react: {
        version: 'detect',
      },
    },
  overrides: [
      { files: ['*.mdx'], parser: 'eslint-mdx', plugins: ['import', 'prettier'] },
      {
          ...commonForTypeScript,
          extends: [...commonForTypeScript.extends, ...tsFilesPlugins],
          files: ['*.tsx', '*.ts'],
          env: {
              browser: true,
              es6: true,
          },
          parserOptions: {
              ecmaVersion: 'latest',
              project: './tsconfig.json',
              sourceType: 'module',
              ecmaFeatures: {
                  jsx: true,
              },
          },
      },
      {
          ...commonForTypeScript,
          files: ['./vite.config.ts', './next.config.mjs'],
          parserOptions: {
              ecmaVersion: 'latest',
              project: './tsconfig.node.json',
          },
      },
  ],
});
