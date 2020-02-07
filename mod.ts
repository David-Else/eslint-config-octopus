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
import { BufReader, green, bold } from './deps.ts';

interface EslintRules {
  [key: string]: any[];
}

/**
 * ============================================================================
 * Read user input
 * ============================================================================
 */

// ERROR check in console input!
async function consoleInput(stdinReader: any): Promise<string> {
  return ((await stdinReader.readString('\n')) as string).trim();
}

if (import.meta.main) {
  const stdinReader = new BufReader(Deno.stdin);
  console.clear();
  console.log(`${bold(`Welcome to the eslint rule thingie
  `)}
Would you like to use the eslint airbnb rules? Y/n:`);

  const isAirbnb = await consoleInput(stdinReader);

  console.log('Would you like to use types in your rules? Y/n:');
  const isTypes = await consoleInput(stdinReader);

  // temp nonsense example to refactor into consoleInput()
  // look here https://deno.land/std/io/bufio_test.ts
  const options = new Set(['y', 'Y', 'n', 'N', '']);
  if (!options.has(isAirbnb)) {
    throw new Error('Please enter valid option');
  } else {
    console.log('Sorted!');
  }

  if (!options.has(isTypes)) {
    throw new Error('Please enter valid option');
  } else {
    console.log('Sorted!');
  }
}

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

// use key: keyof typeof and const
export const conditions = (key: string, val: any[]): boolean =>
  !!(
    val[0] !== 'off' && // remove turned off rules
    !key.startsWith('import/') && // remove rules that use import plugin
    !rules.remove.basicPrettierConflicts.includes(key) && // remove rules conflicting with prettier
    !rules.remove.tsEslintRecommendedRules.includes(key) &&
    !rules.remove.additional.includes(key)
  );

export function ruleFilter(
  esLintRules: EslintRules,
  conditionToAccept: { (key: string, val: any[]): boolean }
): [EslintRules, string[]] {
  const removedRules: string[] = [];
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

console.log(`${green(`${removedRuleNames.length}`)} Rules Removed:

${removedRuleNames.map(ruleName => ruleName).join('\n')}

${green(`${Object.entries(rulesToAdd).length}`)} Rules Added:

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
const extendsConfigWithTypes = [
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:@typescript-eslint/recommended-requiring-type-checking'
];

const extendsConfigWithoutTypes = [
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended'
];

const rulesWithAirBnB = { ...filteredEsLintRules, ...rulesToAdd };
const rulesWithoutAirBnB = { ...rulesToAdd };

const eslintrcJson = {
  env: {
    browser: true,
    es6: true
  },
  extends: extendsConfigWithTypes,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['@typescript-eslint'],
  rules: rulesWithAirBnB
};

/**
 * ============================================================================
 * If we are running this file directly on the CLI then write the files
 * ============================================================================
 */
if (import.meta.main) {
  writeToDisk('.eslintrc.json', JSON.stringify(eslintrcJson, null, 2));
  console.log(`${green('.eslintrc.json')} file created`);
}
