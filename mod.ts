/**
 * @file Creates a .eslintrc.json config file for typescript-eslint with rules
 * @author David Else <david@elsewebdevelopment.com>
 * @copyright 2020 David Else
 * @license gpl-3.0
 * @version 0.8
 *
 * deno --allow-read --allow-write --allow-run src/mod.ts
 */

import { rules } from './rules.ts';
import { runCommandReturnResults, writeToDisk } from './utils.ts';

/**
 * ============================================================================
 * Create obj that contains all the rules for eslint-config-airbnb-typescript
 *
 * This is done by running eslint on the command line with `--print-config`
 * Eslint looks at package.json for the config that points to
 * `airbnb-typescript/base`, so DON'T change that!
 *
 * The only dependency is the the `import` plugin, but we will strip that out
 * so we only need a single text file with zero dependencies
 * ============================================================================
 */
const path = new URL('./', import.meta.url).pathname;
const entireEslintConfig = await runCommandReturnResults([
  'npx',
  'eslint',
  '--no-eslintrc',
  '-c',
  `${path}/package.json`,
  '--print-config',
  'example.js'
]);

/**
 * ============================================================================
 * Create the new final list of rules by filering out ones we don't want
 * ============================================================================
 */
interface EslintRules {
  [key: string]: any[];
}

export const conditions = (key: string, val: any[]): boolean =>
  !!(
    val[0] !== 'off' && // remove turned off rules
    !key.startsWith('import/') && // remove rules that use import plugin
    !rules.remove.basicPrettierConflicts.includes(key) && // remove rules that conflict with prettier
    !rules.remove.tsEslintRecommendedRules.includes(key) &&
    !rules.remove.additional.includes(key)
  );

export function ruleFilter(
  esLintRules: EslintRules,
  conditionToAccept: { (key: string, val: any[]): boolean }
): [EslintRules, string[]] {
  const removedRules = [];
  return [
    Object.fromEntries(
      Object.entries(esLintRules).filter(([key, val]) => {
        if (conditionToAccept(key, val)) {
          return true;
        }
        removedRules.push(key);
        return false;
      })
    ),
    removedRules
  ];
}

const [filteredEsLintRules, removedRuleNames] = ruleFilter(
  entireEslintConfig.rules,
  conditions
);

const rulesToAdd = {
  ...rules.add.v3RecommenedNoTypeInfo,
  ...rules.add.v3RecommenedTypeInfoNeeded,
  ...rules.add.personalPreferences
};

/**
 * ============================================================================
 * Output to the console the rules removed and to be added
 * ============================================================================
 */
const bold = (text: string): string => `\x1b[1m${text}\x1b[0m`;

console.log(`${bold(`${removedRuleNames.length}`)} Rules Removed:

${removedRuleNames.map(ruleName => ruleName).join('\n')}

${bold(`${Object.entries(rulesToAdd).length}`)} Rules Added:

${Object.entries(rulesToAdd)
  .map(ruleName => ruleName[0])
  .join('\n')}
`);

/**
 * ============================================================================
 * Build the config files we are going to write to disk
 * * note anything in the `rules` section will overwrite the `extends` section
 * ============================================================================
 */
const eslintignore = `# don't ever lint node_modules
node_modules
# don't lint build output (make sure it's set to your correct build folder name)
dist
.eslintrc.json`;

const eslintrcJson = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  rules: { ...filteredEsLintRules, ...rulesToAdd }
};

/**
 * ============================================================================
 * If we are running this file directly on the CLI then write the files
 * ============================================================================
 */
if (import.meta.main) {
  writeToDisk('.eslintrc.json', JSON.stringify(eslintrcJson, null, 2));
  writeToDisk('.eslintignore', eslintignore);
  console.log(`${bold('.eslintrc.json')} file created`);
}
