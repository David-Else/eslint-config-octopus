/**
 * @file Creates a .eslintrc.json config file for typescript-eslint with rules
 * @author David Else <david@elsewebdevelopment.com>
 * @copyright 2020 David Else
 * @license gpl-3.0
 * @version 1.0
 * tested with deno 1.0.0-rc2
 */

import { assert, fromFileUrl, writeJsonSync } from "./deps.ts";
import { rulesToAdd, checkedByTypeScript, userRulesToRemove } from "./rules.ts";
import { outputToConsole } from "./view.ts";

export interface EslintRules {
  [key: string]: any[];
}

export interface EslintConfig {
  rules: EslintRules;
}

/**
 * ============================================================================
 * Create rules based on airbnb-typescript/base, prettier conflicts turned off
 * ============================================================================
 */
const subprocess = Deno.run({
  cmd: [
    "npx",
    "eslint",
    "--no-eslintrc",
    "-c",
    fromFileUrl(new URL("airbnb_prettier_config.json", import.meta.url)),
    "--print-config",
    "example.js",
  ],
  stdout: "piped",
});

assert(subprocess.stdout);
const commandOutput = await Deno.readAll(subprocess.stdout);
const entireEslintConfig: EslintConfig = JSON.parse(
  new TextDecoder().decode(commandOutput)
);

/**
 * Calculate rules to remove
 *
 * @param key Current key name of rule being checked
 * @param val Current value of rule being checked
 */
export function rulesToRemove(key: string, val: any[]): boolean {
  return !!(
    val[0] !== "off" && // turned off rules
    val[0] !== 0 && // turned off rules
    !key.startsWith("import/") && // rules that use import plugin
    !checkedByTypeScript.includes(key) &&
    !userRulesToRemove.includes(key)
  );
}

/**
 * Filters a set of ESLint rules and returns an array with the new list and the removed rules
 *
 * @param esLintRules
 * @param rulesToRemoveCallback
 */
export function ruleFilter(
  esLintRules: EslintRules,
  rulesToRemoveCallback: { (key: string, val: any[]): boolean }
): [EslintRules, string[]] {
  const removedRules: string[] = [];
  return [
    Object.fromEntries(
      Object.entries(esLintRules).filter(([key, val]) => {
        // if the rule is to be included check if it should be modified
        if (rulesToRemoveCallback(key, val)) {
          // [key, val] = ruleModifier(key, val);
          return true;
        }
        removedRules.push(key);
        return false;
      })
    ),
    removedRules,
  ];
}

const [filteredEsLintRules, removedRuleNames] = ruleFilter(
  entireEslintConfig.rules,
  rulesToRemove
);

/**
 * Define the new .eslintrc.json including the new rules
 */
const eslintrcJson = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: { ...filteredEsLintRules, ...rulesToAdd },
};

/**
 * Write to disk and output log to console if run directly
 */
if (import.meta.main) {
  writeJsonSync(".eslintrc.json", eslintrcJson, { spaces: 2 });
  outputToConsole(removedRuleNames, Object.keys(rulesToAdd));
}
