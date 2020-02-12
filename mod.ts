/**
 * @file Creates a .eslintrc.json config file for typescript-eslint with rules
 * @author David Else <david@elsewebdevelopment.com>
 * @copyright 2020 David Else
 * @license gpl-3.0
 * @version 1.0
 *
 * deno --allow-read --allow-write --allow-run src/mod.ts
 */

import { rulesToAdd } from './rulesToAdd.ts';
import { outputToConsole } from './view.ts';

interface EslintRules {
  [key: string]: any[];
}

/**
 * ============================================================================
 * Generate eslint rules based on airbnb with prettier conflicts turned off
 * ============================================================================
 */
const path = new URL('./', import.meta.url).pathname;
const eslintConfigFile = 'airbnb_prettier_config.json';

const subprocess = Deno.run({
  args: [
    'npx',
    'eslint',
    '--no-eslintrc',
    '-c',
    `${path}/${eslintConfigFile}`,
    '--print-config',
    'example.js'
  ],
  stdout: 'piped'
});
const commandOutput = await Deno.readAll(subprocess.stdout!);
const entireEslintConfig = JSON.parse(new TextDecoder().decode(commandOutput));

/**
 * ============================================================================
 * Remove rules:
 * ============================================================================
 */
export const rulesToRemove = (key: string, val: any[]): boolean => {
  const eslintRecommended = Object.keys({
    // Checked by Typescript - ts(2378)
    'getter-return': 'off',
    // Checked by Typescript - ts(2300)
    'no-dupe-args': 'off',
    // Checked by Typescript - ts(1117)
    'no-dupe-keys': 'off',
    // Checked by Typescript - ts(7027)
    'no-unreachable': 'off',
    // Checked by Typescript - ts(2367)
    'valid-typeof': 'off',
    // Checked by Typescript - ts(2588)
    'no-const-assign': 'off',
    // Checked by Typescript - ts(2588)
    'no-new-symbol': 'off',
    // Checked by Typescript - ts(2376)
    'no-this-before-super': 'off',
    // This is checked by Typescript using the option `strictNullChecks`.
    'no-undef': 'off',
    // This is already checked by Typescript.
    'no-dupe-class-members': 'off',
    // This is already checked by Typescript.
    'no-redeclare': 'off'
  });

  const userRulesToRemove = ['no-console'];

  return !!(
    val[0] !== 'off' && // turned off rules
    !key.startsWith('import/') && // rules that use import plugin
    !eslintRecommended.includes(key) &&
    !userRulesToRemove.includes(key)
  );
};

export function ruleFilter(
  esLintRules: EslintRules,
  rulesToRemoveCallback: { (key: string, val: any[]): boolean }
): [EslintRules, string[]] {
  const removedRules: string[] = [];
  return [
    Object.fromEntries(
      Object.entries(esLintRules).filter(([key, val]) => {
        if (rulesToRemoveCallback(key, val)) {
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
  rulesToRemove
);

/**
 * ============================================================================
 * Define the new .eslintrc.json including the new rules
 * ============================================================================
 */
const eslintrcJson = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
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
 * Write to disk and output log to console
 * ============================================================================
 */
async function writeToDisk(fileName: string, data: string): Promise<void> {
  const encoder = new TextEncoder();
  await Deno.writeFile(fileName, encoder.encode(data));
}

await writeToDisk('.eslintrc.json', JSON.stringify(eslintrcJson, null, 2));
outputToConsole(removedRuleNames, Object.keys(rulesToAdd));
