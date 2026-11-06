// @ts-check
import js from '@eslint/js';
import { importX } from 'eslint-plugin-import-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: { ...globals.node },
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: { 'import-x': importX },
    rules: {
      eqeqeq: ['error', 'smart'],
      'max-lines': ['warn', 500],
      '@typescript-eslint/no-unnecessary-condition': [
        'warn',
        { allowConstantLoopConditions: true }
      ],
      'arrow-body-style': ['warn', 'as-needed'],
      '@typescript-eslint/array-type': ['warn', { default: 'array' }],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' }
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
      ],
      '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreVoid: true, ignoreIIFE: true }
      ],
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true }
      ],
      '@typescript-eslint/switch-exhaustiveness-check': ['warn'],
      'import-x/order': [
        'warn',
        {
          groups: [
            'external',
            'builtin',
            'internal',
            ['sibling', 'parent', 'index']
          ],
          pathGroups: [{ pattern: '#/**', group: 'internal' }],
          'newlines-between': 'always'
        }
      ],
      'import-x/no-duplicates': ['warn', { considerQueryString: true }]
    }
  },
  {
    files: ['**/*.mjs'],
    ...tseslint.configs.disableTypeChecked
  }
);
