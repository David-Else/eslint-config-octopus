export const rulesToAdd = {
  "@typescript-eslint/no-floating-promises": "error",
  "@typescript-eslint/restrict-plus-operands": "error",
  "@typescript-eslint/no-extra-non-null-assertion": "error",
  "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
  "@typescript-eslint/explicit-function-return-type": "error",
  "@typescript-eslint/no-parameter-properties": "off",
  "@typescript-eslint/member-ordering": "error",
  "@typescript-eslint/array-type": "error",
  "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
  "@typescript-eslint/no-unnecessary-condition": "error",
  "@typescript-eslint/no-unnecessary-qualifier": "error",
  "@typescript-eslint/no-unnecessary-type-arguments": "error",
  "@typescript-eslint/prefer-for-of": "error",
  "@typescript-eslint/prefer-readonly": "error",
  "@typescript-eslint/unified-signatures": "error",
  "@typescript-eslint/prefer-nullish-coalescing": "error",
  "@typescript-eslint/prefer-optional-chain": "error",
  complexity: ["error", 10],
  "max-lines-per-function": [
    "error",
    {
      max: 50,
      skipBlankLines: true,
      skipComments: true,
      IIFEs: true,
    },
  ],
  "max-params": ["error", 3],
} as const;

/**
 * These rules are meant to be removed by:
 *
 * ```
 * "extends": [ "plugin:@typescript-eslint/recommended" ]
 * ```
 * and are designed to be used after extending a config that turns them on
 * Our new config will have precidence so we need them removed from `"rules": {}`
 */
export const checkedByTypeScript: readonly string[] = [
  "getter-return", // ts(2378)
  "no-dupe-args", // ts(2300)
  "no-dupe-keys", // ts(1117)
  "no-unreachable", // ts(7027)
  "valid-typeof", // ts(2367)
  "no-const-assign", // ts(2588)
  "no-new-symbol", // ts(2588)
  "no-this-before-super", // ts(2376)
  "no-undef", // This is checked by Typescript using the option `strictNullChecks`.
  "no-dupe-class-members",
  "no-redeclare",
];

export const userRulesToRemove: readonly string[] = [
  "no-console",
  "lines-between-class-members",
  "@typescript-eslint/camelcase", // temp until airbnb update for eslint 7
];

export type rulesToRemove = typeof checkedByTypeScript[number] &
  typeof userRulesToRemove[number];
