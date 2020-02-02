import { createRequire } from './deps.ts';
const require = createRequire(import.meta.url); // deno legacy module compatability

/**
 * ============================================================================
 * Rules to add/remove from original eslint-config-airbnb-typescript export
 *
 * The eslint-recommended ruleset is meant to be used after extending
 * eslint:recommended. It disables rules that are already checked by the
 * TypeScript compiler and enables rules that promote using the more modern
 * constructs TypeScript allows for
 * ============================================================================
 */
export const rules = {
  add: {
    v3RecommenedNoTypeInfo: {
      '@typescript-eslint/no-extra-non-null-assertion': 'error',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error'
    },
    v3RecommenedTypeInfoNeeded: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error'
      // '@typescript-eslint/restrict-template-expressions': 'error'
    },
    personalPreferences: {
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
    }
  },
  remove: {
    tsEslintRecommendedRules: Object.keys(
      require('./node_modules/@typescript-eslint/eslint-plugin/dist/configs/eslint-recommended.js')
        .default.overrides[0].rules
    ),
    basicPrettierConflicts: [
      '@typescript-eslint/brace-style',
      '@typescript-eslint/func-call-spacing',
      '@typescript-eslint/indent',
      '@typescript-eslint/semi',
      'array-bracket-spacing',
      'arrow-parens',
      'arrow-spacing',
      'block-spacing',
      'comma-dangle',
      'comma-spacing',
      'comma-style',
      'computed-property-spacing',
      'dot-location',
      'eol-last',
      'function-paren-newline',
      'generator-star-spacing',
      'implicit-arrow-linebreak',
      'key-spacing',
      'keyword-spacing',
      'linebreak-style',
      'new-parens',
      'newline-per-chained-call',
      'no-extra-semi',
      'no-floating-decimal',
      'no-mixed-spaces-and-tabs',
      'no-multi-spaces',
      'no-multiple-empty-lines',
      'no-spaced-func',
      'no-trailing-spaces',
      'no-whitespace-before-property',
      'nonblock-statement-body-position',
      'object-curly-newline',
      'object-curly-spacing',
      'object-property-newline',
      'one-var-declaration-per-line',
      'operator-linebreak',
      'padded-blocks',
      'quote-props',
      'rest-spread-spacing',
      'semi-spacing',
      'semi-style',
      'space-before-blocks',
      'space-before-function-paren',
      'space-in-parens',
      'space-infix-ops',
      'space-unary-ops',
      'switch-colon-spacing',
      'template-curly-spacing',
      'template-tag-spacing',
      'unicode-bom',
      'wrap-iife',
      'yield-star-spacing'
    ],
    additional: ['no-console'],
    // TODO add these last 2 that need additional logic
    conflictingOptions: ['curly', 'no-confusing-arrow'],
    cantBeChecked: [
      '@typescript-eslint/quotes',
      'arrow-body-style',
      'max-len',
      'no-mixed-operators',
      'no-tabs',
      'no-unexpected-multiline',
      'prefer-arrow-callback'
    ]
  }
};
