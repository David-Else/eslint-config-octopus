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
      IIFEs: true
    }
  ],
  "max-params": ["error", 3]
};
