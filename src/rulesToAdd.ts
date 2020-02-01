// Newer rules that will be recommened in v3 of typescript-eslint
// https://github.com/typescript-eslint/typescript-eslint/issues/1423
//
// Remove these when v3 comes out

// v3 recommended (rules without type information)

export const v3RecommenedNoTypeInfo = {
  '@typescript-eslint/no-extra-non-null-assertion': 'error',
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'error'
};

// v3 recommended with type info

export const v3RecommenedTypeInfo = {
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-implied-eval': 'error',
  '@typescript-eslint/restrict-plus-operands': 'error'
  // '@typescript-eslint/restrict-template-expressions': 'error'
};

export const personalPreferences = {
  '@typescript-eslint/explicit-function-return-type': 'error',
  '@typescript-eslint/no-parameter-properties': 'off',
  '@typescript-eslint/member-ordering': 'error',
  '@typescript-eslint/array-type': 'error',
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  '@typescript-eslint/no-unnecessary-condition': 'error',
  '@typescript-eslint/no-unnecessary-qualifier': 'error',
  '@typescript-eslint/no-unnecessary-type-arguments': 'error',
  '@typescript-eslint/prefer-for-of': 'error',
  '@typescript-eslint/prefer-readonly': 'error',
  '@typescript-eslint/unified-signatures': 'error',
  '@typescript-eslint/prefer-nullish-coalescing': 'error',
  '@typescript-eslint/prefer-optional-chain': 'error',
  complexity: ['error', 10],
  'max-lines-per-function': [
    'error',
    {
      max: 50,
      skipBlankLines: true,
      skipComments: true,
      IIFEs: true
    }
  ],
  'max-params': ['error', 3]
};
