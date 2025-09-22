import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

const sharedConfig = {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
};

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '.next/',
      'next-env.d.ts',
      'out/',
      '*.config.js',
      '*.config.mjs',
      'coverage/',
    ],
  },
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      prettier,
    ],
    ...sharedConfig,
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'semi': 'off',
      'indent': 'off',
      'quotes': 'off',
      'jsx-quotes': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      prettier,
    ],
    ...sharedConfig,
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_' 
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/require-default-props': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-no-target-blank': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'max-len': [
        'error',
        {
          'ignoreComments': true,
          'ignoreStrings': true,
          'ignoreTemplateLiterals': true,
          'code': 100,
        },
      ],
      'eol-last': ['error', 'always'],
      'linebreak-style': ['error', 'unix'],
      'object-curly-newline': 'off',
      'semi': 'off',
      'indent': 'off',
      'quotes': 'off',
      'jsx-quotes': 'off',
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/quotes': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.config.{js,mjs,ts}'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: [
      '**/*.test.{js,jsx,ts,tsx}', 
      '**/__tests__/**/*', 
      '**/jest.setup.js',
      '**/test-utils/**/*'
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
        jest: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        test: 'readonly',
        vi: 'readonly',
      },
    },
    rules: {
      'max-len': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/app/**/*.{js,jsx,ts,tsx}', '**/pages/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/display-name': 'off',
    },
  }
);