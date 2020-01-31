const basicPrettierConflicts = [
  "@typescript-eslint/brace-style",
  "@typescript-eslint/func-call-spacing",
  "@typescript-eslint/indent",
  "@typescript-eslint/semi",
  "array-bracket-spacing",
  "arrow-parens",
  "arrow-spacing",
  "block-spacing",
  "comma-dangle",
  "comma-spacing",
  "comma-style",
  "computed-property-spacing",
  "dot-location",
  "eol-last",
  "function-paren-newline",
  "generator-star-spacing",
  "implicit-arrow-linebreak",
  "key-spacing",
  "keyword-spacing",
  "linebreak-style",
  "new-parens",
  "newline-per-chained-call",
  "no-extra-semi",
  "no-floating-decimal",
  "no-mixed-spaces-and-tabs",
  "no-multi-spaces",
  "no-multiple-empty-lines",
  "no-spaced-func",
  "no-trailing-spaces",
  "no-whitespace-before-property",
  "nonblock-statement-body-position",
  "object-curly-newline",
  "object-curly-spacing",
  "object-property-newline",
  "one-var-declaration-per-line",
  "operator-linebreak",
  "padded-blocks",
  "quote-props",
  "rest-spread-spacing",
  "semi-spacing",
  "semi-style",
  "space-before-blocks",
  "space-before-function-paren",
  "space-in-parens",
  "space-infix-ops",
  "space-unary-ops",
  "switch-colon-spacing",
  "template-curly-spacing",
  "template-tag-spacing",
  "unicode-bom",
  "wrap-iife",
  "yield-star-spacing"
];
const tsEslintRecommendedRules: any[] = [];

const testRules = {
  "import/": ["on"],
  "rule 2": ["on"],
  "rule 3": [
    "on",
    {
      "rule 2 extra": true
    }
  ]
};

// array of pure functions
const rulesToRemove: ((
  key: string,
  value: any,
  conflict?: string[] | undefined
) => boolean)[][] = [
  [(key, value, conflict?) => value[0] === "off"],
  [(key, value, conflict?) => key.startsWith("import/")],
  [(key, value, conflict?) => basicPrettierConflicts.includes(key)]
  // [(key: string, value): boolean => tsEslintRecommendedRules.includes(key)]
];

function removeEsLintRules(eslintRules: any, rulesToRemove: any) {
  const origEsLintRules = new Map(Object.entries(eslintRules));
  const newEsLintRules = new Map();

  for (const [origEslintRulesKey, origEslintRulesValue] of origEsLintRules) {
    for (const [ruleToRemove] of rulesToRemove) {
      if (ruleToRemove(origEslintRulesKey, origEslintRulesValue)) {
        break;
      }
      newEsLintRules.set(origEslintRulesKey, origEslintRulesValue);
    }
  }
  return Object.fromEntries(newEsLintRules);
}

console.log(
  removeEsLintRules(testRules, rulesToRemove, basicPrettierConflicts)
);
// ty

const x: {
  "env": {
      "es6": boolean;
      "node": boolean;
  };
  "globals": {};
  "parser": string;
  "parserOptions": {
      "ecmaVersion": number;
      "sourceType": string;
      "ecmaFeatures": {
          "generators": boolean;
          "objectLiteralDuplicateProperties": boolean;
      };
  };
  "plugins": string[];
  "rules": {
      ...;
  };
  "settings": {
      ...;
  };
  "ignorePatterns": string[];
}


const y: {
  "brace-style": (string | {
      "allowSingleLine": boolean;
  })[];
  "@typescript-eslint/brace-style": (string | {
      "allowSingleLine": boolean;
  })[];
  "camelcase": (string | {
      "properties": string;
      "ignoreDestructuring": boolean;
      "ignoreImports": boolean;
  })[];

} 
= {}