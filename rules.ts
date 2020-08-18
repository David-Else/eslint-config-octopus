export const rulesToAdd = {
  "@typescript-eslint/lines-between-class-members": "off",
  // the unsafe rules don't work with deno
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-unsafe-return": "off",
  "@typescript-eslint/no-unnecessary-condition": "error",
  "@typescript-eslint/no-unnecessary-qualifier": "error",
  "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
  "@typescript-eslint/no-unnecessary-type-arguments": "error",
  "@typescript-eslint/no-dynamic-delete": "error",
  "@typescript-eslint/no-require-imports": "error",
  "@typescript-eslint/no-throw-literal": "error",
  "@typescript-eslint/prefer-readonly": "error",
  "@typescript-eslint/prefer-readonly-parameter-types": "error",
  "@typescript-eslint/prefer-nullish-coalescing": "error",
  "@typescript-eslint/prefer-optional-chain": "error",
  "@typescript-eslint/prefer-string-starts-ends-with": "error",
  "@typescript-eslint/prefer-ts-expect-error": "error",
  "@typescript-eslint/consistent-type-assertions": "error",
  "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
  "@typescript-eslint/member-delimiter-style": "error",
  "@typescript-eslint/member-ordering": "error",
  "@typescript-eslint/method-signature-style": "error",
  "@typescript-eslint/array-type": "error",
  "@typescript-eslint/switch-exhaustiveness-check": "error",
  "@typescript-eslint/explicit-function-return-type": "error",
  "no-console": "off",
  "max-lines-per-function": [
    "error",
    {
      max: 50,
      skipBlankLines: true,
      skipComments: true,
      IIFEs: true,
    },
  ],
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
];

export type RulesToRemove = typeof checkedByTypeScript[number] &
  typeof userRulesToRemove[number];
